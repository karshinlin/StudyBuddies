import React, { Component } from "react";
import { View, Text, TextInput, FlatList, TouchableOpacity, Linking, StyleSheet, ActivityIndicator, Button, AsyncStorage } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Auth } from 'aws-amplify';
import QuestionCard from './QuestionCard';

class AnswerScreen extends Component {
	constructor(props) {
	  super(props);
	  this.state = {
		  isLoading: true,
		  error: false,
		  refreshing: false,
		  time: 30,
	  };
	  this.params = this.props.params;
	  this.fetchQuestions = this.fetchQuestions.bind(this);
	  this.fetchQuestions();
	}

	fetchQuestions() {
		var url = global.url + "unansweredQuestions?userId=" + Auth.user.attributes.sub;
		console.log("url:" + url);
		return fetch(url)
			.then((response) => response.json())
			.then((response) => {
			  this.setState({
				questions: response['questions'], 
				isLoading: false,
				error: false
			  }, function () {
				console.log("questions: " + JSON.stringify(this.state['questions']));
			  });
			})
			.catch((error) => {
				this.setState({
				  questions: "",
				  isLoading: true,
				  error: true
				})
			});
	  }

	render() {
		if (this.state.error) {
			return (
				<View style={{ flex: 1, paddingTop: 25, alignSelf: "center" }}>
					<Icon name="error" size={75} color="#F00" />
					<Text style={{ alignSelf: "center", color: "#F00" }}>Error</Text>
				</View>
				);
		}
		if (this.state.isLoading) {
			return (
				<View style={{ flex: 1, paddingTop: 25 }}>
					<ActivityIndicator size="large" color="#0000ff" />
				</View>
			);
		}
		return (
		  
		  <View style={{ flex: 1, justifyContent: "center", alignContent:"center"}}>
			<FlatList
			contentContainerStyle={{flexGrow: 1, justifyContent: 'flex-start'}}
			data={this.state.questions}
			renderItem={({ item: { questionId, questionText, askedDate } }) => (
			  <QuestionCard questionText={questionText} askedDate={askedDate} id={questionId} />
			)}
			refreshing={this.state.refreshing}
			keyExtractor={({item: questionId}) => questionId}
			onRefresh={this.handleRefresh}
			ListEmptyComponent={<View><Text>There are no questions in this group yet.</Text></View>}
		  />
		  </View>
		);
	  }

}

export default AnswerScreen;
