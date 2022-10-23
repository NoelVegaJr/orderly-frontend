import { Session } from 'next-auth';
import FeedWrapper from './feed/FeedWrapper';
import ConversationList from './conversations/ConversationList';
import Feed from './feed/Feed';
import { useConversations } from '../../hooks/conversations';
import { useState } from 'react';
import Tasks from '../Tasks/Tasks';
import AddConvo from './AddConversation';
import UserProvider from '../../context/user';

interface ChatProps {
  session: Session;
}

const Chat: React.FC<ChatProps> = ({ session }) => {
  const { convos, openConvo, setOpenConvo, participant } = useConversations(
    session.user.id
  );

  const [view, setView] = useState('chat');

  return (
    <UserProvider>
      <div className='h-screen flex border border-red-600 bg-neutral-900'>
        <div className='text-white bg-neutral-800 w-1/4 min-w-fit h-full flex flex-col p-4 gap-4'>
          <AddConvo />
          {convos && openConvo && (
            <ConversationList
              convos={convos}
              setOpenConvo={setOpenConvo}
              openConvo={openConvo}
            />
          )}
        </div>
        <FeedWrapper>
          <div className='h-full flex flex-col'>
            <div className=' text-white flex'>
              <button
                onClick={() => setView('chat')}
                className='w-1/2 p-2 bg-neutral-700 hover:bg-neutral-800 transition-all duration-300'
              >
                chat
              </button>
              <button
                onClick={() => setView('tasks')}
                className='w-1/2 p-2 bg-neutral-700 hover:bg-neutral-800 transition-all duration-300'
              >
                tasks
              </button>
            </div>
            {openConvo && participant && (
              <>
                {view === 'chat' ? (
                  <Feed
                    messages={openConvo.messages}
                    openConversation={openConvo}
                    chatParticipant={participant}
                  />
                ) : (
                  <Tasks conversation={openConvo} />
                )}
              </>
            )}
          </div>
        </FeedWrapper>
      </div>
    </UserProvider>
  );
};

export default Chat;
