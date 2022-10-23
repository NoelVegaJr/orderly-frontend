import Avatar from '../chat/Avatar';
import Modal from '../Modal';
import { UserContext } from '../../context/user';
import { useContext, useState } from 'react';
import TaskOperations from '../../graphql/operations/task';
import { useMutation } from '@apollo/client';

interface TaskModalProps {
  taskId: string;
  onClose: () => void;
}

const TaskModal: React.FC<TaskModalProps> = ({ taskId, onClose }) => {
  const userCtx = useContext(UserContext);
  const [editingDescription, setEditingDescription] = useState<boolean>(false);
  const [createTaskDescription] = useMutation(
    TaskOperations.Mutations.createTaskDescription
  );

  const handleCreateTaskDescription = () => {
    createTaskDescription({ variables: { taskId, text: 'testing 123' } });
  };

  return (
    <Modal close={() => onClose()} className='w-1/2 h-1/2'>
      <div className='bg-white w-full h-full rounded overflow-hidden'>
        <p className='border text-center p-4'>{taskId}</p>
        <div className='flex h-full '>
          <div className='w-3/4 border'>
            <div className='h-3/5 border p-4'>
              <p className='font-semibold'>Description</p>
              <div>
                {!editingDescription ? (
                  <p
                    className='text-left p-2'
                    onClick={() => setEditingDescription(true)}
                  >
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea
                    soluta quos quidem ducimus officia, nesciunt eligendi
                    voluptas, alias, nihil explicabo magnam excepturi? Facere
                    molestiae recusandae perferendis asperiores, officiis
                    explicabo tenetur.
                  </p>
                ) : (
                  <textarea
                    rows={10}
                    className='w-full p-2 outline-none border border-black h-auto'
                    onBlur={() => setEditingDescription(false)}
                    onKeyUp={(e) =>
                      e.key === 'Enter' && handleCreateTaskDescription
                    }
                    autoFocus
                  >
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea
                    soluta quos quidem ducimus officia, nesciunt eligendi
                    voluptas, alias, nihil explicabo magnam excepturi? Facere
                    molestiae recusandae perferendis asperiores, officiis
                    explicabo tenetur.
                  </textarea>
                )}
              </div>
            </div>
            <div className='h-2/5 border p-2 flex flex-col gap-2'>
              <p className='text-left font-semibold'>Comments</p>
              <div className='flex gap-4'>
                <Avatar src={userCtx?.image} size={40} />
                <input
                  type='text'
                  placeholder='Enter comment'
                  className='outline-none  grow border p-2 rounded'
                />
              </div>
            </div>
          </div>
          <div className='w-1/4 border p-2'>
            <div>Options</div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default TaskModal;
