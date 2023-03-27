from app.models import db, Notebook, Note, environment, SCHEMA
from sqlalchemy.sql import text

def seed_notes():
    n1 = Note(title="Hello Kitty",description="Hello Kitty and her friends all went to Sanrio World to go on a picnic.", notebook_id=1, writer_id= 1)
    n2 = Note(title="Kuromi",description='Kuromi and My Melody back at it again fighting over who gets to take the car out for the day.', notebook_id=2, writer_id= 2)
    n3 = Note(title="My Melody",description="My Melody wants to be Kuromi's best friend, but Kuromi just won't go for it. So she has become friends with Chococat instead.", notebook_id=3, writer_id= 3)
    db.session.add_all([n1, n2, n3])
    db.session.commit()

# def seed_notebooks():
#     nb1 = Notebook(name="Hello Kitty and Friends")
#     nb2 = Notebook(name="Kuromi and My Melody fighting")
#     nb3 = Notebook(name="My Melody and Friends")
#     db.session.add_all([nb1, nb2, nb3])
#     db.session.commit()
   
def undo_notes():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.notes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM note"))
        
    db.session.commit()

# def undo_notebook():
#     if environment == "production":
#         db.session.execute(f"TRUNCATE table {SCHEMA}.notebooks RESTART IDENTITY CASCADE;")
#     else:
#         db.session.execute(text("DELETE FROM notebook"))
        
#     db.session.commit()