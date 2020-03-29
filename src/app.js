import React from 'react';
import ReactDOM from 'react-dom';
import { Dashboard } from './components/Dashboard';
let token = localStorage.getItem('githubToken')

const jsx = (
  <Dashboard
    token={token}
  />
);

ReactDOM.render(jsx, document.getElementById('app'));
