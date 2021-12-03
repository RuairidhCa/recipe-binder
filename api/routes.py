from api import app, db
from flask import jsonify, request, Response
from api.models import Recipe, User
from flask_jwt_extended import create_access_token
from flask_jwt_extended import jwt_required
from flask_jwt_extended import get_jwt_identity


@app.route("/api/recipes", methods=["POST"])
def create_recipe():
    data = request.get_json()
    new_recipe = Recipe(
        title=data["title"].strip(),
        url=data["url"].strip(),
        recipe_tags=",".join(data["tags"]),
    )
    db.session.add(new_recipe)
    db.session.commit()
    return jsonify({"message": "created recipe"}), 201


@app.route("/api/recipes", methods=["GET"])
def get_all_recipes():
    recipes = Recipe.query.all()
    data = [recipe.to_json() for recipe in recipes]
    return jsonify({"data": data}), 200


@app.route("/api/recipes/<recipe_id>", methods=["PUT"])
def update_recipe(recipe_id):
    data = request.get_json()
    recipe = Recipe.query.get(recipe_id)
    recipe.title = data["title"].strip()
    recipe.url = data["url"].strip()
    recipe.recipe_tags = ",".join(data["tags"])

    db.session.commit()

    return Response(status=204)


@app.route("/api/recipes/<recipe_id>", methods=["DELETE"])
def delete_recipe(recipe_id):
    recipe = Recipe.query.get(recipe_id)
    db.session.delete(recipe)
    db.session.commit()

    return Response(status=204)


@app.route("/api/register", methods=["POST"])
def register():
    username = request.json.get("username")
    password = request.json.get("password")
    user = User(username=username)
    user.hash_password(password)
    db.session.add(user)
    db.session.commit()
    return (
        jsonify({"username": user.username}),
        201,
    )


@app.route("/api/login", methods=["POST"])
def login():
    username = request.json.get("username")
    password = request.json.get("password")
    user = User.query.filter_by(username=username).first()
    if not user or not user.verify_password(password):
        return jsonify({"message": "FAIL"}), 400

    access_token = create_access_token(identity=user.id)
    return jsonify(access_token=access_token)


@app.route("/api/protected", methods=["GET"])
@jwt_required()
def protected():
    # Access the identity of the current user with get_jwt_identity
    current_user = User.query.get(get_jwt_identity())
    return jsonify(logged_in_as=current_user.username), 200
