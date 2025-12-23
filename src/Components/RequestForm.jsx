import React, { use, useEffect, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import logo from '../assets/Logo2.png'
import { AuthContext } from '../Context/AuthContext';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { toast } from 'react-toastify';
import BloodRippleLoader from './BloodLoading';

const RequestForm = () => {
    const { register, handleSubmit,control,reset, formState: { errors } } = useForm()
    const {user,loading}=use(AuthContext);
    const [districts,setDistricts]=useState([])
    const [load,setLoad]=useState(false);
    const axiosSecure=useAxiosSecure();

       useEffect(()=>
        {
          fetch('/districts.json')
          .then(res=>res.json())
          .then(data=>setDistricts(data))
        },[])

        const divison=districts.map(district=>district.division)
        const uniqueDivision=[...new Set(divison)];
        const myDivision=useWatch({control,name:"division"})
        const filteredDistricts=districts.filter(district=>district.division===myDivision);

        const handleRequest=(data)=>
        {
          setLoad(true);
          data.email=user.email;

          axiosSecure.post('/request-blood',data)
          .then((res)=>
          {
            if(res.data.insertedId)
            {
              toast.success("Blood request submitted successfully");
              setLoad(false);

              reset();
            }

          })
          .catch(()=>
          {
            toast.error("Failed to submit blood request");
            setLoad(false);
          })
          
        }

if(loading)
  return <BloodRippleLoader></BloodRippleLoader>
  return (
    <div>

                <form  onSubmit={handleSubmit(handleRequest)} className='space-y-5 border p-5 bg-red-100 rounded-lg w-full lg:w-[60%] mx-auto my-10'>
  <div className='mb-8'>
                    <div className='flex items-center justify-center gap-4 md:gap-4  mt-2'>
                <img src={logo} alt="NSTU Blood Brigade" className="w-12 md:w-16 h-12 md:h-16 mt-0 md:mt-2" />
                <h2 className="text-2xl md:text-3xl font-bold text-center mt-0">Request for Blood</h2>
                </div>
              </div>

                 <div className='flex flex-col md:flex-row items-start md:items-center  justify-evenly gap-2 md:gap-24'>
                <div className='w-full md:flex-1'>
                <label className="block text-lg font-bold text-gray-700">Patient Name</label>
                <input type="text" className="mt-1 block w-full text-lg rounded-lg border px-3 py-2  focus:outline-none
              focus:ring-2 focus:ring-[#7b7b7b] focus:border-transparent" placeholder='Enter Patient Name' {...register("patientName", { required: true })}></input>
                {errors.patientName && <p className="text-red-600 text-sm">Patient Name is required</p>}
                </div>
                <div className='w-full md:flex-1'>
                <label className="block text-lg font-bold text-gray-700">Contact Number</label>
                <input type="tel" className="mt-1 block w-full text-lg rounded-lg border px-3 py-2  focus:outline-none
              focus:ring-2 focus:ring-[#7b7b7b] focus:border-transparent" placeholder='Enter Your Phone Number' {...register("phone", { required: true })}></input>
                {errors.phone && <p className="text-red-600 text-sm">Phone is required</p>}
                </div>
            </div>
            <div className='flex flex-col md:flex-row items-start md:items-center  justify-evenly gap-2 md:gap-24'>
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
                <div className='w-full md:flex-1'>
                <label className="block text-lg font-bold text-gray-700">Units Required</label>
                <input type="number" className="mt-1 block w-full text-lg rounded-lg border px-3 py-2  focus:outline-none
              focus:ring-2 focus:ring-[#7b7b7b] focus:border-transparent" placeholder='Enter Units Required' {...register("unitsRequired", { required: true })}></input>
                {errors.unitsRequired && <p className="text-red-600 text-sm">Units Required is required</p>}
                </div>
                </div>
                <div className='flex flex-col md:flex-row items-start md:items-center  justify-evenly gap-2 md:gap-24'>
               
                <div className='w-full md:flex-1'>
                <label className="block text-lg font-bold text-gray-700">Required Date</label>
                <input type="date" className="mt-1 block w-full text-lg rounded-lg border px-3 py-2  focus:outline-none
              focus:ring-2 focus:ring-[#7b7b7b] focus:border-transparent" {...register("requiredDate", { required: true })}></input>
                {errors.requiredDate && <p className="text-red-600 text-sm">Required Date is required</p>}
                </div>

                 <div className='w-full md:flex-1'>
                <label className="block text-lg font-bold text-gray-700">Hospital Name</label>
                <input type="text" className="mt-1 block w-full text-lg rounded-lg border px-3 py-2  focus:outline-none
              focus:ring-2 focus:ring-[#7b7b7b] focus:border-transparent" placeholder='Enter Hospital Name' {...register("hospitalName", { required: true })}></input>
                {errors.hospitalName && <p className="text-red-600 text-sm">Hospital Name is required</p>}
                
                

                </div>
                </div>
                <div className='flex flex-col md:flex-row items-start md:items-center  justify-evenly gap-2 md:gap-24'>
                <div className='w-full md:flex-1'>
                <label className="block text-lg font-bold text-gray-700">Division (Hospital)</label>
                <select className="mt-1 block w-full text-lg rounded-lg border px-3 py-2  focus:outline-none
              focus:ring-2 focus:ring-[#7b7b7b] focus:border-transparent" {...register("division", { required: true })}>
                    <option value="">Select Division</option>
                    {uniqueDivision.map((divison,index)=><option key={index} value={divison}>{divison}</option>)}
                </select>
                {errors.division && <p className="text-red-600 text-sm">Division is required</p>}
                </div>
                <div className='w-full md:flex-1'>
                <label className="block text-lg font-bold text-gray-700">District (Hospital)</label>
                <select className="mt-1 block w-full text-lg rounded-lg border px-3 py-2  focus:outline-none
                focus:ring-2 focus:ring-[#7b7b7b] focus:border-transparent" {...register("district", { required: true })}>
                    <option value="">Select District</option>
                    {filteredDistricts.map((district,index)=><option key={index} value={district.districtName}>{district.districtName}</option>)}
                </select>
                {errors.district && <p className="text-red-600 text-sm">District is required</p>}

                </div>

                </div>
                <div className='flex flex-col md:flex-row items-start md:items-center  justify-evenly gap-2 md:gap-24'>
                <div className='w-full md:flex-1'>
                <label className="block text-lg font-bold text-gray-700">Reason</label>
                <select className="mt-1 block w-full text-lg rounded-lg border px-3 py-2  focus:outline-none
              focus:ring-2 focus:ring-[#7b7b7b] focus:border-transparent" {...register("reason", { required: true })}>
                    <option value="">Select Reason</option>
                    <option value="Accident">Accident</option>
                    <option value="Surgery">Surgery</option>
                    <option value="Illness">Pregnency</option>
                    <option value="Other">Other</option>
                </select>
                {errors.reason && <p className="text-red-600 text-sm">Reason is required</p>}
                </div>
                <div className='w-full md:flex-1'>
                <label className="block text-lg font-bold text-gray-700">Additional Notes</label>
                <input type="text" className="mt-1 block w-full text-lg rounded-lg border px-3 py-2  focus:outline-none
              focus:ring-2 focus:ring-[#7b7b7b] focus:border-transparent" placeholder='Enter Additional Notes' {...register("additionalNotes")}></input>
              </div>
                </div>

                 <div className='text-center mt-10'>
          <button type="submit" disabled={load} className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition">{load ? 'Submitting...' : 'Submit Request'}</button>
        </div>




              </form>

    </div>
  );
};

export default RequestForm;