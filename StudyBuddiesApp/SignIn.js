import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { Auth } from 'aws-amplify';

// CREDIT TO https://alligator.io/react/react-native-authentication/

export default class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      modalVisible: false,
      showInvalidLogin: false
    };
  }

  handleSignIn = () => {
    const { email, password } = this.state;
    if (email && password) {
        Auth.signIn(email, password)
        // If we are successful, navigate to Home screen
        .then(user => {
            this.setState({
                password: '',
                showInvalidLogin: false});
            this.props.navigation.navigate('Survey');
        })
        // On failure, display error in console
        .catch(err => {
            console.log(err);
            this.setState({
                password: '',  
                showInvalidLogin: true});
        });
    } else {
        this.setState({showInvalidLogin: true});
    }
  }

  render() {
    return (
    <View style={styles.container}>
        <View>
          <Input
            label="Email"
            leftIcon={{ type: 'font-awesome', name: 'envelope' }}
            value={this.state.email}
            onChangeText={
              // Set this.state.email to the value in this Input box
              (value) => this.setState({ email: value.toLowerCase() })
            }
            placeholder="my@email.com"
          />
          <Input
            label="Password"
            value={this.state.password}
            leftIcon={{ type: 'font-awesome', name: 'lock' }}
            onChangeText={
              // Set this.state.email to the value in this Input box
              (value) => this.setState({ password: value })
            }
            placeholder="password"
            secureTextEntry
          />
          <Button
            title='Sign In'
            onPress={ this.handleSignIn }
          />
          </View>
          {this.state.showInvalidLogin ? <Text> Incorrect username or password. </Text>: null}  
        <Button 
            title="Sign Up" 
            onPress={() => this.props.navigation.navigate('SignUp')} />
      </View>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center'
      },
});