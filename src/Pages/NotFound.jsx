import { Link } from "react-router";
import { Droplet, HeartPulse } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-white to-red-100 px-4">
      <div className="text-center max-w-xl">
        
        <div className="flex justify-center mb-6">
          <div className="relative">
            <Droplet className="w-24 h-24 text-red-500 animate-pulse" />
            <HeartPulse className="w-10 h-10 text-red-600 absolute -bottom-2 -right-2" />
          </div>
        </div>

        <h1 className="text-6xl font-extrabold text-red-600 mb-2">404</h1>

        <h2 className="text-2xl font-semibold text-gray-800 mb-3">
          পথটা হারিয়ে গেছে 💔
        </h2>

        <p className="text-gray-600 mb-6 leading-relaxed">
          যেই পেজটি খুঁজছিলে, সেটা এখানে নেই।  
          কিন্তু একজন মানুষের জীবন বাঁচানোর পথ এখনো খোলা আছে।
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="px-6 py-3 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 transition"
          >
            🏠 হোমে ফিরে যাও
          </Link>

          <Link
            to="/donors"
            className="px-6 py-3 rounded-lg border border-red-600 text-red-600 font-medium hover:bg-red-50 transition"
          >
            🩸 ডোনার খুঁজুন
          </Link>
        </div>

        <p className="mt-8 text-sm text-gray-400">
          NSTU Blood Brigade — Donate Blood, Save Life
        </p>
      </div>
    </div>
  );
};

export default NotFound;
