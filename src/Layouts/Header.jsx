import './Header.scss';

import React from 'react';
import { NavLink } from "react-router-dom"

import LoginForm from './Header/LoginForm';
import UserPanel from './Header/UserPanel';
import Button3D from '@re/Buttons/Button3D'

import { useUserStore } from '@zustand/userStore';
import { API_URLs,fetchAPI } from "@utils/API_Handler";

import {useToast} from '@zustand/widgets/ToastManager'


function Header({}) {
    const { G_IsUserLoggedIn, G_UserName, setG_IsUserLoggedIn, setG_UserName } = useUserStore();
    const showMsg = useToast();

    // On Start
    React.useEffect(()=>{
        fetchAPI(API_URLs.user.islogged,{})
        .then(result=>{
           if (result && result.isLogged){
              setG_IsUserLoggedIn(true);
              setG_UserName(result.userName);
              showMsg(`Welcome ${result.userName} !`);
           }
        });
     },[]);


     function handleLogin(user,pass){
        fetchAPI(API_URLs.user.login,{user:user, password: pass })
        .then(result=>{
           if (result.status == 1){
              setG_IsUserLoggedIn(true);
              setG_UserName(user);
              showMsg(`Welcome ${user} !`);
           } else if (result.status == 0){
            showMsg(result.msg,"error");
           }
        });
        
      }
      
     function handleRegister(user,pass){
        fetchAPI(API_URLs.user.register,{user:user, password: pass })
        .then(result=>{
           
           if (result.status == 1){
              setG_IsUserLoggedIn(true);
              setG_UserName(user);
              showMsg(result.msg);
           }else if (result.status == 0){
            showMsg(result.msg,"error");
           }
        })
      }
  
      function handleLogout(){
        fetchAPI(API_URLs.user.logout,{})
        .then(result=>{
           
           if (result.status == 1){
              setG_IsUserLoggedIn(false);
              showMsg(result.msg )
           }else if (result.status == 0){
            showMsg(result.msg,"error");
           }
        })
        
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