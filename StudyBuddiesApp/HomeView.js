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
import QuestionareScreen from "./Questionare.js";
import { auth0SignInButton } from '@aws-amplify/ui';

<Authenticator hideDefault={true}>
    <Greetings
        inGreeting={(username) => "Hello"}
        outGreeting="Please sign in..."
    />
</Authenticator>

class HomeScreen extends React.Component {

  constructor(props) {
    super(props);
    this.fetchSurveyStatus = this.fetchSurveyStatus.bind(this);
    this.params = this.props.params;
    this.state = {
      surveyFilled: false,
      email: ""
    };
    this.fetchSurveyStatus();
  }

  componentDidMount() {
    console.log('on component mount');
    // check the current user when the App component is loaded
    Auth.currentAuthenticatedUser().then(user => {
      console.log(user);
      console.log("authuser:" + JSON.stringify(Auth.user.attributes.name));
      //this.setState({authState: 'signIn'});
    }).catch(e => {
      console.log("error:" + e);
      //this.setState({authState: 'signIn'});
    });
  }

  fetchSurveyStatus() {
    var url = global.url + "surveyStatus?email=" + Auth.user.attributes.email;
    console.log("url:" + url);
    return fetch(url)
        .then((response) => response.json())
        .then((response) => {
          this.setState({
            surveyFilled: response['surveyFilled'],
            email: response['email']
          }, function () {
            console.log("state: " + this.state['email']);
          });
        })
        .catch((error) => {
            this.setState({
              surveyFilled: false,
              email: response['email']
            })
        });
  }
  render() {
    if (this.state.surveyFilled == false) {
      console.log("render state: " + this.state.email);
      //this.props.navigation.navigate('Questionnaire');
    }
    console.disableYellowBox = true;
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
        <View style={styles.banner}>
        </View>
      </View>
    );
  }
}

const AppNavigator = createStackNavigator({
  Questionare: QuestionareScreen,
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
