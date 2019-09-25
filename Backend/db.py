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
        self.MAX_GROUP_SIZE = 5

    def db_conn(self):
        return db.connect(self.host, user=self.user, port=self.port, passwd=self.password, db=self.name)

    def retrieve(self, sql):
        conn = self.db_conn()
        results_df = pd.read_sql(sql, con=conn)
        conn.close()
        return results_df

    def call_proc(self, proc_name, args = None):
        conn = self.db_conn()
        try:
            with conn.cursor() as cursor:
                if args is None:
                    results_df = cursor.callproc(proc_name)
                else:
                    results_df = cursor.callproc(proc_name, args)
            conn.commit()
        finally:
            conn.close()

        return results_df

    def insert(self, sql):
        conn = self.db_conn()
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

    def retrieve_group(self, user_id):
        return self.retrieve("select groupID from User where userID = '{}';".format(user_id))

    def retrieve_potential_groups_for_unmatched_user(self, user_id):
        return self.call_proc('getAvailableGroupsForUser', ['user_id', self.MAX_GROUP_SIZE])
