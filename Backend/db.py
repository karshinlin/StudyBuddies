import pandas as pd
import pymysql as db

class DB:
    def __init__(self, app):
        self.host = app.config['DB_HOST']
        self.port = app.config['DB_PORT']
        self.name = app.config['DB_NAME']
        self.user = app.config['DB_USER']
        self.password = app.config['DB_PASS']

    def retrieve(self, sql):
        conn = db.connect(self.host, user=self.user, port=self.port, passwd=self.password, db=self.name)
        results_df = pd.read_sql(sql, con=conn)
        conn.close()
        return results_df

    def retrieve_all_exams(self):
        return self.retrieve('select * from Exams;')