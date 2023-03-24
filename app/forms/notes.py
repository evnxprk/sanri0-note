from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField
from wtforms.validators import DataRequired, Length

class NotesForm(FlaskForm):
    title=StringField('title',validators=[DataRequired(), Length(min=1, Max=30)])
    description=TextAreaField('description', validators=[DataRequired(), Length(max=250, min=1)])