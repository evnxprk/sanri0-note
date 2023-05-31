from app.models import db, Todo, environment, SCHEMA

def seed_todo():
    todo1 = Todo(
        writer_id=1,
        title='Todo 1',
        description='denist at 5 PM'
    )
    todo2 = Todo(
        writer_id=1,
        title='Todo 2',
        description='denist at 5 PM'
    )
    todo3 = Todo(
        writer_id=1,
        title='Todo 3',
        description='go to new york to visit the city once more!'
    )
    todo4 = Todo(
        writer_id=1,
        title='Todo 4',
        description='buy plane tickets back to Cali'
    )
    todo5 = Todo(
        writer_id=1,
        title='Todo 5',
        description='pick up medicine from CVS/Target'
    )
    todo6 = Todo(
        writer_id=1,
        title='Todo 6', 
        description='go to costco for groceries'

    )
    todo7 = Todo(
        writer_id=1,
        title='Todo 7',
        description='clean room before end of the week'
    )
    todo8 = Todo(
        writer_id=1,
        title='Todo 8',
        description='finish homework and then playing val'
    )
    todo9 = Todo(
        writer_id=1,
        title='Todo 9',
        description='doing laundry and cooking dinner before 6PM'
    )
    todo10 = Todo(
        writer_id=1,
        title='Todo 10',
        description='business working meeting at 12:30PM'
    )
    db.session.add_all([todo1, todo2, todo3, todo4, todo5,
                       todo6, todo7, todo8, todo9, todo10])
    db.session.commit()





def undo_todo():

    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.todos RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM todos")

    db.session.commit()