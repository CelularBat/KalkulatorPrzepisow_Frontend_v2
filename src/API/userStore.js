/* src/zustand/userStore.js */
import { create } from 'zustand';
import { API_URLs } from '@/API/API_Handler.js';
import { useToast_noReact } from '../zustand/widgets/ToastManager';
import { fetcher } from './_fetcher';

export const useUserStore = create((set) => ({
  G_IsUserLoggedIn: false,
  G_UserName: 'NIEZALOG',

  setG_IsUserLoggedIn: (value) => set({ G_IsUserLoggedIn: value }),
  setG_UserName: (value) => set({ G_UserName: value }),


  checkLoginStatus: () => {
    return fetcher(
      API_URLs.user.islogged,
      {},
      "check login status",
      (res) => {
        if (res?.isLogged) {
          set({ G_IsUserLoggedIn: true, G_UserName: res.userName });
        }
      }
    );
  },

  login: (user, pass) => {
    return fetcher(
      API_URLs.user.login,
      { user, password: pass },
      "login",
      (res) => {
        set({ G_IsUserLoggedIn: true, G_UserName: user });
        useToast_noReact(`Welcome ${user} !`);
      }
    );
  },

  register: (user, pass) => {
    return fetcher(
      API_URLs.user.register,
      { user, password: pass },
      "register",
      (res) => {
        set({ G_IsUserLoggedIn: true, G_UserName: res.userName });
        useToast_noReact(`Welcome ${user}, your account was created !`);
      }
    );
  },

  logout: () => {
    return fetcher(
      API_URLs.user.logout,
      {},
      "logout",
      (res) => {
        set({ G_IsUserLoggedIn: false, G_UserName: 'Anonim' });
        useToast_noReact(`You are now logged out.`);
      }
    );
  }
}));
