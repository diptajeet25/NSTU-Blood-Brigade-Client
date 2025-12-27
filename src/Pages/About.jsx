import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const About = () => {
  return (
    <>
      <title>About | NSTU Blood Brigade</title>
      <Navbar />

      <section className="relative overflow-hidden bg-gradient-to-br from-[#ea2121] via-red-600 to-rose-600">
        <div className="absolute inset-0  bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.15),transparent_60%)]"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-36 text-center text-white">
          <h1 className="text-5xl md:text-7xl text-white font-extrabold tracking-tight">
            NSTU Blood Brigade
          </h1>
          <p className="mt-8 text-xl md:text-2xl max-w-4xl mx-auto text-white">
            A student-powered humanitarian initiative ensuring that no life is
            lost due to the absence of blood in moments of crisis.
          </p>
        </div>
      </section>

      <main className="bg-[#fafafa]">
        <div className="max-w-7xl mx-auto px-6 py-28 space-y-28">

          <section className="grid md:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                Born From Responsibility,
                <br /> Driven By Humanity
              </h2>
              <p className="mt-8 text-lg text-gray-600 leading-relaxed">
                NSTU Blood Brigade was founded by students of Noakhali Science and
                Technology University who believed that access to blood should
                never be uncertain during emergencies.
              </p>
              <p className="mt-5 text-lg text-gray-600 leading-relaxed">
                What started as a small student initiative is growing into a
                trusted, verified, and rapid-response donor network built on
                compassion, accountability, and action.
              </p>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-red-200 to-rose-100 blur-3xl opacity-60"></div>
              <div className="relative bg-white/70 backdrop-blur-xl rounded-3xl p-14 border border-white shadow-2xl">
                <h3 className="text-2xl font-semibold text-gray-900 mb-5">
                  Our Mission
                </h3>
                <p className="text-gray-700 leading-relaxed text-lg">
                  To reduce emergency response time, promote voluntary blood
                  donation among students, and establish a dependable donor
                  ecosystem where help is always available when lives are at
                  stake.
                </p>
              </div>
            </div>
          </section>

      
          <section className="grid grid-cols-2 md:grid-cols-4 gap-10">
            {[
              ["100+", "Verified Donors"],
              ["24/7", "Emergency Availability"],
              ["Fast", "Response System"],
              ["100%", "Non-Profit Initiative"],
            ].map(([value, label]) => (
              <div
                key={label}
                className="group bg-red-50 rounded-3xl p-10 text-center shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <h3 className="text-4xl font-extrabold text-red-600 group-hover:scale-110 transition">
                  {value}
                </h3>
                <p className="mt-4 text-gray-600 text-lg">{label}</p>
              </div>
            ))}
          </section>
          <section>
            <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-12">
              What Defines Us
            </h2>

            <div className="grid md:grid-cols-4 gap-12">
              {[
                ["Transparency", "Clear, accountable, and ethical operations."],
                ["Trust", "Manually verified and responsible donors."],
                ["Urgency", "Built for moments where every second matters."],
                ["Humanity", "Compassion above convenience or recognition."],
              ].map(([title, desc]) => (
                <div
                  key={title}
                  className="bg-red-50 rounded-3xl p-10 shadow-xl hover:-translate-y-2 transition-all duration-300"
                >
                  <h3 className="text-xl font-semibold text-red-600 mb-3">
                    {title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* FINAL MESSAGE */}
          <section className="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-red-600 to-rose-600 text-white">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(255,255,255,0.2),_transparent_60%)]"></div>
            <div className="relative px-10 py-24 text-center">
              <p className="text-3xl md:text-4xl font-semibold">
                Every blood donor is a silent hero.
              </p>
              <p className="mt-6 max-w-4xl mx-auto text-xl text-red-100">
                NSTU Blood Brigade stands for responsibility, urgency, and hope —
                because saving a life should never depend on chance.
              </p>
            </div>
          </section>

        </div>
      </main>

      <Footer />
    </>
  );
};

export default About;
