import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const Cards = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  let cat = queryParams.get('cat');
  let search = queryParams.get('q');
  let sort = queryParams.get('filter');
    const [data, setData] = useState([]);
    useEffect(()=>{
        async function fetchData(){
            cat = cat && cat.toLowerCase();
            console.log('search ', search);
            const token = localStorage.getItem("token");
            if(search == "" || search===null){
              if(cat==""){
                  const response = await axios.get('http://localhost:8000/app/v1/expense/expenses',{
                      headers:{
                          Authorization:"Bearer "+ token
                      },
                  });
                  return response;
              }
              else{
                  if(sort==""){
                    const response = await axios.get(`http://localhost:8000/app/v1/expense/expenses?cat=${cat}`,{
                        headers:{
                            Authorization:"Bearer "+ token
                        },
                    });
                    return response;
                  }
                  else{
                    const response = await axios.get(`http://localhost:8000/app/v1/expense/expenses?cat=${cat}&filter=${sort}`,{
                        headers:{
                            Authorization:"Bearer "+ token
                        },
                    });
                    return response;
  
                  }
              }
            }
            else{
              const response = await axios.get(`http://localhost:8000/app/v1/expense/search?q=${search}`,{
                headers:{
                    Authorization:"Bearer "+ token
                },
              });
              return response;
            }
        }
        fetchData().then((res)=>{
            console.log(res.data)
            setData(res.data);
        });
    },[cat, sort, search]);
  return (
    <>
      {data?.map((item, idx) => {
        {/* {console.log("items ",item[0].name)} */}
        return (
          <div
            key={idx}
            onClick={()=> navigate(`/edit/${item._id}/${item.name}/${item.amount}`)}
            className="cursor-pointer w-full h-20 flex flex-col p-4 bg-white border border-gray-300 rounded-lg shadow-md max-w-3xl mx-auto"
          >
            <h1 className="text-xl font-bold mb-2 text-gray-800">
              {item?.name}
            </h1>
            <h3 className=" text-gray-600">{item?.amount} ₹</h3>
          </div>
        );
      })}
    </>
  );
};

export default Cards;
