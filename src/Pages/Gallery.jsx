import React from 'react';
import Table_Wrapper from './_PrimeTables/Table_Wrapper';
import RecipesList_PrimeTable from './_PrimeTables/RecipeList_PrimeTable';
import useRecipeStore from '@zustand/recipeStore';
import useAskPopUp from '@zustand/widgets/AskPopUpManager';
import { useNavigate } from 'react-router-dom';

function Gallery({}) {
    const navigate = useNavigate();

    const {
        userRecipes,
        publicRecipes,

        fetchPublicRecipes,
        fetchUserRecipes,
        deleteRecipe,

        setIsFormRecipeInEditMode,
        setRecipeDataToEdit

    } = useRecipeStore();

    // For delete product popup
    const {showAskPopUp,hideAskPopUp} = useAskPopUp();

    React.useEffect( ()=>{
        fetchPublicRecipes(); 
        fetchUserRecipes(); 
    },[]);

    function handleDeleteRecipe(rowData){
        showAskPopUp(onPopUpDelete,`Czy na pewno usunąć ${rowData.name} ?`, "Tak" , "Nie");

        function onPopUpDelete(choice){
            if (choice){
                deleteRecipe(rowData);
            }
            hideAskPopUp();
        }
    }

    function handleEditRecipe(rowData){
        setIsFormRecipeInEditMode(true);
        setRecipeDataToEdit(rowData);
        navigate('/recipe');
    }

    return (
        <div className='RecipeList'>
        <div className='RecipeList--header'>
         
        </div>
        <div className='RecipeList--tables'>
            <Table_Wrapper title="Moje przepisy:">        
                <RecipesList_PrimeTable TableData={userRecipes} defaultRows={5}
                {...{handleDeleteRecipe,handleEditRecipe}}
                />
            </Table_Wrapper>

            <Table_Wrapper title="Przepisy użytkowników:">        
                <RecipesList_PrimeTable isPublic={true} TableData={publicRecipes} defaultRows={15}
                
                />
            </Table_Wrapper>
        </div>

    </div>
    );
}

export default Gallery;