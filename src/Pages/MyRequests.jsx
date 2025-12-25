import React, { use } from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { AuthContext } from '../Context/AuthContext';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import BloodRippleLoader from '../Components/BloodLoading';
import { Search } from 'lucide-react';

const MyRequests = () => {
    const {user,loading}=use(AuthContext);
    const axiosSecure=useAxiosSecure();
    const {data:requests=[],isLoading}=useQuery(
        {
            queryKey:['myRequests',user?.email],
            enabled:!!user?.email && !loading,
            queryFn:async()=>
            {
                const res=await axiosSecure.get(`/myrequests?email=${user?.email}`);
                return res.data;
                
            }

        })

        if(loading || isLoading)
            return <BloodRippleLoader></BloodRippleLoader>
  return (
    <div>
        <Navbar></Navbar>
        <div className='min-h-[80vh] flex flex-col '>
            <h2 className='text-3xl md:text-4xl font-bold text-center mt-2'>My Requests</h2>
            <div className="overflow-x-auto">
  <table className="table text-black overflow-x-auto w-full mt-6">
    {/* head */}
    <thead className='text-black'>
      <tr className='text-black text-center'>
        <th>#</th>
        <th>Patient Name</th>
        <th>Hospital Name</th>
        <th>Blood Group</th>
        <th>Units</th>
        <th>Phone</th>
        <th>Address</th>
        <th>Require Date</th>
        <th>Status</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
     {
        requests.map((request,index)=> <tr key={request._id} className='text-center'>
        <th>{index+1}</th>
        <td>{request.patientName}</td>
        <td>{request.hospitalName}</td>
        <td>{request.bloodGroup}</td>
        <td>{request.unitsRequired}</td>
        <td>{request.phone}</td>
        <td>{request.district},{request.division}</td>
        <td>{new Date(request.requiredDate).toLocaleDateString()}</td>
        <td>{request.status}</td>
        {
            request.status==='pending' ? <td className='flex  gap-1 items-center flex-col md:flex-row justify-center'>
                <button className='bg-blue-600 text-white px-3 py-1 rounded-lg flex '> 🔍Find Donors</button>
                <button className='bg-green-600 text-white px-3 py-1 rounded-lg'>Fulfill</button>
                <button className='bg-red-600 text-white px-3 py-1 rounded-lg'>Cancel </button></td> :
            <td>N/A</td>
        }
        
        </tr>)
            
     }
     </tbody>
      
  

  </table>
</div>


            </div>

        <Footer></Footer>
    </div>
  );
};

export default MyRequests;