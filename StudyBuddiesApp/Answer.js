import React, { Component } from "react";
import { View, Text, TextInput, FlatList, TouchableOpacity, Linking, StyleSheet, ActivityIndicator, Button, AsyncStorage } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Auth } from 'aws-amplify';
import QuestionCard from './QuestionCard';
import stylesheet from './styles.js';

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
	  this.removeQuestion = this.removeQuestion.bind(this);
	}

	componentDidMount() {
		this.fetchQuestions();
	}

	removeQuestion = (idToRemove) => {
		console.log("REMOVING QUESTION " + idToRemove);
		let questions = [...this.state.questions];
		this.setState({questions: questions.filter(q => q.questionId != idToRemove)})
	}

	fetchQuestions() {
		this.setState({refreshing: true})
		this.props
		var url = global.url + "unansweredQuestions?userId=" + Auth.user.attributes.sub;
		console.log("url:" + url);
		return fetch(url)
			.then((response) => response.json())
			.then((response) => {
			  this.setState({
				questions: response['questions'], 
				isLoading: false,
				refreshing: false,
				error: false
			  }, function () {
				console.log("questions: " + JSON.stringify(this.state['questions']));
			  });
			})
			.catch((error) => {
				this.setState({
				  questions: "",
				  isLoading: true,
				  refreshing: false,
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
		  
		  <View style={stylesheet.container}>
			<Text style={stylesheet.title}>Answer</Text>
			<FlatList
			//contentContainerStyle={{flexGrow: 3, justifyContent: 'flex-start'}}
			data={this.state.questions}
			renderItem={({ item: { questionId, questionText, askedDate } }) => (
			  <QuestionCard 
				  questionText={questionText} 
				  askedDate={askedDate} 
				  id={questionId} 
				  clear={true} 
				  removeSelfFunction={this.removeQuestion}
				  />
			)}
			onRefresh={() => this.fetchQuestions()}
			keyboardShouldPersistTaps="always"
			refreshing={this.state.refreshing}
			keyExtractor={({item: questionId}) => questionId}
			ListEmptyComponent={<View><Text>There are no questions in this group yet.</Text></View>}
		  />
		  </View>
		);
	  }

}

export default AnswerScreen;

const styles = StyleSheet.create({
	container: {
	  flex: 1,
	  justifyContent: "center",
	  alignContent: "center",
	},
	title: {
	  flex: 3,
	  justifyContent: 'center',
	  fontSize: 50,
	  margin: 10,
	  color: '#60A147',
	  fontFamily: 'Arial Rounded MT Bold',
	  textAlign: 'center',
	},
});