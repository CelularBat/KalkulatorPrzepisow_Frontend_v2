import React from "react";
import clsx from 'clsx'
import log from "@utils/Logger";
import "./Button_PopUp.css"


const Button = ({children, type, className, ...rest}) => {

    const avalaibleTypes = ["ok","cancel"];
    if (! avalaibleTypes.includes(type)){
        log.warn(`component Button doesnt have type ${type}. Avalaible styles: ${avalaibleTypes}`);
    }
    let typeClass = `Button_${type}`;
    
    return (
        <>
            <button className = {clsx('Button',typeClass,className)} {...rest}>
                {children}
            </button>
        </>
    );
};

export default Button;