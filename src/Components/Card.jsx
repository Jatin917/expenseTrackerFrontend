/* eslint-disable react/prop-types */
import React from 'react';
import { useSetRecoilState } from 'recoil';
import { category } from '../store/Atom/authentication';
import { useNavigate } from 'react-router-dom'

// eslint-disable-next-line react/prop-types
const Card = ({ name }) => {
    const setCategory = useSetRecoilState(category);
    const navigate =  useNavigate();
    const handleCategoryChange = (name) => {
      const key = 'cat';
      const value = name;
      const searchParams = new URLSearchParams(location.search);
      searchParams.set(key, value);
      navigate({
        pathname:location.pathname,
        search:`?${searchParams.toString()}`
      })
    }

  const cardStyle = {
    border: '1px solid gray',
    borderRadius: '8px',
    padding: '2px 5px',
    margin: '16px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    backgroundColor: '#fff',
    minWidth:'150px',
    height:'40px',
    cursor:'pointer'
  };
  return (
    <button onClick={()=>handleCategoryChange(name)} style={cardStyle}>
        <h2>{name}</h2>
    </button>
  );
};

export default Card;
