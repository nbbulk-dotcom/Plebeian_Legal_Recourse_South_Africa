"""create copilot audit table

Revision ID: 0001_create_copilot_audit
Revises: 
Create Date: 2025-09-23 16:25:00.000000
"""
import sqlalchemy as sa

from alembic import op

revision = "0001_create_copilot_audit"
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        "copilot_audit",
        sa.Column("id", sa.Integer(), primary_key=True, nullable=False),
        sa.Column("request_id", sa.String(length=64), nullable=False, index=True),
        sa.Column("user_id", sa.String(length=128), nullable=True, index=True),
        sa.Column("doc_id", sa.String(length=128), nullable=True, index=True),
        sa.Column("prompt_redacted", sa.Text(), nullable=False),
        sa.Column("response_redacted", sa.Text(), nullable=True),
        sa.Column("model", sa.String(length=128), nullable=True),
        sa.Column("risk_score", sa.Integer(), nullable=True),
        sa.Column(
            "requires_review", sa.Boolean(), nullable=False, server_default=sa.true()
        ),
        sa.Column(
            "created_at",
            sa.TIMESTAMP(timezone=True),
            server_default=sa.text("now()"),
            nullable=False,
        ),
    )
    op.create_index(
        op.f("ix_copilot_audit_request_id"),
        "copilot_audit",
        ["request_id"],
        unique=False,
    )
    op.create_index(
        op.f("ix_copilot_audit_user_id"), "copilot_audit", ["user_id"], unique=False
    )
    op.create_index(
        op.f("ix_copilot_audit_doc_id"), "copilot_audit", ["doc_id"], unique=False
    )


def downgrade():
    op.drop_index(op.f("ix_copilot_audit_doc_id"), table_name="copilot_audit")
    op.drop_index(op.f("ix_copilot_audit_user_id"), table_name="copilot_audit")
    op.drop_index(op.f("ix_copilot_audit_request_id"), table_name="copilot_audit")
    op.drop_table("copilot_audit")
