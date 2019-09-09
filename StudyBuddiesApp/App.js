import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import { createAppContainer, NavigationActions, withNavigation } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import Amplify from 'aws-amplify';
import awsConfig from './aws-exports';
import { Auth } from 'aws-amplify';
//import CustomGreetings from './Greetings.js';
import App from './HomeView.js';
import { ConfirmSignIn, ConfirmSignUp, ForgotPassword, VerifyContact, SignIn, SignUp } from 'aws-amplify-react-native';

//Amplify.configure(awsConfig);

import { withAuthenticator, Greetings } from 'aws-amplify-react-native';

import './global.js'
import HomeTile from "./HomeTile.js";
import AskScreen from "./Ask.js";
import { auth0SignInButton } from '@aws-amplify/ui';

// class AppWithAuth extends React.Component {
//   constructor(props, context) {
//     super(props, context);
//   }

//   render() {
//     return (
//       <View>
//         <Authenticator
//             // Optionally hard-code an initial state
//             authState="signIn"
//             // Pass in an already authenticated CognitoUser or FederatedUser object
//             ////authData={CognitoUser | 'username'} 
//             // Fired when Authentication State changes
//             onStateChange={(authState) => console.log(authState)} 
//             // An object referencing federation and/or social providers 
//             // The federation here means federation with the Cognito Identity Pool Service
//             // *** Only supported on React/Web (Not React Native) ***
//             // For React Native use the API Auth.federatedSignIn()
//             ////federated={myFederatedConfig}
//             // A theme object to override the UI / styling
//             ////theme={myCustomTheme} 
//             // Hide specific components within the Authenticator
//             // *** Only supported on React/Web (Not React Native)  ***
//             hide={ 
//                 [
//                     Greetings,
//                     SignIn,
//                     ConfirmSignIn,
//                     SignUp,
//                     ConfirmSignUp,
//                     VerifyContact,
//                     ForgotPassword
//                 ]
//             }
//             // or hide all the default components
//             hideDefault={true}
//             // Pass in an aws-exports configuration
//             amplifyConfig={awsConfig}
//             // Pass in a message map for error strings
//             ////errorMessage={myMessageMap}
//         >
//             <SignIn/>
//             <ConfirmSignIn/>
//             <SignUp/>
//             <ConfirmSignUp/>
//             <VerifyContact/>
//             <ForgotPassword/>
//             <App />
//         </Authenticator>
//       </View>
//     );
//   }
// }

// export default AppWithAuth;

//new default export for withAuthenticator (this is to receive props & force the rerender)
export default props =>  {
  const AppComponent = withAuthenticator(App, {
    includeGreetings: true,
    signUpConfig: {
      hiddenDefaults: ["email"],
      signUpFields: [
        { label: "Full Name", key: "name", required: true, type: "string", displayOrder: 1 },
        { label: "Email", key: "username", required: true, type: "email", displayOrder: 2 },
        { label: "Password", key: "password", required: true, type: "password", displayOrder: 3 },
        { label: "Phone Number", key: "phone_number", required: true, type: "phone", displayOrder: 4 },
        { label: "Address", key: "address", required: true, type: "string", displayOrder: 5 },
        { label: "City", key: "custom:city", required: true, type: "string", displayOrder: 6 },
        { label: "State", key: "custom:state", required: true, type: "string", displayOrder: 7 },
        { label: "Zip", key: "custom:zip", required: true, type: "string", displayOrder: 8 },
      ]
  }});
  return <AppComponent {...props} />
}

const styles = StyleSheet.create({
  banner: {
    flex: 0.25,
    height: 100,
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  tileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
