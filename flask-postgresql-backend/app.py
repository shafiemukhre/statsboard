from flask import Flask, request, session
import psycopg2
from flask_cors import CORS

"""
this application is insecured
- cors allowed for all origins
- database and cursor open at all times
- Content-Type only specified on client-side request
"""

#declare app
app = Flask(__name__)

cors = CORS(app, resources={r"/api/*": {"origins": "*"}})
# cors = CORS(app)

#switch Environment and database
ENV = 'dev'

if ENV == 'dev':
    app.debug = True
    conn = psycopg2.connect(
        host = "localhost",
        database = "mypgdb",
        user = "postgres",
        password = "password"
    )
elif ENV == 'prod':
    app.debug = False
    conn = psycopg2.connect(
        host = "ec2-50-17-21-170.compute-1.amazonaws.com",
        database = "dkionq03l95rs",
        user = "hpnftwbmcwasqo",
        password = "c3dbbf145d1e02b63c9a85dc72a85378f5d336659a86c0956b2a5a910d50ea8a"
    )

cursor = conn.cursor()

#defines all api routes
@app.route('/')
def index():
    cursor.execute('SELECT id, name FROM employees')
    rows = cursor.fetchall()
    for r in rows:
        print(f"id {r[0]} name {r[1]}")
    return 'OK!'
    cursor.close()
    conn.close()

#manully create table by calling API
@app.route('/start')
def createTable():
    cursor.execute(
        'CREATE TABLE IF NOT EXISTS keyvaluetable(' +
            'id SERIAL NOT NULL,' + 
            'type VARCHAR(64) NOT NULL,' + 
            'key VARCHAR(255) NOT NULL,' + 
            'value VARCHAR(255) NOT NULL,' + 
            'user_id VARCHAR(64) NOT NULL,' + 
            'nb_id VARCHAR(64),'
            'PRIMARY KEY (id))')
    cursor.execute(
        'CREATE TABLE IF NOT EXISTS urltable(' +
            'id SERIAL NOT NULL,' +
            'urlstring VARCHAR(64) NOT NULL,' +
            'user_id VARCHAR(64) NOT NULL,' +
            'nb_id VARCHAR(255),'
            'PRIMARY KEY (id))')
    cursor.execute(
        'CREATE TABLE IF NOT EXISTS inputoutputtable(' +
            'id SERIAL NOT NULL,' + 
            'xlabel varchar(255) NOT NULL,' + 
            'xvalue varchar(255) NOT NULL,' + 
            'ylabel varchar(255) NOT NULL,' + 
            'yvalue varchar(255) NOT NULL,' + 
            'user_id varchar(64) NOT NULL,' + 
            'nb_id varchar(255),' +
            'PRIMARY KEY (id))')
    cursor.execute(
        'CREATE TABLE IF NOT EXISTS notebooktable(' +
            'id SERIAL NOT NULL,' + 
            'nb_id varchar(255),' + 
            'notebookname varchar(255),' + 
            'graphtype varchar(255),' + 
            'ylabel varchar(255),' + 
            'user_id varchar(64) NOT NULL,' +
            'PRIMARY KEY (id))')
    cursor.execute(
        'CREATE TABLE IF NOT EXISTS userprofile(' +
            'user_id SERIAL UNIQUE NOT NULL,' + 
            'username varchar(64) NOT NULL,' + 
            'email varchar(64) NOT NULL,' + 
            'password varchar(64) NOT NULL,' + 
            'language varchar(16),' + 
            'role varchar(16),'
            'PRIMARY KEY (user_id))')
    #commit changes
    conn.commit()
    #close communication with db server
    # cursor.close()
    #close connection
    # conn.close()
    return "table created successfully."

@app.route('/api/signup', methods=['POST'])
def signup():
    req = request.json
    name = req['un']
    email = req['em']
    pw = req['pw']
    lang = req['lg']
    role = req['rl']

    cursor.execute(
        'INSERT INTO userprofile(' + 
            'username, email, password, language, role)' +
            'VALUES (%s, %s, %s, %s, %s)', (name, email, pw, lang, role))
    conn.commit()
    # cursor.close()
    # conn.close()
    return "signup success"

@app.route('/api/signin', methods=['POST'])
def signin():
    req = request.json
    name = req['un']
    pw = req['pw']

    # must include "," to specify the query variable as tuple
    cursor.execute(
        'SELECT user_id, username, password, language, role FROM userprofile WHERE username=(%s) LIMIT 1', (name,))
    data = cursor.fetchall()
    # TODO: encrypt the password
    userData = data[0]
    if (data and userData[2] == pw):
        json_dict = {
            'username': userData[1],
            'language': userData[3],
            'role': userData[4]
        }
        print(json_dict)
        return json_dict
    else:
        return {'error': 'incorrect username and password'}
    # conn.commit() #read operation doesnt need commit
    # cursor.close()
    # conn.close()

#run app with gunicorn
if __name__ == '__main__':
    if ENV == 'dev':
        app.debug = True
        app.run(debug=True)
    elif ENV == 'prod':
        app.run(debug=False)
    