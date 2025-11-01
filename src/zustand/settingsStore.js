import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Default settings object
const defaultSettings = {
  primary_color1:'#955DFF',
  primary_color2:'#6FAAFF',
  backgroud_color:'#fff7ed'
};

export const useSettingsStore = create(
  persist(
    (set) => ({
      // Initialize the state with the default settings
      ...defaultSettings,

      // Generic setter
      setSetting: (key, value) => set({ [key]: value }),

      // Reset to default values
      resetToDefault: () => set({ ...defaultSettings }),
    }),
    {
      name: 'Kalkulator_SettingsStorage', // Name of the storage
    }
  )
);
