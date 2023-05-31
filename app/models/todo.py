# from .db import db, environment, SCHEMA, add_prefix_for_prod
# from datetime import datetime


# class Todo(db.Model):
#     __tablename__ = 'todo'
    
#     id = db.Column(db.Integer, primary_key=True)
#     writer_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
#     title = db.Column(db.String(100), nullable=False)
#     description = db.Column(db.String(255))
#     # due_date = db.Column(db.DateTime, nullable=False)
    
#     author = db.relationship('User', back_populates='todo_lists')
#     tasks = db.relationship('Task', back_populates='todo_list')


#     def to_dict(self):
#         return {
#             "id": self.id,
#             'description':self.description,
#             # "writer_id": self.writer_id,
#             "title": self.title,
#             # "created_at": self.format_date(self.created_at)
#         }


from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Todo(db.Model):
    __tablename__ = 'todos'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
    id = db.Column(db.Integer, primary_key=True)
    writer_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('users.id')))
    title = db.Column(db.String)
    due_date = db.Column(db.Date)

    writer = db.relationship('User', back_populates='todos')
    tasks = db.relationship('Task', backref='todos')

    def to_dict(self):
        return {
            'id': self.id,
            'writer_id': self.writer_id,
            'title': self.title,
            'due_date': self.due_date,
        }
