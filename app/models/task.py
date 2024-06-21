from .db import db, environment, SCHEMA, add_prefix_for_prod


class Task(db.Model):
    __tablename__ = 'tasks'

    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String(255), nullable=False)
    completed = db.Column(db.Boolean, default=False)
    to_do_id = db.Column(db.Integer, db.ForeignKey('todos.id'), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'description': self.description,
            'completed': self.completed,
            'to_do_id': self.to_do_id,
        }
