import React from 'react';
const RepeatCTA = () => {
  return (
    <section className="bg-red-50 py-20">
      <div className="max-w-5xl mx-auto px-6 text-center">

        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          Ready to save a life?
        </h2>

        <div className="mt-8 flex justify-center flex-wrap gap-5">
          <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-semibold transition">
            Register Now
          </button>

          <button className="border border-red-600 text-red-600 hover:bg-red-100 px-8 py-3 rounded-lg font-semibold transition">
            Request Blood
          </button>
        </div>

      </div>
    </section>
  );
};

export default RepeatCTA;
