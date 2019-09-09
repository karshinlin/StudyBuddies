import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import { createAppContainer, NavigationActions, withNavigation } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import Amplify from 'aws-amplify';
import awsConfig from './aws-exports';
import { Auth } from 'aws-amplify';
//import CustomGreetings from './Greetings.js';

Amplify.configure(awsConfig);

import { Authenticator, Greetings } from 'aws-amplify-react-native';

import './global.js'
import HomeTile from "./HomeTile.js";
import AskScreen from "./Ask.js";
import { auth0SignInButton } from '@aws-amplify/ui';

<Authenticator hideDefault={true}>
    <Greetings />
</Authenticator>

class HomeScreen extends React.Component {

  constructor(props) {
    super(props);
    this.fetchApi = this.fetchApi.bind(this);
    this.params = this.props.params;
    this.fetchApi();
  }

  componentDidMount() {
    console.log('on component mount');
    // check the current user when the App component is loaded
    Auth.currentAuthenticatedUser().then(user => {
      console.log(user);
      console.log("authuser:" + JSON.stringify(Auth.user.attributes.name));
      this.setState({authState: 'signIn'});
    }).catch(e => {
      console.log("error:" + e);
      this.setState({authState: 'signIn'});
    });
  }

  fetchApi() {
    var url = global.url;
    console.log("url:" + url);
    return fetch(url)
        .then((response) => response.json())
        .then((response) => {
          console.log("response: " + response);
        })
        .catch((error) => {
            this.setState({
                isLoading: false,
                error: true
            })
        });
  }
  render() {
    console.disableYellowBox = true;

    if (Auth.)
    return (
      <View style={styles.container}>   
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
            tileName="Sign Out" desiredFontSize="25" onPress={() => {
              Auth.signOut()
              .then(data => console.log(data))
              .catch(err => console.log(err));
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

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
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
