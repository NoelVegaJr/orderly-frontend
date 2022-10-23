import { Session } from 'next-auth';
import * as React from 'react';
import CreateUsername from './create-username';
import ProviderButton from './provider-button';

interface IAuthProps {
  session: Session | null;
}

const Auth: React.FunctionComponent<IAuthProps> = ({ session }) => {
  return (
    <div className='h-full text-white grid place-content-center'>
      {session ? (
        <CreateUsername />
      ) : (
        <div className='bg-slate-800/40 p-8 rounded-lg border border-gray-700'>
          <p className='text-3xl text-center mb-12'>Sign in</p>
          <div className='flex flex-col gap-4 '>
            <ProviderButton provider='google' imgSrc={'/images/googlelogo.png'}>
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
};

export default Auth;
