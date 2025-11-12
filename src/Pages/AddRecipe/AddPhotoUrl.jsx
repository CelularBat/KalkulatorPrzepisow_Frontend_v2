import React from "react";
import "./AddPhotoUrl.css"



import IMG_trashbin from "@/assets/trashbin.svg"


import AddPhotoURLOverlay from "./AddPhotoOverlay";
import Button from "@pages/_Shared/Button_PopUp";
import Button3D from "@re/Buttons/Button3D";

const AddPhotoURL = ({PhotoURL,handleAddPhoto})=>{
    const [IsAddFormOn,setIsAddFormOn] = React.useState(false);
    const [IsDeleteFormOn,setIsDeleteFormOn] = React.useState(false);


    function handleSpawnDeleteForm(){
        setIsDeleteFormOn(true);
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
        setIsDeleteFormOn(false);
    }

    return(
        <div className='AddPhotoURL'>
            {   
                PhotoURL?
                <PreviewContainer {...{PhotoURL,handleSpawnDeleteForm}}/>
                :
                <Button3D className="recipeBtn add sqr" onClick={ ()=>setIsAddFormOn(true) }>
                    Dodaj Zdjęcie! 
                </Button3D>  
            }
              
            {IsAddFormOn && <AddPhotoURLOverlay {...{handleForm}}/>}
            {IsDeleteFormOn && <AskDeletePhotoForm {...{handleForm}} />}
        </div>
    );
}
export default AddPhotoURL;

// Component AskDeletePhotoForm
//////////////////////////////
const AskDeletePhotoForm = ({handleForm})=>{
    return (
    <div className="overlay">
        <div className="AddPhotoURLOverlay" >
            <div className="url-box">
              <Button type="cancel"
              onClick={()=>{handleForm("remove")}}>Usuń zdjęcie</Button>  
                <span>Czy na pewno usunąć zdjęcie?</span>
              <Button type="ok"
                onClick={()=>{handleForm("cancel")}}>Anuluj</Button>
            </div>
        </div>
    </div>
    );
}


// Component PreviewContainer
////////////////////////////
const PreviewContainer = ({PhotoURL,handleSpawnDeleteForm})=>{
    return(
        <div className="preview-container">
            <button className="btn-delete" onClick={handleSpawnDeleteForm}> 
                <img src={IMG_trashbin} />
            </button>

            <img className="preview-img"src={PhotoURL}></img>
         </div>
    );
}