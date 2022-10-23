import { useQuery, useSubscription } from '@apollo/client';
import MessageOperations from '../../../graphql/operations/message';
import { ConversationParticipant, IConversation } from '../../../utils/types';
import Input from './Input';
import Message from './Message/Message';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Session } from 'next-auth';
import ParticipantList from '../conversations/ConversationListModal/ParticipantsList';

interface IFeedProps {
  openConversation: IConversation;
  messages: Array<any>;
  chatParticipant: ConversationParticipant;
}

const Feed: React.FC<IFeedProps> = ({
  openConversation,
  messages,
  chatParticipant,
}) => {
  console.log(messages);
  return (
    <>
      <ul className=' h-full overflow-y-auto'>
        {messages?.map((msg: any) => {
          return (
            <Message key={msg.id} msg={msg} participant={chatParticipant} />
          );
        })}
      </ul>
      <Input
        participant={chatParticipant}
        openConversation={openConversation}
      />
    </>
  );
};

export default Feed;
