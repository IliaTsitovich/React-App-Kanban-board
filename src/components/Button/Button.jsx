import React from "react";
import { Children } from "react";

function ButtonElement ({ 
    className, 
    handleClick,
    handleKeyDown,
    active,
    showImage,
    titleName,
    children,
    handleChangeButton,
    notation,
    Children
    }) {
    return (
        <button 
            disabled={active}
            // showImage={showImage}
            className={className}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            onChange={handleChangeButton}
            data-title={notation}
            >
            {children}
            <span className="add-name submit-name">{titleName}</span>

        </button>
    )
}

export default ButtonElement;