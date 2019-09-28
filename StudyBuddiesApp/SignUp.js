import React from 'react';
import { StyleSheet, View, Modal } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { Auth } from 'aws-amplify';

// CREDIT TO https://alligator.io/react/react-native-authentication/

export default class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      confirmationCode: '',
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
      }, 
      modalVisible: false
    };
  }

    handleSignUp = () => {
        if (!this.runSubmitValidators()) {
          return;
        }
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
            this.props.navigation.navigate('SignIn')
          })
          .catch(err => console.log(err));
      }
  

  render() {
    return (<View style={styles.container}>
      <Input
            label="Full Name"
            leftIcon={{ type: 'font-awesome', name: 'user-circle' }}
            onChangeText={ name => this.setState({ name })}
            placeholder="First Last"
          />
      {this.state.name ? <Text>Invalid name.</Text> : null}
      <Input
            label="Email"
            leftIcon={{ type: 'font-awesome', name: 'envelope' }}
            onChangeText={
              // Set this.state.email to the value in this Input box
              (value) => this.setState({ email: value.toLowerCase() })
            }
            placeholder="email@gbes.com"
          />
          <Input
            label="Password"
            leftIcon={{ type: 'font-awesome', name: 'lock' }}
            onChangeText={
              // Set this.state.email to the value in this Input box
              (value) => this.setState({ password: value })
            }
            placeholder="password"
            secureTextEntry
          />
          <Input
            label="Confirm Password"
            leftIcon={{ type: 'font-awesome', name: 'lock' }}
            onChangeText={
              // Set this.state.email to the value in this Input box
              (value) => this.setState({ confirmPassword: value })
            }
            placeholder="password"
            secureTextEntry
          />
          <Input
          leftIcon={{ type: 'font-awesome', name: 'phone' }}
            placeholder="Enter phone number"
            value={ this.state.phone }
            onChangeText={ (value) => this.setState({ phone: value }) } />

        <Input
          leftIcon={{ type: 'font-awesome', name: 'address-card' }}
            placeholder="Address"
            value={ this.state.address }
            onChangeText={ (value) => this.setState({ address: value }) } /> 
        <Input
          leftIcon={{ type: 'font-awesome', name: 'address-card' }}
            placeholder="City"
            value={ this.state.city }
            onChangeText={ val => this.setState({ city: val }) } />    
          <Input
          leftIcon={{ type: 'font-awesome', name: 'address-card' }}
            placeholder="State"
            value={ this.state.state }
            onChangeText={ val => this.setState({ state: val }) } /> 
          <Input
          leftIcon={{ type: 'font-awesome', name: 'address-card' }}
          keyboardType="number-pad"
            placeholder="Zip"
            value={ this.state.zip }
            onChangeText={ val => this.setState({ zip: val }) } />    
            <Modal
            visible={this.state.modalVisible}
          >
            <View
              style={styles.container}
            >
              <Input
                label="Confirmation Code"
                leftIcon={{ type: 'font-awesome', name: 'lock' }}
                onChangeText={
                  // Set this.state.confirmationCode to the value in this Input box
                  (value) => this.setState({ confirmationCode: value })
                }
              />
            <Button
              title='Submit'
              onPress={ this.handleConfirmationCode }
            />
          </View>
        </Modal>
          <Button
            title='Submit'
            onPress={ this.handleSignUp } />
          <Button
            title='Sign in'
            onPress={() => this.props.navigation.navigate('SignIn')} />
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