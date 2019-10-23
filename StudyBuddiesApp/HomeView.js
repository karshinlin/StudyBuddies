import React, {Component} from 'react';
import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import Amplify from 'aws-amplify';
import awsConfig from './aws-exports';
import { Auth } from 'aws-amplify';
import './global.js'
import HomeTile from "./HomeTile.js";
import SignOutButton from './SignOutButton';
import {NavigationEvents, withNavigation} from 'react-navigation';

Amplify.configure(awsConfig);

export default class HomeScreen extends React.Component {

  constructor(props) {
    super(props);
    this.params = this.props.params;
    this.state = {
      email: "",
      groupId: null,
      isLoading: true,
      error: false,
      points: 0
    };
  }
  
  componentDidMount() {
    this.fetchMatchingStatus();
    this.fetchPoints();
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
          groupId: response['groupId'],
          isLoading: false
        });
      })
  }

  fetchPoints() {
    var url = global.url + "getPoints?userId=" + Auth.user.attributes.sub;
    console.log("url:" + url);
    return fetch(url)
      .then(response => response.json())
      .then(response => {
        console.log("points:" + response['points']);
        this.setState({
          points: response['points']
        });
      })
  }

  render() {
    console.log("loading:" + this.state.isLoading);
    if (this.state.isLoading) {
      return (
          <View style={{ paddingTop: 25 }}>
              <ActivityIndicator size="large" color="#0000ff" />
          </View>
      );
    }
    console.log("json state" + JSON.stringify(this.state));
    console.disableYellowBox = true;

    return (
      <View style={styles.container}> 
      <NavigationEvents
        onDidFocus={() => {
          this.fetchMatchingStatus();
          this.fetchPoints();
        }}
      />
        {this.state.groupId ? (
          <View >   
            <View style={styles.tileRow}>
              <HomeTile
                tileName="Chat" desiredFontSize="30" onPress={() => {this.props.navigation.navigate('Chat')}}>
              </HomeTile>
              <HomeTile
                tileName="Ask" desiredFontSize="30" onPress={() => {this.props.navigation.navigate('Ask')}}>
              </HomeTile>
            </View>
            <View style={styles.tileRow}>
              <HomeTile
                tileName="Answer" desiredFontSize="30" onPress={() => {this.props.navigation.navigate('Answer')}}>
              </HomeTile>
              <HomeTile
                tileName="Challenge" desiredFontSize="30" onPress={() => {this.props.navigation.navigate('Challenge')}}>
              </HomeTile>
            </View>
            <View style={styles.tileRow}>
              <HomeTile
                tileName="Question History" desiredFontSize="25" onPress={() => {this.props.navigation.navigate('QuestionHistory')}}>
              </HomeTile>
              <HomeTile
                tileName="Leaderboard" desiredFontSize="25" onPress={() => {this.props.navigation.navigate('Leaderboard')}}>
              </HomeTile>
            </View>
            <Text>Points: {this.state.points} </Text>
            <View style={styles.banner}>
            </View>
          </View>
        ) :
        <Text style>You're not in a group yet. Hang tight!</Text> }
      </View>);
    }
  }

  const SignoutButtonNav = withNavigation(SignOutButton);

const styles = StyleSheet.create({
  banner: {
    flex: 0.25,
    height: 100,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  tileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10
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
