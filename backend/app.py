from flask import Flask

from flask_cors import CORS

from config import Config

from extensions import db

from routes import routes

from models import Admin

import os


app = Flask(__name__)

app.config.from_object(Config)

db.init_app(app)

# IMPORTANT
CORS(app)

app.register_blueprint(routes)


with app.app_context():

    db.create_all()

    admin = Admin.query.filter_by(
        email="admin@gmail.com"
    ).first()

    if not admin:

        admin = Admin(
            email="admin@gmail.com",
            password="admin123"
        )

        db.session.add(admin)

        db.session.commit()



if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=int(os.environ.get("PORT", 5000))
    )
