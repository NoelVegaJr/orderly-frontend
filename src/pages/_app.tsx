import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';
import { Toaster } from 'react-hot-toast';
import { client } from '../graphql/apollo-client';
import { ApolloProvider } from '@apollo/client';

function MyApp({ Component, pageProps }: AppProps<{ session: Session }>) {
  return (
    <ApolloProvider client={client}>
      <SessionProvider session={pageProps.session}>
        <Component {...pageProps} />
        <Toaster />
      </SessionProvider>
    </ApolloProvider>
  );
}

export default MyApp;
