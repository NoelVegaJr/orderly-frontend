import * as React from 'react';
import { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import task from '../../graphql/operations/task';
import TaskModal from './TaskModal';

interface ITaskProps {
  index: number;
  id: string;
  title: string;
}

const Task: React.FunctionComponent<ITaskProps> = ({ id, title, index }) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  return (
    <>
      <Draggable key={id} draggableId={id} index={index}>
        {(provided, snapshot) => {
          return (
            <li
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              className='list-none bg-white rounded p-2 border'
              onClick={() => setShowModal(true)}
            >
              {title}
            </li>
          );
        }}
      </Draggable>
      {showModal && (
        <TaskModal taskId={id} onClose={() => setShowModal(false)} />
      )}
    </>
  );
};

export default Task;
