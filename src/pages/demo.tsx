import { NextPageContext } from 'next';
import { Session } from 'next-auth';
import { getSession } from 'next-auth/react';
import * as React from 'react';
import Chat from '../components/chat/chat';

export const getServerSideProps = async (context: NextPageContext) => {
  const session = await getSession(context);

  console.log(session);
  if (!session?.user?.username) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      },
    };
  } else {
    return {
      props: { session },
    };
  }
};

interface IDemoPageProps {
  session: Session;
}

const DemoPage: React.FunctionComponent<IDemoPageProps> = ({ session }) => {
  return <Chat session={session} />;
};

export default DemoPage;
