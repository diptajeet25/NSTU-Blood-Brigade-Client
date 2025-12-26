import React, { use, useState } from 'react';
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
      const [totalPages, setTotalPages] = useState(1);
      const [requests,setRequests]=useState([])
       const [page, setPage] = useState(1);
    const limit=20;
    const {data,isLoading}=useQuery({
        queryKey:['request',page],
        enabled:!!user?.email && !loading,
        queryFn:async()=>{
            const res=await axiosSecure.get(`/requests?page=${page}&limit=${limit}`);
            setRequests(res.data.requests || []);
            setTotalPages(res.data.totalPages || 1);
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

        <div className="flex flex-wrap justify-center items-center gap-2 mb-8 mt-8 ">

  <button onClick={() => setPage(page - 1)} disabled={page === 1} className={`px-3 py-1 rounded border ${page === 1 ? 'bg-gray-200 cursor-not-allowed' : 'hover:bg-red-600 hover:text-white'}`}>Prev</button>
  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
    <button key={p} onClick={() => setPage(p)} className={`px-3 py-1 hover:cursor-pointer rounded border ${page === p ? 'bg-red-600 text-white font-semibold' : 'hover:bg-red-100'}`}>{p} </button>
  ))}

  <button onClick={() => setPage(page + 1)} disabled={page === totalPages} className={`px-3 py-1 rounded border ${page === totalPages ? 'bg-gray-200 cursor-not-allowed' : 'hover:bg-red-600 hover:text-white'}`}>Next</button>
</div>
        <Footer></Footer>
    </div>
  );
};

export default AllRequest;