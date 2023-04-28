from .db import db, environment, SCHEMA, add_prefix_for_prod

from datetime import datetime

class Task(db.Model):
    __tablename__ = 'tasks'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}


    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    description = db.Column(db.String(2000), nullable=False)
    to_do_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('todo.id')), nullable=False)
    complete = db.Column(db.Boolean, nullable=False, default=False)

    list = db.relationship('Todo', back_populates='tasks')
    author = db.relationship('User', back_populates='tasks')

    def to_dict(self):
        return {
            "id": self.id,
            "author_id":self.owner_id,
            'description': self.description,
            "to_do_id": self.to_do_id,
            "complete":self.is_completed
        }