import React from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { Auth } from 'aws-amplify';

// CREDIT TO https://alligator.io/react/react-native-authentication/

export default class ConfirmationCode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      code: '',
      showInvalidCode: false
    };
  }

  handleConfirmationCode = () => {
    const { email, code } = this.state;
    if (email == '' || code == '') {
        this.setState({ showInvalidCode: true });
        return;
    }

    Auth.confirmSignUp(email, code, {})
      .then(() => {
        this.props.navigation.navigate('SignIn');
      })
      .catch(err => {
        console.log(err);  
        this.setState({ showInvalidCode: true });
      });
  }

  render() {
    return (
    <KeyboardAvoidingView style={styles.container} enabled={false} behavior={'height'}>
        <View style={[{flex: 0.2}, styles.titleHolder]}>
          <Text style={styles.title}>Enter your confirmation code:</Text>
        </View>
        <View>
        <Input
          label="Email"
          value={this.state.email}
          style={styles.textInput}
          leftIcon={{ type: 'font-awesome', name: 'envelope' }}
          onChangeText={value => this.setState({ email: value.toLowerCase() })}
          placeholder="email@gbes.com"/>
        <Input
            label="Confirmation Code"
            style={styles.textInput}
            leftIcon={{ type: 'font-awesome', name: 'lock' }}
            value={this.state.code}
            onChangeText={value => this.setState({ code: value })} 
            placeholder="012345"/>
        <View>
        <Text style={styles.incorrectPassword}> 
                    {this.state.showInvalidCode ? "Incorrect confirmation code." : null}  
                </Text>
            <Button
                title='Submit'
                style-={styles.buttons}
                onPress={ () => this.handleConfirmationCode() }/>
                
          <Button
            title='Back to Sign In'
            style-={styles.buttons}
            onPress={ () => this.props.navigation.navigate('SignIn')}/>
        </View>
        
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
    fontSize: 20
  },
  incorrectPassword: {
    textAlign: 'left',
    fontSize: 20,
    fontFamily: "Arial",
    color: cRed
  },
});