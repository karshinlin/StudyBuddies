import React from 'react';
import { StyleSheet, View, Modal, KeyboardAvoidingView, Text } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { Auth } from 'aws-amplify';

import { cBlack, cRed } from './SignIn.js'

// CREDIT TO https://alligator.io/react/react-native-authentication/

export default class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      phone: '',
      city: '',
      address: '',
      state: '',
      zip: '',
      name: '',
      validEntry: {
        email: true,
        password: true,
        confirmPassword: true,
        confirmationCode: true,
        phone: true,
        city: true,
        address: true,
        state: true,
        zip: true,
        name: true,
      }
    };
  }

    handleSignUp = () => {
        // alert(JSON.stringify(this.state));
        const { name, email, password, confirmPassword, 
          phone, address, city, state, zip } = this.state;
        // Make sure passwords match
        if (password === confirmPassword) {
        Auth.signUp({
          name: name,
            username: email,
            password,
            attributes: {
              name: name,
              phone_number: phone,
              address: address,
              'custom:city': city, 
              'custom:state': state,
              'custom:zip': zip},
            })
            .then(() => this.props.navigation.navigate('ConfirmationCode'))
            // On failure, display error in console
            .catch(err => console.log(err));
        } else {
          alert('Passwords do not match.');
        }
    }

  render() {
    return (
    <View styles={styles.container}>
      <KeyboardAvoidingView enabled behavior='position'>
        <View style={[styles.titleHolder]}>
            <Text style={styles.title}>Make a new account</Text>
        </View>
        <Input
          inputStyle={{padding: 10}}
          label="Full Name"
          value={this.state.name}
          leftIcon={{ type: 'font-awesome', name: 'user-circle' }}
          onChangeText={ name => this.setState({ name })}
          placeholder="First Last"
        />
        <Input
          inputStyle={{padding: 10}}
          label="Email"
          value={this.state.email}
          leftIcon={{ type: 'font-awesome', name: 'envelope' }}
          onChangeText={
            // Set this.state.email to the value in this Input box
            (value) => this.setState({ email: value.toLowerCase() })
          }
          placeholder="email@gbes.com"
        />
        <Input
          inputStyle={{padding: 10}}
          label="Password"
          value={this.state.password}
          leftIcon={{ type: 'font-awesome', name: 'lock' }}
          onChangeText={
            // Set this.state.email to the value in this Input box
            (value) => this.setState({ password: value })
          }
          placeholder="password"
          secureTextEntry />
        <Input
          inputStyle={{padding: 10}}
          label="Confirm Password"
          value={this.state.confirmPassword}
          leftIcon={{ type: 'font-awesome', name: 'lock' }}
          onChangeText={
            // Set this.state.email to the value in this Input box
            (value) => this.setState({ confirmPassword: value })
          }
          placeholder="password"
          secureTextEntry />
        <Input
          inputStyle={styles.inputStyle}
          label="Phone Number"
          leftIcon={{ type: 'font-awesome', name: 'phone' }}
          placeholder="+17709999999"
          value={ this.state.phone }
          onChangeText={ (value) => this.setState({ phone: value }) } />
        <Input
          inputStyle={styles.inputStyle}
          label="Street Address"
          leftIcon={{ type: 'font-awesome', name: 'address-card' }}
          placeholder="123 Atlantic Dr"
          value={ this.state.address }
          onChangeText={ (value) => this.setState({ address: value }) } /> 
        <Input
          inputStyle={styles.inputStyle}
          leftIcon={{ type: 'font-awesome', name: 'address-card' }}
          label="City"
          placeholder="Atlanta"
          value={ this.state.city }
          onChangeText={ val => this.setState({ city: val }) } />    
        <Input
          inputStyle={styles.inputStyle}
          leftIcon={{ type: 'font-awesome', name: 'address-card' }}
          label="State"
          placeholder="GA"
          value={ this.state.state }
          onChangeText={ val => this.setState({ state: val }) } /> 
        <Input
          inputStyle={styles.inputStyle}
          leftIcon={{ type: 'font-awesome', name: 'address-card' }}
          keyboardType="number-pad"
          label="Zip"
          placeholder="30318"
          value={ this.state.zip }
          onChangeText={ val => this.setState({ zip: val }) } />    
        <Button
          style={styles.buttons}
          title='Submit'
          onPress={ this.handleSignUp } />
        <Text style={styles.noAccount}>
            Already have an account?
        </Text>
        <Button style={styles.buttons, {paddingTop: 10, paddingLeft: 20, paddingRight: 20}}
          title='Sign in'
          onPress={() => this.props.navigation.navigate('SignIn')} />
      </KeyboardAvoidingView>
    </View>
    );
  }
}

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
    marginBottom: 10,
    paddingTop: 10
  },
  title: {
    textAlign: 'center',
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
  noAccount: {
    textAlign: 'center',
    fontSize: 15,
    fontFamily: "Arial",
    color: cBlack
  }
});