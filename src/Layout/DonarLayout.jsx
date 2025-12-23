import React, { use } from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import DonarForm from '../Components/DonarForm';
import BloodLoading from '../Components/BloodLoading';
import AlreadyDonorCard from '../Components/AlreadyDonarCard';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../Context/AuthContext';
import useAxiosSecure from '../Hooks/useAxiosSecure';

const DonarLayout = () => {
  const {user,loading}=use(AuthContext)
  const axiosSecure=useAxiosSecure();
  const {data:donorData={},isLoading}=useQuery({
    queryKey:['donorData',user?.email],
    enabled:!!user?.email,
    queryFn:async()=>{
     const res=await axiosSecure.get(`/donor?email=${user?.email}`)
     console.log(res.data);
     return res.data;
     
    }
  })

  if(loading || isLoading){
    return <BloodLoading></BloodLoading>
  }
  return (
    <div>
        <Navbar></Navbar>
       {donorData?.message === 'No donor found'
  ? <DonarForm />
  : <AlreadyDonorCard donorData={donorData} />
}

        
        
        <Footer></Footer>
    </div>
  );
};

export default DonarLayout;