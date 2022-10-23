import { ConversationParticipant } from '../../../../utils/types';
import Avatar from './Avatart';

interface MessageProps {
  msg: any;
  participant: ConversationParticipant;
}

const Message: React.FC<MessageProps> = ({ msg, participant }) => {
  const isSender = msg.participant.id === participant.id;
  const cleanDate = new Date(Number(msg.dateSent)).toLocaleString('en-US', {
    timeStyle: 'short',
  });

  return (
    <li
      key={msg.id}
      className={` flex items-center gap-6 ${
        isSender ? 'justify-end' : 'justify-start'
      } p-2 rounded-lg text-white`}
    >
      {!isSender && (
        <div className='w-fit h-fit'>
          <Avatar src={msg.participant?.user.image} />
        </div>
      )}
      <div
        className={`w-1/2 flex flex-col gap-2 ${
          isSender ? 'items-end' : 'items-start'
        }`}
      >
        <p className='text-white'>
          {!isSender && msg.participant.user.username}
          <span className='ml-2 text-neutral-400'>{cleanDate}</span>
        </p>
        <p
          className={`${
            isSender ? 'bg-blue-600' : 'bg-neutral-500'
          } w-fit p-3 rounded-2xl`}
        >
          {msg.text}
        </p>
      </div>
    </li>
  );
};

export default Message;
