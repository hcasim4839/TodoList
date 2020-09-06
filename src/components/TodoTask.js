import React, { useState } from "react";

function TodoTask(props) {
    const [isPrioritized, setIsPrioritized] = useState(false);
    function prioritizeBtnClicked() {
        if (isPrioritized === false) {
            setIsPrioritized(true);
        } else if (isPrioritized) {
            setIsPrioritized(false);
        }
        props.prioritizeBtnClicked(props.id, isPrioritized);
    }

    return (
        <li className={props.isVisible === true ? "todo-task" : "todo-task-invisible"} aria-checked="false"  >
            <input type="checkbox" id={props.id} onChange={() => props.toggleTaskCompleted(props.id)} defaultChecked={props.completed} />
            <label id={props.id}>{props.name}</label>
            <p>{props.details}</p>
            <div className="button-group">
                <button className="delete-btn" onClick={() => props.deleteTask(props.id)}>Delete</button>
                <button className={props.isPriority === false ? "prioritize-btn-beforePressed" : "prioritize-btn-afterPressed"}
                    onClick={prioritizeBtnClicked}>Prioritize</button>
            </div>
        </li>
    );
}
export default TodoTask;