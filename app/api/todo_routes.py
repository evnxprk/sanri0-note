from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, db, Task, Todo
from app.forms import TodoForm

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

todo_routes = Blueprint('todo', __name__)

@todo_routes.route('/')
@login_required

def get_all_todo():
    todo = Todo.query.filter(Todo.writer_id == current_user.id).all()
    todo_dict = [todo.to_dict() for todos in todo]
    return jsonify(todo_dict)

@todo_routes.route('/<int:id>', methods=['GET'])
@login_required

def create_todo(id):
    
