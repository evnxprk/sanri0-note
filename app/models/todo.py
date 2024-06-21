from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Todo(db.Model):
    __tablename__ = 'todos'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
    id = db.Column(db.Integer, primary_key=True)
    writer_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('users.id')), nullable=False)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.String(255), nullable=False)

    writer = db.relationship('User', back_populates='todos')
    tasks = db.relationship('Task', backref='todo', lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'writer_id': self.writer_id,
            'title': self.title,
            'description': self.description
        }
