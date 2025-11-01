import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import "./PrimeTable.css"

import { useUserProductsStore } from '@zustand/primeTableStore';

import { ActionKeysTemplate } from './_Templates/ActionKeysTemplate';
import { PublColumnTemplate } from './_Templates/PublColumntTemplate';
import { AddToRecipeTemplate } from './_Templates/AddToRecipeTemplate';


function UserProducts_PrimeTable({TableData,
    onClickEdit,onClickDelete,
    IsInRecipeMode, onClickAddToRecipe}) {

    const {activePage,rows,setActivePage,setRows} = useUserProductsStore();

    // pierwszy wyświetlany rekord w tabeli
    const first = (activePage - 1) * rows;

    // akcja przy zmianie strony/zmiany liczby wierszy
    const onPage = (event) => {
        setActivePage(event.first / event.rows + 1);
        setRows(event.rows);
    };


    const dataLabels = IsInRecipeMode?{
        category: {label:"Kategoria" ,hasFilter:true},
        name: {label:"Nazwa" ,hasFilter:true},
        brand: {label:"Marka" ,hasFilter:true},
    }
    :{
        category: {label:"Kategoria" ,hasFilter:true},
        name: {label:"Nazwa" ,hasFilter:true},
        brand: {label:"Marka" ,hasFilter:true},
        kj:{label: "Kj" ,hasFilter:false},
        kcal: {label:"Kcal" ,hasFilter:false},
        fat:{label: "Tłu" ,hasFilter:false}, 
        carb: {label:"Węgl" ,hasFilter:false}, 
        sugar: {label:"Cukr" ,hasFilter:false},
        protein:{label: "Biał" ,hasFilter:false}, 
        fiber:{label: "Błon" ,hasFilter:false}, 
        salt: {label:"Sól" ,hasFilter:false}
    }

  
    const [filters, setFilters] = React.useState();
    
    const initColumns = Object.entries(dataLabels)
    .map(([dataKey,keys])=>{
       return <Column key={dataKey} field={dataKey} header={keys.label} sortable
       {...(keys.hasFilter && {filter: true, filterPlaceholder:"filtruj", 
        filterMatchMode:FilterMatchMode.CONTAINS, matchMode:"contains" })} 
       />
    })
    
    const actionProductColumnBody = (rowData,options)=>
        <ActionKeysTemplate rowData={rowData}
        onClickEdit={onClickEdit} onClickDelete={onClickDelete}
        />

    const actionRecipeColumnBody = (rowData,options)=>
        <AddToRecipeTemplate rowData={rowData}
        onClickAddToRecipe={onClickAddToRecipe}
        />


    return (
    <DataTable value={TableData} 
    stripedRows  size="small" showGridlines 
    paginator rows={rows} rowsPerPageOptions={[5, 10, 25, 50]} first={first}
    filterDisplay="row" filters={filters}
    selectionMode="single"
    onPage={onPage}
    >   
        {!IsInRecipeMode && <Column header="" body={ actionProductColumnBody} />}
        {IsInRecipeMode && <Column header="Dodaj" body={ actionRecipeColumnBody} />}

        {initColumns}
        <Column header="Pub?" body={(data)=><PublColumnTemplate isPublic={data.public}/>} />
    </DataTable>
    );
}


export default UserProducts_PrimeTable;