from flask import Blueprint, request, jsonify
from app.models import Note, db
from flask_login import current_user, login_required
from app.forms import NotesForm

notes_routes = Blueprint('note', __name__)

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
    all_notes = Note.query.filter(Note.writer_id == current_user.id)
    return [note.to_dict() for note in all_notes]
    # return jsonify([note.to_dict() for note in notes])

# CREATE NOTES
@notes_routes.route('/', methods=['POST'])
@login_required

def create_note():
    form = NotesForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        note = Note (
            title = form.data['title'],
            description = form.data['description'],
            writer_id = form.data['writer_id']
        )

        db.session.add(note)
        db.session.commit()
        return note.to_dict()
    return {'error': validation_errors_to_error_messages(form.errors)}, 400

#EDIT NOTES
@notes_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_notes(id):
    data = Note.query.get(id)

    if data is None:
        return jsonify ({'error': 'Note not found'}), 404
    if data.writer_id != current_user.id:
        return jsonify ({'errors': "Unauthorized"}), 401
    form = NotesForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        data.title = form.data['title']
        data.description = form.data['description']
        data.writer_id = form.data['writer_id']
        data.notebook_id = form.data['notebook_id']
        
        db.session.commit()
        return data.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400

# DELETE  NOTES
@notes_routes.route('/<int:id>/delete', methods=["DELETE"])
@login_required
def delete_note(id):
    data = Note.query.get(id)

    if data is None:
        return jsonify({'error': 'Note not found'}), 404

    if data.writer_id != current_user.id:
        return jsonify({'error': 'Unauthorized'}), 401

    db.session.delete(data)
    db.session.commit()
    return jsonify({"message": "Successfully deleted note"}), 200


@notes_routes.route('/<int:id>', methods=['GET'])
@login_required
def get_note_by_id(id):
    note = Note.query.get(id)

    if note is None:
        return jsonify({'error': 'Note not found'}), 404
    if note.writer_id != current_user.id:
        return jsonify({'error': 'Unauthorized'}), 401

    return note.to_dict()

#add note to notebook

#additional backend route for the url `/api/notes/${noteid}/notebooks/notebookid`



