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

#Get All Todo
@todo_routes.route('/', methods=['GET'])
@login_required

def get_all_todo():
    todo = Todo.query.filter(Todo.writer_id == current_user.id).all()
    return [todos.to_dict() for todos in todo]
    # return jsonify(todo_dict)

#Get One Todo
@todo_routes.route('/<int:id>', methods=['GET'])
@login_required

def get_one_todo(id):
    todo = Todo.query.get(id)
    if todo is None: 
        return jsonify({'error': 'Todo not found'}), 404
    return jsonify(todo.to_dict())


@todo_routes.route('/', methods=['POST'])
@login_required
def create_todo():
    form = TodoForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        print("Form data:", form.data)
        writer_id = int(form.data['writer_id'])
        todo = Todo(
            title=form.data['title'],
            writer_id= form.data['writer_id']
        )
        db.session.add(todo)
        db.session.commit()
        return todo.to_dict(), 201
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400


#Edit Todo

@todo_routes.route('/<int:id>',methods=['PUT'])
@login_required
def edit_todo(id):
    todo= Todo.query.get(id)
    if todo is None:
        return jsonify({'error': 'Todo not found'}), 404
    form = TodoForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        todo.title = form.data['title'],
        todo.writer_id = form.data['writer_id']

        db.session.commit()
        todo_dict = todo.to_dict()
        return todo_dict
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400

#Delete Todo

@todo_routes.route('/<int:id>/delete', methods=["DELETE"])
@login_required
def delete_todo(id):
    todo = Todo.query.get(id)
    if todo is None:
        return jsonify({'error': "Todo Not Found"}), 404
    db.session.delete(todo)
    db.session.commit()
    return jsonify({"message": "Todo Successfully Deleted"}), 200



