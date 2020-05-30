import psycopg2

#connect to the db
con = psycopg2.connect(
    host = "localhost",
    database = "mypgdb",
    user = "postgres",
    password = "password"
)

#cursor
cur = con.cursor()

# cur.execute("INSERT INTO employees (id, name) VALUES (%s, %s)", (2, "Shafie"))

#execute cursor
cur.execute("SELECT id, name FROM employees")

rows = cur.fetchall()
for r in rows:
    print(f"id {r[0]} name {r[1]}")

#commit the transaction
# con.commit()

#close the cursor
cur.close()

#close the connection
con.close()