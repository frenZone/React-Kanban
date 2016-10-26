'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import KanBanPage from './components/KanBanPage';


ReactDOM.render(
  <KanBanPage url='http://localhost:3000/api' />,
  document.getElementById('root')
);
