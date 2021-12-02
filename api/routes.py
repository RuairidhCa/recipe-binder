from api import app, db
from flask import jsonify, request, Response
from api.models import Recipe, Tag


@app.route("/api/recipes", methods=["POST"])
def create_recipe():
    data = request.get_json()
    new_recipe = Recipe(
        title=data["title"],
        url=data["url"],
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
def update_recipes(recipe_id):
    data = request.get_json()
    print(data)
    recipe = Recipe.query.get(recipe_id)
    recipe.title = data["title"]
    recipe.url = data["url"]
    recipe.recipe_tags = ",".join(data["tags"])

    db.session.commit()

    return Response(status=204)
