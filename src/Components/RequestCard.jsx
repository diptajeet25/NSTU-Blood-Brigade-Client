import { Hospital, MapPin, Phone, Timer, UserRound } from 'lucide-react';
import React from 'react';

const RequestCard = ({request}) => {

    const today=new Date();
    const requiredDate=new Date(request.requiredDate);
    const timeDiff=requiredDate.getTime()-today.getTime();
    const daysDiff=Math.ceil(timeDiff/(1000*3600*24));
    if(daysDiff<0)
    {
        return null
    }
  return (
    <div className='bg-gray-100 p-4 rounded-3xl flex flex-col shadow-lg mt-8 '>
        
            <div className='flex justify-between px-3 items-center w-full'>
                <span className='text-2xl bg-[#7A2E2E] text-white px-4 py-1 rounded-2xl  text-center'>{request.bloodGroup}</span>
                {
                   
                    daysDiff<=2 ? <span className='text-white font-bold px-3 py-1 bg-red-600 rounded-2xl'>Emergency</span> :
                    daysDiff<=7 ? <span className='text-white font-bold px-3 py-1 bg-orange-500 rounded-2xl'>Urgent</span> :
                    <span className='text-white font-bold px-3 py-1 bg-green-600 rounded-2xl'>Normal</span>

                }
            </div>
            <hr className='w-full bg-gray-200 my-3 opacity-50'></hr>
            <div className='px-3 flex flex-col gap-2'>
               <h3 className="text-xl font-semibold flex items-center gap-2"><UserRound className="w-5 h-5" />Patient: {request.patientName}</h3>
  </div>
  <hr className='w-full bg-gray-200 my-3 opacity-50'></hr>
            <div className='px-3 flex flex-col gap-2'>
                <h3 className="text-xl font-semibold flex items-center gap-2"><Hospital className="w-5 h-5" />Hospital: {request.hospitalName}</h3>
        
</div>
 <hr className='w-full bg-gray-200 my-3 opacity-50'></hr>

            <div className='px-3 flex flex-col gap-2'>
                <h3 className="text-xl font-semibold flex items-center gap-2"><MapPin className="w-5 h-5" />Location: {request.district},{request.division}</h3>
        
</div>
<hr className='w-full bg-gray-200 my-3 opacity-50'></hr>
<div className='px-3'>
    <h3 className="text-xl font-semibold flex items-center gap-2"><Phone className='w-5 h-5' />Phone: {request.phone}</h3>
    </div>
    <hr className='w-full bg-gray-200 my-3 opacity-50'></hr>

    <div className='px-3' >
        <h3 className='text-xl font-semibold flex items-center gap-2'><Timer className='w-5 h-5' />Require Date: {new Date(request.requiredDate).toLocaleDateString()}</h3>
    </div>
    </div>
  );
};

export default RequestCard;