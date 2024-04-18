import pandas as pd
from sqlalchemy import create_engine, inspect
from sqlalchemy.exc import IntegrityError

def import_data():
    csv_file = 'Listado.csv'
    encoding = 'utf-8'
    data = pd.read_csv(csv_file, sep=',', header=None, encoding=encoding)

    engine = create_engine('mysql://root@localhost/localidades?charset=utf8')

    try:
        for table in ['provincia', 'departamento', 'municipio', 'localidad']:
            inspector = inspect(engine)
            if not inspector.has_table(table):
                raise ValueError(f"La tabla '{table}' no existe en la base de datos.")

        # Insertar datos en la tabla 'provincia'
        data_provincia = data.iloc[:, [7]]
        data_provincia.columns = ['name']
        data_provincia.drop_duplicates().to_sql('provincia', con=engine, if_exists='append', index=False, chunksize=1000)

        # Insertar datos en la tabla 'departamento'
        provincia_query = "SELECT provincia_id, name FROM provincia"
        provincias_df = pd.read_sql_query(provincia_query, engine)
        provincias_df.columns = ['provincia_provincia_id', 'provincia_name']

        data_departamento = data.iloc[:, [6, 7]]
        data_departamento.columns = ['departamento_name', 'provincia_name']
        data_departamento = pd.merge(data_departamento, provincias_df, on='provincia_name', how='inner')
        data_departamento.drop(columns=['provincia_name'], inplace=True)
        data_departamento.columns = ['name', 'provincia_provincia_id']
        data_departamento = data_departamento.drop_duplicates()
        data_departamento.to_sql('departamento', con=engine, if_exists='append', index=False, chunksize=1000)

        # Insertar datos en la tabla 'municipio'
        departamento_query = "SELECT departamento_id, name FROM departamento"
        departamento_df = pd.read_sql_query(departamento_query, engine)
        departamento_df.columns = ['departamento_departamento_id', 'departamento_name']

        data_municipio = data.iloc[:, [5, 6]]
        data_municipio.columns = ['municipio_name', 'departamento_name']
        data_municipio = pd.merge(data_municipio, departamento_df, on='departamento_name', how='inner')
        data_municipio.drop(columns=['departamento_name'], inplace=True)
        data_municipio.columns = ['name', 'departamento_departamento_id']
        data_municipio = data_municipio.drop_duplicates()
        data_municipio.to_sql('municipio', con=engine, if_exists='append', index=False, chunksize=1000)

        # Insertar datos en la tabla 'localidad'
        municipio_query = "SELECT municipio_id, name FROM municipio"
        municipio_df = pd.read_sql_query(municipio_query, engine)
        municipio_df.columns = ['municipio_municipio_id', 'municipio_name']

        data_localidad = data.iloc[:, [0, 5]]
        data_localidad.columns = ['localidad_name', 'municipio_name']
        data_localidad = data_localidad.drop_duplicates()
        data_localidad = pd.merge(data_localidad, municipio_df, on='municipio_name', how='inner')
        data_localidad.drop(columns=['municipio_name'], inplace=True)
        data_localidad.columns = ['name', 'municipio_municipio_id']
        data_localidad = data_localidad.drop_duplicates()
        data_localidad.to_sql('localidad', con=engine, if_exists='append', index=False, chunksize=1000)

    except IntegrityError as e:
        if "Duplicate entry" in str(e.orig):
            raise ValueError("Se intentó insertar una provincia duplicada. La operación ha sido omitida.")
        else:
            raise ValueError(f"Error de integridad en la base de datos. Detalles: {e.orig}")
    except Exception as e:
        raise ValueError(f"Excepción: {e}")
    finally:
        engine.dispose()

    print("Los datos se han importado correctamente a la base de datos con las relaciones indicadas.")