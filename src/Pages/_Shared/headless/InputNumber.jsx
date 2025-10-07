import React from 'react';

/* Basically it's a middleware for html <input> element
 which handles input validation for React, as it should be
*/

function InputNumber({children,max,min,value,onChange ,...rest}) {

// This function is needed for firefox, because this browser allows writing anything to input type="number"
// and if it's not a number then DOM sends empty string
    function stopInvalidInput(event){
        const numberPattern = /^[0-9.,]+$/;
        if (! ( numberPattern.test(event.key) 
            || ['Backspace','Delete','ArrowLeft','ArrowRight','ArrowUp','ArrowDown', 'Tab'].includes(event.code)
            ) ){
            event.preventDefault();
        }
    }

    function inputValidated(event){
        let newValue = event.target.value;
        if (newValue == '' && !rest.required ){
            event.target.value= '';
        }
        else if(newValue < min || newValue > max){
            newValue = Math.max( Math.min(Number(newValue) , max) , min);
            event.target.value= newValue;
        }
        
        if (onChange) { onChange(event); }
    }

    if (!value) value =""; // preventing React from complaining about 'none value'
    if (value.length > 1 && value[0] === "0") value = value.slice(1);

    return (
        <>
            <input {...rest} type="number" min={min} max={max} 
            value={value} onChange={inputValidated}
            onKeyDown={stopInvalidInput}>
                {children}
            </input>    
        </>
    );
}

export default InputNumber;