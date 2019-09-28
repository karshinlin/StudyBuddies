import React, {Component} from 'react';
import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import Amplify from 'aws-amplify';
import awsConfig from './aws-exports';
import { Auth } from 'aws-amplify';
import './global.js'
import HomeTile from "./HomeTile.js";
import SignOutButton from './SignOutButton';

Amplify.configure(awsConfig);

export default class HomeScreen extends React.Component {

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
    var url = global.url + "getGroup?userId=" + Auth.user.attributes.sub;
    console.log("url:" + url);
    return fetch(url)
      .then(response => response.json())
      .then(response => {
        console.log("groupId:" + response['groupId']);
        this.setState({
          groupId: response['groupId']
        });
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



    return (
      <View style={styles.container}> 
        {this.state.groupId ? (
          <View >   
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
        ) :
        <Text>You're not in a group yet. Hang tight!</Text> }
        <SignOutButton navigation={this.props.navigation}/>
      </View>);
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
