/* src/zustand/recipeStore.js */
import { create } from 'zustand';
import { API_URLs, fetchAPI } from '@utils/API_Handler.js'; 
import log from '@utils/Logger';
import { useToast_noReact } from './widgets/ToastManager';



const useRecipeStore = create((set, get) => ({
    // STATES
    userRecipes: [],
    publicRecipes: [],
    isLoading: false,

    IsFormRecipeInEditMode: false,
    RecipeDataToEdit: null,

    // SETTERS
    setIsFormRecipeInEditMode: (value) => set({ IsFormRecipeInEditMode: value }),
    setRecipeDataToEdit: (data) => set({ RecipeDataToEdit: data }),

    // Fetch
    fetchPublicRecipes: async () => {
        set({ isLoading: true });
        fetchAPI(API_URLs.recipes.getPublicRecipes)
            .then((result) => {
                if (result.status === 1) {
                    set({ publicRecipes: result.msg });
                } else if (result.status === -1) {
                    log.error("Failed to fetch public recipes - connection problems.");
                    useToast_noReact("Oops! \n We have connection problems!", "error");
                } else {
                    log.error("Failed to fetch public recipes:", result.msg);
                }
                set({ isLoading: false });
            });
    },

    fetchUserRecipes: async () => {
        set({ isLoading: true });
        fetchAPI(API_URLs.recipes.getUserRecipes)
            .then((result) => {
                if (result.status === 1) {
                    set({ userRecipes: result.msg });
                } else if (result.status === -1) {
                    log.error("Failed to fetch user recipes - connection problems.");
                    useToast_noReact("Oops! \n We have connection problems!", "error");
                } else {
                    log.error("Failed to fetch user recipes:", result.msg);
                }
                set({ isLoading: false });
            });
    },

    // CRUD
    addRecipe: async (RowsData,Title,Description,PhotoURL) => {
        const obj = {
            name: Title,
            description: Description,
            photos: [PhotoURL],
            productsList: RowsData.map((rowData)=>({
                product: rowData._id ,
                portion: rowData.portion
            }))
        }

        return fetchAPI(API_URLs.recipe.add, obj)
            .then((result) => {
                if (result.status === 1) {
                    
                    useToast_noReact(`Przepis ${obj?.name} dodany!`, "success");
                    return { status: 1 };
                } else if (result.status === -1) {
                    log.error("Failed to add recipe - connection problems.");
                    useToast_noReact("Oops! \n We have connection problems!", "error");
                    return { status: -1 };
                } else {
                    log.error("Failed to add recipe:", result.msg);
                    useToast_noReact(result.msg, "error");
                    return { status: 0 };
                }
            })
            .catch(err => {
                console.error("Unexpected API error during recipe add:", err);
                return { status: -1 };
            });
    },

    updateRecipe: async (RowsData,Title,Description,PhotoURL) => {
        const obj = {
            name: Title,
            description: Description,
            photos: [PhotoURL],
            productsList: RowsData.map((rowData)=>({
                product: rowData._id ,
                portion: rowData.portion
            }))
        }

        return fetchAPI(API_URLs.recipe.update, obj)
            .then((result) => {
                if (result.status === 1) {
                    useToast_noReact(`Przepis ${obj?.name} zmieniony!`, "success");
                    return { status: 1 };
                } else if (result.status === -1) {
                    log.error("Failed to update recipe - connection problems.");
                    useToast_noReact("Oops! \n We have connection problems!", "error");
                    return { status: -1 };
                } else {
                    log.error("Failed to update recipe:", result.msg);
                    useToast_noReact(result.msg, "error");
                    return { status: 0 };
                }
            })
            .catch(err => {
                console.error("Unexpected API error during recipe update:", err);
                return { status: -1 };
            });
    },

    deleteRecipe: (rowData) => {
        return fetchAPI(API_URLs.recipe.remove, {_id : rowData._id})
            .then((result) => {
                if (result.status === 1) {
                    get().fetchUserRecipes();
                    useToast_noReact(`Przepis ${rowData?.name} usunięty!`, "success");
                    return { status: 1 };
                } else if (result.status === -1) {
                    log.error("Failed to remove recipe - connection problems.");
                    useToast_noReact("Oops! \n We have connection problems!", "error");
                    return { status: -1 };
                } else {
                    log.error("Failed to remove recipe:", result.msg);
                    useToast_noReact(result.msg, "error");
                    return { status: 0 };
                }
            })
            .catch(err => {
                console.error("Unexpected API error during recipe removal:", err);
                return { status: -1 };
            });
    },

        // HELPER FUNCTION
        verifyImg: async (PhotoURL) => {
            const req = await fetchAPI(API_URLs.helper.verifyimg, { img: PhotoURL });
            const isOk = req.status === 1 && req.result === true;
    
            if (isOk) {
                return true;
            } else if (req.status === 1) {
                log.info("Wrong image url");
                useToast_noReact("Wrong image url", "error");
                return false;
            } else {
                useToast_noReact(req.result, "error");
                return false;
            }
        }

}));

export default useRecipeStore;
