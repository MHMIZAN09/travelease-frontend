export function SectionTitle({ badgeText, title, description }) {
  return (
    <div className="text-center max-w-2xl mx-auto my-12">
      {badgeText && (
        <span className="inline-block mb-4 px-3 py-1 text-sm font-semibold text-emerald-700 bg-emerald-100 rounded-full">
          {badgeText}
        </span>
      )}
      <h2 className="text-3xl font-bold mb-2">{title}</h2>
      {description && <p className="text-gray-600">{description}</p>}
    </div>
  );
}
