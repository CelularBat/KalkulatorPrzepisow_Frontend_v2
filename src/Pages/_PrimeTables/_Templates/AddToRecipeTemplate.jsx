import Button3D from '@re/Buttons/Button3D';
import React from 'react';

export const AddToRecipeTemplate = ({ rowData, onClickAddToRecipe }) => {
    return (
        <div style={{zIndex:0,position:'relative'}}>
            {/* <button className="UserTable--button addToRecipe-button" onClick={() => onClickAddToRecipe(rowData)}>+</button> */}
            <Button3D className='actionKey'
            onClick={() => onClickAddToRecipe(rowData)}>＋</Button3D>
        </div>
    );
};
