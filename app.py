from flask import Flask, render_template
from api.routes import *

app = Flask(__name__)

app.register_blueprint(api_routes)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root@localhost:3306/localidades?charset=utf8'
app.config["SQLALCHEMY_ECHO"] = True 
db.init_app(app)

app.static_folder = 'static'
app.static_url_path = '/static'

@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)