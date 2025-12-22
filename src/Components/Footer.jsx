import { Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">

        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            NSTU Blood Brigade
          </h3>
          <p className="text-sm leading-relaxed">
            A student-led, non-profit initiative dedicated to connecting blood
            donors with patients in emergency situations.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer">Home</li>
            <li className="hover:text-white cursor-pointer">Find Blood</li>
            <li className="hover:text-white cursor-pointer">Become a Donor</li>
            <li className="hover:text-white cursor-pointer">Emergency Request</li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Emergency Contact
          </h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <Phone size={16} /> +880 1XXXXXXXXX
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} /> support@nstubloodbrigade.org
            </li>
            <li className="flex items-center gap-2">
              <MapPin size={16} /> Noakhali Science & Technology University
            </li>
          </ul>
        </div>

        {/* Call to Action */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Be a Hero Today
          </h3>
          <p className="text-sm mb-4">
            One donation can save up to three lives.
          </p>
          <button className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-md text-sm font-semibold transition">
            Become a Donor
          </button>
        </div>

      </div>

      <div className="border-t border-gray-800 py-4 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} NSTU Blood Brigade. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
