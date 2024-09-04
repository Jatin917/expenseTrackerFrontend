/* eslint-disable react/prop-types */
import { Navigate } from 'react-router-dom';
import { authentication } from '../store/Atom/authentication';
import { useRecoilValue } from 'recoil';

const PrivateRoute = ({Component}) => {
    const authenticValue = useRecoilValue(authentication);
    const { isAuthenticated } = authenticValue;
    console.log("isAutheticated private route",authenticValue.isAuthenticated)
    return (<>
        {
            !isAuthenticated ? <Navigate to="/signup" /> : <Component />
        }
      </>
      )
}

export default PrivateRoute