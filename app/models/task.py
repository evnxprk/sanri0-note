# from .db import db, environment, SCHEMA, add_prefix_for_prod

# from datetime import datetime

# class Task(db.Model):
#     __tablename__ = 'tasks'
    
#     id = db.Column(db.Integer, primary_key=True)
#     description = db.Column(db.String(255))
#     to_do_id = db.Column(db.Integer, db.ForeignKey('todo.id'))
#     complete = db.Column(db.Boolean, default=False)
    
#     todo_list = db.relationship('Todo', back_populates='tasks')
#     # reminders = db.relationship('Reminder', back_populates='task')
#     def to_dict(self):
#         return {
#             "id": self.id,
#             # "author_id":self.owner_id,
#             'description': self.description,
#             "to_do_id": self.to_do_id,
#             # "complete":self.is_completed
#         }

from .db import db, environment, SCHEMA, add_prefix_for_prod


class Task(db.Model):
    __tablename__ = 'tasks'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String)
    to_do_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('todos.id')))
    complete = db.Column(db.Boolean)

    def to_dict(self):
        return {
            'id': self.id,
            'description': self.description,
            'to_do_id': self.to_do_id,
            'complete': self.complete,
        }
