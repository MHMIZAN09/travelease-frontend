export default function About() {
  const stats = [
    { value: '15K+', label: 'Happy Travelers' },
    { value: '64+', label: 'Districts Covered' },
    { value: '200+', label: 'Tour Packages' },
    { value: '10+', label: 'Years Experience' },
  ];

  const values = [
    {
      icon: '❤️',
      title: 'Love for Bangladesh',
      description: "Showcasing Bangladesh's beauty & heritage with passion.",
    },
    {
      icon: '🏆',
      title: 'Quality Service',
      description: 'Delivering world-class, professional travel experiences.',
    },
    {
      icon: '👥',
      title: 'Customer First',
      description: 'Your comfort, safety, and happiness comes first.',
    },
    {
      icon: '🌍',
      title: 'Local Expertise',
      description: 'Guided by locals with deep knowledge of every region.',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* HERO SECTION */}
      <section className="relative h-[380px] flex items-center justify-center">
        <img
          src="https://images.unsplash.com/photo-1658139657766-3ba1adc5a010?w=1200"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative text-center text-white px-4">
          <div className="badge badge-outline text-white mb-4">
            About TraveLease
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-3">
            Discover Bangladesh With Us
          </h1>
          <p className="text-lg max-w-2xl mx-auto">
            Since 2014, TraveLease has helped travelers explore the hidden gems
            of Bangladesh.
          </p>
        </div>
      </section>

      {/* STATS */}
      <section className="py-16 bg-base-100">
        <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <p className="text-3xl font-bold text-primary">{stat.value}</p>
              <p className="text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* STORY */}
      <section className="py-20 bg-base-200">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="text-3xl font-bold mb-6">Our Story</h2>
          <p className="text-gray-600 mb-4">
            TraveLease began its journey in 2014 with a simple yet powerful
            mission: to make the breathtaking beauty and rich cultural heritage
            of Bangladesh accessible to every traveler. What started as a small
            tour service in Dhaka has now grown into one of Bangladesh’s most
            trusted and loved travel companies.
          </p>
          <p className="text-gray-600 mb-4">
            From the world’s longest sandy coastline in Cox’s Bazar, to the
            mystical Sundarbans mangrove forest, from Sylhet’s emerald tea
            gardens to the scenic hills of Bandarban — our team has explored
            every corner of the country to craft authentic, memorable, and
            meaningful travel experiences.
          </p>
          <p className="text-gray-600">
            We take pride in being a Bangladeshi-born travel company, run
            entirely by passionate locals who deeply love this land. Many of our
            expert guides come from the regions they operate in, giving you
            insider knowledge, real stories, and genuine hospitality that make
            every TraveLease journey truly special.
          </p>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="py-20 bg-base-100">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-10 max-w-4xl">
          <div className="card bg-base-200 shadow-lg">
            <div className="card-body text-center">
              <div className="mx-auto text-5xl mb-3">🎯</div>
              <h3 className="text-2xl font-semibold mb-3">Our Mission</h3>
              <p className="text-gray-600">
                Promote sustainable tourism while uplifting local communities
                and preserving heritage.
              </p>
            </div>
          </div>

          <div className="card bg-base-200 shadow-lg">
            <div className="card-body text-center">
              <div className="mx-auto text-5xl mb-3">👁️</div>
              <h3 className="text-2xl font-semibold mb-3">Our Vision</h3>
              <p className="text-gray-600">
                To become Bangladesh’s most trusted tourism company known for
                authentic experiences.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="py-20 bg-base-200">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-3xl font-bold mb-6">
            Our Core Values
          </h2>
          <p className="text-center text-gray-600 mb-12">
            The principles that guide every journey we create
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10 max-w-5xl mx-auto">
            {values.map((value, i) => (
              <div
                key={i}
                className="card bg-base-100 shadow-xl border border-transparent hover:border-primary/40 
                     transition-all duration-300 hover:shadow-2xl group"
              >
                {/* Gradient top border */}
                <div className="h-1 w-full bg-linear-to-r from-primary to-secondary rounded-t-xl"></div>

                <div className="card-body text-center">
                  {/* Icon with glow */}
                  <div
                    className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300 
                            drop-shadow-[0_0_10px_rgba(0,0,0,0.15)]"
                  >
                    {value.icon}
                  </div>

                  <h3 className="text-2xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    {value.title}
                  </h3>

                  <p className="text-gray-600 text-sm leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="py-20 bg-base-100">
        <div className="container mx-auto px-4 text-center mb-10">
          <h2 className="text-3xl font-bold mb-3">Meet Our Team</h2>
          <p className="text-gray-600">
            Passionate individuals dedicated to showing the best of Bangladesh.
          </p>
        </div>

        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4"></div>
      </section>

      {/* CERTIFICATIONS */}
      <section className="py-16 bg-base-200">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-3xl font-bold mb-6">Licensed & Certified</h2>
          <p className="text-gray-600 mb-8">
            TraveLease is registered with Bangladesh Tourism Board and follows
            all safety regulations.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <div className="badge badge-lg badge-primary badge-outline px-4 py-3">
              Tourism Board Registered
            </div>
            <div className="badge badge-lg badge-info badge-outline px-4 py-3">
              IATA Approved
            </div>
            <div className="badge badge-lg badge-accent badge-outline px-4 py-3">
              ISO 9001:2015 Certified
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
