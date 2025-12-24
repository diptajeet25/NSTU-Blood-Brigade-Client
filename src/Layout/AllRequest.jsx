import React, { use } from 'react';
import Navbar from '../Components/Navbar.jsx';
import Footer from '../Components/Footer.jsx';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../Context/AuthContext.jsx';
import useAxiosSecure from '../Hooks/useAxiosSecure.jsx';
import BloodRippleLoader from '../Components/BloodLoading.jsx';
import RequestCard from '../Components/RequestCard.jsx';

const AllRequest = () => {
    const {user,loading}=use(AuthContext);
    const axiosSecure=useAxiosSecure();
    const {data:requests=[],isLoading}=useQuery({
        queryKey:['request'],
        enabled:!!user?.email && !loading,
        queryFn:async()=>{
            const res=await axiosSecure.get(`/requests`);
            return res.data;
        }
    })

    console.log(requests);

    if(loading || isLoading){
        return <BloodRippleLoader></BloodRippleLoader>
    }
  return (
    <div>
        <Navbar></Navbar>
        <div className='min-h-[80vh] flex flex-col items-center pt-8'>
            <h2 className='text-3xl md:text-4xl font-bold'>Requests For Blood</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 gap-y-4 mt-6 w-[95%] md:w-[95%] lg:w-[88%] mx-auto mb-10'>
            {
                requests.map(request=><RequestCard request={request} key={request._id}></RequestCard>)

            }
            </div>

        </div>
        <Footer></Footer>
    </div>
  );
};

export default AllRequest;