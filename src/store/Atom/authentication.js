import { atom, selector } from "recoil";
import jwt from 'jsonwebtoken'
import axios from "axios";

export const authentication = selector({
    key:"authentication",
    get: () =>{
        const token = localStorage.getItem("token");
        if(!token) return false;
        try {
            const key = import.meta.env.VITE_REACT_APP_JWT_SECRET_KEY;
            console.log(key, token);
            const decoded = jwt.verify(token, key);
            console.log(decoded);
            if(decoded) return true;
            return false;
        } catch (error) {
            console.log('token verification failed ', error.message);
        }
    }
});

export const Loading = atom({
    key:"loading",
    default:false,
});

export const categoryExpense = selector({
    key:"categoryExpense",
    get: async()=>{

    }
});

export const category = atom({
    key:"category",
    default:"all",
});

export const categoryData = selector({
    key:"categoryData",
    get:async({get})=>{
        let cate = get(category); 
        const token = localStorage.getItem("token");
        if(cate==="all"){
            const response = await axios.get('http://localhost:8000/app/v1/expense/expenses',{
                headers:"Bearer "+ token,
            });
            return response;
        }
        else{
            const response = await axios.get(`http://localhost:8000/app/v1/expense/expenses?cat=${cate}`,{
                headers:"Bearer "+ token,
            });
            return response;
        }
    }
});

export const filter = atom({
    key:"filter",
    default:"all"
});

