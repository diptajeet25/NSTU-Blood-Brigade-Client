import React, { use } from 'react';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { AuthContext } from '../Context/AuthContext';
import { useQuery } from '@tanstack/react-query';
import BloodRippleLoader from '../Components/BloodLoading';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import DonarLayout from './DonarLayout';
import DonorDetailCard from '../Components/DonorDetailCard';

const AllDonar = () => {
    const axiosSecure=useAxiosSecure();
    const {user,loading}=use(AuthContext);
    const {data:donors=[],isLoading}=useQuery(
        {
            queryKey:['donars'],
            enabled:!!user?.email && !loading,
            queryFn:async()=>{
                const res=await axiosSecure.get(`/donors`);
                return res.data;
            }

        }
    )
    console.log(donors);
    if(loading || isLoading){
        return <BloodRippleLoader></BloodRippleLoader>
    }
  return (
     <div>
        <Navbar></Navbar>
        <div className='min-h-[80vh] flex flex-col items-center pt-8'>
            <h2 className='text-3xl md:text-4xl font-bold'>All Donors</h2>
            <div className='grid grid-cols-1  lg:grid-cols-2 gap-12 gap-y-4 lg:gap-x-20 mt-6 w-[98%] md:w-[85%] lg:w-[75%] mx-auto mb-10'>
           {
            donors.map(donor=> <DonorDetailCard donor={donor} key={donor._id}></DonorDetailCard>)
           }
            </div>

        </div>
        <Footer></Footer>
    </div>
  );
};

export default AllDonar;