from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField
from wtforms.validators import DataRequired, Length

class NotebookForm(FlaskForm):
    name = StringField('name', validators=[DataRequired(), Length(min=1, max=50, message='Name must be between 1 and 50 characters long')])
    # description=TextAreaField('description', validators=[Length(max=250, min=1)])