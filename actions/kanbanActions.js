export const RECEIVE_TASKS = 'RECIEVE_TASKS';
export const TOGGLE_NEW_FORM = 'TOGGLE_NEW_FORM';
export const TOGGLE_EDIT_FORM = 'TOGGLE_EDIT_FORM';
export const SHOW_ERROR_MESSAGE =  'SHOW_ERROR_MESSAGE';
export const MESSAGE = 'MESSAGE';
export const LOGIN = 'LOGIN';
export const SHOW_LOGIN_ERR = 'SHOW_LOGIN_ERR';

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
  };
};

export const toggleEditForm = (bool,index) => {
  return {
    type: TOGGLE_EDIT_FORM,
    data: {bool,index}
  };
};

export const showErrorMessage = (bool) => {
  return {
    type: SHOW_ERROR_MESSAGE,
    data: bool
  };
};

export const message = (string) => {
  return {
    type: MESSAGE,
    data: string
  };
};

export const login = (user) => {
  return {
    type: LOGIN,
    data: user
  }
}

export const showLoginErr = (bool) => {
  return {
    type: SHOW_LOGIN_ERR,
    data: bool
  }
}