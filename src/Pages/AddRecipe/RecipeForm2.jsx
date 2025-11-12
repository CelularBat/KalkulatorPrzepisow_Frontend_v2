import React from 'react';
import Recipes_PrimeTable from '@pages/_PrimeTables/Recipes_PrimeTable';
import AddPhotoURL from './AddPhotoUrl';
import "./RecipeForm2.scss"

import RecipeSumTable from '../_PrimeTables/RecipeSumTable';


import { delayFunction } from '@utils/Utils';
import log from '@utils/Logger';
import { useNavigate } from 'react-router-dom';

import useRecipeStore from '@/API/recipeStore';
import Button3D from '@re/Buttons/Button3D';
import SumHeader from './SumHeader';
import TextArea3D from '@re/TextArea3D';
import useAskPopUp from '@zustand/widgets/AskPopUpManager';




const RecipeForm2 = ({AddProductRow,onRecipeFormSubmit,onRecipeFormUpdate}) => {
    const navigate = useNavigate();
    const [RowsData,setRowsData] = React.useState([]);
    const [PhotoURL,setPhotoURL] = React.useState("");
    const [Title,setTitle] = React.useState("");
    const [Description,setDescription] = React.useState("");

    const [IsDataLoaded,setIsDataLoaded] = React.useState(false);

    const {
        IsFormRecipeInEditMode,
        RecipeDataToEdit,
        setIsFormRecipeInEditMode
    } = useRecipeStore();

    const [_textarea3D_updater,set_textarea3D_updater] = React.useState(0);

    const {showAskPopUp,hideAskPopUp} = useAskPopUp();
    // On edit save recipe to local storage
    React.useEffect(()=>{
        if (RowsData.length > 0) {
            delayFunction.delay("localStorage",()=>{ //to not spam local storage
                localStorage.setItem('tempRecipe', JSON.stringify(RowsData));
                localStorage.setItem('tempRecipeInfo', JSON.stringify({
                    title: Title,
                    description: Description,
                    photoURL: PhotoURL
                }),3000);
            })     
        }  
    },[RowsData,PhotoURL,Title,Description]);

    
    // On init load recipe from local storage 
    // OR load recipe to edit if button "edit recipe" was clicked on recipe list
    React.useEffect(()=>{
        if (IsFormRecipeInEditMode && RecipeDataToEdit){
            setRowsData(RecipeDataToEdit.productsList);
            setTitle(RecipeDataToEdit.name);
            setDescription(RecipeDataToEdit.description);
            if (RecipeDataToEdit.photos.length > 0){
                setPhotoURL(RecipeDataToEdit.photos[0]);
            }
            set_textarea3D_updater(prev=>!prev); // here we pass states to textarea3D
        } 
        else{
            const tempCopy = localStorage.getItem('tempRecipe');
            const tempCopyInfo = JSON.parse(localStorage.getItem('tempRecipeInfo'));
            if (tempCopy !== null){
                setRowsData(JSON.parse(tempCopy));
                setTitle(tempCopyInfo.title);
                setDescription(tempCopyInfo.description);
                setPhotoURL(tempCopyInfo.photoURL);
            }
            set_textarea3D_updater(prev=>!prev);
        }
        setIsDataLoaded(true);
    },[]);

    React.useEffect(()=>{
        // check if product isn't already in the array
        if (IsDataLoaded && AddProductRow._id && !RowsData.find(e=>e._id === AddProductRow._id) ){ 
            log.debug("Adding row",AddProductRow);
           
            setRowsData( (prev) =>{
                let newArr = [...prev];
                newArr.push(
                    {...AddProductRow, 
                    portion: 0}
                )
                return newArr;
            });   
        }    
    },[AddProductRow])


    

   

    function handleDeleteRow(rowData){
        setRowsData((prev)=>prev.filter((e)=>{
            return e._id !== rowData._id;
        }));
    }

    function handlePortionChange(rowData,value){
        let restrictedValue = Math.max( Math.min(value , 9999) , 0);
        setRowsData((prev)=>{
            return prev.map( (e)=> 
                (e._id == rowData._id) ? {...e, portion:restrictedValue } :e 
            );
        });
    }

    function handleAddPhoto(url){
            setPhotoURL(url);  
    }

    function onRecipeCancelEdit(){
        setIsFormRecipeInEditMode(false);
        navigate("/gallery");
    }

    function onCleanForm(answer){
        if (answer){
            setRowsData([]);
            setTitle("");
            setDescription("");
            setPhotoURL("");
        }
        hideAskPopUp();
        set_textarea3D_updater(prev=>!prev);
    }

    return (
        
        <div className='RecipeForm2'>
            <div className='header'>
                <h2>Skomponuj własny przepis!</h2>
            </div>
            <div className='body'>
                <div className='title-container'>
                    <AddPhotoURL {...{PhotoURL,handleAddPhoto}}/>
                    <div className='title'>
                        <TextArea3D width='100%' height='40px'
                        onTextChangeCb={(text)=>setTitle(text)}
                        initialText={Title}
                        initialTextUpdater={_textarea3D_updater}
                        maxChars={100} />
                    </div>
                </div>
                <div className='info-container'>
                    <TextArea3D width='100%' height='120px'
                    onTextChangeCb={(text)=>setDescription(text)}
                    initialText={Description}
                    initialTextUpdater={_textarea3D_updater}
                    maxChars={800} 
                    />

                </div>
            </div>


            <Recipes_PrimeTable {... {RowsData,handleDeleteRow,handlePortionChange}}/>

            <SumHeader {...{RowsData}}/>
            <RecipeSumTable {...{RowsData}}/>
            

            <div className='btn-recipe-container'>
            {IsFormRecipeInEditMode?
                <>
                    <Button3D className='recipeBtn add'
                    onClick={()=>onRecipeFormUpdate(RecipeDataToEdit._id, RowsData,Title,Description,PhotoURL)}>
                        Aktualizuj przepis
                    </Button3D>

                    <Button3D className='recipeBtn clear'
                    onClick={onRecipeCancelEdit}>
                        Anuluj
                    </Button3D>
 
                </>                   
            :
                <Button3D className='recipeBtn add'
                onClick={()=>onRecipeFormSubmit(RowsData,Title,Description,PhotoURL)}>
                    Dodaj przepis!
                </Button3D>

            }
            </div>
   

           

            <Button3D className='recipeBtn clear'
                onClick={()=>showAskPopUp(onCleanForm,`Czy na pewno wyczyścić wszystko ?`, "Tak" , "Nie")}>
                    Wyczyść wszystko!
            </Button3D>


        </div>
    );
};


export default RecipeForm2;
