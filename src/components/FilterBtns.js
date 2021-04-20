import React from "react";

function FilterBtns(props) {
    return (
        <div className="filterSection" >
            <button onClick={() => props.setCurrentFilter(props.name)}>{props.name}</button>
        </div>
    );
}
export default FilterBtns;