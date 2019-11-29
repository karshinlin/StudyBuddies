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
        name = results['name']
        exam = results['exam']
        month = results['month']
        year = results['year']
        query = '''
            INSERT INTO User(userID, name, exam, examMonth, examYear) 
            VALUES ('{}','{}','{}','{}','{}');
            '''.format(userId, name, exam, month, year)
        print(query)
        return self.write(query)

    def retrieve_group(self, user_id):
        return self.retrieve("select groupID from User where userID = '{}';".format(user_id))

    def retrieve_convo_id(self, group_id):
        return self.retrieve("select conversationID from StudyGroup where groupID = '{}';".format(group_id))

    def retrieve_convo_id_for_user(self, user_id):
        return self.retrieve("SELECT conversationID FROM StudyGroup WHERE groupID IN (SELECT groupID FROM User WHERE userID = '{}');".format(user_id))

    def set_question(self, asked_by, question_text):
        now = datetime.now()
        dt_string = now.strftime("%Y/%m/%d %H:%M:%S")
        self.add_n_points(asked_by, 3)
        return self.write("insert into Question (askedBy, questionText, askDate) values('{}', '{}', '{}')"
            .format(asked_by, question_text, dt_string))
           
    def get_unanswered_questions(self, user_id):
        return self.retrieve('''
            select * from 
                (select * from Question where askedBy in 
                    (select userId from User where groupId in 
                        (select groupId from User where userId = '{}'))
                ) as questions where questionId not in 
            (select distinct questionId from Answer where answeredBy = '{}') order by askDate desc;
            '''
                             .format(user_id))

    def get_answered_questions(self, user_id):
        return self.retrieve("call get_questions_for_my_group('{}')".format(user_id))

    def answer_question(self, user_id, question_id, answer_text):
        now = datetime.now()
        dt_string = now.strftime("%Y/%m/%d %H:%M:%S")
        print (dt_string)
        self.add_n_points(user_id, 5)
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

    def create_group(self, user_id, conversation_id):
        user = self.retrieve("SELECT exam FROM User WHERE userID = '{}';".format(user_id))
        exam = user['exam'][0]
        group_id = self.write("INSERT INTO StudyGroup(exam, conversationID) VALUES ('{}','{}');".format(exam, conversation_id))
        return group_id

    def update_conversation_id(self, group_id, conversation_id):
        group_id = self.write("UPDATE StudyGroup SET conversationID = '{}' WHERE groupID = '{}'".format(conversation_id, group_id))
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
    
    def retrieve_points(self, user_id):
        return self.retrieve(
            ''' SELECT points 
                FROM User 
                WHERE userID = '{}';
            '''.format(user_id))

    def add_n_points(self, user_id, n):
        return self.write(
            '''
                UPDATE User
                SET points = points + {}
                WHERE userId = '{}'
            '''.format(n, user_id)
        )
    
    def retrieve_leaderboard(self, user_id):
        return self.retrieve(
            ''' SELECT name, points 
                FROM User 
                WHERE groupId in (
                    SELECT groupId
                    FROM User
                    WHERE userId = '{}'
                )
                ORDER BY points DESC;
            '''.format(user_id))

    def mark_challenge_history(self, user_id, question_id, is_correct):
        if is_correct:
            self.add_n_points(user_id, 1)
        return self.write(
            '''
                INSERT INTO ChallengeHistory(userId, questionId, isCorrect, timestamp)
                VALUES ('{}',{},{}, NOW());
            '''.format(user_id, question_id, is_correct)
        )
        
    def get_challenge_questions(self, user_id):
        return self.retrieve(
            '''  
                SELECT *
                FROM ChallegeHistoryUserCountView
                WHERE userId = '{}'      
            ''' .format(user_id)
        )

    def get_group_members(self, user_id):
        return self.retrieve(
            '''
                SELECT userID, name FROM User where groupID in 
	                ( SELECT groupID FROM User where userID = '{}');
            '''.format(user_id)
        )

    def get_group_info(self, user_id):
        return self.retrieve(
            '''
                SELECT groupName, groupID FROM StudyGroup where groupID in 
	                ( SELECT groupID FROM User where userID = '{}');
            '''.format(user_id)
        )

    def change_group_name(self, user_id, new_group_name):
        return self.write(
            '''
                UPDATE StudyGroup SET groupName = '{}' where groupID in 
	                ( SELECT groupID FROM User where userID = '{}');
            '''.format(new_group_name, user_id)
        )

    def retrieve_group_data(self):
        return self.retrieve("SELECT * FROM GroupCountView;")

    def ungroup_user(self, user_id):
        self.write('call ungroup_user({})'.format(user_id))

    def get_users_in_group(self, group_id):
        return self.retrieve("SELECT * FROM User WHERE groupID = {}".format(group_id))