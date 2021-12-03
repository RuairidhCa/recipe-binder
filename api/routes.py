from api import app, db
from flask import jsonify, request, Response
from api.models import Recipe, Tag


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
