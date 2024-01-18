import React from "react";

function Input (props) {
    return(
        <input 
        autoFocus={true}
        type={props.typeInput}
        className={props.defaultClass}
        onChange={props.onChange}
        placeholder={props.placeholder} 
        value={props.value}
        defaultValue={props.defaultValue}
        onClick={props.onClick}
        />
    )
}

export default Input;