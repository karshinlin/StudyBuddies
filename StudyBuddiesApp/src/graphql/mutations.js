/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createConversation = `mutation CreateConversation($createdAt: String, $id: ID!, $name: String!) {
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
`;
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
`;
export const createUser = `mutation CreateUser($username: String!) {
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
    username
    registered
  }
}
`;
export const createUserConversations = `mutation CreateUserConversations($conversationId: ID!, $userId: ID!) {
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
`;
