from flask.cli import AppGroup
from .users import seed_users, undo_users
from .notes import seed_notes, undo_notes, seed_notebooks, undo_notebooks
from .task import seed_tasks, undo_tasks
from .todo import seed_todo, undo_todo

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding, truncate all tables prefixed with schema name
        undo_users()
        undo_notebooks()
        undo_notes()
        undo_tasks()
        # Add a truncate command here for every table that will be seeded.
    seed_users()
    seed_notebooks()
    seed_notes()
    seed_tasks()
    seed_todo()

    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_notes()
    undo_notebooks()
    undo_tasks()
    undo_todo()
    # Add other undo functions here