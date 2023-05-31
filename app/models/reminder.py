from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Reminder(db.Model):
    __tablename__ = 'reminders'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
    id = db.Column(db.Integer, primary_key=True)
    writer_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('users.id')))
    task_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('tasks.id')))
    due_date = db.Column(db.Date)

    writer = db.relationship('User', back_populates='reminders')
    # task = db.relationship('Task', back_populates='reminders')

    def to_dict(self):
        return {
            'id': self.id,
            'writer_id': self.writer_id,
            'task_id': self.task_id,
            'due_date': self.due_date,
        }
