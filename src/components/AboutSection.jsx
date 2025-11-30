import AboutUs from '../../public/about.png';

const AboutSection = ({ title }) => {
  return (
    <section className="py-20 bg-base-100 rounded-2xl">
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-10">
        {/* Illustration */}
        <div className="flex justify-center">
          <img src={AboutUs} alt="Travelers Illustration" />
        </div>

        {/* Text Content */}
        <div className="flex flex-col justify-center w-full px-4 md:px-10 text-start">
          <h1 className="text-xl font-bold mb-4 ">{title}</h1>
          <h2 className="text-3xl md:text-4xl font-bold leading-snug mb-4 text-emerald-500">
            Get ready for real time adventure
          </h2>

          <p className="text-gray-600 mb-4 text-lg">
            Start your journey with TraveLease — where adventure meets comfort.
            We deliver guided tours, custom packages, and unforgettable travel
            experiences across Bangladesh.
          </p>

          <button className="btn bg-emerald-500 text-white hover:bg-emerald-600 w-max">
            Book Your Destination
          </button>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
