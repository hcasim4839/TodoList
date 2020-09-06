import React, { useState } from 'react';
import TodoTask from "./components/TodoTask";
import ListItemAddeeSection from "./components/ListItemAddeeSection";
import logo from "./img/journal.png";
import { nanoid } from "nanoid";
import FilterBtns from './components/FilterBtns';


function App(props) {
  const [tasks, setTasks] = useState(props.task);
  //const [tasksWithNoFilter, settasksWithNoFilter] = useState();
  const [lastUnprioritizedTaskIndex, setlastUnprioritizedTaskIndex] = useState(0);


  //FUNCTIONS
  function addTask(name, details) {
    if (name.trim() !== "" && name !== null) {
      const NEW_TASK = {
        name: name,
        id: "todo-" + nanoid(),
        completed: false,
        details: details,
        isPriority: false,
        isVisible: true
      }
      setTasks([...tasks, NEW_TASK]);
    }
  }
  function deleteTask(TododTaskId) {
    const REMAINING_TASKS = tasks.filter((task) => task.id !== TododTaskId);
    setTasks(REMAINING_TASKS);
  }
  function prioritizeBtnClicked(TodoTaskId, isPrioritized) {
    let elementToSwitch;
    let i = 0;

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

  function showCompletedTasks() {
    /*
        if (tasks.length > 0) {
          const LIST_OF_TASKS = tasks;
          settasksWithNoFilter(LIST_OF_TASKS);
        }
        const UPDATED_TASKS = tasks.filter((task) => task.completed === true);
        setTasks(UPDATED_TASKS);
    */

    tasks.forEach(element => {
      console.log(element);
      if (element.completed === false) {
        element.isVisible = false;
      }
    });
  }

  function showPrioritizedTasks() {
    /*
    if (tasks.length > 0) {
      const LIST_OF_TASKS = tasks;
      settasksWithNoFilter(LIST_OF_TASKS);
    }

    const UPDATED_TASKS = tasks.filter((task) => task.isPriority === true);
    setTasks(UPDATED_TASKS);
    */

    tasks.forEach(element => {
      console.log(element);
      if (element.isPriority === false) {
        element.isVisible = false;
      }
    });
  }

  function turnOffFilter() {
    /*const UPDATED_TASKS = tasksWithNoFilter;
    setTasks(UPDATED_TASKS);*/
    tasks.forEach(element => {
      console.log(element);
      if (element.isVisible === false) {
        element.isVisible = true;
      }
    });
  }

  function toggleTaskCompleted(id) {
    const UPDATED_TASK = tasks.map(task => {
      if (id === task.id) {
        return { ...task, completed: !task.completed }
      }
      return task;
    });
    setTasks(UPDATED_TASK);
  }

  const TASK_LIST = tasks.map(task =>
    <TodoTask
      name={task.name}
      id={task.id}
      isVisible={task.isVisible}
      toggleTaskCompleted={toggleTaskCompleted}
      completed={task.completed}
      details={task.details}
      deleteTask={deleteTask}
      prioritizeBtnClicked={prioritizeBtnClicked}
      isPriority={task.isPriority}
      key={"list item " + task.id}

    >
    </TodoTask>);

  return (
    <div className="todoApp">
      <div className="logo_container">
        <img src={logo} alt="notebook" />
      </div>
      <header>
        <h1>Todo App</h1>
      </header>
      <ListItemAddeeSection addTask={addTask}></ListItemAddeeSection>
      <FilterBtns
        showCompletedTasks={showCompletedTasks}
        showPrioritizedTasks={showPrioritizedTasks}
        turnOffFilter={turnOffFilter}
      ></FilterBtns>
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
