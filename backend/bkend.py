from flask import Flask,render_template,request,Response
import json
import sqlite3
from flask_cors import CORS,cross_origin

app = Flask(__name__)
# response = Response(status=200,mimetype='application/json')
# response.headers['Access-Control-Allow-Origin']= 'http://127.0.0.1:3000/'
# response.headers['Access-Control-Allow-Credentials']= 'true'
# response.headers['Access-Control-Allow-Methods']= "GET,HEAD,OPTIONS,POST,PUT"
# response.headers['Access-Control-Allow-Headers']= "Access-Control-Allow-Headers,Access-Control-Allow-Origin"

app.config['SECRET_KEY'] = 'the quick brown fox jumps over the lazy   dog'
app.config['CORS_HEADERS'] = 'Content-Type'

cors = CORS(app, resources={r"/": {"origins": "http://localhost:3000"}})




conn = sqlite3.connect('dbName.db',check_same_thread=False)
print('Connection Established')
c = conn.cursor()

@app.route('/',methods=['GET'])
def createtable():
	c.execute("CREATE TABLE IF NOT EXISTS keyvaluetable(id INTEGER PRIMARY KEY AUTOINCREMENT, type varchar(64) NOT NULL,key varchar(255) NOT NULL, value varchar(255) NOT NULL, user_id varchar(64) NOT NULL, nb_id varchar(255))")
	c.execute("CREATE TABLE IF NOT EXISTS urltable(id INTEGER PRIMARY KEY AUTOINCREMENT, urlstring varchar(64) NOT NULL, user_id varchar(64) NOT NULL, nb_id varchar(255))")
	c.execute("CREATE TABLE IF NOT EXISTS inputoutputtable(id INTEGER PRIMARY KEY AUTOINCREMENT, xlabel varchar(255) NOT NULL, xvalue varchar(255) NOT NULL, ylabel varchar(255) NOT NULL, yvalue varchar(255) NOT NULL, user_id varchar(64) NOT NULL, nb_id varchar(255))")
	c.execute("CREATE TABLE IF NOT EXISTS notebooktable(id INTEGER PRIMARY KEY AUTOINCREMENT, nb_id varchar(255), notebookname varchar(255), graphtype varchar(255), ylabel varchar(255), user_id varchar(64) NOT NULL)")
	c.execute("CREATE TABLE IF NOT EXISTS userprofile(id INTEGER PRIMARY KEY AUTOINCREMENT, email varchar(64) NOT NULL, user_id varchar(64) NOT NULL, password varchar(64) NOT NULL, language varchar(16), access varchar(16))")
	return "table created successfully."


@app.route('/<user_id>/Notebook/<nb_id>',methods=['GET','POST'])
@cross_origin(origin='localhost',headers=['Content- Type','Authorization'])
def notebookrequest(user_id,nb_id):
	if request.method == 'POST':
		req = request.json
		print (req)
		try:
			key = req['key']
			value = req['value']
			_type = req['type']
			c.execute("INSERT INTO keyvaluetable(type,key,value,user_id,  nb_id) VALUES (?,?,?,?,?)",(_type, key,value, user_id, nb_id))
			conn.commit()
			msg = "Record inserted successfully"
			print(msg)
		except:
			conn.rollback()
			msg = "Error in inserting the record."
			print(msg)
		return {"key":"1"}
	elif request.method == 'GET':
		conn.row_factory = sqlite3.Row
		c.execute("select id, type, key, value, user_id ,nb_id from keyvaluetable where user_id = (?) ", user_id)
		data = c.fetchall()
		# print (tab)
		# jtab= json.dumps(tab)
		# print (jtab)
		# return jtab
		json_dict = {}
		result = []
		keys = ['id','type','key','value','user_id','nb_id']
		print(data[0][0])
		for i in range(len(data)):
			for j in range(len(data[i])):
				json_dict[keys[j]] = data[i][j]
			result.append(json_dict)
			json_dict = {}
		return json.dumps(result)


@app.route('/<user_id>/dashboard',methods=['GET'])
@cross_origin(origin='localhost',headers=['Content- Type','Authorization'])
def dashboard(user_id):
	c.execute('select DISTINCT it.id,notebookname,graphtype,it.ylabel,it.user_id,it.nb_id from ' +
			  'notebooktable nt INNER JOIN inputoutputtable it ON nt.id = it.nb_id where it.user_id = (?)', user_id)
	data = c.fetchall()
	json_dict = {}
	result = []
	keys = ['id','nbname','graphtype','ylabel','user_id','nb_id']
	print(data[0][0])
	for i in range(len(data)):
		for j in range(len(data[i])):
			json_dict[keys[j]] = data[i][j]
		result.append(json_dict)
		json_dict = {}
			
	return json.dumps(result)

@app.route('/<user_id>/notebooklist',methods=['GET'])
@cross_origin(origin='localhost',headers=['Content- Type','Authorization'])
def notebooklist(user_id):
	c.execute('select DISTINCT notebookname from ' +
			  'notebooktable nt INNER JOIN inputoutputtable it ON nt.id = it.nb_id where it.user_id = (?)', user_id)
	data = c.fetchall()
	json_dict = {}
	result = []
	keys = ['nbname']
	for i in range(len(data)):
		for j in range(len(data[i])):
			json_dict[keys[j]] = data[i][j]
		result.append(json_dict)
		json_dict = {}
			
	return json.dumps(result)

@app.route('/<user_id>/chartdata/<nb_id>', methods=['GET'])
@cross_origin(origin='localhost',headers=['Content- Type','Authorization'])
def chartdata(user_id, nb_id):
	query = 'select DISTINCT xlabel, xvalue, yvalue, user_id, nb_id from inputoutputtable where user_id = "' + user_id + '" AND nb_id = "' + nb_id + '"'
	print(query)
	c.execute(query)
	data = c.fetchall()
	json_dict = {}
	result = []
	value = []
	key = ['xlabel','xvalue', 'yvalue', 'user_id', 'nb_id']
	i = 0
	j = 0
	json_dict['id'] = 0
	while j < len(data[0]):
		while i < 2:
			value.append(data[i][j])
			i += 1
		json_dict[key[j]] = value
		value = []
		i = 0
		j += 1
	result.append(json_dict)
	return json.dumps(result)
	


@app.route('/<user_id>/<nb_id>/urltable',methods=['POST','GET'])
@cross_origin(origin='localhost',headers=['Content- Type','Authorization'])
def urltablepost(user_id,nb_id):
	if request.method == 'POST':
		req = request.json
		print (req)
		try:
			urlstring = req['urlstring']
			c.execute("INSERT INTO urltable(urlstring,user_id,nb_id) VALUES (?,?,?)",(urlstring, user_id, nb_id))
			conn.commit()
			msg = "Record inserted successfully"
			print(msg)
		except:
			conn.rollback()
			msg = "Error in inserting the record."
			print(msg)
		return {"key":"1"}
	elif request.method == 'GET':
		query = 'select urlstring from urltable where user_id = "' + user_id + '"'
		c.execute(query)
		data = c.fetchall()
		json_dict = {}
		result = []
		json_dict['urlstring'] = data[0][0]
		result.append(json_dict)
			
				
		return json.dumps(result)

if __name__ == "__main__":
    app.run()

