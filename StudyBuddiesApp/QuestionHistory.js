import React, { Component } from "react";
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Auth } from 'aws-amplify';
import AnsweredQuestionCard from './AnsweredQuestionCard';
import stylesheet from './styles.js';


class QuestionHistoryScreen extends Component {
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
	}

	componentDidMount() {
		this.fetchQuestions();
	}

	fetchQuestions() {
		this.setState({ refreshing: true })
		this.props
		var url = global.url + "answeredQuestions?userId=" + Auth.user.attributes.sub;
		console.log("url:" + url);
		return fetch(url)
			.then((response) => response.json())
			.then((response) => {
				this.setState({
					questions: response['questions'],
				questions: response['questions'], 
					questions: response['questions'],
				questions: response['questions'], 
					questions: response['questions'],
				questions: response['questions'], 
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
			<View style={styles.container}>
				<Text style={styles.title}>Question History</Text>
				<FlatList
					data={this.state.questions}
					renderItem={({ item: { questionId, questionText, askedDate, answerText } }) => (
						<AnsweredQuestionCard questionText={questionText} askedDate={askedDate} id={questionId} answerText={answerText} clear={true} />
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
export default QuestionHistoryScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignContent: "center",
		flexDirection: 'column'
	},
	title: {
		justifyContent: 'center',
		fontSize: 43,
		margin: 10,
		color: '#60A147',
		fontFamily: 'Arial Rounded MT Bold',
		textAlign: 'center',
	},
});

