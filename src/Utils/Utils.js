export const delayFunction =( ()=>{
    const timeouts = {};
    function delay(uniqueKey,cbFunc,delay_ms = 1000, ...args){
        if (timeouts[uniqueKey]){
            clearTimeout(timeouts[uniqueKey]);
        } 
        timeouts[uniqueKey] = setTimeout(()=>{
            cbFunc(...args);
            delete timeouts[uniqueKey];
        },delay_ms);   
    }
    return({delay});
} )()

