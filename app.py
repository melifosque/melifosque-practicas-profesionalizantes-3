from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

# Configurar la base de datos
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root@localhost:3306/localidades?charset=utf8'

# Crear una instancia de SQLAlchemy asociada con la aplicación Flask
db = SQLAlchemy(app)

# Importar y registrar las rutas de la API
from api.routes import api_routes
app.register_blueprint(api_routes)

if __name__ == '__main__':
    app.run(debug=True)