import React from 'react'

import uuid from 'uuid/v4'
import { TextInput, View, Text, SafeAreaView, Button, ScrollView, ActivityIndicator } from 'react-native'
import { Auth, API, graphqlOperation} from 'aws-amplify'
import { meQuery as Me, getMessages as GetMessages, createUserStatement as CreateUser, subscribeToNewMessages, createMessage, createUserConversation } from './graphql/usedStatements.js'

export default class Conversation extends React.Component {
	constructor(props) {
		super(props);
		this.scroll = null;
		const message1 = {
			"id": uuid(),
			"createdAt": Date.now(),
			"content": "First Message",
			"conversationId": "myNewId",
			"authorId": "d628469a-6679-40d8-b69f-c13f8394b05e"
		}
		const message2 = {
			"id": uuid(),
			"createdAt": Date.now(),
			"content": "Second Message",
			"conversationId": "myNewId",
			"authorId": "d628469a-6679-40d8-b69f-c13f8394b05e"
		}
		this.state = {
			isLoading: true,
			message: '',
			messages: [],
			changer: false
		};
		this.params = this.props.params;
		this.createMessage = this.createMessage.bind(this);
		this.checkUserExists = this.checkUserExists.bind(this);
		this.createUser = this.createUser.bind(this);
		this.getMessages = this.getMessages.bind(this);
		this.getConversationId = this.getConversationId.bind(this);
		this.checkUserExists();
	}
	componentDidMount() {
		//this.scrollToBottom()
		//this.props.subscribeToNewMessages()
	}

	onChange = e => {
		this.setState({ [e.target.name]: e.target.value })
	}

	async checkUserExists() {
		try {
			const user = await Auth.currentAuthenticatedUser();
			this.username = user.username;
			this.email = user.signInUserSession.idToken.payload.email;
		} catch (err) {
			console.log('error getting user data...', err)
		}
		console.log('username: ' + this.username);

		if (this.username === '') {
			return;
		}
		
		try {
			var user = await API.graphql(graphqlOperation(Me))
			var getUser = user.data;
			if (!getUser.me) {
				await this.createUser();
			}

			user = await API.graphql(graphqlOperation(Me))
			var userData = user.data;
			if (userData.me.conversations.userConversations.length == 0) {
				// find convoId
				this.getConversationId().then(async () => {
					await API.graphql(graphqlOperation(createUserConversation, {conversationId: this.convoId, userId: this.username}))
				}).catch((err) => {
					console.log("error creating UserConversation:", err);
				})
			} else {
				this.convoId = userData.me.conversations.userConversations[0].conversationId;
			}
			user = await API.graphql(graphqlOperation(Me))
			userData = user.data;
			console.log("userData:", userData);
			
			this.convoName = "Study Buddies Group";
			
			console.log("convoId: " + this.convoId)
			this.getMessages();
		} catch (err) {
			console.log('error fetcing user: ', err);
		}
		
	}

	getConversationId() {
		var url = global.url + "getConversationId?userId=" + Auth.user.attributes.sub;
		console.log("url:" + url);
		return fetch(url)
			.then(response => response.json())
			.then(response => {
				console.log("userId:" + response['userId'] + " convoId:" + response["conversationId"]);
				this.convoId = response["conversationId"]
			})
			.catch((error) => {

			});
	}

	async getMessages() {
		if (!this.convoId) {
			console.log("no convoId");
			return 
		}
		try {
			const retrievedMessages = await API.graphql(graphqlOperation(GetMessages, {conversationId: this.convoId}))
			console.log("retrievedMessages for " + this.convoId + ": ", retrievedMessages.data.allMessage)
			if (retrievedMessages.data.allMessage) {
				for (var i = 0; i < retrievedMessages.data.allMessage.length; i++) {
					this.state.messages.push(retrievedMessages.data.allMessage[i])
				}
			}
		} catch (err) {
			console.log("failed to retrieve messages:", err)
		}
		this.setState({isLoading: false})
		try {
			// Subscribe to creation of Todo
			var subscription = await API.graphql(
				graphqlOperation(subscribeToNewMessages, {conversationId: this.convoId})
			).subscribe({
				next: (todoData) => {
					console.log("todoData:" + JSON.stringify(todoData.value.data.subscribeToNewMessage));
					if(todoData.value.data.subscribeToNewMessage.sender !== this.username) {
						//this.setState({changer: !this.state.changer})
						this.state.messages.push(todoData.value.data.subscribeToNewMessage);
						this.forceUpdate();
					} 
				}
			});
		} catch (err) {
			console.log("failed to subscribe: ", err)
		}
		
	}

