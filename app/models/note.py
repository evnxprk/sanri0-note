from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime



class Note(db.Model):
    __tablename__ = 'notes'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
    id = db.Column(db.Integer, primary_key=True)
    writer_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    notebook_id = db.Column(db.Integer, db.ForeignKey('notebooks.id'))
    title = db.Column(db.String)
    description = db.Column(db.String)
    created_at = db.Column(db.DateTime, default=datetime.utcnow())
    writer = db.relationship('User', back_populates='notes')
    notebook = db.relationship('Notebook', back_populates='notes')
    
    def to_dict(self):
        return {
            'id': self.id,
            'writer_id': self.writer_id,
            'notebook_id': self.notebook_id,
            'title': self.title,
            'description': self.description,
            'created_at': self.created_at
        }