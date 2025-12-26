import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const About = () => {
  return (
    <>
      <Navbar />
      <div className=" py-8">
        <div className="max-w-6xl mx-auto px-6 py-24 space-y-24">
          <section className="text-center">
            <h1 className="text-4xl font-bold text-gray-900">About NSTU Blood Brigade</h1>
            <p className="mt-5 text-gray-600 max-w-3xl mx-auto text-lg">NSTU Blood Brigade is a student-led, non-profit initiative dedicated to connecting blood donors with patients during emergency situations through a fast, reliable, and community-driven platform.</p>
          </section>

          <section className="grid md:grid-cols-2 gap-10">
            <div className="bg-red-50 rounded-2xl p-10 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Who We Are</h2>
              <p className="text-gray-600 leading-relaxed">Founded by students of Noakhali Science and Technology University (NSTU), NSTU Blood Brigade operates with a single goal — ensuring that no patient suffers due to the unavailability of blood during critical moments. The initiative is built on responsibility, trust, and voluntary participation.</p>
            </div>
            <div className="bg-red-50 rounded-2xl p-10 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Purpose</h2>
              <p className="text-gray-600 leading-relaxed">We aim to reduce response time in blood emergencies, promote voluntary blood donation among students, and build a dependable donor network that hospitals and patients can rely on when it matters the most.</p>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">What We Stand For</h2>
            <div className="grid md:grid-cols-4 gap-8">
              <div className="bg-[#fff1f1] rounded-2xl p-8 text-center">
                <h3 className="font-semibold text-gray-900 mb-2">Transparency</h3>
                <p className="text-sm text-gray-600">Open and responsible operations with no hidden motives.</p>
              </div>
              <div className="bg-[#fff1f1] rounded-2xl p-8 text-center">
                <h3 className="font-semibold text-gray-900 mb-2">Verified Donors</h3>
                <p className="text-sm text-gray-600">Each donor is reviewed to ensure reliability and trust.</p>
              </div>
              <div className="bg-[#fff1f1] rounded-2xl p-8 text-center">
                <h3 className="font-semibold text-gray-900 mb-2">Emergency First</h3>
                <p className="text-sm text-gray-600">Immediate action focused on life-saving urgency.</p>
              </div>
              <div className="bg-[#fff1f1] rounded-2xl p-8 text-center">
                <h3 className="font-semibold text-gray-900 mb-2">100% Non-Profit</h3>
                <p className="text-sm text-gray-600">Driven by compassion, not financial interest.</p>
              </div>
            </div>
          </section>

          <section className="bg-red-50 rounded-3xl p-14 shadow-sm border border-gray-100 text-center">
            <p className="text-xl text-gray-800 font-medium">Every blood donor is a silent hero.</p>
            <p className="mt-3 text-gray-600 max-w-2xl mx-auto">NSTU Blood Brigade remains committed to building a responsible donor community where help is always within reach during emergencies.</p>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;
