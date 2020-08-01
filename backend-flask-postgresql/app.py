from flask import Flask
import psycopg2 #database connector for postgresql
import os #to use environment variables in .env and .flaskenv

#initialize flask app
app = Flask(__name__)

#switch database server
DB = 'dev'
if DB == 'dev':
    app.debug = True
    conn = psycopg2.connect(
        host = "localhost",
        database = "statsboarddb",
        user = "postgres",
        password = "password"
    )
elif DB == 'prod':
    app.debug = False
    conn = psycopg2.connect(
        host = os.getenv('HEROKU_PGDB_HOST'),
        database = os.getenv('HEROKU_PGDB_DATABASE'),
        user = os.getenv('HEROKU_PGDB_USER'),
        password = os.getenv('HEROKU_PGDB_PASSWORD'),
    )
cursor = conn.cursor()

# run all api routes here, only after app initialized    
# from api import *

from flask import request # to read payload body in POST request
import json # to read payload body in POST request in json format
from flask_cors import CORS #to allow CORS

"""
TODO:
this application is insecured
- cors allowed for all origins
- database connection and cursor open at all times
- Content-Type only specified on client-side request
"""

cors = CORS(app, resources={r"/api/*": {"origins": "*"}})
# cors = CORS(app)

#defines all api routes
@app.route('/api')
def index():
    """
    To quickly test server is working
    """
    cursor.execute('SELECT id, name FROM employees')
    rows = cursor.fetchall()
    for r in rows:
        print(f"id {r[0]} name {r[1]}")
    return 'OK!'
    cursor.close()
    conn.close()

@app.route('/api/start')
def createTable():
    """
    To manually create table by calling the API
    """
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
            'username varchar(64) UNIQUE NOT NULL,' + 
            'email varchar(64) UNIQUE NOT NULL,' + 
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
    """
    To insert users data into database for signup registration
    """
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
    """
    To check if username is available in the database
    -> if yes, check if the password is correct
    -> if yes, return username, language, role to be used as cookie session
    """
    req = request.json
    name = req['un']
    pw = req['pw']

    # must include "," to specify the query variable as tuple
    cursor.execute(
        'SELECT user_id, username, password, language, role FROM userprofile ' + 
        'WHERE username=(%s) LIMIT 1', (name,))
    data = cursor.fetchall()
    # TODO: encrypt the password
    userData = data[0]
    if (data and userData[2] == pw):
        json_dict = {
            'username': userData[1],
            'language': userData[3],
            'role': userData[4]
        }
        return json_dict
    else:
        return {'error': 'incorrect username and password'}
    # conn.commit() #read operation doesnt need commit
    # cursor.close()
    # conn.close()


@app.route('/api/users', methods=['GET'])
def users():
    """
    To return all users' name, email and role
    """
    cursor.execute(
        'SELECT username, email, role FROM userprofile'
    )
    data = cursor.fetchall()
    result = []
    for i in range(len(data)):
        json_item = {
            'username': data[i][0],
            'email': data[i][1],
            'role': data[i][2],
        }
        result.append(json_item)
    json_dict = {
        'users': result,
    }
    return json_dict

# @app.route('/api/<username>/profile', methods=['GET'])
# def profile():
#     """
#     To return a details for one user
#     """
#     cursor.execute(
#         'SELECT '
#     )

#run app with gunicorn
if __name__ == '__main__':
    if DB == 'dev':
        app.run(debug=True)
    elif DB == 'prod':
        app.run(debug=False)
    