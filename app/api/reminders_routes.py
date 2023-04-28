from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Task, Todo
from app.forms import TaskForm
from .validation_to_error_formatter import validation_errors_to_error_messages

tasks_routes = Blueprint('tasks', __name__)

#single task by id

@tasks_routes.route('/<int:id>',methods=['GET'])
@login_required

def get_single_task(id):
    task = Task.query.get(id)
    if task is None:
        return jsonify({'error': "Task not found"}), 404
    task_dict = task.to_dict()

    if task.to_do_id != None:
        todo = Todo.query.get(task.to_do_id)
        task_dict['list'] = todo.to_dict()
    return jsonify({"Task": task_dict})

#Create A Task

@tasks_routes.route('/', methods=['POST'])
@login_required

def create_new_task():
    form = TaskForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        task = Task(
            description = form.data['description'],
            owner_id = current_user.id,
            to_do_id = form.data['todo_id']
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
        db.sesssion.commit()
        task_dict = task.to_dict()
        return task_dict
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400