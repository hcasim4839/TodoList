import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { nanoid } from "nanoid";

const TASK_EXAMPLES = [{
  id: "todo-" + nanoid(),
  name: "Sleep",
  completed: false,
  details: " Go to sleep.",
  isPriority: false
}, {
  id: "todo-" + nanoid(),
  name: "Eat",
  completed: false,
  details: "At 6pm.",
  isPriority: false
}]


ReactDOM.render(
  <React.StrictMode>
    <App task={TASK_EXAMPLES} />
  </React.StrictMode>,
  document.getElementById('root')
);

