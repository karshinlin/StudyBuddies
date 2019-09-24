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

@app.route('/getGroup', methods=["GET"])
def get_group():
    user_id = request.args.get('userId', default = "", type = str)
    group = db.retrieve_group(user_id)
    response = {"getGroup": str(group)}
    return json.dumps(response)

# run the app.
if __name__ == "__main__":
    # Setting debug to True enables debug output. This line should be
    # removed before deploying a production app.
    app.debug = True
    app.run()