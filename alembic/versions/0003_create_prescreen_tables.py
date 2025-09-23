"""create prescreen tables

Revision ID: 0003_create_prescreen_tables
Revises: 0002_create_governance_and_audit
Create Date: 2025-09-23 17:42:00.000000
"""
from alembic import op
import sqlalchemy as sa

revision = "0003_create_prescreen_tables"
down_revision = "0002_create_governance_and_audit"
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        "prescreen_fields",
        sa.Column("id", sa.Integer(), primary_key=True, nullable=False),
        sa.Column("template_key", sa.String(length=256), nullable=False, index=True),
        sa.Column("field_key", sa.String(length=256), nullable=False),
        sa.Column("label", sa.String(length=512), nullable=False),
        sa.Column("field_type", sa.String(length=64), nullable=False),
        sa.Column("required", sa.Boolean(), nullable=False, server_default=sa.text("true")),
        sa.Column("meta", sa.JSON(), nullable=True),
        sa.Column("created_at", sa.TIMESTAMP(timezone=True), server_default=sa.text("now()"), nullable=False),
    )
    op.create_index(op.f("ix_prescreen_fields_template_key"), "prescreen_fields", ["template_key"], unique=False)

    op.create_table(
        "prescreen_submissions",
        sa.Column("id", sa.Integer(), primary_key=True, nullable=False),
        sa.Column("request_id", sa.String(length=64), nullable=False),
        sa.Column("template_key", sa.String(length=256), nullable=False, index=True),
        sa.Column("user_id", sa.Integer(), nullable=True),
        sa.Column("data", sa.JSON(), nullable=False),
        sa.Column("status", sa.String(length=50), nullable=False, server_default="draft"),
        sa.Column("disclaimer", sa.Text(), nullable=True),
        sa.Column("created_at", sa.TIMESTAMP(timezone=True), server_default=sa.text("now()"), nullable=False),
        sa.Column("updated_at", sa.TIMESTAMP(timezone=True), server_default=sa.text("now()"), nullable=False),
    )
    op.create_index(op.f("ix_prescreen_submissions_request_id"), "prescreen_submissions", ["request_id"], unique=False)


def downgrade():
    op.drop_index(op.f("ix_prescreen_submissions_request_id"), table_name="prescreen_submissions")
    op.drop_table("prescreen_submissions")
    op.drop_index(op.f("ix_prescreen_fields_template_key"), table_name="prescreen_fields")
    op.drop_table("prescreen_fields")
