import React from "react";
import { Clock, ShieldCheck, AlertCircle, HeartHandshake } from "lucide-react";

const reasons = [
  {
    id: 1,
    title: "24/7 Student Support",
    desc: "Always active volunteers ensuring help at any hour.",
    icon: <Clock className="w-8 h-8 text-red-600" />,
  },
  {
    id: 2,
    title: "Verified Donors",
    desc: "Every donor is reviewed to ensure reliability and trust.",
    icon: <ShieldCheck className="w-8 h-8 text-red-600" />,
  },
  {
    id: 3,
    title: "Emergency-First Approach",
    desc: "Immediate action focused on life-saving urgency.",
    icon: <AlertCircle className="w-8 h-8 text-red-600" />,
  },
  {
    id: 4,
    title: "100% Non-Profit",
    desc: "Driven by compassion, not by money.",
    icon: <HeartHandshake className="w-8 h-8 text-red-600" />,
  },
];

const WhyNSTU = () => {
  return (
    <section className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-gray-900">
            Why NSTU Blood Brigade?
          </h2>
          <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
            Built by students, for humanity — ensuring timely help when it matters most.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 ">
          {reasons.map((item) => (
            <div
              key={item.id}
              className="text-center p-8 rounded-xl border border-gray-100 bg-red-50 shadow-sm hover:shadow-md transition"
            >
              <div className="flex justify-center mb-5">
                {item.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                {item.title}
              </h3>
              <p className="mt-2 text-gray-600 text-sm">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default WhyNSTU;
