import React from 'react';
import { StyleSheet, Text, View, Modal } from 'react-native';
import { Input, Button, ButtonGroup } from 'react-native-elements';
import { Auth } from 'aws-amplify';

// CREDIT TO https://alligator.io/react/react-native-authentication/

export default class Authentication extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      confirmationCode: '',
      modalVisible: false,
      selectedIndex: 0,
      showInvalidLogin: false
    };
    this.buttons = ['Sign Up', 'Sign In'];
  }

  updateIndex = () => {
    // If selectedIndex was 0, make it 1.  If it was 1, make it 0
    const newIndex = this.state.selectedIndex === 0 ? 1 : 0
    this.setState({ selectedIndex: newIndex })
  }

  handleSignIn = () => {
    const { email, password } = this.state;
    Auth.signIn(email, password)
      // If we are successful, navigate to Home screen
      .then(user => {
        this.setState({
            password: '',
            showInvalidLogin: false});
          this.props.navigation.navigate('Home');
      })
      // On failure, display error in console
      .catch(err => {
          console.log(err);
          this.setState({
            password: '',  
            showInvalidLogin: true});
      });
  }

    handleSignUp = () => {
        // alert(JSON.stringify(this.state));
        const { email, password, confirmPassword } = this.state;
        // Make sure passwords match
        if (password === confirmPassword) {
        Auth.signUp({
            username: email,
            password,
            attributes: { email },
            })
            // On success, show Confirmation Code Modal
            .then(() => this.setState({ modalVisible: true }))
            // On failure, display error in console
            .catch(err => console.log(err));
        } else {
        alert('Passwords do not match.');
        }
    }

    handleConfirmationCode = () => {
        const { email, confirmationCode } = this.state;
        Auth.confirmSignUp(email, confirmationCode, {})
          .then(() => {
            this.setState({ modalVisible: false });
            this.props.navigation.navigate('Home')
          })
          .catch(err => console.log(err));
      }
  

  render() {
    return (<View style={styles.container}>
        <ButtonGroup
  onPress={this.updateIndex}
  selectedIndex={this.state.selectedIndex}
  buttons={ this.buttons }
/>
{ this.state.selectedIndex === 0 ? (
  <View>
    <Input
            label="Email"
            leftIcon={{ type: 'font-awesome', name: 'envelope' }}
            onChangeText={
              // Set this.state.email to the value in this Input box
              (value) => this.setState({ email: value.toLowerCase() })
            }
            placeholder="my@email.com"
          />
          <Input
            label="Password"
            leftIcon={{ type: 'font-awesome', name: 'lock' }}
            onChangeText={
              // Set this.state.email to the value in this Input box
              (value) => this.setState({ password: value })
            }
            placeholder="p@ssw0rd123"
            secureTextEntry
          />
          <Input
            label="Confirm Password"
            leftIcon={{ type: 'font-awesome', name: 'lock' }}
            onChangeText={
              // Set this.state.email to the value in this Input box
              (value) => this.setState({ confirmPassword: value })
            }
            placeholder="p@ssw0rd123"
            secureTextEntry
          />
          <Button
            title='Submit'
            onPress={ this.handleSignUp }
          />
        </View>
      ) : (
        <View>
          <Input
            label="Email"
            leftIcon={{ type: 'font-awesome', name: 'envelope' }}
            onChangeText={
              // Set this.state.email to the value in this Input box
              (value) => this.setState({ email: value.toLowerCase() })
            }
            placeholder="my@email.com"
          />
          <Input
            label="Password"
            leftIcon={{ type: 'font-awesome', name: 'lock' }}
            onChangeText={
              // Set this.state.email to the value in this Input box
              (value) => this.setState({ password: value })
            }
            placeholder="p@ssw0rd123"
            secureTextEntry
          />
          <Button
            title='Submit'
            onPress={ this.handleSignIn }
          />
        </View>
      ) }
       <Text> {this.state.showInvalidLogin ? "Incorrect username or password" : ""}</Text>  
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