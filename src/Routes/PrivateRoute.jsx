import React, { use } from 'react';

import { Navigate, useLocation } from 'react-router';
import { toast } from 'react-toastify';
import { AuthContext } from '../Context/AuthContext';
import BloodRippleLoader from '../Components/BloodLoading';

const PrivateRoute = ({children}) => {
    const location = useLocation();
    const {user,loading}=use(AuthContext);

    if(loading){


        return (
    <BloodRippleLoader></BloodRippleLoader>
  );
    }
    if(!user)
    {
            // toast.warning("You must be logged in to access this page.");
            return <Navigate to="/auth" replace />;
    }
    if (!user.emailVerified) {
    toast.error("Please verify your email first.");
    return <Navigate to="/auth" replace />;
  }
    if(user)
    {
        return children;
    }
  

        return <Navigate state={location.pathname}  to="/auth"></Navigate>
    


};

export default PrivateRoute;