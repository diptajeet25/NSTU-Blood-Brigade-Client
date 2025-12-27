import React, { use } from 'react';
import { useLocation } from 'react-router';
import Navbar from './Navbar';
import Footer from './Footer';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import BloodRippleLoader from './BloodLoading';
import { AuthContext } from '../Context/AuthContext';
import DonorDetailCard from './DonorDetailCard';

const EligbleDonors = () => {
    const {state}=useLocation();
    const {loading}=use(AuthContext)

    const axiosSecure=useAxiosSecure();
    console.log(state);
    const {data:donors=[],isLoading}=useQuery(
        {
            queryKey:['eligbleDonors',state?._id],
            enabled:!!state?._id,
            queryFn:async()=>
            {
                const res=await axiosSecure.get(`/eligbleDonors`,
                    {
                        params:{
                            currentDistrict:state?.district,
                            bloodGroup:state?.bloodGroup
                        }
                    }
                );
                return res.data;
            }

        })
        console.log(donors);
        if(loading || isLoading)
            return <BloodRippleLoader></BloodRippleLoader>
  return (
    <div>
      <title>Eligble Donors - NSTU Blood Brigade</title>
        <Navbar></Navbar>
        <h2 className='text-3xl font-bold text-center mt-8'>Eligble Donors in {state?.district} for {state?.bloodGroup}:{donors.length}</h2>
   
      {
  donors.length === 0 ? (
    <div className="min-h-[50vh] flex items-start py-20 justify-center">
      <p className="text-xl text-center">
        No Donor Available in {state?.district} for {state?.bloodGroup}
      </p>
    </div>
  ) : (
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 gap-y-4 lg:gap-x-20 mt-6 w-[98%] md:w-[85%] lg:w-[75%] mx-auto mb-18'>
      {donors.map(donor => (
        <DonorDetailCard donor={donor} key={donor._id} />
      ))}
    </div>
  )
}


        <Footer></Footer>
    </div>
  );
};

export default EligbleDonors;