import React from "react";  
import { UserPlus, PhoneCall, Heart } from "lucide-react";

const HowItWorksSimple = () => {
  return (
    <section className="bg-white py-12">
      <div className="max-w-6xl mx-auto px-6">

        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-gray-900">
            How It Works
          </h2>
          <p className="mt-2 text-gray-600">
            Just three simple steps to save a life.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">

          <div className="p-10 rounded-xl border border-gray-100 bg-red-50 hover:shadow-md transition">
            <div className="flex justify-center mb-6 text-red-600">
              <UserPlus size={40} />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">
              Register as Donor
            </h3>
          </div>

          <div className="p-10 rounded-xl border border-gray-100 bg-red-50 hover:shadow-md transition">
            <div className="flex justify-center mb-6 text-red-600">
              <PhoneCall size={40} />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">
              Get Emergency Call
            </h3>
          </div>

       
          <div className="p-10 rounded-xl border border-gray-100 bg-red-50 hover:shadow-md transition">
            <div className="flex justify-center mb-6 text-red-600">
              <Heart size={40} />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">
              Save a Life
            </h3>
          </div>

        </div>

      </div>
    </section>
  );
};

export default HowItWorksSimple;
