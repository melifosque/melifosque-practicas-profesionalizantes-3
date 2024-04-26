from flask import Flask
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root@localhost/localidades?charset=utf8'
    app.config["SQLALCHEMY_ECHO"] = True 
    db.init_app(app)

    from api.routes import api_routes
    app.register_blueprint(api_routes)

    app.static_folder = 'static'
    app.static_url_path = '/static'

    return app