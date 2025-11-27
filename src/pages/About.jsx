import AboutSection from '../components/AboutSection';
import { SectionTitle } from './../components/SectionTitle';
import FQA from '../../public/FQA.png';
export default function About() {
  return (
    <div className="min-h-screen">
      {/* HERO SECTION */}
      <SectionTitle
        title="About Us"
        description="Discover TraveLease: Your Gateway to Unforgettable Journeys Across Bangladesh"
      />

      <AboutSection />

      {/* TESTIMONIAL SECTION */}
      <section className="py-24 bg-linear-to-r from-emerald-500 to-emerald-700 text-white text-center px-6 my-12 rounded-2xl ">
        <h2 className="text-3xl font-bold mb-6">What customers say</h2>

        <p className="max-w-2xl mx-auto text-lg mb-10">
          “Travelling with TraveLease was the best experience of my life. Safe,
          comfortable, and truly memorable.”
        </p>

        <div className="flex justify-center">
          <div className="bg-white text-gray-700 px-6 py-4 rounded-full shadow-lg flex items-center gap-3">
            <img
              src="https://i.pravatar.cc/80"
              className="w-10 h-10 rounded-full"
              alt="Customer"
            />
            <div>
              <h4 className="font-semibold"></h4>
              <p className="text-sm text-gray-500"></p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ / SERVICE SECTION */}
      <section className="py-20 bg-base-100 rounded-2xl my-12">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl text-emerald-500 font-bold mb-10">
            Full range of travel service
            <span className="w-24 h-1 rounded-full bg-emerald-300 opacity-50"></span>
          </h2>

          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {/* Left FAQ */}
            <div className="space-y-6 text-left">
              <div className="collapse collapse-plus bg-base-200">
                <input type="radio" name="faq" />
                <div className="collapse-title text-lg font-medium">
                  Starts the automated process.
                </div>
                <div className="collapse-content text-gray-600">
                  Everything begins as soon as your booking is confirmed.
                </div>
              </div>

              <div className="collapse collapse-plus bg-base-200">
                <input type="radio" name="faq" />
                <div className="collapse-title text-lg font-medium">
                  The automated process starts.
                </div>
                <div className="collapse-content text-gray-600">
                  Our team prepares your travel experience step by step.
                </div>
              </div>

              <div className="collapse collapse-plus bg-base-200">
                <input type="radio" name="faq" />
                <div className="collapse-title text-lg font-medium">
                  Automated process starts.
                </div>
                <div className="collapse-content text-gray-600">
                  We ensure safe and smooth trips for all travelers.
                </div>
              </div>

              <div className="collapse collapse-plus bg-base-200">
                <input type="radio" name="faq" />
                <div className="collapse-title text-lg font-medium">
                  Process the automated magic.
                </div>
                <div className="collapse-content text-gray-600">
                  Experience Bangladesh like never before.
                </div>
              </div>
            </div>

            {/* Right Illustration */}
            <div className="flex justify-center">
              <img src={FQA} alt="FAQ Illustration" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
