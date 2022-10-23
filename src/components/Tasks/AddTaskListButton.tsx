import { useMutation } from '@apollo/client';
import * as React from 'react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import TaskOperations from '../../graphql/operations/task';
import {
  IConversation,
  MutationResponse,
  CreateTaskListVariables,
} from '../../utils/types';

interface IAddTaskListButtonProps {
  conversation: IConversation;
}

const AddTaskListButton: React.FunctionComponent<IAddTaskListButtonProps> = ({
  conversation,
}) => {
  const [addingList, setAddingList] = useState(false);
  const [listTitle, setListTitle] = useState<string>('');
  const [createTaskList, { loading, error }] = useMutation<
    MutationResponse,
    CreateTaskListVariables
  >(TaskOperations.Mutations.createTaskList);

  const handleCreateTaskList = () => {
    setAddingList(false);
    setListTitle('');
    const cleanTask = listTitle.trim();
    if (!cleanTask) {
      toast.error('Please enter a title for your new list');
      return;
    }
    createTaskList({
      variables: {
        conversationId: conversation.id,
        title: listTitle,
      },
      refetchQueries: [
        {
          query: TaskOperations.Query.getTaskLists,
          variables: { conversationId: conversation.id },
        },
      ],
    });
  };

  return (
    <div className=' p-2 bg-neutral-600 w-60 h-fit shrink-0  rounded'>
      {addingList ? (
        <input
          type='text'
          placeholder='List Title'
          className='outline-none p-2 w-full text-black border rounded'
          onKeyDown={(e) => e.key === 'Enter' && handleCreateTaskList()}
          onBlur={(e) => {
            setAddingList(false);
            setListTitle('');
          }}
          autoFocus
          value={listTitle}
          onChange={(e) => setListTitle(e.target.value)}
        />
      ) : (
        <button
          onClick={() => setAddingList(true)}
          className=' p-2 bg-blue-600 text-white rounded w-full'
        >
          Add Task List
        </button>
      )}
    </div>
  );
};

export default AddTaskListButton;
