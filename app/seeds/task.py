from app.models import db, Task, environment, SCHEMA

def seed_tasks():
    task1 = Task(
        description='Clean my room :(',
       to_do_id=1
        
    )
    task2 = Task(
        description='Pick up mom from the airport',
       to_do_id=1
   
    )
    task3 = Task(
        description='Take dogs to the groomers',
       to_do_id=1
     
    )
    task4 = Task(
        description='Take out the trash for trash day',
        to_do_id=1
        
    )
    task5 = Task(
        description='Make dinner for the family',
        to_do_id=1
       
    )
    task6 = Task(
        description='Walk the dogs',
        to_do_id=1
        
    )
    task7 = Task(
        description='Go to Costco and get groceries',
       to_do_id=1
       
    )
    task8 = Task(
        description='Make birthday card for Eli',
        to_do_id=1
      
    )
    task9 = Task(
        description='Grab cake and cupcakes for the party',
        to_do_id=1
        
    )
    task10 = Task(
        description='Rearrange the setup for PC room',
       to_do_id=1
        
    )

    db.session.add_all([task1, task2, task3, task4, task5, task6, task7, task8, task9, task10])
    db.session.commit()

def undo_tasks():
    if environment == 'production':
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.tasks RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM tasks")
    db.session.commit()