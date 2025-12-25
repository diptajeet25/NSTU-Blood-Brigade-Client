import React, { use, useEffect, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { AuthContext } from '../Context/AuthContext';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { toast } from 'react-toastify';
import logo from '../assets/Logo2.png'
import { useQueryClient } from '@tanstack/react-query';

const DonarForm = () => {
    const { register, handleSubmit,control,reset, formState: { errors } } = useForm({
  defaultValues: {
    fullName: "",
    email: ""
  }
});
const queryClient = useQueryClient();
    const {user}=use(AuthContext);
    const [departments,setDepartments]=useState([]);
    const [districts,setDistricts]=useState([]);
    const [load,setLoad]=useState(false);
    const axiosSecure=useAxiosSecure();
    useEffect(()=>
    {
        fetch('/departments.json')
        .then(res=>res.json())
        .then(data=>setDepartments(data))
    },[])

    useEffect(()=>
    {
      fetch('/districts.json')
      .then(res=>res.json())
      .then(data=>setDistricts(data))
    },[])
   
    useEffect(() => {
  if (user) {
    reset({
      fullName: user.displayName || "",
      email: user.email || ""
    });
  }
}, [user, reset]);


    const divisons=districts.map(d=>d.division);
    const uniqueDivisons=[...new Set(divisons)];
    const homeRegion=useWatch({control,name:"homeDivision"});
    const currentRegion=useWatch({control,name:"currentDivision"})

    const filteredDistricts=districts.filter(d=>d.division===homeRegion);
     const filteredDistricts2=districts.filter(d=>d.division===currentRegion);


    const handleRegisterDonar=(data)=>
    {
      data.photoURL=user?.photoURL;
      console.log(data);
      setLoad(true);
      axiosSecure.post('/become-donor',data)
      .then((res)=>
      {
        if(res.data.insertedId)
        {
          toast.success("Registered as a Donar Successfully");
          setLoad(false);

          reset();
          queryClient.invalidateQueries(['donorData',user?.email]);
        }
      })
      .catch((err)=>
      {
        toast.error(err.message);
        setLoad(false);
      })

    }
  return (
    <div>
      


        <form onSubmit={handleSubmit(handleRegisterDonar)} className='space-y-5 border p-5 bg-red-100 rounded-lg w-full lg:w-[60%] mx-auto my-10'>

          <div className='mb-8'>
            <div className='flex items-center justify-center gap-4 md:gap-4  mt-2'>
        <img src={logo} alt="NSTU Blood Brigade" className="w-12 md:w-16 h-12 md:h-16 mt-0 md:mt-2" />
        <h2 className="text-2xl md:text-3xl font-bold text-center mt-0">Register as a Donor</h2>
        </div>
      </div>
            <div className='flex flex-col md:flex-row items-start md:items-center  justify-evenly gap-2 md:gap-24'>
                <div className='w-full md:flex-1'>
                <label className="block text-lg font-bold text-gray-700">Full Name</label>
                <input type="text" className="mt-1 block w-full text-lg rounded-lg border px-3 py-2 placeholder-gray-400 focus:outline-none
              focus:ring-2 focus:ring-[#7b7b7b] focus:border-transparent" {...register("fullName", { required: true })}></input>
                {errors.fullName && <p className="text-red-600 text-sm">Full Name is required</p>}
                </div>
                <div className='w-full md:flex-1'>
                <label className="block text-lg font-bold text-gray-700">Email Address</label>
                <input type="email" className="mt-1 block w-full text-lg rounded-lg border px-3 py-2 placeholder-gray-400 focus:outline-none
              focus:ring-2 focus:ring-[#7b7b7b] focus:border-transparent" {...register("email", { required: true })}></input>
                {errors.email && <p className="text-red-600 text-sm">Email is required</p>}
                </div>


            </div>

            <div className='flex flex-col md:flex-row items-start md:items-center  justify-evenly gap-2 md:gap-24'>
                <div className='w-full md:flex-1'>
                <label className="block text-lg font-bold text-gray-700">Phone Number</label>
                <input type="text"  className="mt-1 block w-full text-lg rounded-lg border px-3 py-2  focus:outline-none
              focus:ring-2 focus:ring-[#7b7b7b] focus:border-transparent" placeholder='Enter Your Phone Number' {...register("phone", { required: true })}></input>
                {errors.phone && <p className="text-red-600 text-sm">Phone Number is required</p>}
                </div>
                <div className='w-full md:flex-1'>
                <label className="block text-lg font-bold text-gray-700">Gender</label>
                <select className="mt-1 block w-full text-lg rounded-lg border px-3 py-2  focus:outline-none
              focus:ring-2 focus:ring-[#7b7b7b] focus:border-transparent" {...register("gender", { required: true })}>
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                   
                </select>
                {
errors.gender && <p className="text-red-600 text-sm">Gender is required</p>
                }
                
            </div>
            </div>


 <div className='flex flex-col md:flex-row items-start md:items-center  justify-evenly gap-2 md:gap-24'>
                <div className='w-full md:flex-1'>
                <label className="block text-lg font-bold text-gray-700">Current Division</label>
                <select className="mt-1 block w-full text-lg rounded-lg border px-3 py-2  focus:outline-none
              focus:ring-2 focus:ring-[#7b7b7b] focus:border-transparent" {...register("currentDivision", { required: true })}>
                    <option value="">Select Division</option>
                    {
                        uniqueDivisons.map((division, index) => (
                            <option key={index} value={division}>{division}</option>
                        ))
                    }
                </select>
                {errors.currentDivision && <p className="text-red-600 text-sm">Current Division is required</p>}
                </div>
                <div className='w-full flex-1'>
                <label className="block text-lg font-bold text-gray-700">Current District</label>
                <select className="mt-1 block w-full text-lg rounded-lg border px-3 py-2  focus:outline-none
              focus:ring-2 focus:ring-[#7b7b7b] focus:border-transparent" {...register("currentDistrict", { required: true })}>
                    <option value="">Select District</option>
                    {
                        filteredDistricts2.map((district, index) => (
                            <option key={index} value={district.districtName}>{district.districtName}</option>
                        ))
                    }
                </select>
                {errors.currentDistrict && <p className="text-red-600 text-sm">Current District is required</p>}
                </div>
            </div>



            <div className='flex flex-col md:flex-row items-start md:items-center  justify-evenly gap-2 md:gap-24'>
                <div className='w-full md:flex-1'>
                <label className="block text-lg font-bold text-gray-700">Home Division</label>
                <select className="mt-1 block w-full text-lg rounded-lg border px-3 py-2  focus:outline-none
              focus:ring-2 focus:ring-[#7b7b7b] focus:border-transparent" {...register("homeDivision", { required: true })}>
                    <option value="">Select Division</option>
                    {
                        uniqueDivisons.map((division, index) => (
                            <option key={index} value={division}>{division}</option>
                        ))
                    }
                </select>
                {errors.homeDivision && <p className="text-red-600 text-sm">Home Division is required</p>}
                </div>
                <div className='w-full flex-1'>
                <label className="block text-lg font-bold text-gray-700">Home District</label>
                <select className="mt-1 block w-full text-lg rounded-lg border px-3 py-2  focus:outline-none
              focus:ring-2 focus:ring-[#7b7b7b] focus:border-transparent" {...register("homeDistrict", { required: true })}>
                    <option value="">Select District</option>
                    {
                        filteredDistricts.map((district, index) => (
                            <option key={index} value={district.districtName}>{district.districtName}</option>
                        ))
                    }
                </select>
                {errors.homeDistrict && <p className="text-red-600 text-sm">Home District is required</p>}
                </div>
            </div>

             <div className='flex flex-col md:flex-row items-start md:items-center  justify-evenly gap-2 md:gap-24'>
              <div className='w-full flex-1'>
                <label className="block text-lg font-bold text-gray-700">Select Your Department</label>
                <select className="mt-1 block w-full text-lg rounded-lg border px-3 py-2  focus:outline-none
                focus:ring-2 focus:ring-[#7b7b7b] focus:border-transparent" {...register("department", { required: true })}>
                    <option value="">Select Department</option>
                    {
                        departments.map(dept=> <option key={dept.departmentCode} value={dept.departmentName}>{dept.departmentName}</option>)
                    }
                </select>
                {errors.department && <p className="text-red-600 text-sm">Department is required</p>
                    }
              
              </div>
                <div className='w-full md:flex-1'>
                <label className="block text-lg font-bold text-gray-700">Blood Group</label>
                <select className="mt-1 block w-full text-lg rounded-lg border px-3 py-2  focus:outline-none
              focus:ring-2 focus:ring-[#7b7b7b] focus:border-transparent" {...register("bloodGroup", { required: true })}>
                    <option value="">Select Blood Group</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                </select>
                {errors.bloodGroup && <p className="text-red-600 text-sm">Blood Group is required</p>}
                </div>
              </div>
                

               <div className='flex flex-col md:flex-row items-start md:items-center  justify-evenly gap-2 md:gap-24'>
             
                <div className='w-full md:flex-1'>
                <label className="block text-lg font-bold text-gray-700">Last Donation Date</label>
                <input type="date"  className="mt-1 block w-full text-black text-lg rounded-lg border px-3 py-2  focus:outline-none
                focus:ring-2 focus:ring-[#7b7b7b] focus:border-transparent" {...register("lastDonationDate", { required: true })}></input>
                {errors.lastDonationDate && <p className="text-red-600 text-sm">Last Donation Date is required</p>}
                </div>

                <div className='w-full md:flex-1'>
                <label className="block text-lg font-bold text-gray-700">Donation Count</label>
                <input type="number" min="0"  className="mt-1 block w-full text-lg rounded-lg border px-3 py-2  focus:outline-none
                focus:ring-2 focus:ring-[#7b7b7b] focus:border-transparent" placeholder='Enter donation count' {...register("donationCount", { required: true })}></input>
                {errors.donationCount && <p className="text-red-600 text-sm">Donation Count is required</p>}
                </div>

              </div>

        <div className='text-center mt-10'>
          <button type="submit" disabled={load} className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition">{load ? 'Registering...' : 'Register as Donor'}</button>
        </div>

        <p className="text-black text-left md:text-center">***If you have never donated blood, you may choose any date from more than 3 months ago.</p>
  </form>
      
    </div>
  );
};

export default DonarForm;