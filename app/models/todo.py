from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Todo(db.Model):
    __tablename__ = "lists"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    writer_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('users.id')), nullable=False)
    title = db.Column(db.String(100), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now())

    # associations
    writer = db.relationship('User', back_populates="todo")
    tasks = db.relationship('Task', back_populates='list')


    def to_dict(self):
        return {
            "id": self.id,
            "writer_id": self.writer_id,
            "title": self.title,
            "created_at": self.format_date(self.created_at)
        }