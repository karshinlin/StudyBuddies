import React, {Component} from 'react';
import {StyleSheet, Text, View, ActivityIndicator, Image, Linking} from 'react-native';
import Amplify from 'aws-amplify';
import awsConfig from './aws-exports';
import { Auth } from 'aws-amplify';
import './global.js'
import HomeTile from "./HomeTile.js";
import SignOutButton from './SignOutButton';
import {images} from "./images.js";
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


  render() {
    console.log("loading:" + this.state.isLoading);
    if (this.state.isLoading) {
      return (
          <View style={{ paddingTop: 50, flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
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
        }}
      />
        {this.state.groupId ? (
          <View style={{justifyContent: "flex-start", flexDirection: 'column', alignContent: 'flex-start'}}>
            <View style={{ flexDirection: 'row', height: 200, justifyContent: 'center', alignItems: 'top', paddingBottom: 50, paddingTop: 0, marginTop: 0 }}>
              <Image source={images.studybuddies_icon} style={{height: 200, width: 290}}></Image>
            </View>   
            <View style={styles.tileRow}>
              <HomeTile
                tileName="Chat" tilePic={images.chat_icon} desiredFontSize="30" onPress={() => {this.props.navigation.navigate('Chat')}}>
              </HomeTile>
              <HomeTile
                tileName="Ask" tilePic={images.question_icon} desiredFontSize="30" onPress={() => {this.props.navigation.navigate('Ask')}}>
              </HomeTile>
            </View>
            <View style={styles.tileRow}>
              <HomeTile
                tileName="Answer" tilePic={images.answer_icon} desiredFontSize="30" onPress={() => {this.props.navigation.navigate('Answer')}}>
              </HomeTile>
              <HomeTile
                tileName="Challenge" tilePic={images.point_icon} desiredFontSize="30" onPress={() => {this.props.navigation.navigate('Challenge')}}>
              </HomeTile>
            </View>
            <View style={styles.tileRow}>
              <HomeTile
                tileName="Question History" tilePic={images.book_icon} desiredFontSize="25" onPress={() => {this.props.navigation.navigate('QuestionHistory')}}>
              </HomeTile>
              <HomeTile
                tileName="Leaderboard" tilePic={images.leaderboard_icon} desiredFontSize="25" onPress={() => {this.props.navigation.navigate('Leaderboard')}}>
              </HomeTile>
            </View>
            <Text style={[styles.linkStyle, {marginTop: 10, textAlign:'center'}]} accessibilityRole='link' onPress={() => Linking.openURL('https://www.gbes.com/')}>Need help? Visit our website.</Text>
            <View style={styles.banner}>
            </View>
          </View>
        ) :
        <View style={styles.container}>
          <Image source={images.studybuddies_icon} />
          <Text style={styles.title}>You're not in a group yet. Hang tight!</Text>
        </View>
         }
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
    alignContent: 'flex-start',
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
  title: {
    fontSize: 25,
    fontFamily: "Arial",
    color: "black"
  },
  linkStyle: {
    color: '#E91E63',
    textDecorationLine: 'underline'
  }
});
