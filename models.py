from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from db_setup import db

app = Flask(__name__)
db = SQLAlchemy()

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


@app.route('/provincias', methods=['GET'])
def obtener_provincias():
    provincias = Provincia.query.all()
    resultado = [{'provincia_id': provincia.provincia_id, 'name': provincia.name} for provincia in provincias]
    return jsonify(resultado)

@app.route('/departamentos', methods=['GET'])
def obtener_departamentos():
    departamentos = Departamento.query.all()
    resultado = [{'departamento_id': departamento.departamento_id, 'name': departamento.name, 'provincia_provincia_id': departamento.provincia_provincia_id} for departamento in departamentos]
    return jsonify(resultado)

@app.route('/municipios', methods=['GET'])
def obtener_municipios():
    municipios = Municipio.query.all()
    resultado = [{'municipio_id': municipio.municipio_id, 'name': municipio.name, 'departamento_departamento_id': municipio.departamento_departamento_id} for municipio in municipios]
    return jsonify(resultado)

@app.route('/localidades', methods=['GET'])
def obtener_localidades():
    localidades = Localidad.query.all()
    resultado = [{'localidad_id': localidad.localidad_id, 'name': localidad.name, 'municipio_municipio_id': localidad.municipio_municipio_id} for localidad in localidades]
    return jsonify(resultado)


if __name__ == '__main__':
    app.run(debug=True)
