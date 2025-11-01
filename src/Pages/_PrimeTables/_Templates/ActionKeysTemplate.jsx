import React from 'react';

export const ActionKeysTemplate = ({ rowData, onClickEdit, onClickDelete }) => {
    return (
        <div style={{ gap: "5px", display: "flex", flexDirection: "column" }}>
            <button className="UserTable--button edit-button" onClick={() => onClickEdit(rowData)}>✎</button>
            <button className="UserTable--button delete-button" onClick={() => onClickDelete(rowData)}>X</button>
        </div>
    );
};
