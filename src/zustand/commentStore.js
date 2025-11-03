/* src/zustand/commentStore.js */
import { create } from 'zustand';
import { API_URLs } from '@/API/API_Handler.js';
import { fetcher } from './_fetcher.js';

const USE_LOCAL_CACHE = true;
const MAX_CACHE_LIFE = 1000*60*30;

const useCommentStore = create((set, get) => ({
    comments: [],

    fetchRecipeComments: async (recipeId) => {
        await fetcher(
            API_URLs.comments.getRecipeComments,
            { recipeId },
            "fetch recipe comments",
            (res) => {
                const timestamp = Date.now();
                set(state => {
                    const index = state.comments.findIndex(c => c.recipeId === recipeId);
                    if (index !== -1) { // jeśli id już istnieje w cache
                        const updated = [...state.comments];
                        updated[index].comments = res.msg;
                        updated[index]._cacheCreatedAt = timestamp;
                        return { comments: updated };
                    } else {  //nowy wpis 
                        return { comments: [...state.comments, { recipeId, comments: res.msg, _cacheCreatedAt: timestamp }] };
                    }
                });
            }
        );
    },

    getRecipeComments: async (recipeId,forceRefetch = false) => {
        const state = get();
        const cacheEntry = state.comments.find(c => c.recipeId === recipeId);
        const now = Date.now();
    
        if (!forceRefetch && cacheEntry && (now - cacheEntry._cacheCreatedAt) <= MAX_CACHE_LIFE) {
            return cacheEntry.comments;
        } else {
            await state.fetchRecipeComments(recipeId);
            const updatedState = get();
            const updatedEntry = updatedState.comments.find(c => c.recipeId === recipeId);
            return updatedEntry ? updatedEntry.comments : [];
        }
    },
    
    getRecipeCommentsCount: async ( recipeId ) => {
        const res = await  fetcher(
            API_URLs.comments.getRecipeCommentsCount,
            { recipeId: recipeId },
            "get comments count",
            (res) => {}
        );
        if (res.status === 1){
            return res.msg;
        }
        else return -1;
    },

    addComment: ( recipeId, text, responseTo ) => {
        const data = { recipeId, text };
        if (responseTo) data.responseTo = responseTo;
        
        return fetcher(
            API_URLs.comment.add,
            data,
            "add comment",
            (res) => {
                if (USE_LOCAL_CACHE) {
                    set(state => ({ comments: [...state.comments, res.msg] }));
                }
            },
            "Comment added!"
        );
    },

    updateComment: (recipeId, text ) => {
        return fetcher(
            API_URLs.comment.update,
            { recipeId, text },
            "update comment",
            () => {
                if (USE_LOCAL_CACHE) {
                    set(state => ({
                        comments: state.comments.map(c => c.id === recipeId ? { ...c, text } : c)
                    }));
                }
            },
            "Comment updated!"
        );
    },

    deleteComment: ( recipeId ) => {
        return fetcher(
            API_URLs.comment.remove,
            { recipeId },
            "delete comment",
            () => {
                if (USE_LOCAL_CACHE) {
                    set(state => ({
                        comments: state.comments.filter(c => c.id !== recipeId)
                    }));
                }
            },
            "Comment removed!"
        );
    }
}));

export default useCommentStore;
