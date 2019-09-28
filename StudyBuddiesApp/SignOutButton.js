import React from 'react';
import { Button } from 'react-native-elements';
import { Auth } from 'aws-amplify';
import { StackActions, NavigationActions } from 'react-navigation';

export default class SignOutButton extends React.Component {
    constructor(props) {
        super(props);
    }

    handleSignOut = () => {
        Auth.signOut()
          .then(() => this.props.navigation.dispatch(StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'SignIn' })]
          })))
          .catch(err => console.log(err));
      }

    render() {
        return (<Button title="Sign Out" onPress={this.handleSignOut}/>);
    }
}