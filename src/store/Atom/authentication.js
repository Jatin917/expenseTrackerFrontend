import { atom, selector } from "recoil";
import axios from "axios";


export const authenticToken = atom({
    key: 'authenticToken',
    default:localStorage.getItem("token") || null
})

export const authentication = atom({
    key:"authentication",
    default:{isAuthenticated:false, firstName:""}
});
// export const authentication = selector({
//     key:"authentication",
//     get: async ({get}) =>{
//         const token = get(authToken);
//         if(!token) return {
//             isAuthenticated:false,
//             firstName:""
//         };
//         try {
//             const response = await axios.get("http://localhost:8000/app/v1/user/verify", {
//                 headers:{
//                     Authorization:"Bearer "+ token
//                 }
//             });
//             console.log(response);
//             if(response.status===200) return {
//                 isAuthenticated:true,
//                 firstName:response.data.firstName,
//             }
//             return {
//                 isAuthenticated:false,
//                 firstName:""
//             };
//         } catch (error) {
//             console.log('token verification failed ', error.message);
//         }
//     }
// });

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

