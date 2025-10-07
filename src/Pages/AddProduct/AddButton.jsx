import Button3D from '@re/Buttons/Button3D';
import React from 'react';
import './AddButton.scss';

function AddButton({...rest}) {
    return (
        <div className='AddButton-container'>
       
            <Button3D className='AddButton' {...rest}>
                Dodaj produkt
            </Button3D>
       
            
        </div>
    );
}

export default AddButton;