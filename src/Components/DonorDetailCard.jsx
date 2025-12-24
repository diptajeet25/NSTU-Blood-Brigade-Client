import { Clock, Droplet, GraduationCap, Home, Mail, MapPin, Phone } from 'lucide-react';
import React from 'react';

const DonorDetailCard = ({donor}) => {

  const today=new Date();
  const lastDonationDate=new Date(donor.lastDonationDate);
  const timeDiff=today.getTime()-lastDonationDate.getTime();
  const daysDiff=Math.ceil(timeDiff/(1000*3600*24));

  return (
    <div className='bg-gray-100 p-4 rounded-3xl flex flex-col shadow-lg mt-8 '>
      <div className='flex flex-row items-center gap-4'>
      <div className='w-1/3 '>
      <img src={donor?.photoURL} alt="Donor" className='w-28 md:w-40 h-28 md:h-40 rounded-full'/>
      </div>
      <div className='w-2/3'>
      <div className='flex justify-between gap-2'>
       <span className='text-2xl bg-[#7A2E2E] text-white px-4 py-1 rounded-2xl  text-center'>{donor.bloodGroup}</span>
       {
        daysDiff>=120 ?<span className="bg-green-600 text-white font-bold px-3 py-1 rounded-2xl ">Active Donor</span> :
        <span className='text-white font-bold px-3 py-1 bg-gray-600 rounded-2xl'>Not Available</span>
       }
       </div>
        <hr className='w-full bg-gray-200 my-3 opacity-50'></hr>
        <div className='px-1 flex flex-col gap-2'>
            <h3 className="text-2xl font-extrabold"> {donor.fullName}</h3>
            <h3 className='text-md lg:text-lg font-normal flex items-start gap-1'><GraduationCap  /> : {donor.department}</h3>
            {/* <h3 className='text-md lg:text-lg font-normal flex items-start gap-1'><Mail /> : {donor.email}</h3> */}
            <h3 className='text-md lg:text-lg font-normal flex items-start gap-1'><MapPin></MapPin> : {donor.district}, {donor.division}</h3>
            </div>
            
      

      </div>
      </div>
      <hr className='w-full bg-gray-200 my-3 opacity-50'></hr>
      <div className='px-4 mt-4'>
        <h3 className='text-lg md:text-2xl font-semibold flex items-center gap-1 flex-wrap'><Phone className='w-6 h-6'></Phone> Phone : {donor.phone}</h3>
        <h3 className=' text-lg md:text-2xl font-semibold flex items-center gap-1 mt-2 flex-wrap'><Mail className='w-6 h-6'></Mail> Email : {donor.email}</h3>
        <h3 className=' text-lg md:text-2xl font-semibold flex items-center gap-1 mt-2 flex-wrap'><Droplet className='w-6 h-6'></Droplet> Total Donation : {donor.donationCount}</h3>
        <h3 className=' text-lg md:text-2xl font-semibold flex items-center gap-1 mt-2 flex-wrap'><Clock className='w-6 h-6'></Clock>🩸 Last Donated : {new Date(donor.lastDonationDate).toLocaleDateString()}</h3>
        </div>

      </div>
  );
};

export default DonorDetailCard;