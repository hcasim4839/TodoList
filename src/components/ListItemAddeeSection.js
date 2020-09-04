import React, { useState } from "react";

function ListItemAddeeSection(props) {

    const [name, setName] = useState("");
    const [value, setValue] = useState("");

    const [details, setDetails] = useState("");
    const [detailValue, setDetailsValue] = useState("");

    function handleChange(e) {
        setName(e.target.value);
        setValue(e.target.value);
    }
    function handleChangeDetail(e) {
        setDetails(e.target.value);
        setDetailsValue(e.target.value);
    }
    function handleSubmit(e) {
        e.preventDefault();
        props.addTask(name, details);
        setValue("");
        setName("");
        setDetailsValue("");
    }
    return (
        <form id="listItemToAddSection" onSubmit={handleSubmit}>
            <div>
                <label htmlFor="listItemToAdd">What task would you like to add?  </label>
                <input
                    type="text"
                    id="listItemToAdd"
                    onChange={handleChange}
                    value={value}
                />
                <div>
                    <label id="detailSection" htmlFor="listItemDetailsToAdd">Details for the task: </label>
                    <input
                        id="listItemDetailsToAdd"
                        type="text"
                        onChange={handleChangeDetail}
                        value={detailValue}
                    ></input>
                </div>
            </div>
            <button type="submit" id="add-btn">Add</button>
        </form>
    );
}

export default ListItemAddeeSection;