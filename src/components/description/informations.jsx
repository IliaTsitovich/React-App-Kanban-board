import React, { useEffect, useState,useContext } from "react";
import { Routes, Route, Link, NavLink } from 'react-router-dom';
import ButtonElement from "../Button/Button";
import Input from "../input/input";

const DescriptionsBlock = (props) => {

  

    return (
      <>
        <div className="block_describeTask">
          <h1 className="title-descriptions">{props.item.title}</h1>
          <div className="container_text-area">
            <textarea
              className="area-text"
              onChange={props.onChange}
              defaultValue={props.item.descriptions}
            />
            <NavLink to={'/'}>
            <ButtonElement
              data-value={"itemObj.status"}
              className="svg-icon_close"
              handleClick={props.saveInfo}
            >
            </ButtonElement>
            </NavLink>
          </div>
        </div> 
      </>
    );
}

export default DescriptionsBlock;