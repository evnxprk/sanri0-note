from app.models import db, Notebook, Note, environment, SCHEMA
from sqlalchemy.sql import text

def seed_notebook():
    n1 = Note(title="Hello Kitty",description="Hello Kitty and her friends all went to Sanrio World to go on a picnic.", notebook_id=1, writer_id= 1, created_at='08/03/2023')
    n2 = Note(title="Kuromi",description='Kuromi and My Melody back at it again fighting over who gets to take the car out for the day.', notebook_id=2, writer_id= 2, created_at='10/31/2023')
    n3 = Note(title="My Melody",description="My Melody wants to be Kuromi's best friend, but Kuromi just won't go for it. So she has become friends with Chococat instead.", notebook_id=3, writer_id= 3, created_at='04/23/2023')
    db.session.add_all([n1, n2, n3])
    db.session.commit()

def seed_notebook():
    nb1 = Notebook(name="Hello Kitty and Friends", created_at='02/12/2023', owner_id=1)
    nb2 = Notebook(name="Kuromi and My Melody fighting", created_at='01/05/2023', owner_id=2)
    nb3 = Notebook(name="My Melody and Friends", created_at='12/25/2022', owner_id=3)
    db.session.add_all([nb1, nb2, nb3])
    db.session.commit()
   
def undo_notes():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.note RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM note"))
        
    db.session.commit()

def undo_notebook():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.notebook RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM notebook"))
        
    db.session.commit()