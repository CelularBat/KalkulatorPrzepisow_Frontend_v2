import {create} from "zustand";

// User Store
export const useUserProductsStore = create((set) => ({
    activePage: 1,      // numer aktywnej strony
    rows: 10,            // liczba wierszy na stronę
    setActivePage: (page) => set({ activePage: page }),
    setRows: (rows) => set({ rows }),
}));

// Public Store
export const usePublicProductsStore = create((set) => ({
    activePage: 1,      // numer aktywnej strony
    rows: 10,            // liczba wierszy na stronę
    setActivePage: (page) => set({ activePage: page }),
    setRows: (rows) => set({ rows }),
}));