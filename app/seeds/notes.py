from app.models import db, Notebook, Note, environment, SCHEMA
from sqlalchemy.sql import text

def seed_notes():
    n1 = Note(title="Hello Kitty",description="Hello Kitty and her friends all went to Sanrio World to go on a picnic.", notebook_id=1, writer_id= 1)
    n2 = Note(title="Kuromi",description='Kuromi and My Melody back at it again fighting over who gets to take the car out for the day.', notebook_id=2, writer_id= 1)
    n3 = Note(title="My Melody",description="My Melody wants to be Kuromi's best friend, but Kuromi just won't go for it. So she has become friends with Chococat instead.", notebook_id=3, writer_id= 1)
    n4 = Note(title='Grocery List', description='eggs, milk, bread, butter, chicken, vegetables', notebook_id=3, writer_id=1)
    n5 = Note(title='Meeting Agenda', description='Introductions, Agenda Review, Project Updates, Action Items', notebook_id=4, writer_id=1)
    n6 = Note(title='To-Do List', description='Finish Project Proposal, Pay Rent, Schedule Doctor Appointment', notebook_id=5, writer_id=1)
    n7 = Note(title='Travel Itinerary', description='Flight details, Hotel reservations, Sightseeing plans', notebook_id=6, writer_id=1)
    n8 = Note(title='Recipe', description='Ingredients: 2 cups flour, 1 cup sugar, 1 tsp baking powder, 1/2 tsp salt', notebook_id=1, writer_id=1)
    n9 = Note(title='Gift Ideas', description='Mom - Necklace, Dad - Watch, Sister - Book, Brother - Headphones', notebook_id=2, writer_id=1)
    n10 =Note(title='Fitness Tracker', description='Ran 3 miles, 20 pushups, 10 situps, 5 minutes of stretching', notebook_id=3, writer_id=1)
    n11 = Note(title='Journal Entry', description='Today I learned how to play the guitar chords for a new song', notebook_id=4, writer_id=1)
    n12 = Note(title='Bucket List', description='Travel to Japan, Skydive, Learn a new language, Volunteer abroad', notebook_id=5, writer_id=1)
    n13 = Note(title='Movie List', description='The Godfather, Shawshank Redemption, The Dark Knight, Forrest Gump', notebook_id=6, writer_id=1)
    db.session.add_all([n1, n2, n3, n4, n5, n6, n7, n8, n9, n10, n11, n12, n13])
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
        db.session.execute(text("DELETE FROM notes"))
        
    db.session.commit()


def seed_notebooks():
    nb1 = Notebook(name="Hello Kitty and Friends", owner_id=1)
    nb2 = Notebook(name="Kuromi and My Melody fighting", owner_id=1)
    nb3 = Notebook(name="My Melody and Friends", owner_id=1)
    nb4 = Notebook(name="Adventures of Cinnamoroll and Pochacco", owner_id=1)
    nb5 = Notebook(name="The Rivalry Of Melody And Kuromi", owner_id=1)
    nb6 = Notebook(name="Pochacco and His Adventures", owner_id=1)
    db.session.add_all([nb1, nb2, nb3, nb4, nb5, nb6])
    db.session.commit()


def undo_notebooks():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.notebooks RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM notebooks"))
        
    db.session.commit()

# def undo_notebook():
#     if environment == "production":
#         db.session.execute(f"TRUNCATE table {SCHEMA}.notebooks RESTART IDENTITY CASCADE;")
#     else:
#         db.session.execute(text("DELETE FROM notebook"))
        
#     db.session.commit()