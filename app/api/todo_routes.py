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

def get_all_todo(id):
    todo = Todo.query.get(id)
    if todo is None: 
        return jsonify({'error': 'Todo not found'}), 404
    return jsonify(todo.to_dict())

@todo_routes.route('/', methods=['POST'])
@login_required

def create_todo():
    form= TodoForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        todo = Todo (
            title=form.data['title'],
            writer_id=current_user.id
        )
        db.session.add(todo)
        db.session.commit()
        return todo.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400

