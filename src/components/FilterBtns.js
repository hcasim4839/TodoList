import React from "react";

function FilterBtns(props) {
    return (
        <div className="filterSection" >
            <h2 id="subheading">Filter Button</h2>
            <button onClick={() => props.showCompletedTasks()}>Completed Tasks</button>
            <button onClick={() => props.showPrioritizedTasks()}>Prioritized Tasks</button>
            <button onClick={() => props.turnOffFilter()}>Show All Tasks</button>
        </div>
    );
}
export default FilterBtns;