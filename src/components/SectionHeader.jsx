export default function SectionHeader({ title, subtitle }) {
  return (
    <div>
      <section className="bg-linear-to-r from-emerald-600 to-teal-600 text-white py-20 shadow-inner rounded-lg">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">{title}</h1>
          <p className="text-lg max-w-2xl mx-auto text-emerald-100">
            {subtitle}
          </p>
        </div>
      </section>
    </div>
  );
}
