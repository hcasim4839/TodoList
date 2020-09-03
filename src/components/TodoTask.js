import React, { useState } from "react";

function TodoTask(props) {
    const [btn, setBtn] = useState("prioritize-btn-beforePressed");
    const [isPrioritized, setIsPrioritized] = useState(false);


    function prioritizeBtnClicked() {
        changebtnColor();
        changeOrder();
    }

    function changebtnColor() {
        if (isPrioritized === false) {
            setBtn("prioritize-btn-afterPressed");
            setIsPrioritized(true);
        } else if (isPrioritized) {
            setBtn("prioritize-btn-beforePressed");
            setIsPrioritized(false);
        }
    }

    function changeOrder() {
        props.prioritizeBtnClicked(props.id, isPrioritized);
    }
    return (
        <li className="todo-task" aria-checked="false"  >
            <input type="checkbox" id={props.id} onChange={() => props.toggleTaskCompleted(props.id)} />
            <label id={props.id}>{props.name}</label>
            <p>{props.details}</p>
            <div className="button-group">
                <button className="delete-btn" onClick={() => props.deleteTask(props.id)}>Delete</button>
                <button className={btn} onClick={prioritizeBtnClicked}>Prioritize</button>
            </div>
        </li>
    );
}
export default TodoTask;