"""Initial migration with all tables

Revision ID: 001
Revises: 
Create Date: 2024-09-23 14:09:05.000000

"""
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

from alembic import op

revision = "001"
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table(
        "users",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("email", sa.String(length=255), nullable=False),
        sa.Column("hashed_password", sa.String(length=255), nullable=False),
        sa.Column("full_name", sa.String(length=255), nullable=False),
        sa.Column(
            "role",
            sa.Enum("CITIZEN", "REVIEWER", "LAWYER", "ADMIN", name="userrole"),
            nullable=False,
        ),
        sa.Column("is_active", sa.Boolean(), nullable=False),
        sa.Column("is_verified", sa.Boolean(), nullable=False),
        sa.Column("phone_number", sa.String(length=20), nullable=True),
        sa.Column("id_number", sa.String(length=20), nullable=True),
        sa.Column("address", sa.Text(), nullable=True),
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            server_default=sa.text("now()"),
            nullable=True,
        ),
        sa.Column("updated_at", sa.DateTime(timezone=True), nullable=True),
        sa.Column("last_login", sa.DateTime(timezone=True), nullable=True),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(op.f("ix_users_email"), "users", ["email"], unique=True)
    op.create_index(op.f("ix_users_id"), "users", ["id"], unique=False)

    op.create_table(
        "legal_reviewers",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("user_id", sa.Integer(), nullable=False),
        sa.Column("law_society_number", sa.String(length=50), nullable=False),
        sa.Column("specialization", sa.String(length=255), nullable=False),
        sa.Column("years_experience", sa.Integer(), nullable=False),
        sa.Column("qualifications", sa.Text(), nullable=False),
        sa.Column("is_active", sa.Boolean(), nullable=False),
        sa.Column("approved_by", sa.Integer(), nullable=True),
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            server_default=sa.text("now()"),
            nullable=True,
        ),
        sa.Column("updated_at", sa.DateTime(timezone=True), nullable=True),
        sa.ForeignKeyConstraint(
            ["approved_by"],
            ["users.id"],
        ),
        sa.ForeignKeyConstraint(
            ["user_id"],
            ["users.id"],
        ),
        sa.PrimaryKeyConstraint("id"),
        sa.UniqueConstraint("law_society_number"),
    )
    op.create_index(
        op.f("ix_legal_reviewers_id"), "legal_reviewers", ["id"], unique=False
    )

    op.create_table(
        "document_templates",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("template_name", sa.String(length=255), nullable=False),
        sa.Column("template_type", sa.String(length=100), nullable=False),
        sa.Column("template_content", sa.Text(), nullable=False),
        sa.Column("version", sa.String(length=20), nullable=False),
        sa.Column("is_active", sa.Boolean(), nullable=False),
        sa.Column("requires_legal_review", sa.Boolean(), nullable=False),
        sa.Column("risk_level", sa.String(length=20), nullable=False),
        sa.Column("created_by", sa.Integer(), nullable=False),
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            server_default=sa.text("now()"),
            nullable=True,
        ),
        sa.Column("updated_at", sa.DateTime(timezone=True), nullable=True),
        sa.ForeignKeyConstraint(
            ["created_by"],
            ["users.id"],
        ),
        sa.PrimaryKeyConstraint("id"),
        sa.UniqueConstraint("template_name"),
    )
    op.create_index(
        op.f("ix_document_templates_id"), "document_templates", ["id"], unique=False
    )

    op.create_table(
        "template_approvals",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("template_id", sa.Integer(), nullable=False),
        sa.Column("reviewer_id", sa.Integer(), nullable=False),
        sa.Column(
            "status",
            sa.Enum(
                "PENDING",
                "APPROVED",
                "REJECTED",
                "REQUIRES_REVISION",
                name="reviewstatus",
            ),
            nullable=False,
        ),
        sa.Column("review_notes", sa.Text(), nullable=True),
        sa.Column("legal_compliance_score", sa.Integer(), nullable=True),
        sa.Column("constitutional_compliance", sa.Boolean(), nullable=True),
        sa.Column("statutory_compliance", sa.Boolean(), nullable=True),
        sa.Column("procedural_compliance", sa.Boolean(), nullable=True),
        sa.Column("reviewed_at", sa.DateTime(timezone=True), nullable=True),
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            server_default=sa.text("now()"),
            nullable=True,
        ),
        sa.ForeignKeyConstraint(
            ["reviewer_id"],
            ["legal_reviewers.id"],
        ),
        sa.ForeignKeyConstraint(
            ["template_id"],
            ["document_templates.id"],
        ),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(
        op.f("ix_template_approvals_id"), "template_approvals", ["id"], unique=False
    )

    op.create_table(
        "constitutional_violations",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("law_name", sa.String(length=255), nullable=False),
        sa.Column("law_type", sa.String(length=100), nullable=False),
        sa.Column(
            "violation_type",
            sa.Enum(
                "PROPERTY_RIGHTS",
                "ADMINISTRATIVE_JUSTICE",
                "EQUALITY",
                "HUMAN_DIGNITY",
                "FREEDOM_OF_EXPRESSION",
                "ACCESS_TO_COURTS",
                "JUST_ADMINISTRATIVE_ACTION",
                name="violationtype",
            ),
            nullable=False,
        ),
        sa.Column(
            "severity",
            sa.Enum("LOW", "MEDIUM", "HIGH", "CRITICAL", name="violationseverity"),
            nullable=False,
        ),
        sa.Column("constitutional_section", sa.String(length=50), nullable=False),
        sa.Column("description", sa.Text(), nullable=False),
        sa.Column("legal_analysis", sa.Text(), nullable=False),
        sa.Column("precedent_cases", sa.Text(), nullable=True),
        sa.Column("challenge_priority", sa.Integer(), nullable=False),
        sa.Column("success_probability", sa.Float(), nullable=True),
        sa.Column("estimated_impact", sa.Text(), nullable=True),
        sa.Column("is_active", sa.Boolean(), nullable=False),
        sa.Column("challenge_filed", sa.Boolean(), nullable=False),
        sa.Column("challenge_date", sa.DateTime(timezone=True), nullable=True),
        sa.Column("challenge_outcome", sa.String(length=100), nullable=True),
        sa.Column("detected_by", sa.String(length=100), nullable=False),
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            server_default=sa.text("now()"),
            nullable=True,
        ),
        sa.Column("updated_at", sa.DateTime(timezone=True), nullable=True),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(
        op.f("ix_constitutional_violations_id"),
        "constitutional_violations",
        ["id"],
        unique=False,
    )

    op.create_table(
        "lawyer_accountability",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("lawyer_name", sa.String(length=255), nullable=False),
        sa.Column("law_firm", sa.String(length=255), nullable=True),
        sa.Column("law_society_number", sa.String(length=50), nullable=False),
        sa.Column("corruption_score", sa.Float(), nullable=False),
        sa.Column("fee_escalation_score", sa.Float(), nullable=False),
        sa.Column("client_satisfaction_score", sa.Float(), nullable=False),
        sa.Column("case_success_rate", sa.Float(), nullable=False),
        sa.Column("total_cases", sa.Integer(), nullable=False),
        sa.Column("successful_cases", sa.Integer(), nullable=False),
        sa.Column("average_case_duration", sa.Float(), nullable=True),
        sa.Column("average_fees", sa.Float(), nullable=True),
        sa.Column("fee_transparency_score", sa.Float(), nullable=False),
        sa.Column("ethical_violations", sa.Integer(), nullable=False),
        sa.Column("client_complaints", sa.Integer(), nullable=False),
        sa.Column("is_flagged", sa.Boolean(), nullable=False),
        sa.Column("risk_level", sa.String(length=20), nullable=False),
        sa.Column("notes", sa.Text(), nullable=True),
        sa.Column(
            "last_updated",
            sa.DateTime(timezone=True),
            server_default=sa.text("now()"),
            nullable=True,
        ),
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            server_default=sa.text("now()"),
            nullable=True,
        ),
        sa.PrimaryKeyConstraint("id"),
        sa.UniqueConstraint("law_society_number"),
    )
    op.create_index(
        op.f("ix_lawyer_accountability_id"),
        "lawyer_accountability",
        ["id"],
        unique=False,
    )

    op.create_table(
        "lawyer_cases",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("lawyer_id", sa.Integer(), nullable=False),
        sa.Column("case_number", sa.String(length=100), nullable=False),
        sa.Column("case_type", sa.String(length=100), nullable=False),
        sa.Column("client_name", sa.String(length=255), nullable=False),
        sa.Column("start_date", sa.DateTime(timezone=True), nullable=False),
        sa.Column("end_date", sa.DateTime(timezone=True), nullable=True),
        sa.Column("outcome", sa.String(length=100), nullable=True),
        sa.Column("fees_charged", sa.Float(), nullable=True),
        sa.Column("fees_quoted", sa.Float(), nullable=True),
        sa.Column("client_rating", sa.Float(), nullable=True),
        sa.Column("case_notes", sa.Text(), nullable=True),
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            server_default=sa.text("now()"),
            nullable=True,
        ),
        sa.ForeignKeyConstraint(
            ["lawyer_id"],
            ["lawyer_accountability.id"],
        ),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(op.f("ix_lawyer_cases_id"), "lawyer_cases", ["id"], unique=False)


def downgrade() -> None:
    op.drop_index(op.f("ix_lawyer_cases_id"), table_name="lawyer_cases")
    op.drop_table("lawyer_cases")
    op.drop_index(
        op.f("ix_lawyer_accountability_id"), table_name="lawyer_accountability"
    )
    op.drop_table("lawyer_accountability")
    op.drop_index(
        op.f("ix_constitutional_violations_id"), table_name="constitutional_violations"
    )
    op.drop_table("constitutional_violations")
    op.drop_index(op.f("ix_template_approvals_id"), table_name="template_approvals")
    op.drop_table("template_approvals")
    op.drop_index(op.f("ix_document_templates_id"), table_name="document_templates")
    op.drop_table("document_templates")
    op.drop_index(op.f("ix_legal_reviewers_id"), table_name="legal_reviewers")
    op.drop_table("legal_reviewers")
    op.drop_index(op.f("ix_users_id"), table_name="users")
    op.drop_index(op.f("ix_users_email"), table_name="users")
    op.drop_table("users")
