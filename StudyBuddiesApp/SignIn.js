import React from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { Auth } from 'aws-amplify';

// CREDIT TO https://alligator.io/react/react-native-authentication/

export default class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
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
    <KeyboardAvoidingView style={styles.container} enabled={false} behavior={'height'}>
        <View style={[{flex: 0.2}, styles.titleHolder]}>
          <Text style={styles.title}>Welcome to Study Buddies!</Text>
        </View>
        <View>
          <TextInput
            style={styles.textInput}
            placeholder="Email"
            value={this.state.email}
            onChangeText={
              // Set this.state.email to the value in this Input box
              (value) => this.setState({ email: value.toLowerCase() })
            }
          />
          <TextInput
            style={styles.textInput}
            placeholder="********"
            secureTextEntry={true}
            onChangeText={
              // Set this.state.email to the value in this Input box
              (value) => this.setState({ password: value })
            }
            secureTextEntry
          />
          {this.state.showInvalidLogin ? <Text style={styles.incorrectPassword}> Incorrect username or password. </Text>: null}  
        </View>
        <View>
          <Button style={styles.buttons}
            title='Log In'
            onPress={ this.handleSignIn } />
          <Text style={styles.noAccount}>
            Don't have an account?
          </Text>
          <Button style={styles.buttons}
            title="Sign Up" 
            onPress={() => this.props.navigation.navigate('SignUp')} />
          <Text style={styles.noAccount}>
            Have a confirmation code?
          </Text>
          <Button style={styles.buttons}
            title="Enter Code" 
            onPress={() => this.props.navigation.navigate('ConfirmationCode')} />
        </View>
      </KeyboardAvoidingView>
      );
  }
}

export const cBlack = '#3D3D3D';
export const cDarkBlue = "#1D71F3";
export const cLightBlue = "#3EAAFA";
export const cRed = "#ED6A5A";
export const cOrange = "#FAA916";
export const cWhite = "#FFFFFF";

const styles = StyleSheet.create({
  container: {
    flex: 1,
	  backgroundColor: '#FFFFFF',
    flexDirection: 'column',
    padding: 30,
    height: '100%',
  },
  titleHolder: {
    justifyContent: "flex-end",
    marginBottom: 50,
  },
  title: {
    textAlign: 'left',
    fontSize: 25,
    fontFamily: "Arial",
    color: cBlack,
  },
  textInput: {
    borderRadius: 8,
    backgroundColor: '#F2F2F2',
    height: 75,
    marginBottom: 20,
    fontFamily: "Arial",
    fontSize: 23,
    padding: 20,
  },
  buttons: {
    padding: 20,
    borderRadius: 8,
    fontSize: 20,
    color: cDarkBlue
  },
  incorrectPassword: {
    textAlign: 'left',
    fontSize: 20,
    fontFamily: "Arial",
    color: cRed
  },
  noAccount: {
    textAlign: 'center',
    fontSize: 15,
    fontFamily: "Arial",
    color: cBlack
  }
});