from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, IntegerField
from wtforms.validators import DataRequired, Length

class NotesForm(FlaskForm):
    title=StringField('title',validators=[DataRequired(), Length(min=1, max=30)])
    description=TextAreaField('description', validators=[DataRequired(), Length(max=250, min=1)])
    # writer_id = IntegerField('writer id', validators=[DataRequired()])
    # notebook_id = IntegerField('notebook id', validators=[DataRequired()])