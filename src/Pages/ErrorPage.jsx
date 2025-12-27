import React from 'react';
import error from "../assets/404Image.jpg"
import { NavLink } from 'react-router';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';


const ErrorPage = () => {
    return (
        <div>
            <title>Error 404 - Page Not Found</title>
            <Navbar></Navbar>
          
            <img src={error} alt="Error 404" className='w-[75%] md:w-[60%] lg:w-[25%] my-12 md:my-32 lg:my-10 mx-auto'/>
           
            <div className=' flex justify-center'>
            <NavLink to="/" className="btn bg-red-600 w-40 md:mb-16 lg:mb-10 my-2 mb-6">Back To Home</NavLink>
            </div>
  <Footer></Footer>
            
        </div>
    );
};

export default ErrorPage;