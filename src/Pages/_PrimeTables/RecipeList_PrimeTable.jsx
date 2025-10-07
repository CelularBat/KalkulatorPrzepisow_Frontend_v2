import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FilterMatchMode } from 'primereact/api';

import "./PrimeTable.css"

import IMG_Padlock from "@/assets/padlock.png";
import IMG_Public from "@/assets/public.png";
import RecipeSumTable from '@pages/AddRecipe/RecipeSumTable';

import { nanoid } from 'nanoid';




function RecipesList_PrimeTable({isPublic=false,TableData,defaultRows,
    handleDeleteRecipe,handleEditRecipe
}) {

    const [filters, setFilters] = React.useState();
    const [expandedRows, setExpandedRows] = React.useState(null);
    const [selectedProduct, setSelectedProduct] = React.useState(null);

    const dataLabels = {
        name: {label:"Nazwa" ,hasFilter:true},
        //description: {label:"Opis" ,hasFilter:false},
    }

    //Main columns
    const initColumns = Object.entries(dataLabels)
    .map(([dataKey,keys])=>{
       return <Column key={dataKey} field={dataKey} header={keys.label} sortable
       {...(keys.hasFilter && {filter: true, filterPlaceholder:"filtruj", 
        filterMatchMode:FilterMatchMode.CONTAINS, matchMode:"contains" })} 
       />
    })
    
    // Custom colums

    const nutritionColumnBody = (rowData)=>{
        return <RecipeSumTable RowsData={rowData.productsList} />
    }
        
    const actionColumnBody = (rowData)=>
        <ActionKeysTemplate rowData={rowData}
        {...{handleDeleteRecipe,handleEditRecipe}}
        />
    
    const photoColumnBody = (rowData)=>
        <PhotoTemplate rowData={rowData}/>

    return (
    <DataTable value={TableData} 
    stripedRows  size="small" showGridlines 
    paginator rows={defaultRows} rowsPerPageOptions={[5, 10, 25, 50]}
    filterDisplay="row" filters={filters}

    selectionMode="single"
    selection={selectedProduct} onSelectionChange={(e) => setSelectedProduct(e.value)}

    onRowSelect={(e) => { setExpandedRows([e.data]); } }
    onRowUnselect={(e) => { setExpandedRows([]); } }

    rowExpansionTemplate={expansionTemplate} 
    expandedRows={expandedRows} onRowToggle={(e) => {setExpandedRows(e.data)}}
    >   
        {/* <Column expander={true} style={{ width: '3%' }} /> */}
        <Column header="Zdjęcie" body={ photoColumnBody} style={{width:"10%"}}/>       
        {initColumns}
        <Column header="Wartość odżywcza" body={ nutritionColumnBody} />

        {isPublic?
        <Column header="Autor" field="author" style={{ width: '3%' }}  />
        :
        <Column header="" body={ actionColumnBody} />
        }
        
        
    </DataTable>
    );
}

const PhotoTemplate = ({rowData})=>{
    const photo= (rowData?.photos && rowData?.photos.length > 0) ? rowData.photos[0] : undefined ;

    return photo?(
        <div style={{width:"100%",height:"100%",overfloe:"hidden"}}>
            <img src={photo} style={{width:"100%",height:"auto",overfloe:"hidden"}}/>
        </div>      
    ) : null;
}

const ActionKeysTemplate = ({rowData,handleDeleteRecipe,handleEditRecipe})=>{
    return(
        <div style={{gap:"5px", display:"Flex", flexDirection:"column"}}>
            <button className="UserTable--button edit-button" onClick={()=>handleEditRecipe(rowData)}>✎</button>
            <button className="UserTable--button delete-button" onClick={()=>handleDeleteRecipe(rowData)}>X</button>
        </div>      
    )
}


export default RecipesList_PrimeTable;


const expansionTemplate = (rowData)=>{
        const ingridients = rowData.productsList.map((item,idx) => { 
          return(<li key={nanoid()}>
            <b>{item.portion}g</b> {item.name}
          </li>); 
        })
        return(
            <div style={{display:'flex',flexDirection:'rows',gap:"15px", paddingRight:"20px" , width:"100%", whiteSpace: "pre-wrap"}}>
                <div>
                    <h3>Składniki:</h3>
                    <ul>
                        {ingridients}
                    </ul>

                </div>
                <div style={{flex:1}}>
                    <h3>Przepis:</h3>
                    <span>{rowData.description}</span>
                </div>
                

            </div>
        )
}