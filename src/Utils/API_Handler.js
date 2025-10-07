import { API_ROOT } from "../../config";

const API_URLs = {
    product: {
        add: {url: '/api/addp', method:"POST"},
        update:  {url:'/api/updatep',method:"POST"},
        remove: {url: '/api/removep', method:"POST"}
    },
    products: {
        getUserProducts: {url: "/api/getuserp",method:"GET"},
        getPublicProducts: {url: "/api/getpubp",method:"GET"}
    },
    recipe: {
        add:  {url:'/api/addrecipe',method:"POST"},
        update:  {url:'/api/updaterecipe',method:"POST"},
        remove:  {url:'/api/removerecipe',method:"POST"}
    },
    recipes: {
        getUserRecipes: {url: "/api/getuserr",method:"GET"},
        getPublicRecipes: {url: "/api/getpubr",method:"GET"}
    },
    user: {
        login:  {url:'/api/login',method:"POST"},
        logout:  {url:'/api/logout',method:"POST"},
        register:  {url:'/api/register',method:"POST"},
        islogged: {url:'/api/islogged',method:"GET"}
    },
    helper:{
        verifyimg:  {url:'/api/verifyimg',method:"POST"},
    }
}

// END OF SETTINGS
//////////////////

Object.entries(API_URLs).forEach(([category, pairs]) => {
    Object.keys(pairs).forEach((key) => {
        pairs[key].url = API_ROOT + pairs[key].url; 
    });
});


function fetchAPI (api_url,data = ''){
    const options = (api_url.method === "POST")?
    {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        },
        credentials: 'include'
      }
      :{
        method: "GET",
        credentials: 'include'
      }


    return fetch(api_url.url, options     
    ).then((response) => { 
        if (!response.ok) {
            throw new Error("Network did not respond!");
        }
        return response.json();
    })
    .catch((error) => {
        console.error('Error fetching API:', error);
        return ({
            msg: "Error fetching API",
            status: -1
        })
    });
}

export {API_URLs, fetchAPI} ;