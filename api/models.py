from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root@localhost:3306/localidades?charset=utf8'
    db.init_app(app)
    
    with app.app_context():
        try:
            db.create_all()
        except Exception as exception:
            print("Got the following exception when attempting db.create_all() in __init__.py: " + str(exception))
        finally:
            print("db.create_all() in __init__.py was successful - no exceptions were raised")

    from .models import Provincia, Departamento, Municipio, Localidad

    return app

class Provincia(db.Model):
    provincia_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(255), unique=True)

class Departamento(db.Model):
    departamento_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(255))
    provincia_provincia_id = db.Column(db.Integer, db.ForeignKey('provincia.provincia_id'))
    provincia = db.relationship('Provincia', backref=db.backref('departamentos', lazy=True))

class Municipio(db.Model):
    municipio_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(255))
    departamento_departamento_id = db.Column(db.Integer, db.ForeignKey('departamento.departamento_id'))
    departamento = db.relationship('Departamento', backref=db.backref('municipios', lazy=True))

class Localidad(db.Model):
    localidad_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(255))
    municipio_municipio_id = db.Column(db.Integer, db.ForeignKey('municipio.municipio_id'))
    municipio = db.relationship('Municipio', backref=db.backref('localidades', lazy=True))


if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)
