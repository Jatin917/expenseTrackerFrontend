import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const navigate = useNavigate();
  const location = useLocation();
    const handleSearch = () => {
      const key = 'q';
      const value = searchTerm;
      const newParams = new URLSearchParams();
      newParams.set(key, value);
      navigate({
        pathname:location.pathname,
        search:`?${newParams.toString()}`
      })
    }

 return (
    <div className="container mx-auto w-[50%]">
      <div className="flex items-center">
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="Search..."
          className={`p-2 border rounded-l w-full focus:outline-none `}
        />
        <button
          onClick={handleSearch}
          className="p-2 bg-blue-500 text-white rounded-r hover:bg-blue-600"
        >
          Search
        </button>
      </div>
    </div>
  );
}

export default Search;
