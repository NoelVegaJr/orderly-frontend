import { gql } from '@apollo/client';
export default {
  Queries: {
    getMessages: gql`
      query GetMessages($conversationId: String!) {
        getMessages(conversationId: $conversationId) {
          id
          text
          conversationId
          dateSent
          participant {
            id
            user {
              id
              username
              image
            }
          }
        }
      }
    `,
  },
  Mutations: {
    createMessage: gql`
      mutation CreateMessage(
        $conversationId: String!
        $text: String!
        $participantId: String!
      ) {
        createMessage(
          conversationId: $conversationId
          text: $text
          participantId: $participantId
        ) {
          success
          error
        }
      }
    `,
    createNewMessage: gql`
      mutation CreateMessage(
        $conversationId: String!
        $text: String!
        $participantId: String!
      ) {
        newMessage(
          conversationId: $conversationId
          text: $text
          participantId: $participantId
        ) {
          success
          error
        }
      }
    `,
  },
  Subscriptions: {
    msg2: gql`
      subscription NewMessage($conversationIds: [String!]) {
        msg2(conversationIds: $conversationIds) {
          id
          text
          conversationId
          dateSent
          participant {
            id
            user {
              id
              username
              image
            }
          }
        }
      }
    `,
  },
};
