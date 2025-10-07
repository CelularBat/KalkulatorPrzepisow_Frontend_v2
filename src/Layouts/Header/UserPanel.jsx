import React from 'react';
import "./UserPanel.css";

import IMG_AVATAR from "../../assets/avatar.svg";

const UserPanel = ({G_UserName,handleLogout}) => {
    const [Shrinked, setShrinked] = React.useState(false);

    const documentRef = React.useRef(document);

    React.useEffect(()=>{
        documentRef.current.addEventListener('click', handleClickOutside);
        return ()=>{
            documentRef.current.removeEventListener('click', handleClickOutside);
        }
    },[]);

    const userPanelRef = React.useRef(null);

    function handleClickOutside(event){
        if (  userPanelRef.current.contains(event.target)){
            setShrinked(false);
        } 
        else if (!Shrinked){
            setShrinked(true);
        }
    };

    return (
        <div 
            className={`UserPanel ${Shrinked?" shrinked":""}`}
            ref={userPanelRef}
        >  
       
            <div className='UserPanel--static'>
                <span className='UserPanel--userName'>{G_UserName}</span>
                <img className="UserPanel--avatar" src={IMG_AVATAR} />     
            </div>
            <div className="UserPanel--pages"  >
                <button className="UserPanel--btn-logout" onClick={handleLogout}>Wyloguj</button>
            </div>
            
            
        </div>
    );
};

export default UserPanel;