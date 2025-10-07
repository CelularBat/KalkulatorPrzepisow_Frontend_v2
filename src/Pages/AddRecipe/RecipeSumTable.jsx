import React from 'react';
import './RecipeSumTable.css';

const RecipeSumTable = ({RowsData})=>{
    const [Sum,setSum] = React.useState({});

    React.useEffect(()=>{
        setSum(calculateRows());
    },[RowsData]);

    function calculateRows(){
        let initialState = { 
            kj:{value: 0 ,hasUndefined:false},
            kcal: {value:0 ,hasUndefined:false},
            fat:{value: 0 ,hasUndefined:false}, 
            carb: {value:0 ,hasUndefined:false}, 
            sugar: {value:0 ,hasUndefined:false},
            protein:{value: 0 ,hasUndefined:false}, 
            fiber:{value: 0 ,hasUndefined:false}, 
            salt: {value:0 ,hasUndefined:false}
        }
        const labels = Object.keys(initialState);
        RowsData.forEach((row)=>{
            labels.forEach((label)=>{
                if ( row[label] === null){
                    initialState[label].hasUndefined = true; 
                } else {
                    initialState[label].value += row[label] * (row.portion/100); 
                }     
            });  
        });

        labels.forEach((label)=>{
            initialState[label].value = Math.round(initialState[label].value);
        });

        return initialState;
    }
    
    const tableBody = Object.entries(Sum).map((obj)=>{
        return <td key={obj[0]}>
            {String(obj[1].value)}
            {obj[1].hasUndefined && " + ?"}
        </td>
    });

    return(
        <table className="RecipeSum">
        <thead>
            <tr>           
                <th>Kj</th>
                <th>Kcal</th>
                <th>Tłuszcz</th>
                <th>Węglo</th>
                <th>Cukier</th>
                <th>Białko</th>
                <th>Błonnik</th>
                <th>Sól</th>
                
            </tr>
        </thead>
        <tbody>
            <tr>
            {tableBody}
            </tr>
        </tbody>
    </table>
    );

}

export default RecipeSumTable;