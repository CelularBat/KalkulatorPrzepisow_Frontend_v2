import React from 'react';

export const AddToRecipeTemplate = ({ rowData, onClickAddToRecipe }) => {
    return (
        <div>
            <button className="UserTable--button addToRecipe-button" onClick={() => onClickAddToRecipe(rowData)}>+</button>
        </div>
    );
};
