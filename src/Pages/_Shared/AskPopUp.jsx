import React from 'react';
import './AskPopUp.css'
import  Button from './Button_PopUp';

function  AskPopUp({callBack, isShown=false, question,labelYES = "OK", labelNO = "ANULUJ"}) {
    return isShown? (
    <div className="overlay">
        <div className='AskPopUp'>
          <div className="url-box">
              <Button type="cancel"
              onClick={()=>{callBack(true)}}>{labelYES}</Button>  
                <span>{question}</span>
              <Button type="ok"
                onClick={()=>{callBack(false)}}>{labelNO}</Button>
          </div>
        </div>
    </div>
    ) : null;
}

export default  AskPopUp;