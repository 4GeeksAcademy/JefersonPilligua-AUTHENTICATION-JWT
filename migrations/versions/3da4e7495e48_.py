"""empty message

Revision ID: 3da4e7495e48
Revises: 1cb268cfc1c7
Create Date: 2025-02-21 12:53:18.646428

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '3da4e7495e48'
down_revision = '1cb268cfc1c7'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.drop_column('is_active')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.add_column(sa.Column('is_active', sa.BOOLEAN(), autoincrement=False, nullable=False))

    # ### end Alembic commands ###
