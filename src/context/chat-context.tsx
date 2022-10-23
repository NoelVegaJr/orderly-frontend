import { useQuery } from '@apollo/client';
import { Session } from 'next-auth';
import { createContext, Dispatch, SetStateAction, useState } from 'react';
import ConversationOperations from '../graphql/operations/conversation';
import { IConversation } from '../utils/types';
interface IChatProviderProps {
  session: Session;
  children: JSX.Element | JSX.Element[];
}

interface IChatContext {
  conversation?: IConversation;
  setConversation: Dispatch<SetStateAction<IConversation | undefined>>;
}

export const ChatContext = createContext<IChatContext>({
  conversation: undefined,
  setConversation: () => {},
});

const ChatProvider: React.FC<IChatProviderProps> = ({ session, children }) => {
  const [conversation, setConversation] = useState<IConversation>();

  return (
    <ChatContext.Provider value={{ conversation, setConversation }}>
      {children}
    </ChatContext.Provider>
  );
};

export default ChatProvider;
