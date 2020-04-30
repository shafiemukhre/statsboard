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
	c.execute("CREATE TABLE IF NOT EXISTS keyvaluetable(id INTEGER PRIMARY KEY AUTOINCREMENT, key varchar(255), value varchar(255))")
	c.execute("CREATE TABLE IF NOT EXISTS inputtable(id INTEGER PRIMARY KEY AUTOINCREMENT, xlabel varchar(255), xvalue varchar(255))")
	c.execute("CREATE TABLE IF NOT EXISTS outputtable(id INTEGER PRIMARY KEY AUTOINCREMENT, ylabel varchar(255), yvalue varchar(255))")
	c.execute("CREATE TABLE IF NOT EXISTS notebooktable(id INTEGER PRIMARY KEY AUTOINCREMENT, mltype varchar(255), graphtype varchar(255))")
	return "table created successfully."

@app.route('/Notebook',methods=['GET','POST'])
@cross_origin(origin='localhost',headers=['Content- Type','Authorization'])
def notebookrequest():
	if request.method == 'POST':
		req = request.json
		print (req)
		try:
			key = req['key']
			value = req['value']
			c.execute("INSERT INTO keyvaluetable(key,value) VALUES (?,?)",(key,value))
			conn.commit()
			msg = "Record inserted successfully"
			print(msg)
		except:
			conn.rollback()
			msg = "Error in inserting the record"
			print(msg)
	return {"key":"1"}
	

if __name__ == "__main__":
    app.run()

