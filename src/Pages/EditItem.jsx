import { useEffect, useState } from 'react'
import { Heading } from '../Components/Heading'
import { InputBox } from '../Components/InputBox'
import { Button } from '../Components/Button'
import categories from '../Data/Categories'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Link, useParams } from 'react-router-dom'

const EditItem = () => {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const { id, eName, eAmt } = useParams();
  const [data, setData] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  useEffect(()=>{
    if (data !== null) {
      const postData = async()=>{
        const token = localStorage.getItem('token');
        const res = await axios.post('http://localhost:8000/app/v1/expense/updateitem', data, {
          headers:{
            Authorization:"Bearer "+ token
          },
        })
        if(res.status===200){
          toast.success("Edited the Item!");
        }
        else toast.error(res.message);
        
      };
      postData();
    }
  },[data]);

  const EditItemHandler=()=>{
    setData({name, amount, _id:id});
  }

  const DeleteItemHandler=()=>{
    setDeleteConfirm(true);
  }

  const ConfirmDeleteHandler=async()=>{
    try {
      const token = localStorage.getItem('token');
      const res = await axios.delete(`http://localhost:8000/app/v1/expense/updateitem/?id=${id}`, {
        headers:{
          Authorization:"Bearer "+ token
        },
      })
      if(res.status===200){
        toast.success("Item deleted successfully!");
        // window.location.href = '/';
      }
      else toast.error(res.message);
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <div className="max-w-md mx-auto p-4 mt-10 bg-white rounded-lg shadow-md">
      <Heading>Edit Item</Heading>
      <InputBox label={"Name"} onChange={(e)=>setName(e.target.value)} placeholder={eName} />
      <InputBox label={"Amount"} onChange={(e)=>setAmount(e.target.value)} placeholder={eAmt} />
      <div className="flex justify-between mt-4">
        <Button label={"Edit Item"} onClick={EditItemHandler} />
        <Button label={"Delete Item"} onClick={DeleteItemHandler} />
        <Link to="/">
          <Button label={"Home"} />
        </Link>
      </div>
      {deleteConfirm && (
        <div className="mt-4">
          <p>Are you sure you want to delete this item?</p>
          <div className="flex justify-between">
            <Button label={"Yes, delete"} onClick={ConfirmDeleteHandler} />
            <Button label={"No, cancel"} onClick={()=>setDeleteConfirm(false)} />
          </div>
        </div>
      )}
    </div>
  )
}

export default EditItem