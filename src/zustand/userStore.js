// src/store/userStore.js
import { create } from 'zustand';

export const useUserStore = create((set) => ({
  G_IsUserLoggedIn: false,
  G_UserName: 'Anonim',
  setG_IsUserLoggedIn: (value) => set({ G_IsUserLoggedIn: value }),
  setG_UserName: (value) => set({ G_UserName: value }),
}));
