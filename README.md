# StudyBuddies

Dependencies and node modules are not pushed to Git. 
- To install the required dependencies from package.json, run `npm install`
- When adding new dependencies, add them with `npm install ______ --save`

To run the iOS version of the application: 
- Run `react-native run-ios`

Backend Setup: 
- [One Time] Within StudyBuddies/Backend directory, create a virtualenv: 
	- Install virtualenv if you don't have it: `sudo pip3 install virtualenv`
	- Create a virtualenv in the Backend directory and name it "venv": `virtualenv venv`
	- Activate the virtualenv: `source venv/bin/activate`
- [Every time] Load all dependencies for the Flask server:
	- `source venv/bin/activate`
	- `pip install -r requirements.txt`

Deployment to AWS Elastic Beanstalk:
- [One Time] Install EB CLI tools from https://github.com/aws/aws-elastic-beanstalk-cli-setup
	- This is outside of the virtualenv so everyone will need to do this using their OS Python
- [One Time] Make sure you add the tool to the PATH variable with the following command depending on environment:
	1. Bash:
       echo 'export PATH="/Users/karshinlin/.ebcli-virtual-env/executables:$PATH"' >> ~/.bash_profile && source ~/.bash_profile
    2. Zsh:
       echo 'export PATH="/Users/karshinlin/.ebcli-virtual-env/executables:$PATH"' >> ~/.zshenv && source ~/.zshenv
	- Now you should be able to see options when running `eb`
- Using Elastic Beanstalk CLI, run `eb deploy` to deploy a new version of this application. Otherwise you can just run the Flask server locally with `python application.py` in your virtualenv in the /Backend directory
