import React from "react";
import './AddPhotoUrlOverlay.css'


import Button from "@pages/_Shared/Button_PopUp";


import useProductStore from "@zustand/recipeStore";

// Component AddPhotoURLForm
////////////////////////////
const AddPhotoURLOverlay = ({handleForm})=>{
    const [IsPhotoLoaded,setIsPhotoLoaded] = React.useState(false);
    const [PhotoURL,setPhotoURL] = React.useState("");

    const verifyimg = useProductStore(state=>state.verifyImg)

    async function loadImg(){
        const isImgOk = await verifyimg(PhotoURL);
        if (isImgOk){
            setIsPhotoLoaded(true);
        } 
    }

    return (
        <div className="overlay">
            <div className="AddPhotoURLOverlay" >
                { IsPhotoLoaded &&
                <div className="img-container">
                    <img src={PhotoURL}></img>
                </div>
                } 
                <div className="url-box">
                { !IsPhotoLoaded?
                    <>
                        
                        <Button type="ok" onClick={loadImg}>Prześlij</Button>
                        <input type="text" placeholder="Wprowadź Url zdjęcia" 
                        onChange={(e)=>{ setPhotoURL(e.target.value)}}/>
                    </>
                    :<>
                    <Button type="ok"
                    onClick={()=>{handleForm("add",PhotoURL)}}>Dodaj</Button>
                    </>
                }   
                <Button type="cancel" 
                onClick={()=>{handleForm("cancel")}}>Anuluj</Button>  
                </div>
            </div>
        </div>
    )
}

export default AddPhotoURLOverlay;