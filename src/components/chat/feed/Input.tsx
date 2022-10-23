import { useMutation } from '@apollo/client';

import { useState } from 'react';
import MessageOperations from '../../../graphql/operations/message';
import ConversationOperations from '../../../graphql/operations/conversation';
import { ConversationParticipant, IConversation } from '../../../utils/types';
interface IInputProps {
  openConversation: IConversation;
  participant: ConversationParticipant;
}

const Input: React.FunctionComponent<IInputProps> = ({
  openConversation,
  participant,
}) => {
  const [message, setMessage] = useState<string>('');

  const [createMessage, { loading, error }] = useMutation(
    MessageOperations.Mutations.createNewMessage
  );

  const submitMessage = async () => {
    setMessage('');

    await createMessage({
      variables: {
        conversationId: openConversation.id,
        participantId: participant.id,
        text: message,
      },
    });
  };
  return (
    <div className='w-full p-4'>
      <input
        type='text'
        placeholder='Message'
        className='bg-neutral-900 border border-neutral-600 outline-none w-full p-2 rounded-lg text-white'
        onChange={(e) => setMessage(e.target.value)}
        onKeyUp={(e) => e.key === 'Enter' && submitMessage()}
        value={message}
      />
    </div>
  );
};

export default Input;
