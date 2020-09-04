import React, { useState } from "react";

function FilterBtns(props) {
    const [complTaskIsDisabled, setComplTaskIsDisabled] = useState(false);
    const [prioritizeTaskIsDisabled, setPrioritizeTaskIsDisabled] = useState(false);

    function completeTask() {
        props.showCompletedTasks();
        turnOffFilterBtns();
    }

    function prioritizeTask() {
        props.showPrioritizedTasks();
        turnOffFilterBtns();
    }

    function turnOffFilter() {
        props.turnOffFilter();
        turnOnFilterBtns();
    }

    function turnOffFilterBtns() {
        setPrioritizeTaskIsDisabled(true);
        setComplTaskIsDisabled(true);
    }

    function turnOnFilterBtns() {
        setComplTaskIsDisabled(false);
        setPrioritizeTaskIsDisabled(false);
    }
    return (
        <div className="filterSection" >
            <h2 id="subheading">Filter Button</h2>
            <button onClick={completeTask} disabled={complTaskIsDisabled}>Completed Tasks</button>
            <button onClick={prioritizeTask} disabled={prioritizeTaskIsDisabled}>Prioritized Tasks</button>
            <button onClick={turnOffFilter}>Show All Tasks</button>
        </div>
    );
}
export default FilterBtns;