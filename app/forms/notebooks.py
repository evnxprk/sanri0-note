from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DateField, TextAreaField
from wtforms.validators import DataRequired, Length

class NotebookForm(FlaskForm):
    name = StringField('name', validators=[DataRequired(), Length(min=1, max=30)])
    description=TextAreaField('description', validators=[DataRequired(), Length(max=250, min=1)])