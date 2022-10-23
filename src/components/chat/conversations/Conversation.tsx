import { ConversationParticipant, IConversation } from '../../../utils/types';
import ConversationOperations from '../../../graphql/operations/conversation';
import Avatar from '../Avatar';
import { useMutation } from '@apollo/client';
import { useContext } from 'react';
import { UserContext } from '../../../context/user';

interface IConversationProps {
  convo: IConversation;
  isOpen: boolean;
  onClick: (conversation: IConversation) => void;
}

const Conversation: React.FunctionComponent<IConversationProps> = ({
  convo,
  onClick: openConversation,
  isOpen,
}) => {
  const userCtx = useContext(UserContext);
  const lastMessage = convo.messages[convo.messages.length - 1];
  const avatarSrc = lastMessage
    ? lastMessage?.participant.user.image
    : convo.owner.image;

  const participant = convo.participants.find(
    (p) => p.user.id === userCtx?.id
  )!;

  const [lastSeenDate] = useMutation(
    ConversationOperations.Mutations.lastSeenDate
  );

  return (
    <li
      key={convo.id}
      className={`p-2 flex items-center gap-4 hover:bg-neutral-700 cursor-pointer rounded  ${
        isOpen && 'bg-neutral-700'
      }`}
      onClick={() => {
        openConversation(convo);
        lastSeenDate({
          variables: {
            participantId: participant.id,
            conversationId: convo.id,
          },
        });
      }}
    >
      <div
        className={` w-2 h-2 -mr-2 rounded-full ${
          participant.lastSeenDate < lastMessage?.dateSent &&
          participant.id !== lastMessage?.participant.id
            ? 'bg-blue-600'
            : ''
        }`}
      />

      <div className='flex items-center p-2 '>
        <Avatar src={avatarSrc} size={50} />
      </div>
      <div>
        {convo.participants.map((p: any, index) => {
          return (
            <span key={p.user.id}>
              {p.user.username} {convo.participants.length !== index + 1 && ','}{' '}
            </span>
          );
        })}
        <p>{lastMessage?.text}</p>
      </div>
    </li>
  );
};

export default Conversation;
