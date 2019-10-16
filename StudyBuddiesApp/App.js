import React from 'react';
import AppContainer from './AppNavigator';
import Amplify from 'aws-amplify';
import aws_exports from './aws-exports';
Amplify.configure(aws_exports);

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