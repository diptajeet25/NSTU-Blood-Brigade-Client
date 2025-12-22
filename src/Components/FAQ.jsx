import React from "react";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "Is donating blood safe?",
    a: "Yes. Blood donation is completely safe when done following proper medical guidelines.",
  },
  {
    q: "How often can I donate blood?",
    a: "A healthy person can donate whole blood every 3 months.",
  },
  {
    q: "Who can become a donor?",
    a: "Anyone aged 18–60, in good health, and meeting basic eligibility criteria can donate blood.",
  },
  {
    q: "Is this service free?",
    a: "Yes. NSTU Blood Brigade is a 100% non-profit, volunteer-run initiative.",
  },
  {
    q: "How fast can I get a donor in an emergency?",
    a: "In most cases, donors are connected within minutes, depending on availability.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-white py-20">
      <div className="max-w-4xl mx-auto px-6">

        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-gray-900">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-gray-600">
            Answers to common questions about blood donation and our process.
          </p>
        </div>

        <div className="space-y-4 text-lg">
          {faqs.map((item, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg"
            >
              <button
                onClick={() => toggle(index)}
                className="w-full flex justify-between items-center p-5 text-left"
              >
                <span className="font-medium text-gray-900">
                  {item.q}
                </span>
                <ChevronDown
                  className={`w-5 h-5 transition ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              {openIndex === index && (
                <div className="px-5 pb-5 text-gray-600 text-sm">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FAQ;
