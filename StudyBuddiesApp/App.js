import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import { createStackNavigator, createAppContainer, NavigationActions, withNavigation } from "react-navigation";

import HomeTile from "./HomeTile.js";
import AskScreen from "./Ask.js";
class HomeScreen extends React.Component {
  render() {
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
    return <AppContainer persistenceKey={"NavigationKey"} />;
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
