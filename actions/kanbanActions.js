export const RECEIVE_TASKS = 'RECIEVE_TASKS';
export const TOGGLE_NEW_FORM = 'TOGGLE_NEW_FORM';

export const receiveTasks = (data) => {
  return {
    type: RECEIVE_TASKS,
    data
  };
};

export const toggleNewForm = (bool) => {
  return {
    type: TOGGLE_NEW_FORM,
    data: bool
  }
}