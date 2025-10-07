import React from 'react';
import './AskPopUpManager.css'
import Button from '@pages/_Shared/Button_PopUp';
import { create } from 'zustand';

const useAskPopUpStore = create((set)=>({
    isPopUpShown: false,
    popUpParams: {},
    showPopUp: (params)=>set({isPopUpShown: true,popUpParams:params }),
    hidePopUp: ()=>set({isPopUpShown: false}),
}))

function AskPopUp({cbUserChoice, question,labelYES, labelNO}) {
    return(
    <div className="overlay">
        <div className='AskPopUp'>
          <div className="url-box">
              <Button type="cancel"
              onClick={()=>{cbUserChoice(true)}}>{labelYES}</Button>  
                <span>{question}</span>
              <Button type="ok"
                onClick={()=>{cbUserChoice(false)}}>{labelNO}</Button>
          </div>
        </div>
    </div>
    );
}

export function AskPopUpManager(){
    const {isPopUpShown,popUpParams} = useAskPopUpStore();
    if (!isPopUpShown) return null;

    return (
        <>
            <AskPopUp {...popUpParams}/>
        </>
    )
}

export default function useAskPopUp(){
    const {showPopUp,hidePopUp} = useAskPopUpStore();
    return ({
        showAskPopUp: (cbUserChoice, question,labelYES = "OK", labelNO = "ANULUJ")=>{
            showPopUp({cbUserChoice, question,labelYES, labelNO});
            },
        hideAskPopUp: ()=>{hidePopUp()}
    })
    
    
}