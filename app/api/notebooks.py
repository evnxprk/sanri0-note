from flask import Blueprint, request, jsonify
from app.models import Notebook, db 
from flask_login import current_user, login_required
from app.forms import NotebookForm

notebook_routes = Blueprint('notebook', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

# GET ALL NOTEBOOKS
@notebook_routes.route('/', methods=['GET'])
@login_required
def get_notebooks():
   all_notebooks = Notebook.query.filter(Notebook.owner_id == current_user.id).all()
   notebooks = [notebook.to_dict() for notebook in all_notebooks]
   return jsonify({'Notebooks': notebooks})

# GET A SINGLE NOTEBOOK
@notebook_routes.route('<int:id>', methods=["GET"])
@login_required
def get_single(id):
    single_notebook = Notebook.query.get(id)
    if single_notebook is None:
        return jsonify({'errors': {' Notebook not found!'}}), 404
    return jsonify({single_notebook.to_dict()})

# CREATE A NOTEBOOK 
@notebook_routes.route('/', methods=['POST'])
@login_required

def create_notebook():
    res = request.get_json()

    form = NotebookForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        notebook = Notebook(
            name=['name'],
            owner_id = current_user.id
        )
        db.session.add(notebook)
        db.session.commit()
        return notebook.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400

# EDIT A NOTEBOOK 
@notebook_routes.route('<int:id>/edit', methods=['PUT'])
@login_required

def edit_notebook(id):
    data = Notebook.query.get(id)

    if data is None:
        return jsonify ({'error': 'Notebook not found'}), 404

    if data.owner_id != current_user.id:
        return jsonify ({'error': 'Unauthorized'}), 401

    form = NotebookForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        data.name = form.data['name']
        
        db.session.commit()
        return data.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400

# DELETE A NOTEBOOK
@notebook_routes.route('<int:id>', methods=["DELETE"])
@login_required

def delete_notebook(id):
    data = Notebook.query.get(id)

    if data is None:
        return jsonify({'error': 'Notebook not found'}), 404

    if data.owner_id != current_user.id:
        return jsonify({'error': 'Unauthorized'}), 401

    db.session.delete(data)
    db.session.commit()
    return jsonify ({"message": "Successfully deleted notebook"}), 200

