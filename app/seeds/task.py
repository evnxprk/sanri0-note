from app.models import db, Task, environment, SCHEMA

def seed_tasks():
    task1 = Task(
        description='Clean my room :(',
        task_id=1,
        owner_id= 1
    )
    task2 = Task(
        description='Pick up mom from the airport',
        task_id=2,
        owner_id= 2
    )
    task3 = Task(
        description='Take dogs to the groomers',
        task_id=3,
        owner_id= 3
    )
    task4 = Task(
        description='Take out the trash for trash day',
        task_id=4,
        owner_id= 1
    )
    task5 = Task(
        description='Make dinner for the family',
        task_id=5,
        owner_id= 2
    )
    task6 = Task(
        description='Walk the dogs',
        task_id=6,
        owner_id= 3
    )
    task7 = Task(
        description='Go to Costco and get groceries',
        task_id=7,
        owner_id= 1
    )
    task8 = Task(
        description='Make birthday card for Eli',
        task_id=8,
        owner_id= 2
    )
    task9 = Task(
        description='Grab cake and cupcakes for the party',
        task_id=9,
        owner_id= 3
    )
    task10 = Task(
        description='Rearrange the setup for PC room',
        task_id=10,
        owner_id= 1
    )

    db.session.add_all(task1, task2, task3, task4, task5, task6, task7, task8, task9, task10)
    db.session.commit()

def undo_tasks():
    if environment == 'production':
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.tasks RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM tasks")
    db.session.commit()