import React from "react";
import hero from '../assets/hero (2).png'

const HeroSection = () => {
  return (
    <section className="bg-linear-to-br from-red-50 to-white w-[80%] mx-auto rounded-3xl shadow-lg my-12">
      <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            Donate Blood, <br />
            <span className="text-red-600">Save Lives at NSTU</span>
          </h1>

          <p className="mt-6 text-lg text-gray-600 max-w-xl">
            NSTU Blood Brigade connects verified donors with patients during
            emergencies — fast, reliable, and student-driven.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition">
              Request Blood
            </button>

            <button className="border border-red-600 text-red-600 hover:bg-red-50 px-6 py-3 rounded-lg font-semibold transition">
              Become a Donor
            </button>
          </div>
        </div>

        <div className="hidden md:flex justify-center">
          <img
            src={hero}
            alt="Blood Donation"
            className="w-full max-w-md  drop-shadow-xl"
          />
        </div>

      </div>
    </section>
  );
};

export default HeroSection;
