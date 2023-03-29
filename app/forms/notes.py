from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, IntegerField
from wtforms.validators import DataRequired, Length

class NotesForm(FlaskForm):
    title = StringField('title', validators=[
        DataRequired(message='Title is required.'),
        Length(min=1, max=30, message='Title must be between 1 and 30 characters long.')
    ])
    description = TextAreaField('description', validators=[
        DataRequired(message='Description is required.'),
        Length(min=1, max=250, message='Description must be between 1 and 250 characters long.')
    ])
    writer_id = IntegerField('writer id', validators=[DataRequired()])
    notebook_id = IntegerField('notebook id')
