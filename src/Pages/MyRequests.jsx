import React, { use } from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { AuthContext } from '../Context/AuthContext';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import BloodRippleLoader from '../Components/BloodLoading';
import { Search } from 'lucide-react';
import { Link } from 'react-router';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const MyRequests = () => {
    const {user,loading}=use(AuthContext);
    const axiosSecure=useAxiosSecure();
    const {data:requests=[],isLoading,refetch}=useQuery(
        {
            queryKey:['myRequests',user?.email],
            enabled:!!user?.email && !loading,
            queryFn:async()=>
            {
                const res=await axiosSecure.get(`/myrequests?email=${user?.email}`);
                return res.data;
                
            }

        })

        const handlefullFill=(request)=>
        {
          request.status="fulfilled";
        request.fullFilled_Date=new Date();


        const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: "btn btn-success",
    cancelButton: "btn btn-danger"
  },
  buttonsStyling: false
});
swalWithBootstrapButtons.fire({
  title: "Are you sure?",
  text: "You want to fulfill this request!",
  icon: "question",
  showCancelButton: true,
  confirmButtonText: "Yes, fulfill it!",
  cancelButtonText: "No, cancel!",
  reverseButtons: true,
  customClass: {
    confirmButton: 'btn btn-success mx-2',
    cancelButton: 'btn btn-danger mx-2'
  },
}).then((result) => {

 
  if (result.isConfirmed) {

     axiosSecure.patch(`/updateRequestStatus?id=${request._id}`,request)
     .then(()=>
     {
      refetch();
        swalWithBootstrapButtons.fire({
      title: "Fulfilled!",
      text: "The request has been fulfilled.",
      icon: "success"
    });
     }
     )
     .catch(()=>
    {
      swalWithBootstrapButtons.fire({
        title: "Error!",
        text: "Failed to fulfill the request.",
        icon: "error"
      });
      
    })
  }
  
    
  
});
          console.log(request);
       
         }
const handleCancelRequest = (request) => {

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success mx-2",
      cancelButton: "btn btn-danger mx-2"
    },
    buttonsStyling: false
  });

  swalWithBootstrapButtons.fire({
    title: "Are you sure?",
    text: "You want to cancel this request!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, cancel it!",
    cancelButtonText: "No, keep it!",
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {

      axiosSecure.patch(
        `/cancelRequestStatus?id=${request._id}`,
        {
          status: "canceled",
          canceled_Date: new Date()
        }
      )
      .then(() => {
        refetch();
        swalWithBootstrapButtons.fire(
          "Canceled!",
          "The request has been canceled.",
          "success"
        );
      })
      .catch(() => {
        swalWithBootstrapButtons.fire(
          "Error!",
          "Failed to cancel the request.",
          "error"
        );
      });
    }
  });
};

      


          
        

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
        <td><span className={`badge ${request.status==="pending" ? "badge-warning" : request.status==="fulfilled" ? "badge-success" : "badge-error"}`}>{request.status[0].toUpperCase() + request.status.slice(1)}</span></td>
        {
            request.status==='pending' ? <td className='flex  gap-1 items-center flex-col md:flex-row justify-center'>
              <Link to={`/eligbleDonors/${request._id}`} state={request} className='bg-blue-600 text-white px-3 py-1 rounded-lg flex '> 🔍Find Donors</Link>
                <button onClick={()=>handlefullFill(request)} className='bg-green-600 text-white px-3 py-1 rounded-lg'>Fulfill</button>
                <button onClick={()=>handleCancelRequest(request)}  className='bg-red-600 text-white px-3 py-1 rounded-lg'>Cancel </button></td> :
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