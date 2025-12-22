import React from 'react';
import blood from '../assets/Blood_drop.jpg'


const AuthPageSide = () => {
  return (
       <div className="hidden lg:block lg:w-4/12 relative">

<div
aria-hidden="true"
className=" w-full bg-cover rounded-xl flex justify-center items-center"
// style={{
// backgroundImage: "url('/src/assets/Blood_drop (2).png')",
// backgroundRepeat: 'no-repeat',
// backgroundSize: 'cover',

// }}
>
<img src={blood} alt=""  className='h-150'/>


</div>
</div>
  );
};

export default AuthPageSide;