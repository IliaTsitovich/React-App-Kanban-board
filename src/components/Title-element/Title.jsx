import React, { Children } from "react";

const Title = (props)=> {
    
    return (
        <>
            <p>
                {props.info}{props.count}
            </p>
        </>
    )
}
export default Title;