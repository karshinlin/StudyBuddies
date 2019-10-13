from flask import Flask, request, json
import db
import json

# print a nice greeting.
def say_hello(username = "World"):
    return '<p>Hello %s!</p>\n' % username

# some bits of text for the page.
header_text = '''
    <html>\n<head> <title>EB Flask Test</title> </head>\n<body>'''
instructions = '''
    <p><em>Hint</em>: This is a RESTful web service! Append a username
    to the URL (for example: <code>/Thelonious</code>) to say hello to
    someone specific.</p>\n'''
home_link = '<p><a href="/">Back</a></p>\n'
footer_text = '</body>\n</html>'

# EB looks for an 'application' callable by default.
app = Flask(__name__)

# get's configuration stuff
app.config.from_pyfile('instance/config.py')

db = db.DB(app)

# add a rule for the index page.
app.add_url_rule('/', 'index', (lambda: header_text +
    say_hello() + instructions + footer_text))

@app.route('/get_all_exams', methods=["GET"])
def get_all_exams():
    return db.retrieve_all_exams()['exam'].to_json()

@app.route('/surveyStatus', methods=["GET"])
def survey_status():
    user_id = request.args.get('userId', default = "", type = str)
    is_filled = db.is_survey_filled(user_id)
    is_filled =  is_filled['userID'].count() > 0
    response = {"surveyStatus": str(is_filled)}
    return json.dumps(response)

@app.route('/fillSurvey', methods=["POST"])
def fill_survey():
    survey = {
        "userId": request.args.get('userId', default = "", type = str),
        "exam": request.args.get('exam', default = "", type = str),
        "month": request.args.get('month', default = "", type = str),
        "year": request.args.get('year', default = "", type = str)
    }
    db.insert_survey_results(survey)
    return "", 204

@app.route('/getGroup', methods=["GET"])
def get_group():
    user_id = request.args.get('userId', default = "", type = str)
    group_id = db.retrieve_group(user_id)
    if len(group_id['groupID']) > 0:
        group_id = group_id['groupID'][0]
        if group_id is None:
            group_id = tryToAddToGroup(user_id)
        if group_id is not None:
            group_id = str(group_id)

        response = {"groupId": group_id}
        return json.dumps(response)
    else: 
        return json.dumps({"error": "user not found"}), 400
    
def tryToAddToGroup(user_id):
    # try to add to existing group
    groups = db.retrieve_potential_groups_for_unmatched_user(user_id)
    if len(groups["groupID"]) > 0:
        group_to_add_to = int(groups["groupID"][0])
        db.put_user_in_group(user_id, group_to_add_to)
        return group_to_add_to
    
    # try to create new group
    users = db.retrieve_all_potential_matches_for_user(user_id)
    if len(users['userID']) >= 2:
        created_group = db.create_group(user_id)
        for user_id in users['userID']:
            db.put_user_in_group(user_id, created_group)
        return created_group
    
    # cannot match
    return None
    group = db.retrieve_group(user_id)['groupID'][0]
    response = {"getGroup": str(group)}
    return json.dumps(response)

@app.route('/setQuestion', methods=["POST"])
def set_question():
    question_id = request.json['questionId']
    asked_by = request.json['askedBy']
    question_text = request.json['questionText']
    print (db.set_question(question_id,asked_by,question_text))
    response = {"success": 0, "questionId": question_id}
    return json.dumps(response)
     
@app.route('/unansweredQuestions', methods=["GET"])
def get_unanswered_questions(): 
    user_id = request.args.get('userId', default = "", type = str)
    questions = db.get_unanswered_questions(user_id)
    print(questions)
    response = []
    for i in range(0, len(questions["questionID"])):
        a_question = dict()
        a_question["questionId"] = int(questions["questionID"][i])
        a_question["askedBy"] = questions["askedBy"][i]
        a_question["questionText"] = questions["questionText"][i]
        a_question["askDate"] = str(questions["askDate"][i])
        response.append(a_question)
    
    response = {"questions": response, "success": 0, "userId": user_id}
    return json.dumps(response)

@app.route('/answerQuestion', methods=["POST"])
def answer_question():
    user_id = request.json['userId']
    question_id = request.json['questionId']
    answer_text = request.json['answerText']
    print (db.answer_question(user_id, question_id, answer_text))
    response = {"success": 0, "userId": user_id}
    return json.dumps(response)

@app.route('/getPoints', methods=["GET"])
def get_points():
    user_id = request.args.get('userId', default = "", type = str)
    points = db.retrieve_points(user_id)
    if len(points['points']) == 1:
        points = points['points'][0]
        response = {"points": str(points)}
        return json.dumps(response)
    else: 
        return json.dumps({"error": "user not found"}), 400

# run the app.
if __name__ == "__main__":
    # Setting debug to True enables debug output. This line should be
    # removed before deploying a production app.
    app.debug = True
    app.run()