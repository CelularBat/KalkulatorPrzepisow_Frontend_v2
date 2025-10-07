import React from 'react';
import './Table_Wrapper.scss'
import Checkbox_holo from '@re/Checkboxes/Checkbox_holo';
import IMG_EYE from '@/assets/eye.svg';
import IMG_EYE_OFF from '@/assets/eye-slash-fill.svg';

function  Table_Wrapper({children,title}) {
    const [showTable,setShowTable] = React.useState(true);

    return (
        <div className='Table_Wrapper'>
            
            <div className='Table_Wrapper-header'>
                <Checkbox_holo className='tableBar'
                checked={showTable}
                 alternativeChildren={<img src={IMG_EYE_OFF}/>}
                 onChange={()=>setShowTable(last=>!last)}
                >
                     <img src={IMG_EYE}/>
                </Checkbox_holo>
                {title}
            </div>
            {showTable && children}
            
        </div>
    );
}

export default  Table_Wrapper;