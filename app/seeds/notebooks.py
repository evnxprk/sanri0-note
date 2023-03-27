# nb1 = Notebook(name="Hello Kitty and Friends", created_at='02/12/2023', owner_id=1)
#     nb2 = Notebook(name="Kuromi and My Melody fighting", created_at='01/05/2023', owner_id=2)
#     nb3 = Notebook(name="My Melody and Friends", created_at='12/25/2022', owner_id=3)

from app.models import db, Notebook, Note, environment, SCHEMA
from sqlalchemy.sql import text

def seed_notebooks():
    nb1 = Notebook(name="Hello Kitty and Friends", owner_id=1)
    nb2 = Notebook(name="Kuromi and My Melody fighting", owner_id=2)
    nb3 = Notebook(name="My Melody and Friends", owner_id=3)
    db.session.add_all([nb1, nb2, nb3])
    db.session.commit()


def undo_notebooks():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.notebooks RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM notebook"))
        
    db.session.commit()

