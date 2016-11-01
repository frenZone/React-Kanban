 'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import KanBanPage from './components/KanBanPage';
import NotFound from './components/static/NotFound';
import { createStore, combineReducers } from 'redux';
import {Router,Route,hashHistory,IndexRoute} from 'react-router';
import About from './components/static/About';
import App from './App';
import { Provider } from 'react-redux';
import * as reducers from './reducers';

const reducer = combineReducers(reducers);
const store = createStore(reducer);

ReactDOM.render(
  <Provider store={ store } >
    <Router history={hashHistory}>
      <Route path='/' component={App}>
        <IndexRoute component={KanBanPage} />
        <Route path='/about' component={About} />
        <Route path='*' component={NotFound} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
