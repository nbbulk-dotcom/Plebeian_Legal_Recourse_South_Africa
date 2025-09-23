"""create governance and audit tables

Revision ID: 0002_create_governance_and_audit
Revises: 0001_create_copilot_audit
Create Date: 2025-09-23 16:30:00.000000
"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

revision = "0002_create_governance_and_audit"
down_revision = "0001_create_copilot_audit"
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        "users",
        sa.Column("id", sa.Integer(), primary_key=True, nullable=False),
        sa.Column("username", sa.String(length=128), nullable=False, unique=True),
        sa.Column("email", sa.String(length=256), nullable=True, unique=True),
        sa.Column("hashed_password", sa.String(length=512), nullable=True),
        sa.Column("role", sa.String(length=50), nullable=False, server_default="citizen"),
        sa.Column("created_at", sa.TIMESTAMP(timezone=True), server_default=sa.text("now()"), nullable=False),
    )
    op.create_index(op.f("ix_users_username"), "users", ["username"], unique=True)
    op.create_index(op.f("ix_users_email"), "users", ["email"], unique=True)

    op.create_table(
        "legal_reviewers",
        sa.Column("id", sa.Integer(), primary_key=True, nullable=False),
        sa.Column("user_id", sa.Integer(), sa.ForeignKey("users.id", ondelete="CASCADE"), nullable=False, unique=True),
        sa.Column("practitioner_number", sa.String(length=128), nullable=False, unique=True),
        sa.Column("jurisdiction", sa.String(length=128), nullable=True),
        sa.Column("verified", sa.Boolean(), nullable=False, server_default=sa.text("false")),
        sa.Column("created_at", sa.TIMESTAMP(timezone=True), server_default=sa.text("now()"), nullable=False),
    )
    op.create_index(op.f("ix_legal_reviewers_user_id"), "legal_reviewers", ["user_id"], unique=True)

    op.create_table(
        "template_approvals",
        sa.Column("id", sa.Integer(), primary_key=True, nullable=False),
        sa.Column("template_key", sa.String(length=256), nullable=False),
        sa.Column("approved", sa.Boolean(), nullable=False, server_default=sa.text("false")),
        sa.Column("reviewer_id", sa.Integer(), sa.ForeignKey("legal_reviewers.id", ondelete="SET NULL"), nullable=True),
        sa.Column("reviewer_notes", sa.Text(), nullable=True),
        sa.Column("approved_at", sa.TIMESTAMP(timezone=True), nullable=True),
        sa.Column("created_at", sa.TIMESTAMP(timezone=True), server_default=sa.text("now()"), nullable=False),
    )
    op.create_index(op.f("ix_template_approvals_template_key"), "template_approvals", ["template_key"], unique=False)

    op.create_table(
        "documents",
        sa.Column("id", sa.Integer(), primary_key=True, nullable=False),
        sa.Column("request_id", sa.String(length=64), nullable=False),
        sa.Column("template_key", sa.String(length=256), nullable=False),
        sa.Column("user_id", sa.Integer(), sa.ForeignKey("users.id", ondelete="SET NULL"), nullable=True),
        sa.Column("status", sa.String(length=50), nullable=False, server_default="draft"),
        sa.Column("disclaimer", sa.Text(), nullable=True),
        sa.Column("payload", sa.JSON(), nullable=True),
        sa.Column("storage_path", sa.String(length=1024), nullable=True),
        sa.Column("created_at", sa.TIMESTAMP(timezone=True), server_default=sa.text("now()"), nullable=False),
        sa.Column("updated_at", sa.TIMESTAMP(timezone=True), server_default=sa.text("now()"), nullable=False),
    )
    op.create_index(op.f("ix_documents_request_id"), "documents", ["request_id"], unique=False)

    conn = op.get_bind()
    insp = sa.inspect(conn)
    if "copilot_audit" not in insp.get_table_names():
        op.create_table(
            "copilot_audit",
            sa.Column("id", sa.Integer(), primary_key=True, nullable=False),
            sa.Column("request_id", sa.String(length=64), nullable=False),
            sa.Column("user_id", sa.String(length=128), nullable=True),
            sa.Column("doc_id", sa.String(length=128), nullable=True),
            sa.Column("prompt_redacted", sa.Text(), nullable=False),
            sa.Column("response_redacted", sa.Text(), nullable=True),
            sa.Column("model", sa.String(length=128), nullable=True),
            sa.Column("risk_score", sa.Integer(), nullable=True),
            sa.Column("requires_review", sa.Boolean(), nullable=False, server_default=sa.true()),
            sa.Column("created_at", sa.TIMESTAMP(timezone=True), server_default=sa.text("now()"), nullable=False),
        )
        op.create_index(op.f("ix_copilot_audit_request_id"), "copilot_audit", ["request_id"], unique=False)
        op.create_index(op.f("ix_copilot_audit_user_id"), "copilot_audit", ["user_id"], unique=False)
        op.create_index(op.f("ix_copilot_audit_doc_id"), "copilot_audit", ["doc_id"], unique=False)


def downgrade():
    op.drop_index(op.f("ix_documents_request_id"), table_name="documents")
    op.drop_table("documents")

    op.drop_index(op.f("ix_template_approvals_template_key"), table_name="template_approvals")
    op.drop_table("template_approvals")

    op.drop_index(op.f("ix_legal_reviewers_user_id"), table_name="legal_reviewers")
    op.drop_table("legal_reviewers")

    op.drop_index(op.f("ix_users_email"), table_name="users")
    op.drop_index(op.f("ix_users_username"), table_name="users")
    op.drop_table("users")

    conn = op.get_bind()
    insp = sa.inspect(conn)
    if "copilot_audit" in insp.get_table_names():
        op.drop_index(op.f("ix_copilot_audit_doc_id"), table_name="copilot_audit")
        op.drop_index(op.f("ix_copilot_audit_user_id"), table_name="copilot_audit")
        op.drop_index(op.f("ix_copilot_audit_request_id"), table_name="copilot_audit")
        op.drop_table("copilot_audit")
