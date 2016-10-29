import { List, Map } from 'immutable';
import { RECEIVE_TASKS, TOGGLE_NEW_FORM } from '../actions/kanbanActions';

const initialState = Map({List: List(), showNewForm: false});

const kanbanReducer = (state=initialState, action) => {
  switch(action.type) {
    case RECEIVE_TASKS:
      return state.set('List',List(action.data));
    case TOGGLE_NEW_FORM:
      return state.set('showNewForm',action.data);
    default:
      return state;
  }
}

export default kanbanReducer;