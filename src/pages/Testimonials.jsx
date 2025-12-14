const testimonials = [
  {
    title: 'Great Work',
    content:
      '“I think Educrat is the best theme I ever seen this year. Amazing design, easy to customize and a design quality superlative account on its cloud platform for the optimized performance”',
    name: 'Courtney Henry',
    role: 'Web Designer',
    image: '',
  },
  {
    title: 'Great Work',
    content:
      '“I think Educrat is the best theme I ever seen this year. Amazing design, easy to customize and a design quality superlative account on its cloud platform for the optimized performance”',
    name: 'Courtney Henry',
    role: 'Web Designer',
    image: '',
  },
  {
    title: 'Great Work',
    content:
      '“I think Educrat is the best theme I ever seen this year. Amazing design, easy to customize and a design quality superlative account on its cloud platform for the optimized performance”',
    name: 'Courtney Henry',
    role: 'Web Designer',
    image: '',
  },
];

export function Testimonials() {
  return (
    <section className="py-20 bg-orange-600 text-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold mb-12 text-left text-white">
          What our Travelers are saying
        </h2>

        {/* Testimonials Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {testimonials.map((t, index) => (
            <div key={index} className="bg-white rounded-lg p-6 shadow-lg">
              <h3 className="text-orange-600 font-semibold mb-2">{t.title}</h3>
              <p className="text-gray-700 mb-4">{t.content}</p>
              <div className="flex items-center gap-4">
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold">{t.name}</p>
                  <p className="text-gray-500 text-sm">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Statistics Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-white text-center">
          <div>
            <h3 className="text-2xl font-bold">4.9</h3>
            <p className="text-sm mt-2">
              1000+ reviews on TripAdvisor. Certificate of Excellence
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-bold">16M</h3>
            <p className="text-sm mt-2">Happy Customers</p>
          </div>
          <div>
            <h3 className="text-2xl font-bold">Award winner</h3>
            <p className="text-sm mt-2">G2’s 2021 Best Software Awards</p>
          </div>
        </div>
      </div>
    </section>
  );
}
