import { List, Map } from 'immutable';
import {
  RECEIVE_TASKS,
  TOGGLE_NEW_FORM,
  TOGGLE_EDIT_FORM
} from '../actions/kanbanActions';

const initialState = Map({List: List(), showNewForm: false});

const kanbanReducer = (state=initialState, action) => {
  switch(action.type) {
    case RECEIVE_TASKS:
      const newData = action.data.map((task,index) => {
        task.showEditForm = false;
        task.index = index;
        return task;
      })
      return state.set('List',List(newData));
    case TOGGLE_NEW_FORM:
      return state.set('showNewForm',action.data);
    case TOGGLE_EDIT_FORM:

      const newList = state.toJS().List.map(task => {
        if (task.index === action.data.index) {
          task.showEditForm = action.data.bool;
        } else {
          task.showEditForm = false;
        }
        return task;
      })
      return state.set('List',List(newList));
    default:
      return state;
  }
}

export default kanbanReducer;