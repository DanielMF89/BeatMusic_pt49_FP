"""empty message

Revision ID: e9dc31ea8095
Revises: 2037e0620a19
Create Date: 2024-01-17 08:00:12.751755

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'e9dc31ea8095'
down_revision = '2037e0620a19'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('album', schema=None) as batch_op:
        batch_op.add_column(sa.Column('name', sa.String(length=120), nullable=False))
        batch_op.drop_column('title')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('album', schema=None) as batch_op:
        batch_op.add_column(sa.Column('title', sa.VARCHAR(length=120), autoincrement=False, nullable=False))
        batch_op.drop_column('name')

    # ### end Alembic commands ###