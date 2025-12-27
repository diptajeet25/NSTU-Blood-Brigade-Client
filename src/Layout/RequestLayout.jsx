import React from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import RequestForm from '../Components/RequestForm';

const RequestLayout = () => {
  return (
    <div>
      <title>Request Blood-NSTU Blood Brigade</title>
        <Navbar></Navbar>
        <RequestForm></RequestForm>
        <Footer></Footer>
    </div>
  );
};

export default RequestLayout;