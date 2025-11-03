import React from 'react';
import './SumHeader.scss'

function  SumHeader({RowsData}) {
    const [productsWeight,setProductsWeight] = React.useState();
    React.useEffect( ()=>{
      const sum = calculateSum();
      setProductsWeight(sum);
    },[RowsData]);

    function calculateSum(){
        return RowsData.reduce((sum, row) => sum + (row.portion || 0), 0);
    }
    return (
        <div className='SumHeader'>
            Łącznie <span>{productsWeight}</span> gram składników o wartości odżywczej:
        </div>
    );
}

export default  SumHeader;