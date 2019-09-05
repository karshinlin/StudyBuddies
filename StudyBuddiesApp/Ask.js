import React, {Component} from 'react';
import {Platform, StyleSheet, Text, TextInput, Button, Alert, View} from 'react-native';
import { createStackNavigator, createAppContainer, NavigationActions, withNavigation } from "react-navigation";

import HomeTile from "./HomeTile.js";

class AskScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Ask</Text>
		<Text style={styles.normal}>What's your question?</Text>
		<TextInput
		  style={styles.textbox}
		  multiline = {true}
		  numberOfLines = {4}
          placeholder="Ask something here for your Study Buddies to answer!"
          onChangeText={(text) => this.setState({text})}
        />
		<Button
			onPress={() => {
				Alert.alert('You just asked a question!');
			}}
			title="Submit"
		/>
      </View>
    );
  }
}

export default AskScreen;

const styles = StyleSheet.create({
  title: {
	flex: 0.15,
	justifyContent: 'center',
	fontSize: 40,
	margin: 10
  },
  normal: {
	flex: 0.1,
	fontSize: 30,
	margin: 10,
	alignItems: 'center'
  },
  container: {
    flex: 1,
	alignItems: 'center',
	justifyContent: 'flex-start',
    backgroundColor: '#F5FCFF',
  },
  textbox: {
	height: 200, 
	width: '90%',
	borderWidth: 1,
	padding: 5
  }
});
