import React, { use } from 'react';
import { Mail, Phone, User, Droplet, Clock, MapPin, GraduationCap } from "lucide-react";
import { AuthContext } from '../Context/AuthContext';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import BloodRippleLoader from '../Components/BloodLoading';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

const MyProfile = () => {
    const {user,loading}=use(AuthContext)
    const axiosSecure=useAxiosSecure();
    const {data,isLoading}=useQuery({
        queryKey:['myprofile',user?.email],
        enabled:!!user?.email && !loading,
        queryFn:async()=>{
            const res=await axiosSecure.get(`/donor/profile?email=${user?.email}`);
            return res.data;
        }
    })
    if(loading || isLoading){
        return <BloodRippleLoader></BloodRippleLoader>
    }
  return (
    <div>
        <Navbar></Navbar>
           <div className="min-h-[70vh] bg-slate-100 px-4 py-16 flex justify-center">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-xl overflow-hidden">

        <div className="bg-linear-to-r from-[#6B1F1F] to-[#8A2D2D] h-36 relative">
          <img
            src={data.photoURL}
            alt="Profile"
            className="w-36 h-36 rounded-full object-cover border-4 border-white absolute -bottom-16 left-1/2 -translate-x-1/2"
          />
        </div>

        <div className="pt-20 text-center px-6">
          <h2 className="text-3xl font-bold text-slate-800">
            {data.fullName}
          </h2>
          <p className="text-slate-500 mt-1">
            {data.department}
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-6 mt-8">
          <div className="bg-slate-50 rounded-xl p-4 text-center border">
            <Droplet className="mx-auto text-[#6B1F1F]" />
            <p className="text-sm text-slate-500 mt-1">Blood Group</p>
            <p className="font-bold text-lg">{data.bloodGroup}</p>
          </div>

          <div className="bg-slate-50 rounded-xl p-4 text-center border">
            <Droplet className="mx-auto text-[#6B1F1F]" />
            <p className="text-sm text-slate-500 mt-1">Total Donations</p>
            <p className="font-bold text-lg">{data.donationCount}</p>
          </div>

          <div className="bg-slate-50 rounded-xl p-4 text-center border">
            <Clock className="mx-auto text-slate-600" />
            <p className="text-sm text-slate-500 mt-1">Last Donated</p>
            <p className="font-semibold">{data.lastDonationDate}</p>
          </div>
        </div>
         <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 px-6 py-10">

          <div>
            <h3 className="text-lg font-semibold mb-4 text-slate-800">
              Personal Information
            </h3>

            <div className="space-y-4 text-slate-700">
              <div className="flex gap-3 items-center">
                <User className="text-slate-500" />
                <span>{data.gender}</span>
              </div>

              <div className="flex gap-3 items-center">
                <MapPin className="text-slate-500" />
                <span>
                  {data.district}, {data.division}
                </span>
              </div>
            </div>
          </div>
           <div>
            <h3 className="text-lg font-semibold mb-4 text-slate-800">
              Contact & Academic
            </h3>

            <div className="space-y-4 text-slate-700">
              <div className="flex gap-3 items-center">
                <Mail className="text-slate-500" />
                <span>{data.email}</span>
              </div>

              <div className="flex gap-3 items-center">
                <Phone className="text-slate-500" />
                <span>{data.phone}</span>
              </div>

              <div className="flex gap-3 items-center">
                <GraduationCap className="text-slate-500" />
                <span>{data.department}</span>
              </div>
              </div>
          </div>

        </div>
      </div>
    </div>
    

    <Footer></Footer>
    </div>
  );
};

export default MyProfile;

