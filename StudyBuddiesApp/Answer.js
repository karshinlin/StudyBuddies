import React, { Component } from "react";
import { View, Text, TextInput, FlatList, KeyboardAvoidingView, StyleSheet, ActivityIndicator, TouchableHighlight } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Auth } from 'aws-amplify';
import AnsweredQuestionCard from './AnsweredQuestionCard';
import stylesheet from './styles.js';
import { cLightBlue } from "./App";


class AnswerScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			error: false,
			refreshing: false,
			time: 30,
			groupMembers: null,
			questions: null
		};
		this.params = this.props.params;
		this.fetchQuestions = this.fetchQuestions.bind(this);
		this.removeQuestion = this.removeQuestion.bind(this);
	}

	componentDidMount() {
		this.fetchQuestions();
		this.getGroupMembers();
	}

	removeQuestion(idToRemove) {
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
					error: false,
					refreshing: false
				});
			})
			.catch((error) => {
				this.setState({
					questions: "",
					error: true
				})
			});
	}

	getGroupMembers() {
		var url = global.url + "getGroupMemberNames?userId=" + Auth.user.attributes.sub;
		console.log("url:" + url);
		return fetch(url)
			.then(response => response.json())
			.then(response => {
				this.setState({ groupMembers: response })
			})
			.catch((error) => {
				console.log(error);
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
		return (
			<View style={styles.container}>
				<Text style={styles.title}>Answer</Text>
				{
					this.state.questions && this.state.groupMembers ?
						
							
							<FlatList
								data={this.state.questions}
								renderItem={({ item: { questionId, questionText, askDate, askedBy, answers } }) => (

									<View style={[this.props.style, { borderBottomWidth: 10, borderBottomColor: "white", padding: 20 }]}>
										<TouchableHighlight style={{}}
											underlayColor={cLightBlue}>
											<AnsweredQuestionCard
												questionText={questionText}
												askDate={askDate}
												askedBy={askedBy}
												id={questionId}
												answers={answers}
												groupMembers={this.state.groupMembers}
												answerable={true}
												removeSelfFunction={this.removeQuestion}
											/>

										</TouchableHighlight>
									</View>

								)}
								onRefresh={() => this.fetchQuestions()}
								keyboardShouldPersistTaps="always"
								refreshing={this.state.refreshing}
								keyExtractor={({ item: questionId }) => questionId}
								ListEmptyComponent={<View><Text>There are no questions in this group yet.</Text></View>}
							/>
						:
						<ActivityIndicator size="large" color="#0000ff" />
				}
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
		flexDirection: 'column'
	},
	title: {
		//flex: 1,
		justifyContent: 'center',
		fontSize: 43,
		margin: 10,
		color: '#60A147',
		fontFamily: 'Arial Rounded MT Bold',
		textAlign: 'center',
	},
});