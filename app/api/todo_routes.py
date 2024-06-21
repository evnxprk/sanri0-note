from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, db, Task, Todo
from app.forms import TodoForm


def validation_errors_to_error_messages(validation_errors):
    """
    Convert WTForms validation errors to a simple list of error messages
    """
    error_messages = []
    for field, errors in validation_errors.items():
        for error in errors:
            error_messages.append(f'{field} : {error}')
    return error_messages


todo_routes = Blueprint('todos', __name__)

# Get all todos


@todo_routes.route('/', methods=['GET'])
@login_required
def get_all_todo():
    todos = Todo.query.filter(Todo.writer_id == current_user.id).all()
    return jsonify([todo.to_dict() for todo in todos])

# Get single todo by ID


@todo_routes.route('/<int:id>', methods=['GET'])
@login_required
def get_one_todo(id):
    todo = Todo.query.get(id)
    if todo is None:
        return jsonify({'error': 'Todo not found'}), 404
    return jsonify(todo.to_dict())

# Create a todo


@todo_routes.route('/', methods=['POST'])
@login_required
def create_todo():
    form = TodoForm()
    form.csrf_token.data = request.cookies['csrf_token']

    if form.validate_on_submit():
        try:
            todo = Todo(
                title=form.title.data,
                description=form.description.data,
                writer_id=current_user.id  # Ensure the writer_id is set to the current user
            )
            db.session.add(todo)
            db.session.commit()
            return jsonify(todo.to_dict()), 201
        except Exception as e:
            db.session.rollback()
            return jsonify({'error': str(e)}), 500
    return jsonify({'errors': validation_errors_to_error_messages(form.errors)}), 400

# Edit a todo


@todo_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_todo(id):
    todo = Todo.query.get(id)
    if todo is None:
        return jsonify({'error': 'Todo not found'}), 404

    form = TodoForm()
    form.csrf_token.data = request.cookies['csrf_token']
    if form.validate_on_submit():
        try:
            todo.title = form.title.data
            todo.description = form.description.data

            db.session.commit()
            return jsonify(todo.to_dict())
        except Exception as e:
            db.session.rollback()
            return jsonify({'error': str(e)}), 500
    return jsonify({'errors': validation_errors_to_error_messages(form.errors)}), 400

# Delete a todo


@todo_routes.route('/<int:id>/delete', methods=['DELETE'])
@login_required
def delete_todo(id):
    todo = Todo.query.get(id)
    if todo is None:
        return jsonify({'error': 'Todo not found'}), 404
    try:
        db.session.delete(todo)
        db.session.commit()
        return jsonify({"message": "Todo successfully deleted"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500
