from app.models import db, Todo, environment, SCHEMA

def seed_todo():
    todo1 = Todo(
        writer_id=1,
        title='Todo 1'
    )
    todo2 = Todo(
        writer_id=1,
        title='Todo 2'
    )
    todo3 = Todo(
        writer_id=1,
        title='Todo 3'
    )
    todo4 = Todo(
        writer_id=1,
        title='Todo 4'
    )
    todo5 = Todo(
        writer_id=1,
        title='Todo 5'
    )
    todo6 = Todo(
        writer_id=1,
        title='Todo 6'
    )
    todo7 = Todo(
        writer_id=1,
        title='Todo 7'
    )
    todo8 = Todo(
        writer_id=1,
        title='Todo 8'
    )
    todo9 = Todo(
        writer_id=1,
        title='Todo 9'
    )
    todo10 = Todo(
        writer_id=1,
        title='Todo 10'
    )


db.session.add_all([todo1, todo2, todo3, todo4, todo5,
                   todo6, todo7, todo8, todo9, todo10])
db.session.commit()



def undo_todo():

    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.lists RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM lists")

    db.session.commit()