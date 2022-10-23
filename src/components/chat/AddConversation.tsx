import ConversationModal from './conversations/ConversationListModal/ConversationListModal';
import { useContext, useState } from 'react';

interface AddConvoProps {}

const AddConvo: React.FunctionComponent<AddConvoProps> = () => {
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className='px-4 py-2 bg-neutral-900 w-full'
      >
        Start a conversation
      </button>
      {showModal && <ConversationModal close={() => setShowModal(false)} />}
    </>
  );
};

export default AddConvo;
