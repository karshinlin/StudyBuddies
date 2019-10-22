createConversation = '''mutation CreateConversation($createdAt: String, $id: ID!, $name: String!) {
  createConversation(createdAt: $createdAt, id: $id, name: $name) {
    createdAt
    id
    messages {
      messages {
        author {
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
        content
        conversationId
        createdAt
        id
        isSent
        recipient {
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
        sender
      }
      nextToken
    }
    name
  }
}
'''

createUser = '''mutation CreateUser($username: String!) {
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
'''

createUserConversation = '''mutation CreateUserConversations($conversationId: ID!, $userId: ID!) {
  createUserConversations(conversationId: $conversationId, userId: $userId) {
    associated {
      associated {
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
      conversation {
        createdAt
        id
        messages {
          messages {
            content
            conversationId
            createdAt
            id
            isSent
            sender
          }
          nextToken
        }
        name
      }
      conversationId
      user {
        cognitoId
        conversations {
          nextToken
          userConversations {
            conversationId
            userId
          }
        }
        id
        messages {
          messages {
            content
            conversationId
            createdAt
            id
            isSent
            sender
          }
          nextToken
        }
        username
        registered
      }
      userId
    }
    conversation {
      createdAt
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
      name
    }
    conversationId
    user {
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
    userId
  }
}
'''