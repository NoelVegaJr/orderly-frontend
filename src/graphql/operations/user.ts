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
      mutation CreateUsername($username: String, $id: ID!) {
        createUsername(username: $username, id: $id) {
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
