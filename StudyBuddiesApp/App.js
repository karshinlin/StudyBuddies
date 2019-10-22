import React from 'react';
import AppContainer from './AppNavigator';
import Amplify from 'aws-amplify';
import AWSAppSyncClient from 'aws-appsync'
import { Auth } from 'aws-amplify'
import aws_exports from './aws-exports';
Amplify.configure(aws_exports);

const client = new AWSAppSyncClient({
  url: aws_exports.aws_appsync_graphqlEndpoint,
  region: aws_exports.aws_appsync_region,
  auth: {
    type: aws_exports.aws_appsync_authenticationType,
    jwtToken: async () => (await Auth.currentSession()).idToken.jwtToken
  }
});

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    // TODO: UNCOMMENT TO DISABLE WARNINGS
    console.disableYellowBox = true;
    return (
      <AppContainer/>
    );
  }
}