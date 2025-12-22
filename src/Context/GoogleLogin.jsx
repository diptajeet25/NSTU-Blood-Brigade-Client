import React, { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { useNavigate } from 'react-router';

import { FaGoogle } from 'react-icons/fa';

const GoogleLogin = () => {


    const {googleSignIn}=useContext(AuthContext);

    const navigate=useNavigate();

    const handleGoogleSignIn=()=>
    {
        googleSignIn()
        .then(result=>
            {
                console.log(result.user)
              //  toast.success("Sign In With Google SuccessFUlly")
                navigate("/")
                
            })
            .catch(err=>console.log(err))
    }
  return (
         <button type="button"  onClick={handleGoogleSignIn}  className="btn bg-black text-white border-1-black  w-full my-2 mb-3  text-lg">
           <FaGoogle />
 Login with Google
</button>

  );
};

export default GoogleLogin;