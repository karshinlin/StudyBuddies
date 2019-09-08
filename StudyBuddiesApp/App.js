import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import { createAppContainer, NavigationActions, withNavigation } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import Amplify from 'aws-amplify';
import awsConfig from './aws-exports';
import { Auth } from 'aws-amplify';

Amplify.configure(awsConfig);

import { withAuthenticator } from 'aws-amplify-react-native';

import HomeTile from "./HomeTile.js";
import AskScreen from "./Ask.js";

class HomeScreen extends React.Component {
  render() {
    console.disableYellowBox = true;
    return (
      <View style={styles.container}>
        <View style={styles.banner}>
        </View>
        <View style={styles.tileRow}>
          <HomeTile
            tileName="Chat" desiredFontSize="50">
          </HomeTile>
          <HomeTile
            tileName="Ask" desiredFontSize="50" onPress={() => {this.props.navigation.navigate('Ask')}}>
          </HomeTile>
        </View>
        <View style={styles.tileRow}>
          <HomeTile
            tileName="Answer" desiredFontSize="30">
          </HomeTile>
          <HomeTile
            tileName="Challenge" desiredFontSize="30">
          </HomeTile>
        </View>
        <View style={styles.tileRow}>
          <HomeTile
            tileName="Question History" desiredFontSize="25">
          </HomeTile>
          <HomeTile
            tileName="Leaderboard" desiredFontSize="25">
          </HomeTile>
        </View>
        <View style={styles.tileRow}>
            <HomeTile
            tileName="Logout" desiredFontSize="25" onPress={ async () => {
              await Auth.signOut()
              this.props.rerender()
            }}>
          </HomeTile>
        </View>
        <View style={styles.banner}>
        </View>
      </View>
    );
  }
}

const AppNavigator = createStackNavigator({
	Home: {
    screen: HomeScreen,
    navigationOptions: {
      headerLeft: null,
      headerRight: null,
      headerStyle: {
        backgroundColor: '#F5FCFF',
        elevation: 0,
        shadowOpacity: 0,
        paddingTop: 15
      },
      headerLeftContainerStyle: {
        marginLeft: 5,
      },
      headerTintColor: 'white',
    }
  },
	Ask: AskScreen,
});

const AppContainer = createAppContainer(AppNavigator);

class App extends React.Component {
  render() {
    return <AppContainer persistenceKey={"NavigationKey"} />;
  }
}

export default props =>  {
  const AppComponent = withAuthenticator(App, {
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
  }})
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
