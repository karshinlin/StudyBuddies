import React from 'react';
import { Button } from 'react-native-elements';
import { Auth } from 'aws-amplify';

export default class SignOutButton extends React.Component {
    constructor(props) {
        super(props);
    }

    handleSignOut = () => {
        Auth.signOut()
          .then(() => this.props.navigation.navigate('SignIn'))
          .catch(err => console.log(err));
      }

    render() {
        return (<Button title="Sign Out" onPress={this.handleSignOut}/>);
    }
}