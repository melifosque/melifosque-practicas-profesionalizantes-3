from flask import Blueprint, jsonify, render_template, request
from app_factory import db

api_routes = Blueprint('api', __name__)

@api_routes.route('/api/provincias')
def obtener_provincias():
    from api.models import db, Provincia  # evita el ciclo de importación circular
    provincias = Provincia.query.all()
    resultado = [{'provincia_id': provincia.provincia_id, 'name': provincia.name}
                 for provincia in provincias]
    return jsonify(resultado)

@api_routes.route('/api/departamentos')
def obtener_departamentos_por_provincia():
    from api.models import db, Departamento 
    provincia_id = request.args.get('provincia_id')
    departamentos = Departamento.query.filter_by(provincia_provincia_id=provincia_id).all()
    resultado = [{'departamento_id': departamento.departamento_id, 'name': departamento.name}
                 for departamento in departamentos]
    return jsonify(resultado)

@api_routes.route('/api/municipios')
def obtener_municipios_por_departamento():
    from api.models import db, Municipio
    departamento_id = request.args.get('departamento_id')
    municipios = Municipio.query.filter_by(departamento_departamento_id=departamento_id).all()
    resultado = [{'municipio_id': municipio.municipio_id, 'name': municipio.name}
                  for municipio in municipios]
    return jsonify(resultado)

@api_routes.route('/api/localidades')
def obtener_localidades():
    from api.models import db, Localidad
    
    municipio_id = request.args.get('municipio_id')
    localidades = Localidad.query.filter_by(municipio_municipio_id=municipio_id).all()
    resultado = [{'localidad_id': localidad.localidad_id, 'name': localidad.name}
                  for localidad in localidades]
    return jsonify(resultado)

@api_routes.route('/')
def index():
    return render_template('index.html')