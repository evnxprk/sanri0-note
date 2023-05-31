# from .db import db, environment, SCHEMA, add_prefix_for_prod
# from datetime import datetime

# class Notebook(db.Model):
#     __tablename__ = 'notebooks'
#     if environment == "production":
#         __table_args__ = {'schema': SCHEMA}
#     id = db.Column(db.Integer, primary_key=True)
#     owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
#     name = db.Column(db.String)
#     created_at = db.Column(db.DateTime, default=datetime.utcnow())
    
#     owner = db.relationship('User', back_populates='notebooks')
#     notes = db.relationship('Note', back_populates='notebook')
    
#     def to_dict(self):
#         return {
#             'id': self.id,
#             'owner_id': self.owner_id,
#             'name': self.name,
#             'created_at': self.created_at
#         }


from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Notebook(db.Model):
    __tablename__ = 'notebooks'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('users.id')))
    name = db.Column(db.String)
    created_at = db.Column(db.DateTime, default=datetime.utcnow())

    notes = db.relationship('Note', back_populates='notebook')

    def to_dict(self):
        return {
            'id': self.id,
            'owner_id': self.owner_id,
            'name': self.name,
            'created_at': self.created_at,
        }
