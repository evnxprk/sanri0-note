from flask import Blueprint, request, jsonify
from app.models import Notes, db
from flask_login import current_user, login_required
from app.forms import NoteForm

notes_routes = Blueprint('notes', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

# GET ALL NOTES

@notes_routes.route('/', methods=['GET'])
@login_required

def all_notes():
    notes = Notes.query.filter(Notes.owner_id == current_user.id).all()
    return jsonify([note.to_dict() for note in notes])

# CREATE NOTES
@notes_routes.route('/', methods=['POST'])
@login_required

def create_note():
    form = NoteForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        note = Notes (
            title = form.data['title'],
            description = form.data['description'],
            writer_id = current_user.id,
        )
        db.session.add(note)
        db.session.commit()
        return note.to_dict()
    return {'error': validation_errors_to_error_messages(form.errors)}, 400



