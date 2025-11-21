import React from "react";
import { createPortal } from 'react-dom';
import "./AddPhotoUrl.css"

import IMG_trashbin from "@/assets/trashbin.svg"

import AddPhotoURLOverlay from "./AddPhotoOverlay";
import Button from "@pages/_Shared/Button_PopUp";
import Button3D from "@re/Buttons/Button3D";

import useAskPopUp from '@zustand/widgets/AskPopUpManager';
    

const AddPhotoURL = ({PhotoURL,handleAddPhoto})=>{
    const [IsAddFormOn,setIsAddFormOn] = React.useState(false);
 

    const {showAskPopUp,hideAskPopUp} = useAskPopUp();


    function handleDeletePhoto(){
        showAskPopUp(onPopUpDelete,`Czy na pewno usunąć zdjęcie?`, "Usuń zdjęcie" , "Anuluj");

        function onPopUpDelete(result){
            if (result) handleAddPhoto("");
            hideAskPopUp();
        }
    }

    function handleForm(formResult,url){
        switch (formResult){
            case "add": handleAddPhoto(url);
            break;
            case "cancel": //nothing
            break;
            case "remove": handleAddPhoto("");
            break;
        }

        setIsAddFormOn(false);

    }

    return(
        <div className='AddPhotoURL'>
            {   
                PhotoURL?
                <PreviewContainer {...{PhotoURL,handleDeletePhoto}}/>
                :
                <Button3D className="recipeBtn add sqr" onClick={ ()=>setIsAddFormOn(true) }>
                    Dodaj Zdjęcie! 
                </Button3D>  
            }
              
            {IsAddFormOn && 
              createPortal(
                <AddPhotoURLOverlay {...{handleForm}}/>,
                document.body
            )}

        </div>
    );
}
export default AddPhotoURL;



// Component PreviewContainer
////////////////////////////
const PreviewContainer = ({PhotoURL,handleDeletePhoto})=>{
    return(
        <div className="preview-container">
            <button className="btn-delete" onClick={handleDeletePhoto}> 
                <img src={IMG_trashbin} />
            </button>

            <img className="preview-img"src={PhotoURL}></img>
         </div>
    );
}