import React, { useEffect, useState } from "react";
import { Children } from "react";
import ButtonElement from "../Button/Button";

import '../Item/style-task.scss';


function TodoItem ({item, className, openDescriptions}) {

           return (
            <div 
                className={className}
                data-id = {item.id}
                data-block = {item.status}
                >
                    <h4 type="text" 
                        onClick={(e)=>openDescriptions(e)}
                        data-id = {item.id}
                        data-block = {item.status}
                        >
                            {item.title}
                        </h4>
            </div>
            )
}
export default TodoItem;