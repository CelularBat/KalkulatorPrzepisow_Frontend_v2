import React from 'react';
import RecipeForm from './AddRecipe/RecipeForm';
import UserProducts_PrimeTable from './_PrimeTables/UserProducts_PrimeTable';
import PublicProducts_PrimeTable from './_PrimeTables/PublicProducts_PrimeTable';
import useProductStore from '@zustand/productStore';
import useRecipeStore from '@zustand/recipeStore';
import Table_Wrapper from './_PrimeTables/Table_Wrapper';

import './AddRecipe/AddRecipe.scss'
import ResizableDivider from './_Shared/headless/ResizableDivider';
import useMediaQuery from '@/hooks/useMediaQuery';



function AddRecipe({}) {
    const isMobileView = useMediaQuery('(max-width: 768px)');

    const {
        userProducts,
        publicProducts,
        fetchUserProducts, 
        fetchPublicProducts,
    } = useProductStore();

    const {addRecipe} = useRecipeStore();


    const [AddProductRow,setAddProductRow] = React.useState({});

    React.useEffect( ()=>{
        fetchUserProducts(); 
        fetchPublicProducts(); 
    },[]);

    function onClickAddToRecipe(rowData){
        setAddProductRow(rowData)
    }

    async function onRecipeFormSubmit(RowsData,Title,Description,PhotoURL){
        
       const a = await addRecipe(RowsData,Title,Description,PhotoURL);  
    }



    return (
        <div className='AddRecipe'>
            {
                isMobileView? // Mobile view
                    <>
                        <RecipeForm {...{AddProductRow,onRecipeFormSubmit}}/>
                        <div className='tableContainer'>
                            <Table_Wrapper title={"Moja baza produktów"}>
                            <UserProducts_PrimeTable TableData={userProducts} 
                                IsInRecipeMode={true}   {...{onClickAddToRecipe}} />
                            </Table_Wrapper>
                        

                            <Table_Wrapper title={"Publiczna baza produktów"}>
                            <PublicProducts_PrimeTable TableData={publicProducts}
                                IsInRecipeMode={true}   {...{ onClickAddToRecipe}} />
                            </Table_Wrapper>
                        </div>

                    </>

                :
                    // Desktop view
                <ResizableDivider defaultLeftWidth={50} min={40} max={70}

                leftContent={
                    <RecipeForm {...{AddProductRow,onRecipeFormSubmit}}/>
                }

                rightContent={
                <div className='tableContainer'>
                    <Table_Wrapper title={"Moja baza produktów"}>
                    <UserProducts_PrimeTable TableData={userProducts} 
                        IsInRecipeMode={true}   {...{onClickAddToRecipe}} />
                    </Table_Wrapper>
                

                    <Table_Wrapper title={"Publiczna baza produktów"}>
                    <PublicProducts_PrimeTable TableData={publicProducts}
                        IsInRecipeMode={true}   {...{ onClickAddToRecipe}} />
                    </Table_Wrapper>
                </div>
                }
            />
            }
            

            
            
        </div>
    );
}

export default AddRecipe;