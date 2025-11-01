import { fetchAPI } from '@/API/API_Handler.js';
import log from '@utils/Logger';
import { useToast_noReact } from './widgets/ToastManager';
import { create } from 'zustand';


export const useFetcherStore = create((set, get) => ({
    isLoading: false,
    setIsLoading: (value)=>set({isLoading: value})
}));

export async function fetcher(API_URL, data , endpointName, onSuccess, onSuccessToastMsg = ""){
    const { setIsLoading } = useFetcherStore.getState();
    setIsLoading(true);
    try{
        const res = await fetchAPI(API_URL, data);
        if (res.status === 1){
            if (onSuccessToastMsg) {
                useToast_noReact(onSuccessToastMsg, "success");
            }
            onSuccess(res);
            return(res)
        }
        else if (res.status === 0){
            log.warn(`Failed to ${endpointName}:`, res.msg);
            useToast_noReact(res.msg, "error",4000);
            return { res };
        }
        else if (res.status === -1){
            log.error("Failed to add comment - connection problems.");
            useToast_noReact("Oops! \n Connection problems!", "error");
            return { status: -1 };
        }
    }
    catch(err){
        log.error(`Unexpected API error while fething ${endpointName}:`, err);
        return { status: -1 };

    }
    finally{
        setIsLoading(false);
    }

}