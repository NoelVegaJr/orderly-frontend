import { useMutation } from '@apollo/client';
import { DropResult } from 'react-beautiful-dnd';
import TaskOperations from '../graphql/operations/task';

export function reorderTaskLists(lists: any, dndResult: DropResult) {
  const { source, destination } = dndResult;
  console.log(dndResult);

  const cpLists = [...lists];

  // if list was dnd

  const targetTaskList = lists[source.index];
  cpLists.splice(source.index, 1);
  cpLists.splice(destination!.index, 0, targetTaskList);

  return cpLists;
}

export function reorderTasks(lists: any, dndResult: DropResult) {
  // task was dnd
  const { source, destination } = dndResult;

  const cpLists = [...lists];

  const srcListTasks = [
    ...cpLists.find((list: any) => list.id === source.droppableId).tasks,
  ];

  // task being dnd
  const targetTask = srcListTasks[source.index];

  const dstListTasks = [
    ...cpLists.find((list: any) => list.id === destination!.droppableId).tasks,
  ];

  // removing target task from src list
  srcListTasks.splice(source.index, 1);

  // inserting target task in dst list
  if (source.droppableId === destination!.droppableId) {
    // task was placed in same list
    srcListTasks.splice(destination!.index, 0, targetTask);
  } else {
    // task was placed in different list
    dstListTasks.splice(destination!.index, 0, targetTask);
  }

  const updatedLists = [] as any;

  let tasksToUpdate;
  // created updated lists with new ordering
  cpLists.forEach((list: any) => {
    const cpList = { ...list };

    // update list if list id was in the result context aka src/dst
    if (list.id === source.droppableId) {
      cpList.tasks = srcListTasks;
      tasksToUpdate = srcListTasks;
    } else if (list.id === destination!.droppableId) {
      cpList.tasks = dstListTasks;
      console.log('dst: ', dstListTasks);
      tasksToUpdate = dstListTasks;
    }
    updatedLists.push(cpList);
  });

  return {
    updatedLists,
    destinationTaskList: {
      id: destination!.droppableId,
      tasks: tasksToUpdate,
    } as any,
  };
}
