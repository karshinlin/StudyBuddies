import pandas as pd
import pymysql as db
import pymysql.cursors
from datetime import datetime

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

    def call_proc(self, proc_name, args=None):
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

    def write(self, sql):
        conn = self.db_conn()
        try:
            with conn.cursor() as cursor:
                cursor.execute(sql)
                id = cursor.lastrowid
            conn.commit()
        finally:
            conn.close()

        return id

    def retrieve_all_exams(self):
        return self.retrieve('select * from Exams;')

    def is_survey_filled(self, user_id):
        return self.retrieve("select * from User where userID = '{}';".format(user_id))

    def insert_survey_results(self, results):
        userId = results['userId']
        exam = results['exam']
        month = results['month']
        year = results['year']
        query = "INSERT INTO User(userID, exam, examMonth, examYear) VALUES ('{}','{}','{}','{}');".format(userId, exam, month, year)
        print(query)
        return self.write(query)

    def retrieve_group(self, user_id):
        return self.retrieve("select groupID from User where userID = '{}';".format(user_id))

    def get_unanswered_questions(self, user_id):
        return self.retrieve('''
            select * from 
                (select * from Question where askedBy in 
                    (select userId from User where groupId in 
                        (select groupId from User where userId = '{}'))
                ) as questions where questionId 
            not in 
            (select distinct questionId from Answer);
            '''
                             .format(user_id))

    def answer_question(self, user_id, question_id, answer_text):
        now = datetime.now()
        dt_string = now.strftime("%Y/%m/%d %H:%M:%S")
        print (dt_string)
        return self.write("INSERT INTO Answer (answerText, questionID, answeredBy, answerDateTime) VALUES ('{}',{},'{}','{}')"
            .format(answer_text, question_id, user_id, dt_string))

    def put_user_in_group(self, user_id, group_id):
        return self.write("UPDATE User SET groupID = '{}' where userID = '{}';".format(group_id, user_id))

    def retrieve_all_potential_matches_for_user(self, user_id):
        df = self.retrieve(
            '''
            SELECT u2.userID 
            FROM User u1, User u2 
            WHERE u1.userID = '{}' and u2.exam = u1.exam
            '''
                .format(user_id))
        print(df)
        return df

    def create_group(self, user_id):
        user = self.retrieve("SELECT exam FROM User WHERE userID = '{}';".format(user_id))
        exam = user['exam'][0]
        group_id = self.write("INSERT INTO StudyGroup(exam) VALUES ('{}');".format(exam))
        return group_id

    def retrieve_potential_groups_for_unmatched_user(self, user_id):
        return self.retrieve(
            '''
                SELECT gcv.groupID 
                FROM GroupCountView gcv, User u 
                WHERE u.userId = '{}' 
                    and gcv.exam = u.exam 
                    and groupCount < {}
            '''
            .format(user_id, self.MAX_GROUP_SIZE)
        )
