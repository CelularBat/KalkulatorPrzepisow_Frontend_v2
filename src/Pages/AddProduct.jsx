import React from 'react';
import UserProducts_PrimeTable from './_PrimeTables/UserProducts_PrimeTable';
import PublicProducts_PrimeTable from './_PrimeTables/PublicProducts_PrimeTable';
import useProductStore from '@zustand/productStore';
import AddButton from './AddProduct/AddButton';
import Table_Wrapper from './_PrimeTables/Table_Wrapper';
import ProductForm from './AddProduct/ProductForm';
import Overlay from './_Shared/headless/Overlay_Wrapper';
import useAskPopUp from '@zustand/widgets/AskPopUpManager';

function AddProduct({}) {
const {
        userProducts,
        publicProducts,
        fetchUserProducts, 
        fetchPublicProducts,
        deleteProduct,    
        addProduct,
        updateProduct
} = useProductStore();

    // States for handling Product Form
    const [IsProductFormInEditMode,setIsProductFormInEditMode] = React.useState(false);
    const [EditRowData,setEditRowData] = React.useState();
    const [IsProductFormVisible,setIsProductFormVisible] = React.useState();

    // For delete product popup
    const {showAskPopUp,hideAskPopUp} = useAskPopUp();


    React.useEffect( ()=>{
        fetchUserProducts(); 
        fetchPublicProducts(); 
    },[]);

    function onClickAdd(){
        setIsProductFormInEditMode(false);
        setIsProductFormVisible(true);
    }

    function onClickEdit(rowData){
        setIsProductFormInEditMode(true);
        setEditRowData(rowData);
        setIsProductFormVisible(true);
    }

    function onClickDelete(rowData){
        showAskPopUp(onPopUpDelete,`Czy na pewno usunąć ${rowData.name} ?`, "Tak" , "Nie");

        function onPopUpDelete(choice){
            if (choice){
                deleteProduct(rowData);
            }
            hideAskPopUp();
        }
    }

    

    

    function onProductFormSubmit(event,formData){
        event.preventDefault();
        if (IsProductFormInEditMode) {
            updateProduct(formData)
        } else {
            addProduct(formData)
        }
        
        setIsProductFormVisible(false);
    }

    function onProductFormClose(){
        setIsProductFormVisible(false);
    }


    return (
        <> 
        
            <AddButton onClick={onClickAdd}/>
   
            <Table_Wrapper title={"Moja baza produktów"}>
                <UserProducts_PrimeTable TableData={userProducts} 
                IsInRecipeMode={false} 
                {...{onClickEdit, onClickDelete}}/> 
            </Table_Wrapper>
           

            <Table_Wrapper title={"Publiczna baza produktów"}>
                <PublicProducts_PrimeTable TableData={publicProducts}
                IsInRecipeMode={false} />
            </Table_Wrapper>
          
            { IsProductFormVisible &&
            <Overlay onClose={onProductFormClose}>
                <ProductForm {...{IsProductFormInEditMode,EditRowData,onProductFormSubmit,onProductFormClose}}/>
            </Overlay>
                
            }

        </>
    );
}

export default AddProduct;