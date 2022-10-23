import { useMutation } from '@apollo/client';
import { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';
import TaskOperations from '../../graphql/operations/task';
import {
  IConversation,
  MutationResponse,
  CreateTaskVariables,
} from '../../utils/types';

interface IAddTaskListButtonProps {
  conversation: IConversation;
  taskListId: string;
}

const AddTaskListButton: React.FunctionComponent<IAddTaskListButtonProps> = ({
  taskListId,
  conversation,
}) => {
  const [addingTask, setAddingTask] = useState(false);
  const [title, setTitle] = useState<string>('');
  const [createTask, { loading, error }] = useMutation<
    MutationResponse,
    CreateTaskVariables
  >(TaskOperations.Mutations.createTask);

  const handleCreateTask = () => {
    setAddingTask(false);
    const cleanTask = title.trim();
    if (!cleanTask) {
      toast.error('Please entet a title for your new task');
      return;
    }
    createTask({
      variables: {
        taskListId,
        title,
      },
      refetchQueries: [
        {
          query: TaskOperations.Query.getTaskLists,
          variables: { conversationId: conversation.id },
        },
      ],
    });
  };

  const closeInput = (e: FormEvent) => {
    setAddingTask(false);
    setTitle('');
  };

  return (
    <>
      {addingTask ? (
        <input
          type='text'
          placeholder='Task title'
          className='outline-none p-2 text-black border rounded'
          onKeyDown={(e) => e.key === 'Enter' && handleCreateTask()}
          onBlur={closeInput}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          autoFocus
        />
      ) : (
        <button
          onClick={() => setAddingTask(true)}
          className=' p-2 bg-blue-600 text-white rounded w-full'
        >
          Add Task
        </button>
      )}
    </>
  );
};

export default AddTaskListButton;