	async createUser() {
		try {
			await API.graphql(graphqlOperation(CreateUser, { username: this.username }))
			console.log("created user: " + this.username)
		} catch (err) {
			console.log('Error creating user! :', err)
		}
	}

	async createMessage() {
		if (this.state.message === '') return
		const username  = this.username;
		const convoId = this.convoId;
		const message = {
			"id": uuid(),
			"createdAt": Date.now(),
			"conversationId": convoId,
			"content": this.state.message,
			"authorId": username,
			"sender": username
		}
		this.state.messages.push(message);
		console.log("Creating message: " + this.state.message);
		try {
			await API.graphql(graphqlOperation(createMessage, message ))
		} catch (err) {
			console.log('Error creating message! :', err)
		}
		this.setState({ message: '' })
	}

	render() {
		if (this.state.isLoading) {
			return (
				<View style={{ paddingTop: 25 }}>
					<ActivityIndicator size="large" color="#0000ff" />
				</View>
			);
		}
		// const { conversationName } = this.props.match.params
		// const { username } = UserStore
		// let { messages } = this.props
		const conversationName = "Study Buddies Group";
		const username = this.username;
		messages = this.state.messages;
		messages = messages.sort((a, b) => a.createdAt - b.createdAt)
		return (
		  <SafeAreaView style={styles.conversationPage}>
			<View style={styles.conversationNameContainer}>
			  <Text style={styles.conversationName}>{conversationName}</Text>
			</View>
			<View style={styles.messagesContainer}>
				<ScrollView 
				ref={(scroll) => {this.scroll = scroll;}}
				onContentSizeChange={() => this.scroll.scrollToEnd()}
				>
				{
					messages.length == 0 ? <View></View> :
					messages.map((m, i) => {
					return (
						<View key={i} style={[styles.message, checkSenderForMessageStyle(username, m)]}>
						<Text style={[styles.messageText, checkSenderForTextStyle(username, m)]}>{m.content}</Text>
						</View>
					)
					})
				}
				</ScrollView>
			</View>
			
			<View style={styles.inputContainer}>
				<TextInput
					style={styles.input}
					placeholder='Message'
					name='message'
					multiline = {true}
					numberOfLines = {4}
					onChangeText={(text) => this.setState({message : text})}
					value={this.state.message}
				/>
				<Button
					onPress={() => {
						this.createMessage();
					}}
					title="Send"
				/>
			</View>
		  </SafeAreaView>
		)
	}
}

function checkSenderForMessageStyle(username, message) {
	if (username === message.sender) {
		return {
			backgroundColor: '#1b86ff',
			marginLeft: 50
		}
	} else {
	  	return { marginRight: 50 }
	}
}
  
function checkSenderForTextStyle(username, message) {
	if (username === message.sender) {
		return {
			color: 'white'
		}
	}
}

const styles = {
	conversationPage: {
		flexDirection: 'column',
		flex: 1
	},
	conversationNameContainer: {
		backgroundColor: '#fafafa',
		padding: 20,
		borderBottom: '1px solid #ddd',
	},
	conversationName: {
		margin: 0,
		fontSize: 16,
		fontWeight: "500"
	},
	messagesContainer: {
		flex: .8
	},
	message: {
		backgroundColor: "#ededed",
		borderRadius: 10,
		margin: 10,
		padding: 20
	},
	messageText: {
		margin: 0
	},
	input: {
		height: 60,
		borderRadius: 2,
		margin: 5,
		borderRadius: 10,
		padding: 5,
		fontSize: 18,
		width: '80%',
		borderWidth: 0.5,
    	borderColor: '#d6d7da',
	},
	inputContainer: {
		width: '100%',
		position: 'absolute',
		bottom: 50,
		left: 0,
		justifyContent: 'flex-end',
		flexDirection: 'row'
	}
}