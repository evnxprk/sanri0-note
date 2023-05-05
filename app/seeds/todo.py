from app.models import db, Todo, environment, SCHEMA

def seed_todo():
    todo_1 = Todo(
        writer_id=1,
        title='Todo 1'
    )
    todo_2 = Todo(
        writer_id=1,
        title='Todo 1'
    )
    todo_3 = Todo(
        writer_id=1,
        title='Todo 1'
    )
    todo_4 = Todo(
        writer_id=1,
        title='Todo 1'
    )
    todo_5 = Todo(
        writer_id=1,
        title='Todo 1'
    )
    todo_6 = Todo(
        writer_id=1,
        title='Todo 1'
    )
    todo_7 = Todo(
        writer_id=1,
        title='Todo 1'
    )
    todo_8 = Todo(
        writer_id=1,
        title='Todo 1'
    )
    todo_9 = Todo(
        writer_id=1,
        title='Todo 1'
    )
    todo_10 = Todo(
        writer_id=1,
        title='Todo 1'
    )

    db.session.add(todo_1)
    db.session.add(todo_2)
    db.session.add(todo_3)
    db.session.add(todo_4)
    db.session.add(todo_5)
    db.session.add(todo_6)
    db.session.add(todo_7)
    db.session.add(todo_8)
    db.session.add(todo_9)
    db.session.add(todo_10)

    db.session.commit()

def undo_todo():

    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.lists RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM lists")

    db.session.commit()