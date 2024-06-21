from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField, IntegerField
from wtforms.validators import DataRequired, Length


class TaskForm(FlaskForm):
    description = StringField('description', validators=[
                              DataRequired(), Length(max=255)])
    completed = BooleanField('completed')  # Add completed field
    # Ensure to_do_id field is present
    to_do_id = IntegerField('to_do_id', validators=[DataRequired()])
