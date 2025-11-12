/* src/zustand/productStore.js */
import { create } from 'zustand';
import { API_URLs } from '@/API/API_Handler.js'; 
import { fetcher } from './_fetcher.js';

const USE_LOCAL_CACHE = true; 

const useProductStore = create((set, get) => ({
    userProducts: [],
    publicProducts: [],
    
    currentProductRow: {},
    isProductFormInEditMode: false,

    fetchPublicProducts: () => {
        fetcher(API_URLs.products.getPublicProducts, null, "fetch public products", 
            (res) => set({ publicProducts: res.msg })
        );
    },

    fetchUserProducts: () => {
        fetcher(API_URLs.products.getUserProducts, null, "fetch user products", 
            (res) => set({ userProducts: res.msg })
        );
    },

    addProduct: async (formData) => {
        return fetcher(
            API_URLs.product.add,
            formData,
            "add product",
            () => get().fetchUserProducts(),
            `Produkt ${formData?.name} dodany!`
        );
    },

    updateProduct: async (formData) => {
        return fetcher(
            API_URLs.product.update,
            formData,
            "update product",
            () => get().fetchUserProducts(),
            `Produkt ${formData?.name} zmieniony!`
        );
    },

    deleteProduct: async (formData) => {
        return fetcher(
            API_URLs.product.remove,
            formData,
            "delete product",
            () => {
                if (USE_LOCAL_CACHE) {
                    set(state => ({
                        userProducts: state.userProducts.filter(
                            product => !(product.name === formData.name && product.brand === formData.brand)
                        )
                    }));
                } else {
                    get().fetchUserProducts();
                }
            },
            `Produkt ${formData?.name} usunięty!`
        );
    }
}));

export default useProductStore;
