import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';
import { Toaster } from 'react-hot-toast';
import { client } from '../graphql/apollo-client';
import { ApolloProvider } from '@apollo/client';
import UserProvider from '../context/user';

function MyApp({ Component, pageProps }: AppProps<{ session: Session }>) {
  return (
    <ApolloProvider client={client}>
      <SessionProvider session={pageProps.session}>
        <UserProvider>
          <Component {...pageProps} />
          <Toaster />
        </UserProvider>
      </SessionProvider>
    </ApolloProvider>
  );
}

export default MyApp;
