import mysql.connector
pwd = None
with open("includes\database_pwd.txt") as f:
    pwd = f.read().strip()
db = mysql.connector.connect(
    host="sql6.freemysqlhosting.net",
    user='sql6634220',
    passwd=pwd,
    database="sql6634220",
    connect_timeout=30
)

#Using Flask MySQLDB to form a connection to DB, works and tested with version 3.7+.
#'pip install flas-mysqldb', for connection to work.

from Flas import Flask
from flask_mysqldb import MySQL

#needed
app = Flask(__name__)
app.config["MSQL_USER"] = "user"
app.config["MSQL_PASSWORD"] = "password"
app.config["MSQL_DB"] = "database"

mysql = MySQL(app)

@app.route("/")
def user():
    cur = mysql.connection.cursor()
    cur.execute("""SELECT user, host FROM mysql.user""")
    rv = cur.fetchhall()
    return str(rv)

if __name__ == '__main__':
    app.run(debug=True)
