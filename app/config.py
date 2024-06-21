import os


class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    # SQLAlchemy 1.4 no longer supports url strings that start with 'postgres'
    # (only 'postgresql') but heroku's postgres add-on automatically sets the
    # url in the hidden config vars to start with postgres.
    # so the connection uri must be updated here (for production)
    SQLALCHEMY_DATABASE_URI = os.environ.get(
        'DATABASE_URL').replace('postgres://', 'postgresql://')
    SQLALCHEMY_ECHO = True

import os


# class Config:
#     SECRET_KEY = os.environ.get('SECRET_KEY')
#     SQLALCHEMY_TRACK_MODIFICATIONS = False
#     SQLALCHEMY_ECHO = True

#     # Attempt to get DATABASE_URL from environment
#     database_url = os.environ.get('DATABASE_URL')

#     if database_url:
#         # Replace 'postgres://' with 'postgresql://' for SQLAlchemy 1.4 compatibility
#         SQLALCHEMY_DATABASE_URI = database_url.replace(
#             'postgres://', 'postgresql://')
#     else:
#         # Handle case where DATABASE_URL is not set
#         SQLALCHEMY_DATABASE_URI = 'sqlite:///dev.db'
#         # Or raise an error if DATABASE_URL is required for your application
#         # raise ValueError('DATABASE_URL environment variable is not set')
