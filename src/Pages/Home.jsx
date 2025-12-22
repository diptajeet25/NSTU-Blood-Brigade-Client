import React from 'react';
import HeroSection from '../Components/HeroSection';
import LiveStatatics from '../Components/LiveStatatics';
import WhyNSTU from '../Components/WhySection';
import HowItWorksSimple from '../Components/HowITWorks';
import RepeatCTA from '../Components/RepeatCTA';
import FAQ from '../Components/FAQ';

const Home = () => {
  return (
    <div>
        <HeroSection></HeroSection>
        <LiveStatatics></LiveStatatics>
        <WhyNSTU></WhyNSTU>
        <HowItWorksSimple></HowItWorksSimple>
        <FAQ></FAQ>
        <RepeatCTA></RepeatCTA>

    </div>
  );
};

export default Home;