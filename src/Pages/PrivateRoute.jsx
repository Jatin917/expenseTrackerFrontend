/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { Navigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { authentication } from '../store/Atom/authentication';

const PrivateRoute = ({Component}) => {
    // const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem("token"));
    const isAuthenticated = true;
    return (<>
        {
            !isAuthenticated ? <Navigate to="/signup" /> : <Component />
        }
      </>
      )
}

export default PrivateRoute