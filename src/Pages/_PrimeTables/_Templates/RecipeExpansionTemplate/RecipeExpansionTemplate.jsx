import { nanoid } from 'nanoid';
import React from 'react';
import CommentsPanelTemplate from './CommentsPanelTemplate';
import useCheckIsMobileView from '@hooks/useCheckMobileView';


export const RecipeExpansionTemplate = ({rowData})=>{

    const ingridients = rowData.productsList.map((item,idx) => { 
      return(<li key={nanoid()}>
        <b>{item.portion}g</b> {item.name}
      </li>); 
    })
    const isMobile = useCheckIsMobileView();
    
    return(
        <div style={{display:'flex',flexDirection:'column',gap:"5px", width:"100%"}}>

            <div style={{ display:'flex',
            flexDirection:`${isMobile?"column":"row"}`
            ,gap:"15px", paddingRight:"20px" 
            ,width:"100%", whiteSpace: "pre-wrap",
            marginBottom:"20px"}}>

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
            <CommentsPanelTemplate recipeId={rowData._id}/>
        </div>
    )
}