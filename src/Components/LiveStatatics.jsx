import CountUp from "react-countup";
import { motion } from "framer-motion";

const stats = [
  { id: 1, label: "Total Donors", value: 1250, icon: "🩸" },
  { id: 2, label: "Lives Saved", value: 3800, icon: "❤️" },
  { id: 3, label: "Active Requests", value: 12, icon    : "🚨" },
  { id: 4, label: "NSTU Departments", value: 18, icon: "🎓" },
];

const LiveStatatics = () => {
  return (
    <section className=" py-12">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
          Our Impact at a Glance

        </h2>
      <div className="max-w-6xl mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
        >
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="bg-red-50 rounded-xl py-8 shadow-sm hover:shadow-md transition"
            >
              <div className="text-3xl mb-2">{stat.icon}</div>

              <h3 className="text-4xl font-bold text-red-600">
                <CountUp end={stat.value} duration={2.5} />+
              </h3>

              <p className="mt-2 text-gray-600 font-medium">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default LiveStatatics;
