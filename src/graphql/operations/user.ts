import { gql } from '@apollo/client';

export default {
  Queries: {
    searchUsers: gql`
      query SearchUsers($searchedUsername: String!) {
        searchUsers(searchedUsername: $searchedUsername) {
          id
          username
          image
        }
      }
    `,
  },
  Mutation: {
    createUsername: gql`
      mutation CreateUsername($username: String) {
        createUsername(username: $username) {
          success
          error
        }
      }
    `,
    createNewMessage: gql`
      mutation CreateNewMessage($text: String) {
        createNewMessage(text: $text)
      }
    `,
  },
  Subscriptions: {
    msg: gql`
      subscription NewMessage {
        msg
      }
    `,
  },
};
