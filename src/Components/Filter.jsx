import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Filter = () => {
  const navigate = useNavigate();
  const location = useLocation();
    const handleFilterChange = (e) => {
      const key = 'filter';
      const value = e.target.value;
      const searchParams = new URLSearchParams(location.search);
      searchParams.set(key, value);
      navigate({
        pathname:location.pathname,
        search:`?${searchParams.toString()}`
      })
    }
  return (
    <div className="w-[50%] mx-auto p-4">
  <label htmlFor="filter" className="block text-lg font-medium text-gray-700 mb-2">
    Filter By:
  </label>
  <select
    onChange={handleFilterChange}
    id="filter"
    className="p-2 border border-gray-300 rounded w-full"
  >
    <option value="">Select a filter</option>
    <option value="name">Name</option>
    <option value="amount">Amount</option>
    <option value="date">Date</option>
    {/* <!-- Add more options as needed --> */}
  </select>
</div>

  )
}

export default Filter;