import React, { use } from 'react';
import { Link } from 'react-router';
import logo from "../assets/Logo2.png"
import { House } from 'lucide-react';
import { AuthContext } from '../Context/AuthContext';
import { toast } from 'react-toastify';

const Navbar = () => {

  const {user,logoutUser}=use(AuthContext);
  console.log(user)

  const links=<div className='flex flex-col md:flex-row gap-6 items-center'>
    <Link to="/" className='flex gap-1 items-center text-xl'> Home</Link>
    <Link to="/donors" className='text-xl'>Find Donors</Link>
    <Link to="/requests" className='text-xl'>All Requests</Link>
    <Link to="/aboutUs" className='text-xl'>About Us</Link>

  </div>

  const handleLogOut=()=>
  {
    logoutUser()
    .then(()=>{
      toast.success("Logged Out Successfully")
    })
    .catch((err)=>{
    toast.error(err.message)
  })
  }
  return (
    <div className="navbar bg-white text-black shadow-sm px-4 py-2">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow text-white">
        {links}
      </ul>
    </div>
    <Link to="/"><img src={logo}  className='w-14 h-12  rounded-2xl hidden md:flex'></img></Link>
    
    <Link to="/" className="btn btn-ghost normal-case text-xl md:text-2xl  ">NSTU Blood Brigade</Link>

  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
     {links}
    </ul>
  </div>
  <div className="navbar-end">
    {user && user.emailVerified  ? 

      <div className="dropdown dropdown-left dropdown-bottom">
      <div tabIndex={0} role="button" className="btn btn-ghost ">
<img src={user?.photoURL} alt="User Avatar" className="w-14 h-14 rounded-full" />
      </div>
      <ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content border border-black  bg-white rounded-box  w-52 p-2 shadow">
          <Link to="/profile" className='text-xl mt-2 pb-2'>My Profile</Link>
      <Link to="/beADonor" className='text-xl mt-2 pb-2'>Be a Donor</Link>
    <Link to="/requestBlood" className='text-xl mt-2 pb-2'>Request Blood</Link>
    <Link to="/myrequests" className='text-xl mt-2 pb-2'>My Requests</Link>
    <Link> <button onClick={handleLogOut} className='text-xl mt-2 pb-2 w-full text-left hover:cursor-pointer'>Logout</button></Link>
      </ul>
    </div>
    
    : <Link to="/auth/signup" className="btn bg-red-600 hover:bg-red-700">Register</Link>}
  
  </div>
</div>
  );
};

export default Navbar;