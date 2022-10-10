import { useReducer } from "react";

export const initialState = {
    isAuthenticated:false
}

const reducer = async (state=initialState,action) =>{
    switch(action.type){
        case 'AUTHORIZE':
            // const results = await fetch("https://localhost:3443/products")
            // const r = await results.json();
            // console.log(r);
            // console.log({...state,items:r});
            return {...state,isAuthenticated:true}
            
    }
}
export default reducer;