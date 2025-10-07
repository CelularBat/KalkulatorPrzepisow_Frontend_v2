import { create } from 'zustand';
import { API_URLs, fetchAPI } from '@utils/API_Handler.js'; 
import log from '@utils/Logger';
import { useToast_noReact } from './widgets/ToastManager';

import { c_UnregisteredAccountName } from '../../config';
import { useUserStore } from './userStore';


// SETTINGS:

// After CRUD operation: modifies local cache, instead of re-fetching table from server
const USE_LOCAL_CACHE = true; 


const useProductStore = create( (set,get)=>({
    // STATES
    userProducts: [],
    publicProducts: [],
    isLoading: false,

    // FORM STATES
    currentProductRow: {},
    isProductFormInEditMode: false,

    //Getting data

    fetchPublicProducts: async () =>{
        set({isLoading: true});
        fetchAPI(API_URLs.products.getPublicProducts)
        .then((result)=>{
            if (result.status === 1){
                set({ publicProducts: result.msg });
            }
            else if (result.status === -1){
                log.error("Failed to fetch public products - connection problems.");
                useToast_noReact("Oops! \n We have connection problems!" , "error");
            }
            else {
                log.error("Failed to fetch public products:", result.msg);
            }
            set({isLoading: false});
        })
    },

    fetchUserProducts: async () =>{
        set({isLoading: true});
        fetchAPI(API_URLs.products.getUserProducts)
        .then((result)=>{
            if (result.status === 1){
                set({ userProducts: result.msg });
            }
            else if (result.status === -1){
                log.error("Failed to fetch user products - connection problems.");
                useToast_noReact("Oops! \n We have connection problems!" , "error");
            }
            else {
                log.error("Failed to fetch user products:", result.msg);
            }
            set({isLoading: false});
        })
    },
    
    // CRUD

    addProduct: (formData)=>{
        fetchAPI(API_URLs.product.add,formData)
        .then((result)=>{
            if (result.status === 1){
                get().fetchUserProducts(); 
                // if (USE_LOCAL_CACHE){ // author property must be added to local cache
                //     if ( useUserStore.getState().G_IsUserLoggedIn ){
                //         formData.author = useUserStore.getState().G_UserName;
                //     }
                //     else {
                //         formData.author = c_UnregisteredAccountName;
                //     }
                //     set(state=>({ userProducts:  [...state.userProducts,formData]} ) )
                // }
                // else {
                //     get().fetchUserProducts(); // it's async, so little delay here, but it's not importnat
                // }
                useToast_noReact(`Produkt ${formData?.name} dodany!` , "success");
                return ({status: 1});
                
            }
            else if (result.status === -1){
                log.error("Failed to add product - connection problems.");
                useToast_noReact("Oops! \n We have connection problems!" , "error");
                return ({status: -1});
            }
            else {
                log.error("Failed to add product:", result.msg);
                useToast_noReact(result.msg, "error");
                return ({status: 0});
            }
           
        })
        .catch(err=>{
            console.error("Completely unexpected API error:", err)
            return ({status: -1});
        })
    },

    updateProduct: (formData) => {
        return fetchAPI(API_URLs.product.update, formData)
            .then((result) => {
                if (result.status === 1) {
                    get().fetchUserProducts();
                    // if (USE_LOCAL_CACHE) {
                    //     set(state => ({ 
                    //         userProducts: state.userProducts.map(product => 
                    //             (product.name === formData.name && product.brand === formData.brand) ? 
                    //             formData 
                    //             : product 
                    //         )
                    //     }));
                    // } else {
                    //     get().fetchUserProducts();
                    // }
                    useToast_noReact(`Produkt ${formData?.name} zmieniony!`, "success");
                    return { status: 1 };
                } 
                else if (result.status === -1) {
                    log.error("Failed to update product - connection problems.");
                    useToast_noReact("Oops! \n We have connection problems!", "error");
                    return { status: -1 };
                } else {
                    log.error("Failed to update product:", result.msg);
                    useToast_noReact(result.msg, "error");
                    return { status: 0 };
                }
            })
            .catch(err => {
                console.error("Unexpected API error during product update:", err);
                return { status: -1 };
            });
    },
    deleteProduct: (formData) => {
        return fetchAPI(API_URLs.product.remove, formData)
            .then((result) => {
                if (result.status === 1) {
                    if (USE_LOCAL_CACHE) {
                        set(state => ({ 
                            userProducts: state.userProducts.filter(product => 
                                !(product.name === formData.name && product.brand === formData.brand) 
                            )
                        }));
                    } else {
                        get().fetchUserProducts();
                    }
                    useToast_noReact(`Produkt ${formData?.name} usunięty!`, "success");
                    return { status: 1 };
                } 
                else if (result.status === -1) {
                    log.error("Failed to remove product - connection problems.");
                    useToast_noReact("Oops! \n We have connection problems!", "error");
                    return { status: -1 };
                } else {
                    log.error("Failed to remove product:", result.msg);
                    useToast_noReact(result.msg, "error");
                    return { status: 0 };
                }
            })
            .catch(err => {
                console.error("Unexpected API error during product removal:", err);
                return { status: -1 };
            });
    },



}) );

export default useProductStore;