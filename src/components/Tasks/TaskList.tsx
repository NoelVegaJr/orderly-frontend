import * as React from 'react';
import { useState } from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { IConversation } from '../../utils/types';
import AddTaskButton from './AddTask';
import Task from './Task';

interface ITaskListProps {
  taskList: any;
  conversation: IConversation;
  index: number;
}
const TaskList: React.FunctionComponent<ITaskListProps> = ({
  taskList,
  conversation,
  index,
}) => {
  const [editingTitle, setEditingTitle] = useState(false);
  const [title, setTitle] = useState(taskList.title);
  const { tasks } = taskList;

  return (
    <Draggable key={taskList.id} draggableId={taskList.id} index={index}>
      {(provided, snapshot) => {
        return (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className='w-60   p-2 bg-neutral-600 flex flex-col  max-h-full   gap-2   rounded-lg  h-fit border border-neutral-500'
          >
            {!editingTitle ? (
              <p
                onClick={() => {
                  setEditingTitle(true);
                }}
                className='text-white p-2 font-semibold'
              >
                {title}
              </p>
            ) : (
              <input
                type='text'
                value={title}
                autoFocus
                onBlur={() => {
                  setEditingTitle(false);
                }}
                onChange={(e) => setTitle(e.target.value)}
                onKeyUp={(e) => e.key === 'Enter' && setEditingTitle(false)}
                className='p-2 outline-none rounded font-semibold'
              />
            )}
            <Droppable droppableId={`${taskList.id}`}>
              {(provided, snapshot) => {
                return (
                  <ul
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className='grow flex flex-col gap-2  overflow-y-auto p-2'
                  >
                    {tasks?.map((task: any, index: number) => {
                      return (
                        <Task
                          key={task.id}
                          id={task.id}
                          title={task.title}
                          index={index}
                        />
                      );
                    })}
                    {provided.placeholder}
                  </ul>
                );
              }}
            </Droppable>
            <AddTaskButton
              taskListId={taskList.id}
              conversation={conversation}
            />
          </div>
        );
      }}
    </Draggable>
  );
};

export default TaskList;
