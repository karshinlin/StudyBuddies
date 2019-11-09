import React from 'react';
import {ActivityIndicator, StyleSheet, Text, TextInput, Button, Alert, View} from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';
import { Auth } from 'aws-amplify';
import stylesheet from './styles.js';

export default class LeaderboardScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			tableHead: ['Rank','User', 'Points'],
			tableData: null
		};
		this.params = this.props.params;
		this.fetchLeaderboard = this.fetchLeaderboard.bind(this);
	}

	componentDidMount() {
		this.fetchLeaderboard();
	}

	fetchLeaderboard() {
		var url = global.url + "getLeaderboard?userId=" + Auth.user.attributes.sub;
		return fetch(url)
		  .then(response => response.json())
		  .then(leaderboard => {
			const data = Object.keys(leaderboard['name'])
				.map(i => [
					parseInt(i) + 1,
					leaderboard['name'][i], 
					leaderboard['points'][i]
				]);
			console.log(data);
			this.setState({
			  tableData: data
			});
		  })
	  }
	
  	render() {
		return (<View style={styles.container}>
			<Text style={stylesheet.title}>Leaderboard</Text>
			{!this.state.tableData ? 
				<ActivityIndicator size="large" color="#0000ff" />
			:
			<View >
				<Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
					<Row data={this.state.tableHead} style={styles.head} textStyle={styles.text}/>
					<Rows data={this.state.tableData} style={styles.data} textStyle={styles.text}/>
				</Table>
			</View>
		}

		</View>)
	}
}

const styles = StyleSheet.create({
	container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
	head: { height: 40, backgroundColor: '#f1f8ff' },
	data: { height: 40, backgroundColor: 'white' },
	text: { margin: 6 },

  });
