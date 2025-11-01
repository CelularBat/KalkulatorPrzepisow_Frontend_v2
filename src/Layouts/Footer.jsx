import React from 'react';
import "./Footer.scss"
import { useSettingsStore } from '@zustand/settingsStore';

function Footer({}) {
    const primaryColor1 = useSettingsStore(state => state.primary_color1);
    const primaryColor2 = useSettingsStore(state => state.primary_color2);
    const setSetting = useSettingsStore(state => state.setSetting);

    const [color1,setColor1] = React.useState(primaryColor1);
    const [color2,setColor2] = React.useState(primaryColor2);

    
    React.useEffect( ()=>{
        document.documentElement.style.setProperty('--primary-color1', color1);
        setSetting('primary_color1',color1);
     },[color1]);
     React.useEffect( ()=>{
        document.documentElement.style.setProperty('--primary-color2', color2);
        setSetting('primary_color2',color2);
     },[color2]);

    return (
    <footer>
        
        <div className='theming'>
            <label>
                Kolor motywu 1:
                <input
                    type="color"
                    value={color1}
                    onChange={(e) => setColor1( e.target.value)}
                />
            </label>

            <label>
                Kolor motywu 2:
                <input
                    type="color"
                    value={color2}
                    onChange={(e) => setColor2( e.target.value)}
                />
            </label>
        
        </div>
        <h3>Kalkulator wartości odżywczych przepisów.</h3>
        <a href="https://github.com/CelularBat/KalkulatorPrzepisow_Frontend">
            <span>by CelularBat</span>
        </a>
        
    </footer>
    
    );
}

export default Footer;