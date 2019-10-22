/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const allMessage = `query AllMessage($after: String, $conversationId: ID!, $first: Int) {
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
`;
export const allMessageConnection = `query AllMessageConnection($after: String, $conversationId: ID!, $first: Int) {
  allMessageConnection(
    after: $after
    conversationId: $conversationId
    first: $first
  ) {
    messages {
      author {
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
      sender
    }
    nextToken
  }
}
`;
export const allMessageFrom = `query AllMessageFrom(
  $after: String
  $conversationId: ID!
  $first: Int
  $sender: String!
) {
  allMessageFrom(
    after: $after
    conversationId: $conversationId
    first: $first
    sender: $sender
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
export const allUser = `query AllUser($after: String, $first: Int) {
  allUser(after: $after, first: $first) {
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
export const me = `query Me {
  me {
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
