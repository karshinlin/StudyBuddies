import React from 'react'

import uuid from 'uuid/v4'
import { TextInput, View, Text, SafeAreaView, Button, ScrollView, ActivityIndicator, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback} from 'react-native'
import { Auth, API, graphqlOperation} from 'aws-amplify'
import { meQuery as Me, getMessages as GetMessages, createUserStatement as CreateUser, subscribeToNewMessages, createMessage, createUserConversation } from './graphql/usedStatements.js'
import DialogInput from 'react-native-dialog-input';

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
		this.state = {
			isLoading: true,
			message: '',
			messages: [],
			changer: false,
			isDialogVisible: false
		};
		this.params = this.props.params;
		this.createMessage = this.createMessage.bind(this);
		this.checkUserExists = this.checkUserExists.bind(this);
		this.createUser = this.createUser.bind(this);
		this.getMessages = this.getMessages.bind(this);
		this.getConversationId = this.getConversationId.bind(this);
		this.getGroupMembers = this.getGroupMembers.bind(this);
		this.changeGroupName = this.changeGroupName.bind(this);
		this.checkUserExists();
		this.getGroupMembers();
	}
	componentDidMount() {
		//this.scrollToBottom()
		//this.props.subscribeToNewMessages()
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

	async getGroupMembers() {
		var url = global.url + "getGroupMemberNames?userId=" + Auth.user.attributes.sub;
		console.log("url:" + url);
		return await fetch(url)
			.then(response => response.json())
			.then(response => {
				console.log("group members: ", response)
				this.setState({groupMembers: response})
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

	changeGroupName(newName) {
		console.log(newName)
		var url = global.url + "changeGroupName";
		fetch(url, {
			method: 'POST',
			headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
			body: JSON.stringify({
				userId: Auth.user.attributes.sub,
				groupName: newName,
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
		const conversationName = this.state.groupMembers["groupName"] ? this.state.groupMembers["groupName"] : "Study Buddies Group";
		const username = this.username;
		messages = this.state.messages;
		messages = messages.sort((a, b) => a.createdAt - b.createdAt)
		lastSender = "";
		return (
		  <SafeAreaView style={styles.conversationPage} >
			<TouchableWithoutFeedback onLongPress={() => this.setState({isDialogVisible: true})}>
				<View style={styles.conversationNameContainer}>
					<Text style={styles.conversationName}>{conversationName}</Text>
				</View>
			</TouchableWithoutFeedback>
			<DialogInput isDialogVisible={this.state.isDialogVisible}
				message={"Change your group name here!"}
				hintInput ={"NEW GROUP NAME"}
				submitInput={ (inputText) => {this.changeGroupName(inputText); this.setState({isDialogVisible: false}); this.state.groupMembers["groupName"] = inputText} }
				closeDialog={ () => {this.setState({isDialogVisible: false})} }>
			</DialogInput>
			<KeyboardAvoidingView style={{flex: 1, flexDirection: 'column'}} enabled behavior='height' keyboardVerticalOffset={64}>
				<View style={styles.messagesContainer} >
					<ScrollView 
					ref={(scroll) => {this.scroll = scroll;}}
					onContentSizeChange={() => this.scroll.scrollToEnd()}
					>
					{
						messages.length == 0 ? <View></View> :
						messages.map((m, i) => {
							var sameSender = false
							var marginTopToUse = 6;
							if (m.sender == lastSender) {
								var marginTopToUse = 2;
								sameSender = true;
							}
							lastSender = m.sender;
							return (
								<View key={i} style={{ margin: marginTopToUse}}>
									{sameSender ? null : <Text style={styles.messageText, [{ paddingTop: 0, fontSize: 12 }, checkSenderForAlignment(username, m)]}>{this.state.groupMembers[m.sender]}</Text>}
									<View key={i} style={[styles.message, checkSenderForMessageStyle(username, m)]}>
										<Text style={[styles.messageText, checkSenderForTextStyle(username, m)]}>{m.content}</Text>
									</View>
									<Text style={styles.messageText, [{ paddingTop: 0, fontSize: 12 }, checkSenderForAlignment(username, m)]}>{ (new Date(parseInt(m.createdAt))).toLocaleString('en-US', { year: '2-digit', month: '2-digit', day: '2-digit', hour:'numeric', minute:'numeric', hour12: true } ) }</Text>
								</View>
							)
						})
					}
					</ScrollView>
				</View>
				
				<View style={styles.inputContainer} >
					<TextInput
						style={styles.input}
						placeholder='Message'
						name='message'
						multiline = {true}
						numberOfLines = {4}
						blurOnSubmit={true}
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
			</KeyboardAvoidingView>
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

function checkSenderForAlignment(username, message) {
	if (username === message.sender) {
		return {
			marginLeft: 50, 
			textAlign: 'right'
		}
	} else {
	  	return { marginRight: 50, textAlign: 'left' }
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
		flex: .9
	},
	message: {
		backgroundColor: "#ededed",
		borderRadius: 10,
		//margin: 10,
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
		position: 'relative',
		flex: .1,
		//bottom: 20,
		//left: 0,
		justifyContent: 'flex-end',
		flexDirection: 'row'
	}
}