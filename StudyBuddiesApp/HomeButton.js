import React from 'react';
import { Button } from 'react-native-elements';
import { Auth } from 'aws-amplify';

export default class SignOutButton extends React.Component {
    onPressHandler = () => {
        this.props.navigation.navigate('Home');;
      }

    render() {
      var that = this;
      return (<Button title="Home" onPress={that.onPressHandler.bind(that)}/>);
    }
}