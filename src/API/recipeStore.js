/* src/zustand/recipeStore.js */
import { create } from 'zustand';
import { API_URLs } from '@/API/API_Handler.js'; 
import { fetcher } from './_fetcher.js';

const useRecipeStore = create((set, get) => ({
    userRecipes: [],
    publicRecipes: [],
    latestRecipes: [],
    
    IsFormRecipeInEditMode: false,
    RecipeDataToEdit: null,

    setIsFormRecipeInEditMode: (value) => set({ IsFormRecipeInEditMode: value }),
    setRecipeDataToEdit: (data) => set({ RecipeDataToEdit: data }),

    fetchPublicRecipes: () => {
        fetcher(
            API_URLs.recipes.getPublicRecipes,
            null,
            "fetch public recipes",
            (res) => set({ publicRecipes: res.msg })
        );
    },

    fetchUserRecipes: () => {
        fetcher(
            API_URLs.recipes.getUserRecipes,
            null,
            "fetch user recipes",
            (res) => set({ userRecipes: res.msg })
        );
    },
    
    fetchLatestRecipes: () => {
        fetcher(
            API_URLs.recipes.getLatestRecipes,
            null,
            "fetch latest recipes",
            (res) => set({ latestRecipes: res.msg })
        );
    },

    addRecipe: (RowsData, Title, Description, PhotoURL) => {
        const obj = {
            name: Title,
            description: Description,
            photos: [PhotoURL],
            productsList: RowsData.map((row) => ({ product: row._id, portion: row.portion }))
        };
        return fetcher(
            API_URLs.recipe.add,
            obj,
            "add recipe",
            () => get().fetchUserRecipes(),
            `Przepis ${obj?.name} dodany!`
        );
    },

    updateRecipe: (id, RowsData, Title, Description, PhotoURL) => {
        const obj = {
            _id: id,
            name: Title,
            description: Description,
            photos: [PhotoURL],
            productsList: RowsData.map((row) => ({ product: row._id, portion: row.portion }))
        };
        return fetcher(
            API_URLs.recipe.update,
            obj,
            "update recipe",
            () => get().fetchUserRecipes(),
            `Przepis ${obj?.name} zmieniony!`
        );
    },

    deleteRecipe: (rowData) => {
        return fetcher(
            API_URLs.recipe.remove,
            { _id: rowData._id },
            "delete recipe",
            () => get().fetchUserRecipes(),
            `Przepis ${rowData?.name} usunięty!`
        );
    },

    verifyImg: async (PhotoURL) => {
        const res = await fetcher(
            API_URLs.helper.verifyimg,
            { img: PhotoURL },
            "verify image",
            () => {},
            ""
        );
        if (res.status === 1 && res.result === true) return true;
        return false;
    }

}));

export default useRecipeStore;
