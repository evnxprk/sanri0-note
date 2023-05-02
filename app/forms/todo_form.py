from flask_wtf import FlaskForm
from wtforms import StringField,IntegerField
from wtforms.validators import DataRequired, Length
from app.models import User

class TodoForm(FlaskForm):
    writer_id = IntegerField('Author Id')
    title = StringField('Title', validators=[DataRequired, Length(min=2, max=40)])