import pandas as pd
import pymysql as db
import pymysql.cursors

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

    def insert(self, sql):
        conn = db.connect(self.host, user=self.user, port=self.port, passwd=self.password, db=self.name)
        try:
            with conn.cursor() as cursor:
                cursor.execute(sql)
            conn.commit()
        finally:
            conn.close()

    def retrieve_all_exams(self):
        return self.retrieve('select * from Exams;')

    def is_survey_filled(self, user_id):
        return self.retrieve("select * from User where userID = '{}';".format(user_id))

def insert_survey_results(self, results):
        userId = results['userId']
        exam = results['exam']
        month = results['examMonth']
        year = results['examYear']

        return self.insert("INSERT INTO User VALUES ('{}','{}','{}','{}');".format(userId, exam, month, year))