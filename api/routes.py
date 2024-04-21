from flask import Blueprint,jsonify
from api.models import *

api_routes = Blueprint('api', __name__)

# Rutas de la API
@api_routes.route('/api/provincias')
def obtener_provincias():
    provincias = Provincia.query.all()
    resultado = [{'provincia_id': provincia.provincia_id, 'name': provincia.name}
                 for provincia in provincias]
    return jsonify(resultado)

@api_routes.route('/api/departamentos')
def obtener_departamentos():
    departamentos = Departamento.query.all()
    resultado = [{'departamento_id': departamento.departamento_id, 'name': departamento.name,
                  'provincia_provincia_id': departamento.provincia_provincia_id}
                  for departamento in departamentos]
    return jsonify(resultado)

@api_routes.route('/api/municipios')
def obtener_municipios():
    municipios = Municipio.query.all()
    resultado = [{'municipio_id': municipio.municipio_id, 'name': municipio.name,
                  'departamento_departamento_id': municipio.departamento_departamento_id}
                  for municipio in municipios]
    return jsonify(resultado)

@api_routes.route('/api/localidades')
def obtener_localidades():
    localidades = Localidad.query.all()
    resultado = [{'localidad_id': localidad.localidad_id, 'name': localidad.name,
                  'municipio_municipio_id': localidad.municipio_municipio_id}
                  for localidad in localidades]
    return jsonify(resultado)

@api_routes.route('/')
def index():
    return render_template('index.html')