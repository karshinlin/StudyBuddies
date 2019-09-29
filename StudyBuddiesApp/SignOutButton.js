import React from 'react';
import { Button } from 'react-native-elements';
import { Auth } from 'aws-amplify';

export default class SignOutButton extends React.Component {
    handleSignOut = () => {
        Auth.signOut()
        console.log('LOGOUT');
        this.props.navigation.navigate('SignIn');;
      }

    render() {
      var that = this;
      return (<Button title="Sign Out" onPress={that.handleSignOut.bind(that)}/>);
    }
}