import React from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import DonarForm from '../Components/DonarForm';

const DonarLayout = () => {
  return (
    <div>
        <Navbar></Navbar>
        <DonarForm></DonarForm>
        <Footer></Footer>
    </div>
  );
};

export default DonarLayout;