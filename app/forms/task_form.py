from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField
from wtforms.validators import DataRequired, Length
from app.models import User

class TaskForm(FlaskForm):
    owner_id=IntegerField('Owner Id')
    description = StringField('Description',validators=[DataRequired(),Length(min=2,max=50000)])
    to_do_id = IntegerField('Todo Id')
    complete = BooleanField('is completed',validators=[])