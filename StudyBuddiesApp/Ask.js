import React, {Component} from 'react';
import {Platform, StyleSheet, Text, TextInput, Button, Alert, View} from 'react-native';
import stylesheet from './styles.js';

import { Auth } from 'aws-amplify';

class AskScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			questionText: ""
		};
		this.params = this.props.params;
		this.askQuestion = this.askQuestion.bind(this);
	}

	askQuestion() {
		console.log(this.state.text)
		this.props
		var url = global.url + "setQuestion";
		fetch(url, {
			method: 'POST',
			headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
			body: JSON.stringify({
				askedBy: Auth.user.attributes.sub,
				questionText: this.state.questionText,
			}),		
		})
		.then((response) => response.json())
        .then((response) => {
            console.log(JSON.stringify(response))
        })
        .catch((error) => {

        });
	}
	
  	render() {
		return (
		<View style={stylesheet.container}>
			<Text style={stylesheet.title}>Ask</Text>
			<Text style={styles.normal}>What's your question?</Text>
			<TextInput
			style={styles.textbox}
			multiline = {true}
			numberOfLines = {4}
			placeholder="Ask something here for your Study Buddies to answer!"
			onChangeText={(text) => this.setState({questionText : text})}
			/>
			<Button
			style={styles.submit}
				onPress={() => {
					Alert.alert('You just asked a question!');
					this.askQuestion();
				}}
				title="Submit"
			/>
		</View>
		);
	}
}

export default AskScreen;

const styles = StyleSheet.create({
  normal: {
	flex: 0.1,
	fontSize: 25,
	margin: 10,
	alignItems: 'center',
	fontFamily: 'ArialMT'
  },
  textbox: {
	height: 200, 
	width: '90%',
	//borderWidth: 1,
	padding: 5,
	borderRadius: 25,
	backgroundColor: '#F2F2F2', 
	textAlign: 'center'
  },
  submit: {
	  color: '#275DA7',  
  }
});
