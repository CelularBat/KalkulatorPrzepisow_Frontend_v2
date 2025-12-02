import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FilterMatchMode } from 'primereact/api';

import { Image } from 'primereact/image';

import "./PrimeTable.css"

import RecipeSumTable from '@pages/_PrimeTables/RecipeSumTable';
import { ActionKeysTemplate } from './_Templates/ActionKeysTemplate';
import { RecipeExpansionTemplate } from './_Templates/RecipeExpansionTemplate/RecipeExpansionTemplate';


import { useSearchParams } from 'react-router-dom';




function RecipesList_PrimeTable({ isPublic, TableData, defaultRows,
    handleDeleteRecipe, handleEditRecipe
}) {

    const [filters, setFilters] = React.useState();
    const [expandedRows, setExpandedRows] = React.useState(null);
    const [selectedProduct, setSelectedProduct] = React.useState(null);

    // URL with id - link integration
    const [searchParams, setSearchParams] = useSearchParams();
    React.useEffect(() => {
        // Scroll to recipe ID
        const recipeId = searchParams.get("id");
        const rowData = TableData.find(row => row._id === recipeId);
        if (rowData) {
            setSelectedProduct(rowData);
            setExpandedRows([rowData]);
        }
        const el = document.querySelector(`.rowId-${recipeId}`);
        el?.scrollIntoView({ behavior: 'smooth', block: 'start' });

        // Set Author filter
        const authorFilter = searchParams.get("author");
        if (isPublic && authorFilter) {
            setAuthorFilter(authorFilter);
        }

    }, [TableData]);

    function setAuthorFilter(value){
        setFilters(prev=>({
            ...prev,
            author: { ...prev?.author, 
                value: value ,
                matchMode: FilterMatchMode.CONTAINS
            }
        }));
    }


    const dataLabels = {
        name: { label: "Nazwa", hasFilter: true },
    }

    //Main columns
    const initColumns = Object.entries(dataLabels)
        .map(([dataKey, keys]) => {
            return <Column key={dataKey} field={dataKey} header={keys.label} sortable
                {...(keys.hasFilter && {
                    filter: true, filterPlaceholder: "filtruj",
                    filterMatchMode: FilterMatchMode.CONTAINS, matchMode: "contains"
                })}
            />
        })

    // Custom colums

    const nutritionColumnBody = (rowData) => {
        return <RecipeSumTable RowsData={rowData.productsList} />
    }

    const actionColumnBody = (rowData) =>
        <ActionKeysTemplate rowData={rowData}
            onClickEdit={handleEditRecipe}
            onClickDelete={handleDeleteRecipe}
        />

    const photoColumnBody = (rowData) =>
        <PhotoTemplate rowData={rowData} />

    const expansionBody = (rowData) =>
        <RecipeExpansionTemplate rowData={rowData} />


    return (
        <DataTable value={TableData} className='custom-mobile-table'
            stripedRows size="small" showGridlines
            paginator rows={defaultRows} rowsPerPageOptions={[1, 5, 10, 25, 50]}
            filterDisplay="row" filters={filters}

            selectionMode="single"
            selection={selectedProduct}
            onSelectionChange={(e) => {
                setSelectedProduct(e.value);

                setSearchParams({ id: e.value?._id || '' })
            }}

            rowClassName={(rowData) => `rowId-${rowData._id}`}

            onRowToggle={(e) => { setExpandedRows(e.data) }}
            onRowSelect={(e) => { setExpandedRows([e.data]); }}
            onRowUnselect={(e) => { setExpandedRows([]); }}

            rowExpansionTemplate={expansionBody}
            expandedRows={expandedRows}


        >
            {/* <Column expander={true} style={{ width: '3%' }} /> */}
            <Column header="Zdjęcie" body={photoColumnBody} style={{ width: "10%" }} />
            {initColumns}
            <Column header="Wartość odżywcza" body={nutritionColumnBody} />

            {isPublic ?
                <Column header="Autor" field="author" style={{ width: '5%' }}
                    filter={true} filterPlaceholder="filtruj"
                    filterMatchMode={FilterMatchMode.CONTAINS} matchMode="contains"
                    body={(rowData) => (
                        <a className='authorLink' onClick={()=>setAuthorFilter(rowData.author)}>
                            {rowData.author}
                        </a>
                    )}
                />
                :
                <Column header="" body={actionColumnBody} />
            }


        </DataTable>
    );
}

const PhotoTemplate = ({ rowData }) => {
    const photo = (rowData?.photos && rowData?.photos.length > 0) ? rowData.photos[0] : undefined;

    return photo ? (
        <div style={{ width: "100%", height: "100%", overfloe: "hidden", cursor: "ew-resize" }}>
            <Image src={photo} preview width='100%' onClick={(e) => e.preventDefault()} />
        </div>
    ) : null;
}



export default RecipesList_PrimeTable;

