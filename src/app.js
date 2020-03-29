import React from 'react';
import ReactDOM from 'react-dom';
import { Dashboard } from './components/Dashboard';
let token = localStorage.getItem('githubToken')


// token = '562c76aea64417f7ee728d476cfab49eb7610918';
// user = 'curtainrising';
const jsx = (
  <Dashboard
    token={token}
  />
);

ReactDOM.render(jsx, document.getElementById('app'));
