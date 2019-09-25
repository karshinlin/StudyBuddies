import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ActivityIndicator} from 'react-native';
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
import QuestionnaireScreen from "./Questionnaire.js";
import { auth0SignInButton } from '@aws-amplify/ui';
import AnswerScreen from './Answer.js';

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
      email: "",
      groupId: null,
      isLoading: true,
      error: false
    };
    this.fetchSurveyStatus();
    this.fetchMatchingStatus();
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

  fetchMatchingStatus() {
    var url = global.url + "fetchMatchingStatus?userId=" + Auth.user.attributes.name;
    console.log("url:" + url);
    return fetch(url)
      .then(response => response.json())
      .then(response => {
        this.setState({
          groupId: response['groupId']
        })
      })
  }

  fetchSurveyStatus() {
    var url = global.url + "surveyStatus?userId=" + Auth.user.attributes.sub;
    console.log("url:" + url);
    return fetch(url)
        .then((response) => response.json())
        .then((response) => {
          this.setState({
            surveyFilled: response['surveyStatus'] === "True",
            email: response['email'], 
            isLoading: false,
            error: false
          }, function () {
            console.log("state: " + this.state['email']);
          });
        })
        .catch((error) => {
            this.setState({
              surveyFilled: false,
              email: "",
              isLoading: true,
              error: true
            })
        });
  }


  render() {
    console.log("loading:" + this.state.isLoading);
    if (this.state.isLoading) {
      return (
          <View style={{ flex: 1, paddingTop: 25 }}>
              <ActivityIndicator size="large" color="#0000ff" />
          </View>
      );
    }
    console.log("surveyFilled " + this.state.surveyFilled + " " + (!this.state.surveyFilled))
    if (!this.state.surveyFilled) {
      console.log("render state: " + this.state.email);
      this.props.navigation.navigate('Survey');
    }
    console.log("json state" + JSON.stringify(this.state));
    console.disableYellowBox = true;
    // if (this.state.groupId == null) {
    //   return (<Text>You're not in a group yet. Hang tight!</Text>);
    // } else {
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
              tileName="Answer" desiredFontSize="30" onPress={() => {this.props.navigation.navigate('Answer')}}>
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
    // }
  }
}

const AppNavigator = createStackNavigator({
	Home: {
    screen: HomeScreen,
    navigationOptions: {
      header: null
    }
  },
  Survey: {
    screen: QuestionnaireScreen,
    navigationOptions: {
      header: null
    }
  },
  Ask: AskScreen,
  Answer: {
    screen: AnswerScreen,
    navigationOptions: {
      headerStyle: {
        height: 20,
      },
    },
  }
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
    alignContent: 'flex-start',
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
