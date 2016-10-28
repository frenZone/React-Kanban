 'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import KanBanPage from './components/KanBanPage';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import * as reducers from './reducers';

const reducer = combineReducers(reducers);
const store = createStore(reducer);

ReactDOM.render(
  <Provider store={ store } >
    <KanBanPage url='http://localhost:3000/api' />
  </Provider>,
  document.getElementById('root')
);
