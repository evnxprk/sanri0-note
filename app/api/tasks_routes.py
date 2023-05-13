from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Task, Todo
from app.forms import TaskForm

tasks_routes = Blueprint('tasks', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

 #get all tasks
@tasks_routes.route('/', methods=['GET'])
@login_required
def get_all_tasks():
    all_tasks = Task.query.filter(Task.to_do_id == current_user.id).all()
    return [task.to_dict() for task in all_tasks]
    # return jsonify(task_list)

#single task by id
@tasks_routes.route('/<int:id>', methods=['GET'])
@login_required
def get_single_task(id):
    task = Task.query.get(id)
    if task is None:
        return jsonify({'error': "Task not found"}), 404
    return task.to_dict()

# Create A Task
@tasks_routes.route('/', methods=['POST'])
@login_required
def create_new_task():
    form = TaskForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        task = Task(
            description=form.data['description'],
            to_do_id=form.data['to_do_id']
        )
        db.session.add(task)
        db.session.commit()
        return task.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400

# Edit A Task
@tasks_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_task(id):
    task = Task.query.get(id)
    if task is None:
        return jsonify({'error': "Task Not Found"}), 404
    form = TaskForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        task.description = form.data['description']
        task.complete = form.data['complete']
        
        db.session.commit()
        task_dict = task.to_dict()
        return task_dict
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400

# Delete A Task
@tasks_routes.route('/<int:id>/delete', methods=['DELETE'])
@login_required
def delete_task(id):
    task = Task.query.get(id)
    if task is None:
        return jsonify({'error': "Task Not Found"}), 404
    db.session.delete(task)
    db.session.commit()
    return jsonify({"message": "Task Successfully Deleted"}), 200
