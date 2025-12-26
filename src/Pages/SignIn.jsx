import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import GoogleLogin from "../Context/GoogleLogin";
import { AuthContext } from "../Context/AuthContext";
import AuthPageSide from "../components/AuthPageSide";
import { toast } from "react-toastify";


const SignIn = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { loginUser} = useContext(AuthContext);
  const navigate = useNavigate();
  const [load, setLoad] = useState(false);
  const location=useLocation();

  const handleLogin =async (data) => {
    setLoad(true);
try{
  const res=await loginUser(data.email, data.password)
  console.log(res.user);
  await res.user.reload();
  if(!res.user.emailVerified)
  {
    toast.error("Please verify your email before logging in.");
    setLoad(false);
    return;
  }
   toast.success("Successfully logged in");
    navigate(location.state || "/");

}
catch(err)
{
  toast.error(err.message);
    setLoad(false);

}
    
 
  };

  return (
    <div className="flex my-2 w-full lg:w-[90%] mx-auto justify-center items-center min-h-[calc(100vh-100px)]
">

      <div className="w-full lg:w-6/12 flex flex-col items-center justify-center p-8 px-3">

        <header className="mb-6">
          <h1 className="text-3xl font-bold text-[#0A2342]">Welcome Back</h1>
          <p className="text-gray-600 mt-2">Sign in to continue to NSTU Blood Brigade</p>
        </header>

        <form className="w-full lg:w-[80%] space-y-4 mt-2" onSubmit={handleSubmit(handleLogin)}>

          <div>
            <label className="block text-md font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              {...register("email", { required: true })}
              placeholder="example@nstu.edu.bd"
              className="mt-1 block w-full rounded-lg border px-3 py-2 placeholder-gray-400 focus:outline-none
              focus:ring-2 focus:ring-[#DCEAFF] focus:border-transparent"
            />
            {errors.email && <p className="text-red-600 text-sm">Email is required</p>}
          </div>

          <div>
            <label className="block text-md font-medium text-gray-700">Password</label>
            <input
              type="password"
              {...register("password", { required: true })}
              placeholder="Enter your password"
              className="mt-1 block w-full rounded-lg border px-3 py-2 placeholder-gray-400 focus:outline-none
              focus:ring-2 focus:ring-[#DCEAFF] focus:border-transparent"
            />
            {errors.password && <p className="text-red-600 text-sm">Password is required</p>}
          </div>

     
          <button
            type="submit"
            className="btn bg-red-600 hover:bg-red-700 text-white w-full text-lg mt-4"
          >
            {load ? (
              <span className="loading loading-spinner loading-md"></span>
            ) : (
              "Sign In"
            )}
          </button>

          <div className="flex items-center mt-2">
            <div className="grow h-px bg-gray-300"></div>
            <span className="mx-3 text-gray-500 font-medium">OR</span>
            <div className="grow h-px bg-gray-300"></div>
          </div>

          <GoogleLogin />

          <p className="text-center mt-4 text-gray-600">
            Don’t have an account?{" "}
            <Link to="/auth/signup" className="text-blue-600 font-semibold hover:underline">
              Sign Up
            </Link>
          </p>
        </form>
      </div>

<AuthPageSide></AuthPageSide>
    </div>
  );
};

export default SignIn;
