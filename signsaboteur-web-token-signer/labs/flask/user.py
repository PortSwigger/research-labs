from flask_login import UserMixin


# Simulate user database
USERS_DB = {}


class User(UserMixin):

    """Custom User class."""

    def __init__(self, _id, username, password):
        self.id = _id
        self.username = username
        self.password = password

    @staticmethod
    def get(username):
        return USERS_DB.get(username)

    @staticmethod
    def getById(user_id):
        for value in USERS_DB.values():
            if user_id == value.get_id():
                return value
        return None

    @staticmethod
    def create(id, username, password):
        USERS_DB[username] = User(id, username, password)