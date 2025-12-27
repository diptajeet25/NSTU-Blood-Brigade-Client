import React, { useContext, useState } from 'react';
import AuthPageSide from '../components/AuthPageSide';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../Context/AuthContext';
import axios from 'axios';
import { Link, useNavigate } from 'react-router';

import GoogleLogin from '../Context/GoogleLogin';
import { toast } from 'react-toastify';


const SignUp = () => {

  const { register,handleSubmit,formState:{ errors},watch }=useForm();
  const navigate=useNavigate();
  const [load, setLoad] = useState(false);


  const password = watch("password");
  const {createUser, updateUser,emailVerifcation,logoutUser}=useContext(AuthContext);

  const handleRegister=(data)=>{
    setLoad(true);
    const email=data.email;
    const password=data.password;
    const profilePhoto=data.photo[0];
    const name=data.name;
    createUser(email,password)
    .then((res)=>
    {

emailVerifcation(res.user)
      const formdata=new FormData();
      formdata.append("image",profilePhoto);
      const url=`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_hosting_key}`
      axios.post(url,formdata)
      .then(res=>{
        console.log(res.data.data.url);
        const userProfile={
          displayName:name,
          photoURL:res.data.data.url
        }
        updateUser(userProfile)
        .then(async()=>
        {
          await logoutUser()
          toast.success("Registration successful! Please verify your email before logging in.")
          navigate("/verify-email");

        })
        .catch((error)=>
        {
          
          console.log(error)
          toast.error(`${error.message}`)
          setLoad(false);
      })
        

      })


    })
    .catch((err)=>
    {
      toast.error(`${err.message}`)
      setLoad(false);

    })



  }
  return ( 
    <div>
      <title>Sign Up-NSTU Blood Brigade</title>
    <div className="flex my-2  w-full lg:w-[95%] mx-auto">
      <div className="w-full lg:w-6/12 flex flex-col items-center justify-center p-8 px-3 ">

      <header className="mb-6">
<h1 className="text-2xl font-semibold text-[#0A2342]">Create your account</h1>
<p className="text-gray-600 mt-2">Join us today and make a difference!</p>
</header>

<form className="w-full lg:w-[80%] space-y-3 mt-2" onSubmit={handleSubmit(handleRegister)} >
  <div>
  <label className="block text-sm font-medium text-gray-700">Full name</label>
  <input
type="text"
{...register("name",{required:true,})}
className={`mt-1 block w-full rounded-lg border px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#DCEAFF] focus:border-transparent `}
placeholder="Diptajeet Roy"

/>
{errors.name?.type==="required" && <p className='text-red-600'>Name is required</p>}
</div>
<div>
  <label className="block text-sm font-medium text-gray-700">Email address</label>
  <input
type="email"
{...register("email",{required:true,})}
className={`mt-1 block w-full rounded-lg border px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#DCEAFF] focus:border-transparent `}
placeholder="diptajeet1116@nstu.edu.bd"
/>
{errors.email?.type==="required" && <p className='text-red-600'>Email is required</p>}
</div>
<div>
  <label className="block text-sm font-medium text-gray-700">Photo</label>

  <input 
    type="file"
    accept="image/*"
    {...register("photo", { 
      required: "Photo is required",
    })}
    className="mt-1 block w-full rounded-lg border px-3 py-2 placeholder-gray-400 
    focus:outline-none focus:ring-2 focus:ring-[#DCEAFF] focus:border-transparent"
  />

  {errors.photo && (
    <p className="text-red-600">{errors.photo.message}</p>
  )}
</div>

<div>
  <label className="block text-sm font-medium text-gray-700">Password</label>
  <input
type="password"
{...register("password",{required:true,minLength:6,maxLength:12,pattern:/^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9]).*$/,})}
className={`mt-1 block w-full rounded-lg border px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#DCEAFF] focus:border-transparent `}
placeholder="Enter your password"
/>
{errors.password?.type==="required" && <p className='text-red-600'>Password is required</p>}
{errors.password?.type==="minLength" && <p className='text-red-600'>Password must be at least 6 characters</p>}
{errors.password?.type==="maxLength" && <p className='text-red-600'>Password must be less than 12 characters</p>}
{errors.password?.type==="pattern" && <p className='text-red-600'>Password must have one uppercase, one number and one special character</p>}

</div>
<div>
  <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
  <input
type="password"
{...register("confirmPassword",{required: "Confirm Password is required", validate: (value) =>
      value === password || "Passwords do not match"})}
className={`mt-1 block w-full rounded-lg border px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#DCEAFF] focus:border-transparent `}
placeholder="Re-enter your password"
/>

{errors.confirmPassword && (
  <p className="text-red-600">{errors.confirmPassword.message}</p>
)}



</div>
<div>
<button type="submit" className="btn bg-red-600 hover:bg-red-700 text-white  w-full text-lg mt-4">{load ? (
    <span className="loading loading-spinner loading-md"></span>
  ) : (
    "Sign Up"
  )}</button>

<div className="flex items-center mt-4 mb-2">
  <div className="grow h-px bg-gray-300"></div>
  <span className="mx-3 text-gray-500 font-medium">OR</span>
  <div className="grow h-px bg-gray-300"></div>
</div>
  <GoogleLogin></GoogleLogin>

   <div>
     <p className="text-center mt-4 text-gray-600">
        Already have an account?{" "}
        <Link to="/auth" state={location.state} className="text-blue-600 font-semibold hover:underline">
          Login
        </Link>
      </p>
      </div>
      </div>

  </form>
      </div>
      <AuthPageSide></AuthPageSide>



  
      
    </div>
   
   </div>
  );
};

export default SignUp;