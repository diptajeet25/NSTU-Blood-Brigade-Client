import React, { use, useState } from 'react';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { AuthContext } from '../Context/AuthContext';
import { useQuery } from '@tanstack/react-query';
import BloodRippleLoader from '../Components/BloodLoading';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import DonarLayout from './DonarLayout';
import DonorDetailCard from '../Components/DonorDetailCard';
import { set } from 'react-hook-form';

const AllDonar = () => {
    const axiosSecure=useAxiosSecure();
    const {user,loading}=use(AuthContext);
      const [page, setPage] = useState(1);
      const [donors,setDonors]=useState([]);

    const [totalPages, setTotalPages] = useState(1);
    const limit=20;


    const {data,isLoading}=useQuery(
        {
            queryKey:['donars',page],
            enabled:!!user?.email && !loading,
            keepPreviousData: true,
            queryFn:async()=>{
                const res=await axiosSecure.get(`/donors?page=${page}&limit=${limit}`);
                setDonors(res.data.donors || []);
                setTotalPages(res.data.totalPages || 1);
                return res.data;
            }

        }
    )
    const handleFilterByGroup=async(event)=>
    {
      const selectedGroup=event.target.value;
    
      if(selectedGroup==="All")
      {
        const res=await axiosSecure.get(`/donors?page=${page}&limit=${limit}`);
        setDonors(res.data.donors || []);
        setTotalPages(res.data.totalPages || 1);
      }
     else 
     {
      const res=await axiosSecure.get(`/donors`,
        {
          params:{
            bloodGroup:selectedGroup,
            page:page,
            limit:limit
          }
        }
      );
      setDonors(res.data.donors || []);
      setTotalPages(res.data.totalPages || 1);
     }
    }
  
    if(loading || isLoading){
        return <BloodRippleLoader></BloodRippleLoader>
    }
  return (
     <div>
      <title>All Donors-NSTU Blood Brigade</title>
        <Navbar></Navbar>

        <div className='min-h-[80vh] flex flex-col items-center pt-8'>
            <h2 className='text-3xl md:text-4xl font-bold'>All Donors</h2>
            <div className='w-full  flex justify-end   rounded-full mt-2 mb-6 px-16'>
            <select onChange={handleFilterByGroup} className='mt-4 border px-3 py-2 rounded-lg bg-white'>
              <option disabled selected>Filter by Blood Group</option>
              <option value="All">All</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option>O-</option>
            </select>
            </div>
            {
            donors.length===0 && <h3 className='text-xl font-semibold mt-20'>No donors found.</h3>
            }

            <div className='grid grid-cols-1  lg:grid-cols-2 gap-12 gap-y-4 lg:gap-x-20 mt-6 w-[98%] md:w-[85%] lg:w-[75%] mx-auto mb-10'>
           {
            donors.map(donor=> <DonorDetailCard donor={donor} key={donor._id}></DonorDetailCard>)
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

export default AllDonar;