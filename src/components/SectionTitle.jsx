export function SectionTitle({ badgeText, title, description }) {
  return (
    <div className="text-center max-w-3xl mx-auto my-16 px-4">
      {badgeText && (
        <span className="inline-block mb-4 px-4 py-1 text-sm font-semibold text-emerald-800 bg-emerald-100 rounded-full shadow-md uppercase tracking-wide">
          {badgeText}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl font-extrabold mb-4 bg-clip-text text-transparent bg-linear-to-r from-emerald-600 to-teal-500">
        {title}
      </h2>
      {description && (
        <>
          <p className="text-gray-600 text-base md:text-lg mb-6">
            {description}
          </p>
          <div className="flex justify-center">
            <span className="w-24 h-1 rounded-full bg-emerald-300 opacity-50"></span>
          </div>
        </>
      )}
    </div>
  );
}
