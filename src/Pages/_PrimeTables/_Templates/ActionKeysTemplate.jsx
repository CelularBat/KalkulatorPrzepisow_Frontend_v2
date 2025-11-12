import Button3D from '@re/Buttons/Button3D';
import React from 'react';

export const ActionKeysTemplate = ({ rowData, onClickEdit, onClickDelete }) => {
    return (
        <div style={{ gap: "1px", display: "flex", flexDirection: "column",position:'relative',zIndex:0 }}>
            {/* <button className="UserTable--button edit-button" 
            onClick={() => onClickEdit(rowData)}>✎</button>
            <button className="UserTable--button delete-button" 
            onClick={() => onClickDelete(rowData)}>X</button> */}
            <Button3D className='actionKey' onClick={() => onClickEdit(rowData)}>✎</Button3D>
            <Button3D className='actionKey red' onClick={() => onClickDelete(rowData)}>X</Button3D>
        </div>
    );
};
