import React, { Component } from "react";
import { View, Text, TextInput, FlatList, KeyboardAvoidingView, StyleSheet, ActivityIndicator, TouchableHighlight } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Auth } from 'aws-amplify';
import QuestionCard from './QuestionCard';
import AnsweredQuestionCard from './AnsweredQuestionCard';
import stylesheet from './styles.js';
import {  cLightBlue } from "./App";


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
		this.setState({ questions: questions.filter(q => q.questionId != idToRemove) })
	}

	fetchQuestions() {
		this.setState({ refreshing: true })
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
		let {onPress} = this.props;
		return (

			<View style={styles.container}>
				<KeyboardAvoidingView enabled behavior='position'>

					<Text style={styles.title}>Answer</Text>
					<FlatList
						//contentContainerStyle={{flexGrow: 3, justifyContent: 'flex-start'}}
						data={this.state.questions}
						renderItem={({ item: { questionId, questionText, askedDate } }) => (

							<View style={[this.props.style, { borderBottomWidth: 10, borderBottomColor: "white", padding: 20 }]}>
								<TouchableHighlight style={{}}
									onPress={onPress}
									underlayColor={cLightBlue}
								>
									<AnsweredQuestionCard
										questionText={questionText}
										askDate={askDate}
										askedBy={""}
										id={questionId}
										answers={[]}
										groupMembers={{ "": "" }} />

								</TouchableHighlight>
								<QuestionCard
								questionText={questionText}
								askedDate={askedDate}
								id={questionId}
								clear={true}
								removeSelfFunction={this.removeQuestion}
							/>
							</View>
							
				)}
						onRefresh={() => this.fetchQuestions()}
						keyboardShouldPersistTaps="always"
						refreshing={this.state.refreshing}
						keyExtractor={({ item: questionId }) => questionId}
						ListEmptyComponent={<View><Text>There are no questions in this group yet.</Text></View>}
					/>
				</KeyboardAvoidingView>
			</View>
		);
	}

}

export default AnswerScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignContent: "center",
		flexDirection: 'column',
	},
	title: {
		justifyContent: 'center',
		fontSize: 50,
		margin: 10,
		color: '#60A147',
		fontFamily: 'Arial Rounded MT Bold',
		textAlign: 'center',
	},
});