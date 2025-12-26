import React, { use, useEffect, useRef, useState } from 'react';
import { Mail, Phone, User, Droplet, Clock, MapPin, GraduationCap, Home } from "lucide-react";
import { AuthContext } from '../Context/AuthContext';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import BloodRippleLoader from '../Components/BloodLoading';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { set, useForm, useWatch } from 'react-hook-form';
import { Link } from 'react-router';
import { toast } from 'react-toastify';
import { updateProfile } from 'firebase/auth';

const MyProfile = () => {
  const { user, loading } = use(AuthContext)

  const modalRef = useRef(null);
  const axiosSecure = useAxiosSecure();
  const [profileData, setProfileData] = useState(null)
  const [departments, setDepartments] = useState([]);
  const [districts, setDistricts] = useState([]);
  const { data, isLoading } = useQuery({
    queryKey: ['myprofile', user?.email],
    enabled: !!user?.email && !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/donor/profile?email=${user?.email}`);
      return res.data;
    }
  })

  const { register, handleSubmit, setValue, formState: { errors }, reset, control } = useForm();

  useEffect(() => {
    fetch('/departments.json')
      .then(res => res.json())
      .then(data => setDepartments(data))
  }, [])

  useEffect(() => {
    fetch('/districts.json')
      .then(res => res.json())
      .then(data => setDistricts(data))
  }, [])

  const divisons = districts.map(d => d.division);
  const uniqueDivisons = [...new Set(divisons)];
  const homeRegion = useWatch({ control, name: "homeDivision" });
  const currentRegion = useWatch({ control, name: "currentDivision" })

  const filteredDistricts = districts.filter(d => d.division === homeRegion);
  const filteredDistricts2 = districts.filter(d => d.division === currentRegion);


  useEffect(() => {
    if (data) {
      reset({
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        gender: data.gender,
        currentDivision: data.currentDivision,

        homeDivision: data.homeDivision,

        department: data.department,
        bloodGroup: data.bloodGroup,
        lastDonationDate: data.lastDonationDate,
        donationCount: data.donationCount,
        

      });
    }
  }, [data, reset]);


  useEffect(() => {
    if (data) {
      setProfileData(data)
    }
    else {
      setProfileData(user)
    }

  }, [user, data])

  const editProfile = () => {
    modalRef.current.showModal();
  }
  const handleEditProfile = (formData) => {

    axiosSecure.patch(`/donor/profile?email=${user?.email}`, formData)
      .then(async (res) => {
        if (res.data.modifiedCount > 0) {


          await updateProfile(user, {
            photoURL: formData.photoURL
          })
          await user.reload();

          setProfileData(formData);
          toast.success("Profile updated successfully")

          modalRef.current.close();

        }

      })
      .catch((error) => {
        console.log(error)
        toast.error("Failed to update profile")
      })

  }


  useEffect(() => {
    if (!data || districts.length === 0) return;

    setValue("homeDivision", data.homeDivision);
    setValue("currentDivision", data.currentDivision);

    setTimeout(() => {
      setValue("homeDistrict", data.homeDistrict);
      setValue("currentDistrict", data.currentDistrict);
    }, 0);

  }, [data, districts, setValue]);



  if (loading || isLoading) {
    return <BloodRippleLoader></BloodRippleLoader>
  }


  return (
    <div>
      <Navbar></Navbar>
      <div className="min-h-[70vh] bg-slate-100 px-4 py-16 flex justify-center">
        <div className="w-full max-w-4xl bg-white rounded-3xl shadow-xl overflow-hidden">

          <div className="bg-linear-to-r from-[#6B1F1F] to-[#8A2D2D] h-36 relative mx-auto">
            <img
              src={user?.photoURL || profileData?.photoURL}
              alt="Profile"
              className="w-36 h-36 rounded-full object-cover border-4 border-white absolute -bottom-20 left-1/2 -translate-x-1/2 mx-auto "
            />
          </div>

          <div className="pt-20 text-center px-6">
            <h2 className="text-3xl font-bold text-slate-800">
              {profileData?.fullName ? profileData?.fullName : profileData?.displayName}
            </h2>
            <p className="text-slate-500 mt-1">
              {profileData?.department ? profileData?.department : <span className="text-slate-400">—</span>}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-6 mt-8">
            <div className="bg-slate-50 rounded-xl p-4 text-center border">
              <Droplet className="mx-auto text-[#6B1F1F]" />
              <p className="text-sm text-slate-500 mt-1">Blood Group</p>
              {profileData?.bloodGroup ? <p className="font-bold text-lg">{profileData?.bloodGroup}</p> : <span className="text-slate-400">—</span>
              }
            </div>

            <div className="bg-slate-50 rounded-xl p-4 text-center border">
              <Droplet className="mx-auto text-[#6B1F1F]" />
              <p className="text-sm text-slate-500 mt-1">Total Donations</p>
              {profileData?.donationCount ? <p className="font-bold text-lg">{profileData?.donationCount}</p> : <span className="text-slate-400">—</span>
              }
            </div>

            <div className="bg-slate-50 rounded-xl p-4 text-center border">
              <Clock className="mx-auto text-slate-600" />
              <p className="text-sm text-slate-500 mt-1">Last Donated</p>
              <p className="font-semibold">{profileData?.lastDonationDate ? new Date(profileData?.lastDonationDate).toLocaleDateString() : <span className="text-slate-400">—</span>
              }</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 px-6 py-10">

            <div>
              <h3 className="text-lg font-semibold mb-4 text-slate-800">
                Personal Information
              </h3>

              <div className="space-y-4 text-slate-700">
                <div className="flex gap-3 items-center">
                  {profileData?.gender ?
                    <>
                      <User className="text-slate-500" />
                      <span>{profileData?.gender}</span> </> :
                    <>

                    </>
                  }
                </div>

                <div className="flex gap-3 items-center">
                  <MapPin className="text-slate-500" />
                  <span>
                    {profileData?.currentDistrict && profileData?.currentDivision ? `${profileData?.currentDistrict}, ${profileData?.currentDivision}` : <span className="text-slate-400">—</span>
                    }
                  </span>
                </div>
                <div className="flex gap-3 items-center">
                  <Home className="text-slate-500" />
                  <span>
                    {profileData?.homeDistrict && profileData?.homeDivision ? `${profileData?.homeDistrict},${profileData?.homeDivision}` : <span className="text-slate-400">—</span>
                    }
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
                  {profileData?.email ? <span>{profileData?.email}</span> : <span className="text-slate-400">—</span>
                  }
                </div>

                <div className="flex gap-3 items-center">
                  <Phone className="text-slate-500" />
                  {profileData?.phone ? <span>{profileData?.phone}</span> : <span className="text-slate-400">—</span>
                  }
                </div>

                <div className="flex gap-3 items-center">
                  <GraduationCap className="text-slate-500" />
                  {profileData?.department ? <span>{profileData?.department}</span> : <span className="text-slate-400">—</span>
                  }
                </div>
              </div>
            </div>

          </div>
          <div className=' flex justify-center'>
            {
              data ? <button onClick={editProfile} className='btn btn-primary w-1/2 lg:w-1/3 text-xl  mx-auto rounded-xl mb-6'>Edit Profile</button> :
                <Link to="/beADonor" className='btn btn-primary w-1/3 mb-6 text-xl mx-auto rounded-xl'>Become a Donor</Link>
            }
          </div>
        </div>
      </div>


      <dialog ref={modalRef} className="modal">
        <div className="modal-box w-11/12 max-w-5xl bg-white">
          <h3 className="font-bold text-xl text-center">My Profile</h3>
          <form onSubmit={handleSubmit(handleEditProfile)}>
            <div className='flex flex-col md:flex-row items-start md:items-center  justify-evenly gap-2 md:gap-24'>
              <div className='w-full md:flex-1'>
                <label className="block text-lg font-bold text-gray-700">Full Name</label>
                <input type="text" className="mt-1 block w-full text-lg rounded-lg border px-3 py-2 placeholder-gray-400 focus:outline-none
              focus:ring-2 focus:ring-[#7b7b7b] focus:border-transparent" readOnly {...register("fullName", { required: true })}></input>

              </div>
              <div className='w-full md:flex-1'>
                <label className="block text-lg font-bold text-gray-700">Email Address</label>
                <input type="email" className="mt-1 block w-full text-lg rounded-lg border px-3 py-2 placeholder-gray-400 focus:outline-none
              focus:ring-2 focus:ring-[#7b7b7b] focus:border-transparent" readOnly {...register("email", { required: true })}></input>

              </div>


            </div>
            <div className='flex flex-col md:flex-row items-start md:items-center  justify-evenly gap-2 md:gap-24'>
              <div className='w-full md:flex-1'>
                <label className="block text-lg font-bold text-gray-700">Phone Number</label>
                <input type="text" className="mt-1 block w-full text-lg rounded-lg border px-3 py-2  focus:outline-none
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
                {errors.currentDistrict && <p className="text-red-600 text-sm"> Current District is required</p>}
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
                    departments.map(dept => <option key={dept.departmentCode} value={dept.departmentName}>{dept.departmentName}</option>)
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
                <input type="date" className="mt-1 block w-full text-black text-lg rounded-lg border px-3 py-2  focus:outline-none
                focus:ring-2 focus:ring-[#7b7b7b] focus:border-transparent" {...register("lastDonationDate", { required: true })}></input>
                {errors.lastDonationDate && <p className="text-red-600 text-sm">Last Donation Date is required</p>}
              </div>

              <div className='w-full md:flex-1'>
                <label className="block text-lg font-bold text-gray-700">Donation Count</label>
                <input type="number" min="0" className="mt-1 block w-full text-lg rounded-lg border px-3 py-2  focus:outline-none
                focus:ring-2 focus:ring-[#7b7b7b] focus:border-transparent" placeholder='Enter donation count' {...register("donationCount", { required: true })}></input>
                {errors.donationCount && <p className="text-red-600 text-sm">Donation Count is required</p>}
              </div>

            </div>
            <div className='flex justify-center mt-6'>
              <button type="submit" className='btn btn-primary w-full lg:w-1/3 text-xl  mx-auto rounded-xl mb-6'>Save Changes</button>
            </div>


          </form>
          <div className="modal-action">
            <form method="dialog">

              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>


      <Footer></Footer>
    </div>
  );
};

export default MyProfile;

