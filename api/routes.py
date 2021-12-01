from api import app, db
from flask import jsonify, request
from api.models import Recipe, Tag


@app.route("/api/recipes", methods=["POST"])
def create_recipe():
    data = request.get_json()
    print(data)
    new_recipe = Recipe(
        title=data["title"],
        url=data["url"],
        recipe_tags=data["tags"],
    )
    db.session.add(new_recipe)
    db.session.commit()
    return jsonify({"message": "created recipe"}), 201
