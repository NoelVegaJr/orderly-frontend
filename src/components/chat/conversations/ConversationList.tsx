import { Dispatch, SetStateAction } from 'react';
import Conversation from './Conversation';
import { IConversation } from '../../../utils/types';

interface ConversationListProps {
  convos: IConversation[];
  setOpenConvo: Dispatch<SetStateAction<IConversation | undefined>>;
  openConvo: IConversation;
}

const ConversationList: React.FC<ConversationListProps> = ({
  convos,
  setOpenConvo,
  openConvo,
}) => {
  return (
    <ul className=' rounded grow bg-neutral-800 flex flex-col gap-1 overflow-y-auto'>
      {convos?.map((c: IConversation) => {
        return (
          <Conversation
            key={c.id}
            convo={c}
            isOpen={c.id === openConvo.id}
            onClick={() => setOpenConvo(c)}
          />
        );
      })}
    </ul>
  );
};

export default ConversationList;
