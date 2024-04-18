from flask import Blueprint, jsonify
from models import Provincia, Departamento, Municipio, Localidad


api_routes = Blueprint('api', __name__)

@api_routes.route('/provincias', methods=['GET'])
def obtener_provincias():
    provincias = Provincia.query.all()
    resultado = [{'provincia_id': provincia.provincia_id, 'name': provincia.name} for provincia in provincias]
    return jsonify(resultado)

@api_routes.route('/departamentos', methods=['GET'])
def obtener_departamentos():
    departamentos = Departamento.query.all()
    resultado = [{'departamento_id': departamento.departamento_id, 'name': departamento.name, 'provincia_provincia_id': departamento.provincia_provincia_id} for departamento in departamentos]
    return jsonify(resultado)

@api_routes.route('/municipios', methods=['GET'])
def obtener_municipios():
    municipios = Municipio.query.all()
    resultado = [{'municipio_id': municipio.municipio_id, 'name': municipio.name, 'departamento_departamento_id': municipio.departamento_departamento_id} for municipio in municipios]
    return jsonify(resultado)

@api_routes.route('/localidades', methods=['GET'])
def obtener_localidades():
    localidades = Localidad.query.all()
    resultado = [{'localidad_id': localidad.localidad_id, 'name': localidad.name, 'municipio_municipio_id': localidad.municipio_municipio_id} for localidad in localidades]
    return jsonify(resultado)
