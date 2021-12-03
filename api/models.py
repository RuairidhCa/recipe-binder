from api import db, bcrypt
from sqlalchemy.orm import validates
from sqlalchemy.orm.exc import NoResultFound

TAGS = db.Table(
    "recipe_tag",
    db.Column("tag_id", db.Integer, db.ForeignKey("tag.id")),
    db.Column("recipe_id", db.Integer, db.ForeignKey("recipe.id")),
)


class Recipe(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.Text)
    url = db.Column(db.Text)
    tags = db.relationship("Tag", secondary=TAGS, backref="recipes")

    def to_json(self):
        return {
            "id": self.id,
            "title": self.title,
            "url": self.url,
            "tags": self.recipe_tags,
        }

    @property
    def recipe_tags(self):
        """
        Returns a comma-separated list of available tags.
        :return:
        """
        # return ",".join([t.name for t in self.tags])
        return [t.name for t in self.tags]

    @recipe_tags.setter
    def recipe_tags(self, string):
        if string:

            self.tags = [Tag.get_or_create(name) for name in string.split(",")]

        else:
            self.tags = []

    @validates("title", "url")
    def validate_not_empty(self, key, value):
        if not value:
            raise ValueError((f"{key.capitalize()} is a required field."))
        return value


class Tag(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(25), nullable=False, unique=True, index=True)

    @staticmethod
    def get_or_create(name):
        """
        Gets or creates a tag with a given name.
        :param name: string, name of the tag to be found or created if it doesn't exist.
        :return:  Tag
        """
        try:
            return Tag.query.filter_by(name=name).one()
        except NoResultFound:
            return Tag(name=name)


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(32))
    password_hash = db.Column(db.String(128))

    def hash_password(self, password):
        self.password_hash = bcrypt.generate_password_hash(password).decode("utf-8")

    def verify_password(self, password):
        return bcrypt.check_password_hash(self.password_hash, password)
