import { IConversation } from '../../utils/types';
import AddTaskListButton from './AddTaskListButton';
import TaskOperations from '../../graphql/operations/task';
import { useMutation, useQuery } from '@apollo/client';
import TaskList from './TaskList';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from 'react-beautiful-dnd';
import { useEffect, useState } from 'react';
import { reorderTaskLists, reorderTasks } from '../../utils/updateTasksOrder';

interface TasksProps {
  conversation: IConversation;
}

const Tasks: React.FunctionComponent<TasksProps> = ({ conversation }) => {
  const [reorderTaskListsMutation] = useMutation(
    TaskOperations.Mutations.reorderTaskLists
  );
  const [reoderTasks] = useMutation(TaskOperations.Mutations.reorderTasks);
  const {
    data: taskLists,
    loading,
    error,
  } = useQuery(TaskOperations.Query.getTaskLists, {
    variables: { conversationId: conversation.id },
  });
  const [lists, setLists] = useState<any[]>([]);

  useEffect(() => {
    if (taskLists?.getTaskLists) {
      setLists((prev) => [...taskLists.getTaskLists]);
      console.log('inside tasks: ', lists);
    }
  }, [taskLists]);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;

    if (
      source.droppableId === destination?.droppableId &&
      destination?.index === source.index
    )
      return;

    let reorderedLists;

    if (destination!.droppableId === 'TaskLists') {
      reorderedLists = reorderTaskLists(lists, result);
      reorderTaskListsMutation({
        variables: {
          conversationId: conversation.id,
          taskLists: reorderedLists.map((l: any, index: number) => {
            return {
              id: l.id,
              index: index,
            };
          }),
        },
      });
      setLists(reorderedLists);
    } else {
      reorderedLists = reorderTasks(lists, result);
      reoderTasks({
        variables: {
          taskListId: reorderedLists.destinationTaskList.id,
          tasks: reorderedLists.destinationTaskList.tasks.map(
            (t: any, index: number) => {
              return {
                id: t.id,
                index: index,
              };
            }
          ),
        },
      });
      setLists(reorderedLists.updatedLists);
    }
  };

  console.log('rendering lists');
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {lists && (
        <Droppable droppableId='TaskLists' direction='horizontal' type='column'>
          {(provided, snapshot) => {
            return (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className='grow flex  overflow-x-auto gap-2 p-4 w-full'
              >
                {lists &&
                  lists?.map((taskList: any, index: number) => {
                    return (
                      <TaskList
                        key={taskList.id}
                        index={index}
                        taskList={taskList}
                        conversation={conversation}
                      />
                    );
                  })}
                {provided.placeholder}
                <AddTaskListButton conversation={conversation} />
              </div>
            );
          }}
        </Droppable>
      )}
    </DragDropContext>
  );
};

export default Tasks;
