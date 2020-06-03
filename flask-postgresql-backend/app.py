from flask import Flask
import psycopg2 #database connector for postgresql

#to use environment variables in .env
from dotenv import load_dotenv
load_dotenv()
import os 

#initialize flask app
app = Flask(__name__)

#switch database server
DB = 'prod'
if DB == 'dev':
    app.debug = True
    conn = psycopg2.connect(
        host = "localhost",
        database = "mypgdb",
        user = "postgres",
        password = "password"
    )
elif DB == 'prod':
    app.debug = False
    conn = psycopg2.connect(
        # host = "ec2-50-17-21-170.compute-1.amazonaws.com",
        # database = "dkionq03l95rs",
        # user = "hpnftwbmcwasqo",
        # password = "c3dbbf145d1e02b63c9a85dc72a85378f5d336659a86c0956b2a5a910d50ea8a"
        host = os.getenv("HEROKU_PGDB_HOST"),
        database = os.getenv("HEROKU_PGDB_DATABASE"),
        user = os.getenv("HEROKU_PGDB_USER"),
        password = os.getenv("HEROKU_PGDB_PASSWORD"),
    )
cursor = conn.cursor()

# run all api routes here, only after app initialized    
from api import *

#run app with gunicorn
if __name__ == '__main__':
    if DB == 'dev':
        app.run(debug=True)
    elif DB == 'prod':
        app.run(debug=False)
    