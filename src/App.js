import React, { useState } from 'react';
import TodoTask from "./components/TodoTask";
import ListItemAddeeSection from "./components/ListItemAddeeSection";
import logo from "./img/journal.png";
import { nanoid } from "nanoid";
import FilterBtns from './components/FilterBtns';

//what is interesting is if the ()=> is removed there is an error as
//it has no idea what the task is so you need an arguement
const FILTER_OBJ = {
  All: () => true,
  Prioritized: (task) => task.isPriority,
  Completed: (task) => task.completed
}

const FILTER_NAMES = Object.keys(FILTER_OBJ);

function App(props) {
  const [tasks, setTasks] = useState(props.task);
  const [lastUnprioritizedTaskIndex, setlastUnprioritizedTaskIndex] = useState(0);
  const [currentFilter, setCurrentFilter] = useState('All');

  //reminder to look at map vs foreach
  const filterBtnsList = FILTER_NAMES.map(name =>
    <FilterBtns
      name={name}
      setCurrentFilter={setCurrentFilter}
      key={nanoid()}
    />
  );
  function addTask(name, details) {
    if (name.trim() !== "" && name !== null) {
      const NEW_TASK = {
        name: name,
        id: "todo-" + nanoid(),
        isCompleted: false,
        details: details,
        isPriority: false,
      }
      setTasks([...tasks, NEW_TASK]);
    }
    console.log(name + " and the dets: " + details);
  }


  function toggleTaskCompleted(id) {
    const editedTasks = tasks.map((task) => {
      if (task.id === id) {
        task.completed = !task.completed;
        return task;
      }
      return task;
    });
    setTasks(editedTasks);

  }
  function deleteTask(TododTaskId) {
    const REMAINING_TASKS = tasks.filter((task) => task.id !== TododTaskId);
    console.log(TododTaskId);
    setTasks(REMAINING_TASKS);
    //for some reason if the below is used it removes all tasks after those tasks are prio
    //settasksWithNoFilter(REMAINING_TASKS);
  }
  function prioritizeBtnClicked(TodoTaskId, isPrioritized) {

    let elementToSwitch;
    let i = 0;
    //Err why is there an incrementation to i?
    tasks.forEach(element => {
      if (element.id === TodoTaskId) {
        elementToSwitch = i;
      }
      i++;
    });
    swapIndices(elementToSwitch, isPrioritized, TodoTaskId);
  }
  function swapIndices(elementToSwitch, isPrioritized, TodoTaskId) {
    const ARRAY_LAST_INDEX = tasks.length - 1;

    if (isPrioritized) {
      tasks[elementToSwitch].isPriority = false;

      const NEW_LAST_UNPRIORITIZED_INDEX = lastUnprioritizedTaskIndex - 1;
      setlastUnprioritizedTaskIndex(NEW_LAST_UNPRIORITIZED_INDEX);
      const UNPRIORITIZED_TASK = tasks[elementToSwitch];
      const NEW_TASKS_ARRANGEMENT = tasks.filter((task) => task.id !== TodoTaskId);
      setTasks([...NEW_TASKS_ARRANGEMENT, UNPRIORITIZED_TASK]);

    } else if (isPrioritized === false) {
      if (lastUnprioritizedTaskIndex <= ARRAY_LAST_INDEX) {
        tasks[elementToSwitch].isPriority = true;

        const OTHER_ELEMENT_TO_SWITCH = tasks[lastUnprioritizedTaskIndex];
        tasks[lastUnprioritizedTaskIndex] = tasks[elementToSwitch];
        tasks[elementToSwitch] = OTHER_ELEMENT_TO_SWITCH;
        const NEW_LAST_PRIORITY_INDEX = lastUnprioritizedTaskIndex + 1;
        setlastUnprioritizedTaskIndex(NEW_LAST_PRIORITY_INDEX);
      }
    }
  }

  const TASK_LIST = tasks
    .filter(FILTER_OBJ[currentFilter])
    .map(task => (
      <TodoTask
        id={task.id}
        name={task.name}
        details={task.details}
        completed={task.completed}
        key={task.id}
        toggleTaskCompleted={toggleTaskCompleted}
        deleteTask={deleteTask}
        prioritizeBtnClicked={prioritizeBtnClicked}

        isPriority={task.isPriority}
      />
    ));

  return (
    <div className="todoApp">
      <div className="logo_container">
        <img src={logo} alt="notebook" />
      </div>
      <header>
        <h1>Todo App</h1>
      </header>
      <ListItemAddeeSection addTask={addTask}></ListItemAddeeSection>
      <div id="filterSection" >
        <h2 id="subheading">Filter Buttons</h2>
        {filterBtnsList}
      </div>

      <div id="todoList">
        <ul>
          <div id="todoTasks">

            {TASK_LIST}

          </div>
        </ul>
      </div>
      <div id="icon-author">Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
    </div>
  );
}

export default App;
