import React, { Children, useContext, useEffect, useId, useState} from "react";
import ButtonElement from "../Button/Button";
import Input from "../input/input";
import TodoItem from "../Item/Task";
import FormSelect from "../form/form";

import '../Button/style_button.scss';
import '../description/style_blockDescriptions.scss';
import { Link, NavLink } from "react-router-dom";


const BlockForTasks = (props) => {


    return (
        <>
            <div className={'block_components'}>
                <p className="title-block">{props.title}</p>
                {
                    props.tasks.lenght != 0? 
                    props.tasks.map(item=>
                        
                        <NavLink key={item.id} className="link-task" to={`/tasks/${item.id}`}>
                        <TodoItem
                        item = {item}
                        data-id = {item.id}
                        data-block = {item.status}
                        data-info = {item.descriptions} 
                        className={"item-task"}
                        openDescriptions={(e)=>props.openDescriptions(e,e.currentTarget.dataset.block, e.currentTarget.dataset.id, e.currentTarget.dataset.info)}
                        />
                        </NavLink>
                ): null
                }
                {
                    props.inputActive?
                        <div className="container_newTask">
                            <Input
                                typeInput={"text"}
                                defaultClass={'input-task'}
                                onChange={props.handleChangeInput}
                                value={props.valueInputNewTask}
                                placeholder={"Write new Task..."}
                            /> 
                        </div> : null
                }
                {props.showSelect?
                 <FormSelect 
                    tasksList = {props.tasksSelect} 
                    handleSelectTask={props.handleSelectTask}
                    /> : null
                }
                    <ButtonElement
                        className={props.submit? props.classNameButtonSubmit : props.classNameButtonAdd}
                        handleClick={props.submit? props.handleClickButtonSubmit : props.handleClickButtonAdd}
                        handleKeyDown={props.submit? props.handleClickButtonSubmit : props.handleClickButtonAdd}
                        titleName={props.submit? "Submit":'Add Card'}
                        active={props.disabledButton}
                    />
                
            </div>
            
        </>
            
    )
}

export default BlockForTasks;