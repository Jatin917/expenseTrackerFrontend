import { useEffect, useState } from 'react'
import { Heading } from '../Components/Heading'
import { InputBox } from '../Components/InputBox'
import { Button } from '../Components/Button'
import categories from '../Data/Categories'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom' // Import Link component from react-router-dom

const AddItem = () => {
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [data, setData] = useState(null); // Initialize data as null

    useEffect(()=>{
        if (data !== null) { // Only trigger postData when data is not null
            const postData = async()=>{
                const token = localStorage.getItem('token');
                const res = await axios.post('http://localhost:8000/app/v1/expense/addexpense', data, {
                    headers:{
                        Authorization:"Bearer "+ token
                    },
                })
                if(res.status===200){
                    toast.success("Added new Item!");
                }
                else toast.error(res.message);
                
            };
            postData();
        }
    },[data])

    const addItemHandler=()=>{
        setData({category,items:[{name, amount}]});
    }

  return (
    <div className="max-w-md mx-auto p-4 mt-10 bg-white rounded-lg shadow-md">
        <Heading>New Item</Heading>
        <label htmlFor="filter" className="block text-lg font-medium text-gray-700 mb-2">
            Select Category:
        </label>
        <select
            onChange={(e)=> setCategory(e.target.value)}
            id="filter"
            className="p-2 border border-gray-300 rounded w-full"
        >
            <option value="">Categories</option>
            {
                categories.map((cat, idx)=>{
                    return (
                        cat.name!=='All' && <option key={idx} value={cat.name}>{cat.name}</option>
                    )
                })
            }
            {/* <!-- Add more options as needed --> */}
        </select>
        <InputBox label={"Name"} onChange={(e)=>setName(e.target.value)} placeholder={"Name of the Product"} />
        <InputBox label={"Amount"} onChange={(e)=>setAmount(e.target.value)} placeholder={"Price of Product"} />
        <div className="flex justify-between mt-4">
            <Button label={"Add Item"} onClick={addItemHandler} />
            <Link to="/">
                <Button label={"Home"} />
            </Link>
        </div>
    </div>
  )
}

export default AddItem