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
			refreshing: false,
			error: false,
			time: 30,
			groupMembers: null,
			questions: null
		};
		this.params = this.props.params;
		this.fetchQuestions = this.fetchQuestions.bind(this);
		this.getGroupMembers = this.getGroupMembers.bind(this);
		this.onRefresh = this.onRefresh.bind(this);
	}

	componentDidMount() {
		this.fetchQuestions();
		this.getGroupMembers();
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
					error: false,
					refreshing: false
				}, function () {
					console.log("questions: " + JSON.stringify(this.state['questions']));
				});
			})
			.catch((error) => {
				this.setState({
					questions: "",
					error: true
				})
			});
	}

	async getGroupMembers() {
		var url = global.url + "getGroupMemberNames?userId=" + Auth.user.attributes.sub;
		console.log("url:" + url);
		return await fetch(url)
			.then(response => response.json())
			.then(response => {
				this.setState({groupMembers: response})
			})
			.catch((error) => {
				console.log(error);
			});
	}

	onRefresh() {
		this.setState({ refreshing: true }, 
			function() { this.fetchQuestions() }
			);
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
		if (!this.state.questions || !this.state.groupMembers) {
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
					renderItem={({ item: { questionId, questionText, askDate, askedBy, answers } }) => (
						<AnsweredQuestionCard 
							questionText={questionText} 
							askDate={askDate} 
							askedBy={askedBy}
							id={questionId} 
							answers={answers}
							groupMembers={this.state.groupMembers}
							clear={true} />
					)}
					onRefresh={() => this.onRefresh()}
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
	},
	title: {
		flex: 1,
		justifyContent: 'center',
		fontSize: 43,
		margin: 10,
		color: '#60A147',
		fontFamily: 'Arial Rounded MT Bold',
		textAlign: 'center',
	},
});

