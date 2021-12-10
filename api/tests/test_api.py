import os
import tempfile

import pytest
from werkzeug.wrappers import response

from api import app, db
from api.models.models import Recipe, User


@pytest.fixture
def client():
    db_fd, db_path = tempfile.mkstemp()
    app.config.update(
        TESTING=True,
        SQLALCHEMY_DATABASE_URI="sqlite:///" + db_path,
        JWT_SECRET_KEY="super-secret",
    )

    with app.test_client() as client:
        with app.app_context():
            db.create_all()
        yield client

    os.close(db_fd)
    os.unlink(db_path)


def login(client, username, password):
    res = client.post("/api/login", json=dict(username=username, password=password))
    return res


def register(client, username, password):
    res = client.post("/api/register", json=dict(username=username, password=password))
    return res


def test_register(client):
    username = "test_user"
    password = "test_user_password"
    res = register(client, username, password)
    assert res.status_code == 201
    # assert res.json["username"] == username


@pytest.mark.filterwarnings("ignore::DeprecationWarning")
def test_login(client):
    username = "test_user"
    password = "test_user_password"
    user = User(username=username)
    user.hash_password(password)
    db.session.add(user)
    db.session.commit()

    res = login(client, username, password)
    assert res.status_code == 200
    assert res.json["username"] == username
