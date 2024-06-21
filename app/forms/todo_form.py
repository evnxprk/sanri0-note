from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Length


class TodoForm(FlaskForm):
    title = StringField('Title', validators=[
                        DataRequired(), Length(min=2, max=255)])
    writer_id = IntegerField('Writer Id', validators=[DataRequired()])
    description = StringField('Description', validators=[
                              DataRequired(), Length(min=2, max=255)])
