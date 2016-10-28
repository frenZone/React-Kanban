export const RECEIVE_TASKS = 'RECIEVE_TASKS';

export const receiveTasks = (data) => {
  return {
    type: RECEIVE_TASKS,
    data,
  };
};