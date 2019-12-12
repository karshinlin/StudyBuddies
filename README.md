# StudyBuddies
 
## Architecture
- The React Native frontend talks to the Backend as well as AWS Services (these can be found )
	- Login and registration is done directly through AWS Cognito (region us-east 1)
	- Chatting is done directly through AWS AppSync (region us-east 1)
- The Backend manages all CRUD database operations as well as talking to AWS
	- Environment deployed on AWS Elastic Beanstalk (region us-east 2)
	- Database is hosted Amazon RDS (region us-east 2)
	- Talks to AWS AppSync to create new conversations (upon new group creation)
- The React frontend admin portal allows basic StudyBuddies CRUD db operations
	- Talks directly to the Backend 

## Installation Guide 
*The codebase is organized into 3 directories: Backend, StudyBuddiesApp, and ManagementPortal*
- The Backend/ directory contains all Python code for the Flask server and database connection. This can be deployed locally or to AWS
- The StudyBuddiesApp/ directory contains the React Native app. This talks to the backend and AWS directly
- The ManagementPortal/ directory contains the code for the portal allowing administrators to manage study groups and see content 

### Pre-requisites
- Must have Python 2.7 installed on the computer to run the backend
- Must have react-native tools installed (installation instructions for expo are described here)

### Dependencies
- All dependencies are managed and do not need to be manually tracked. They are described as follows: 
  - Dependencies for the Backend are managed by a Python2.7 virtualenv
    - All dependencies are tracked in the requirements.txt file (see the file for a complete list). Any addition/removal of a dependency must be changed in this file. 
  - Dependencies for the StudyBuddiesApp is managed through npm and is seen in the package.json file (see the file for a complete list)
    - Any addition/removal of a dependency must be through `npm install new-dependency --save` or `npm uninstall old-dependency --save`

### Installing Code:
- `git clone https://github.com/karshinlin/StudyBuddies.git` to clone the repo
- `git checkout dev` to work on the dev branch
- Create a new directory called instance/ within the Backend/ directory. Place the config.py file (not stored on Git) inside this directory so that Backend/instance/config.py exists. 
- `npm install` to install all the dependencies that the branch has that you don't have locally
- `npm audit fix` to fix all the vulnerabilities (if it tells you to)
- `npm install -g @aws-amplify/cli` to install the amplify CLI (https://aws-amplify.github.io/docs/)
- Get a high level overview of what amplify does for you (https://aws-amplify.github.io/). It basically connects our javascript code in the mobile app to AWS.
- `amplify configure` to configure amplify on your machine
	- Follow the guided setup
		- Login with the studybuddies@gbes.com account when needed (creds: https://docs.google.com/document/d/13ZkJTIyT691eqgtspVc9zZuUpPt2k8JRnEBu61GQCzA/edit?usp=sharing)
		- Eventually, you'll need to make an IAM user to connect your terminal to amplify. A browser will pop up for this...just follow all the defaults.
			- After all the steps, you'll see a table with the user you just created. Your terminal will ask you for the access key and secret access key from that table.
			- Name this user `amplify` when prompted (it shoes `default` by default)
- `amplify init` to boot up the amplify configurations from the `/amplify` folder
	- use an existing environment when prompted (it's name is `dev`)
- Run the React Native part (full instructions: https://facebook.github.io/react-native/docs/getting-started):
	- `npm install -g yarn`
	- `npm install -g expo-cli` (not sure if this is needed but that's what we did)
	- `yarn add expo`
	- close out of all terminals and emulators relating to this app
	- open up a terminal again and navigate to the app folder (`/StuddyBuddiesApp`)
	- `yarn run ios` 

Backend Setup: 
- [One Time] Within StudyBuddies/Backend directory, create a virtualenv: 
	- Install virtualenv if you don't have it: `sudo pip3 install virtualenv`
	- Create a virtualenv in the Backend directory and name it "venv": `virtualenv -p python2.7 venv`
	- NOTE: We use python2.7 to be compatible with AWS. You need python2.7 installed in your machine to create a virtual environment from it. 
	- Activate the virtualenv: `source venv/bin/activate`
- [Every time] Load all dependencies for the Flask server:
	- `source venv/bin/activate`
	- `pip install -r requirements.txt`

Access MySQL Database: 
- Install MySQL Workbench (this should download MySQL)
- Create a new connection to AWS RDS (credentials are in config.py)

Deployment to AWS Elastic Beanstalk:
- [One Time] Install EB CLI tools from https://github.com/aws/aws-elastic-beanstalk-cli-setup
	- This is outside of the virtualenv so everyone will need to do this using their OS Python
- [One Time] Make sure you add the tool to the PATH variable with the following command depending on environment:
	1. Bash:
       echo 'export PATH="/Users/karshinlin/.ebcli-virtual-env/executables:$PATH"' >> ~/.bash_profile && source ~/.bash_profile
    2. Zsh:
       echo 'export PATH="/Users/karshinlin/.ebcli-virtual-env/executables:$PATH"' >> ~/.zshenv && source ~/.zshenv
	- Now you should be able to see options when running `eb status`
	- You may need to initialize your eb environment with `eb init -p python-2.7`
- Using Elastic Beanstalk CLI, run `eb deploy` to deploy a new version of this application. Otherwise you can just run the Flask server locally with `python application.py` in your virtualenv in the /Backend directory

### Run Instructions
- From the StudyBuddiesApp/ directory, you should run `yarn run ios` from terminal
  - In the global.js file, there are two urls, one is for the localhost backend (which must be running)
    - To run the localhost backend, run `python application.py` after you have activated your virtualenv
	- If you are using the AWS EB endpoint, the updated code must be deployed to AWS (`eb deploy`)
- From the admin/ directory, you should run `npm start` after `npm install` to run the admin portal
	- You must have the backend running (check global.js to see which endpoint you are trying to access - local versus beanstalk)
## Troubleshooting
- If there is an error loading modules, make sure you have installed all required dependencies
  - For the backend, this means running `pip install -r requirements.txt` 
  - For the StudyBuddiesApp, this means running `npm install`
- If the expo localhost connection is acting up, close all terminals and rerun `yarn run ios`. Sometimes, expo has trouble starting up and needs a manual quit. 
