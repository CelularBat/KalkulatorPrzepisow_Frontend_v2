import './Header.scss';

import React from 'react';
import { NavLink } from "react-router-dom"

import LoginForm from './Header/LoginForm';
import UserPanel from './Header/UserPanel';
import Button3D from '@re/Buttons/Button3D'

import { useUserStore } from '@/API/userStore';
import {useToast} from '@zustand/widgets/ToastManager'


function Header({}) {
    const { G_IsUserLoggedIn, G_UserName, checkLoginStatus,login,register,logout } = useUserStore();
    const showMsg = useToast();

    // On Start
    React.useEffect(()=>{
        checkLoginStatus()
        .then(result=>{
           if (result && result.isLogged){
              showMsg(`Welcome back ${result.userName} !`);
           }
        });
     },[]);


     function handleLogin(user,pass){
        login(user,pass); 
      }
      
     function handleRegister(user,pass){
        register(user,pass)
      }
  
      function handleLogout(){
        logout();
      }


    return (
    <header>
    <nav>

    <NavLink to="/">
      {({ isActive }) => (
        <Button3D className={`nav c1 ${isActive ? 'active' : ''}`}>
          Strona główna
        </Button3D>
      )}
    </NavLink>

    <NavLink to="/product">
      {({ isActive }) => (
        <Button3D className={`nav c2 ${isActive ? 'active' : ''}`}>
          Baza produktów
        </Button3D>
      )}
    </NavLink>

    <NavLink to="/recipe">
      {({ isActive }) => (
        <Button3D className={`nav c3 ${isActive ? 'active' : ''}`}>
          Skomponuj przepis
        </Button3D>
      )}
    </NavLink>

    <NavLink to="/gallery">
      {({ isActive }) => (
        <Button3D className={`nav c4 ${isActive ? 'active' : ''}`}>
          Galeria przepisów
        </Button3D>
      )}
    </NavLink>

    {G_IsUserLoggedIn?
            <UserPanel {...{G_UserName,handleLogout}}/>
            :
            <LoginForm {...{handleLogin,handleRegister}}/>
    }   

  </nav>
</header>

    );
}

export default Header;