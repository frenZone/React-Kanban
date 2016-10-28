import { List } from 'immutable';
import { RECEIVE_TASKS } from '../actions/kanbanActions';

const initialState = List();

const kanbanReducer = (state=initialState, action) => {
  switch(action.type) {
    case RECEIVE_TASKS:
      return List(action.data);


    default:
      return state;
  }
};

export default kanbanReducer;