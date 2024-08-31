import axios from 'axios';
import React, { useEffect, useState } from 'react';


// eslint-disable-next-line react/prop-types
function MonthlyExpenseDropdown() {
    const d = new Date();
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const [selectedMonth, setSelectedMonth] = useState(d.getMonth());
  const [showDropdown, setShowDropdown] = useState(false);

  const handleMonthSelect = (month) => {
    setSelectedMonth(month);
    setShowDropdown(false);
  };

  const [totalExpense, setTotalExpense] = useState(0);
  useEffect(()=>{
    const token = localStorage.getItem("token");
    async function fetchExpense(){
      const res = axios.get(`http://localhost:8000/app/v1/expense/totalexpense?filter=${selectedMonth}`,{
        headers:{
                    Authorization:"Bearer "+ token
                },
      }
      )
      return res;
    }
    fetchExpense().then((res)=>{
      setTotalExpense(res.data.amount);
    });
  },[selectedMonth])

  return (
    <div className="flex items-center justify-center p-2 bg-gray-100 rounded-md shadow-md relative">
      <span className=" cursor-pointer text-lg font-medium text-gray-600" onClick={() => setShowDropdown(!showDropdown)}>{months[selectedMonth]} Expense: </span>
      {showDropdown && (
        <ul className="absolute bg-white shadow-md p-2 rounded-md top-6 left-0 border border-gray-200 transition duration-300 ease-in-out z-10">
          {months.map((month, index) => (
            <li key={index} className="py-2 hover:bg-gray-50" onClick={() => handleMonthSelect(index)}>{month}</li>
          ))}
        </ul>
      )}
      <span className="text-2xl font-bold text-gray-900 ml-2">{totalExpense} ₹</span>
    </div>
  );
}

export default MonthlyExpenseDropdown;