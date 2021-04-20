import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { nanoid } from "nanoid";

const TASK_EXAMPLES = [{
  name: "Sleep",
  id: "todo-Demo1" + nanoid(),
  isVisible: true,

  completed: false,
  details: " Go to sleep.",


  isPriority: false,
  // key: "list item demo" + 1
}, {
  name: "Eat",
  id: "todoDemo2-" + nanoid(),
  isVisible: true,

  completed: false,
  details: "At 6pm.",
  isPriority: false,
  //key: "list item demo" + 2
}]


ReactDOM.render(
  <React.StrictMode>
    <App task={TASK_EXAMPLES} />
  </React.StrictMode>,
  document.getElementById('root')
);

