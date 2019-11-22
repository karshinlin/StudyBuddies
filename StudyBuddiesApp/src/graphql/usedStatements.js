export const meQuery = `query Me {
  me {
    cognitoId
    conversations {
      nextToken
      userConversations {
        conversation {
          createdAt
          id
          messages {
            nextToken
          }
          name
        }
        conversationId
        userId
      }
    }
    id
    username
    registered
  }
}
`

export const createUserStatement = `mutation CreateUser($username: String!) {
	createUser(username: $username) {
	  cognitoId
	  conversations {
		nextToken
		userConversations {
		  associated {
			associated {
			  conversationId
			  userId
			}
			conversation {
			  createdAt
			  id
			  name
			}
			conversationId
			user {
			  cognitoId
			  id
			  username
			  registered
			}
			userId
		  }
		  conversation {
			createdAt
			id
			messages {
			  nextToken
			}
			name
		  }
		  conversationId
		  user {
			cognitoId
			conversations {
			  nextToken
			}
			id
			messages {
			  nextToken
			}
			username
			registered
		  }
		  userId
		}
	  }
	  id
	  username
	  registered
	}
  }
`
export const getMessages = `query AllMessage($after: String, $conversationId: ID!, $first: Int) {
	allMessage(after: $after, conversationId: $conversationId, first: $first) {
	  author {
		cognitoId
		conversations {
		  nextToken
		  userConversations {
			associated {
			  conversationId
			  userId
			}
			conversation {
			  createdAt
			  id
			  name
			}
			conversationId
			user {
			  cognitoId
			  id
			  username
			  registered
			}
			userId
		  }
		}
		id
		messages {
		  messages {
			author {
			  cognitoId
			  id
			  username
			  registered
			}
			content
			conversationId
			createdAt
			id
			isSent
			recipient {
			  cognitoId
			  id
			  username
			  registered
			}
			sender
		  }
		  nextToken
		}
		username
		registered
	  }
	  content
	  conversationId
	  createdAt
	  id
	  isSent
	  recipient {
		cognitoId
		conversations {
		  nextToken
		  userConversations {
			associated {
			  conversationId
			  userId
			}
			conversation {
			  createdAt
			  id
			  name
			}
			conversationId
			user {
			  cognitoId
			  id
			  username
			  registered
			}
			userId
		  }
		}
		id
		messages {
		  messages {
			author {
			  cognitoId
			  id
			  username
			  registered
			}
			content
			conversationId
			createdAt
			id
			isSent
			recipient {
			  cognitoId
			  id
			  username
			  registered
			}
			sender
		  }
		  nextToken
		}
		username
		registered
	  }
	  sender
	}
  }
`

export const subscribeToNewMessages = `subscription SubscribeToNewMessage($conversationId: ID!) {
	subscribeToNewMessage(conversationId: $conversationId) {
	  author {
		cognitoId
		conversations {
		  nextToken
		  userConversations {
			associated {
			  conversationId
			  userId
			}
			conversation {
			  createdAt
			  id
			  name
			}
			conversationId
			user {
			  cognitoId
			  id
			  username
			  registered
			}
			userId
		  }
		}
		id
		messages {
		  messages {
			author {
			  cognitoId
			  id
			  username
			  registered
			}
			content
			conversationId
			createdAt
			id
			isSent
			recipient {
			  cognitoId
			  id
			  username
			  registered
			}
			sender
		  }
		  nextToken
		}
		username
		registered
	  }
	  content
	  conversationId
	  createdAt
	  id
	  isSent
	  recipient {
		cognitoId
		conversations {
		  nextToken
		  userConversations {
			associated {
			  conversationId
			  userId
			}
			conversation {
			  createdAt
			  id
			  name
			}
			conversationId
			user {
			  cognitoId
			  id
			  username
			  registered
			}
			userId
		  }
		}
		id
		messages {
		  messages {
			author {
			  cognitoId
			  id
			  username
			  registered
			}
			content
			conversationId
			createdAt
			id
			isSent
			recipient {
			  cognitoId
			  id
			  username
			  registered
			}
			sender
		  }
		  nextToken
		}
		username
		registered
	  }
	  sender
	}
  }
`

export const createMessage = `mutation CreateMessage(
	$content: String
	$conversationId: ID!
	$createdAt: String!
	$id: ID!
  ) {
	createMessage(
	  content: $content
	  conversationId: $conversationId
	  createdAt: $createdAt
	  id: $id
	) {
	  content
	  conversationId
	  createdAt
	  id
	  isSent
	  sender
	}
  }
`

export const createUserConversation = `mutation CreateUserConversations($conversationId: ID!, $userId: ID!) {
	createUserConversations(conversationId: $conversationId, userId: $userId) {
	  conversationId
	  userId
	}
  }
`