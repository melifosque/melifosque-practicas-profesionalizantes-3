from app_factory import db

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
