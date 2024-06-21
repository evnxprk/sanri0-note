from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Task, Todo
from app.forms import TaskForm

tasks_routes = Blueprint('task', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Convert WTForms validation errors to a simple list of error messages
    """
    error_messages = []
    for field, errors in validation_errors.items():
        for error in errors:
            error_messages.append(f'{field} : {error}')
    return error_messages

# Get all tasks


@tasks_routes.route('/', methods=['GET'])
@login_required
def get_all_tasks():
    all_tasks = Task.query.filter(Task.to_do_id == current_user.id).all()
    # Return JSON response
    return jsonify([task.to_dict() for task in all_tasks])

# Get single task by ID


@tasks_routes.route('/<int:id>', methods=['GET'])
@login_required
def get_single_task(id):
    task = Task.query.get(id)
    if task is None:
        return jsonify({'error': "Task not found"}), 404
    return jsonify(task.to_dict())

# Create a task


@tasks_routes.route('/', methods=['POST'])
@login_required
def create_new_task():
    form = TaskForm()
    form.csrf_token.data = request.cookies['csrf_token']

    if form.validate_on_submit():
        try:
            task = Task(
                description=form.description.data,
                to_do_id=form.to_do_id.data
            )
            db.session.add(task)
            db.session.commit()
            return jsonify(task.to_dict()), 201
        except Exception as e:
            db.session.rollback()
            return jsonify({'error': str(e)}), 500
    return jsonify({'errors': validation_errors_to_error_messages(form.errors)}), 400

# Edit a task


@tasks_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_task(id):
    task = Task.query.get(id)
    if task is None:
        return jsonify({'error': "Task Not Found"}), 404

    form = TaskForm()
    form.csrf_token.data = request.cookies['csrf_token']
    if form.validate_on_submit():
        try:
            task.description = form.description.data
            task.completed = form.completed.data
            task.to_do_id = form.to_do_id.data  # Ensure to_do_id is updated

            db.session.commit()
            return jsonify(task.to_dict())
        except Exception as e:
            db.session.rollback()
            return jsonify({'error': str(e)}), 500
    return jsonify({'errors': validation_errors_to_error_messages(form.errors)}), 400

# Delete a task


@tasks_routes.route('/<int:id>/delete', methods=['DELETE'])
@login_required
def delete_task(id):
    task = Task.query.get(id)
    if not task:
        return jsonify({'error': "Task Not Found"}), 404

    try:
        db.session.delete(task)
        db.session.commit()
        return jsonify({"message": "Task Successfully Deleted"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500
