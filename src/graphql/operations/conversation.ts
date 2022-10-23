import { gql } from '@apollo/client';

export default {
  Query: {
    getConversations: gql`
      query GetConversations($userId: String!) {
        getConversations(userId: $userId) {
          id
          owner {
            id
            username
            image
          }
          participants {
            id
            lastSeenDate
            user {
              id
              username
              image
            }
          }
          messages {
            id
            text
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
      }
    `,
  },
  Mutations: {
    createConversation: gql`
      mutation createConversation($participantUserIds: [String!]) {
        createConversation(participantUserIds: $participantUserIds) {
          success
          error
        }
      }
    `,
    lastSeenDate: gql`
      mutation lastSeenDate($participantId: String!, $conversationId: String!) {
        lastSeenDate(
          participantId: $participantId
          conversationId: $conversationId
        )
      }
    `,
  },
};
