# StudyBuddies

Setup:
- `git clone https://github.com/karshinlin/StudyBuddies.git` to clone the repo
- `git checkout dev` to work on the dev branch
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
- `npm install -g yarn`
- `npm install -g expo-cli` (not sure if this is needed but that's what we did)
- `yarn add expo`
- close out of all terminals and emulators relating to this app
- open up a terminal again and navigate to the app folder (`/StuddyBuddiesApp`)
- `yarn run ios` 


Dependencies and node modules are not pushed to Git. 
- To install the required dependencies from package.json, run `npm install`
- When adding new dependencies, add them with `npm install ______ --save`

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
	- You may need to initialize your eb environment with `eb init`
- Using Elastic Beanstalk CLI, run `eb deploy` to deploy a new version of this application. Otherwise you can just run the Flask server locally with `python application.py` in your virtualenv in the /Backend directory
