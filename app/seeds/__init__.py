from flask.cli import AppGroup
from .users import seed_users, undo_users
from .notes import seed_notes, undo_notes
from .notebooks import seed_notebooks, undo_notebooks

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding, truncate all tables prefixed with schema name
        undo_notes()
        undo_users()
        undo_notebooks()
        # Add a truncate command here for every table that will be seeded.
    seed_users()
    seed_notes()
    seed_notebooks()

    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_notes()
    undo_notebooks()
    # Add other undo functions here