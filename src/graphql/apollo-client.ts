import { ApolloClient, HttpLink, InMemoryCache, split } from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { createClient } from 'graphql-ws';
import { getSession } from 'next-auth/react';

const { NEXT_PUBLIC_GRAPHQL_URI } = process.env;

const wsLink =
  typeof window !== 'undefined'
    ? new GraphQLWsLink(
        createClient({
          // url: 'ws://localhost:4005/graphql',
          url: `ws://${NEXT_PUBLIC_GRAPHQL_URI}/graphql`,
          connectionParams: async () => ({
            session: await getSession(),
          }),
        })
      )
    : null;

const uri = `${
  NEXT_PUBLIC_GRAPHQL_URI?.includes('localhost') ? 'http' : 'https'
}://${NEXT_PUBLIC_GRAPHQL_URI}/graphql`;

const httpLink = new HttpLink({
  // uri: `http://localhost:4005/graphql`,
  uri,
  credentials: 'include',
});

const link =
  typeof window !== 'undefined' && wsLink != null
    ? split(
        ({ query }) => {
          const def = getMainDefinition(query);
          return (
            def.kind === 'OperationDefinition' &&
            def.operation === 'subscription'
          );
        },
        wsLink,
        httpLink
      )
    : httpLink;

export const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});
