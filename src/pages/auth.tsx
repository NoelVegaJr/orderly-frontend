import { GetServerSideProps, NextPageContext } from 'next';
import { Session } from 'next-auth';
import { getSession, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import * as React from 'react';
import CreateUsername from '../components/auth/create-username';
import ProviderButton from '../components/auth/provider-button';

interface IAuthProps {
  session: Session;
}

export const getServerSideProps = async (context: NextPageContext) => {
  const session = await getSession(context);
  console.log(session);
  if (session?.user?.username) {
    return {
      redirect: {
        destination: '/demo',
        permanent: false,
      },
    };
  } else {
    return {
      props: { session },
    };
  }
};

const Auth: React.FunctionComponent<IAuthProps> = ({ session }) => {
  console.log(session);

  if (!session?.user?.username) {
    return (
      <div className='h-screen bg-slate-900  text-white flex flex-col justify-center p-6'>
        {session ? (
          <CreateUsername />
        ) : (
          <div className='bg-slate-800/40 w-full p-6  rounded-lg border border-gray-700 max-w-xl mx-auto'>
            <p className='text-3xl text-center mb-12'>Sign in</p>
            <div className='flex flex-col gap-4 '>
              <ProviderButton
                provider='google'
                imgSrc={'/images/googlelogo.png'}
              >
                Google
              </ProviderButton>
              <ProviderButton
                provider='linkedin'
                imgSrc={'/images/LI-In-Bug.png'}
              >
                LinkedIn
              </ProviderButton>
              <ProviderButton
                provider='github'
                imgSrc={'/images/GitHub-Mark-Light-64px.png'}
              >
                Github
              </ProviderButton>
            </div>
          </div>
        )}
      </div>
    );
  } else {
    return <div>Hello</div>;
  }
};

export default Auth;
