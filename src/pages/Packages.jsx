import { useEffect, useState } from 'react';
import axios from 'axios';
import PackageCard from '../components/PackageCard';
import { toast } from 'react-toastify';
import { SectionTitle } from '../components/SectionTitle';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useTranslation } from 'react-i18next';

export default function Packages() {
  const { t } = useTranslation();
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedDivisions, setSelectedDivisions] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [durationRange, setDurationRange] = useState([0, 10]);
  const [sortOption, setSortOption] = useState('featured');
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 4;

  useEffect(() => {
    AOS.init({ duration: 800, easing: 'ease-in-out', once: true });
  }, []);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await axios.get(
          'https://travelease-backend.vercel.app/api/packages'
        );
        setPackages(res.data.data || []);
      } catch (error) {
        toast.error(t('fetchPackagesError', { message: error.message }));
      } finally {
        setLoading(false);
      }
    };
    fetchPackages();
  }, [t]);

  const tourTypes = Array.from(
    new Set(packages.map((pkg) => pkg.destination.category))
  );
  const divisions = Array.from(
    new Set(packages.map((pkg) => pkg.destination.division))
  );

  const toggleType = (type) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
    setCurrentPage(1);
  };

  const toggleDivision = (div) => {
    setSelectedDivisions((prev) =>
      prev.includes(div) ? prev.filter((d) => d !== div) : [...prev, div]
    );
    setCurrentPage(1);
  };

  const filteredPackages = packages
    .filter((pkg) => {
      if (
        selectedTypes.length > 0 &&
        !selectedTypes.includes(pkg.destination.category)
      )
        return false;
      if (
        selectedDivisions.length > 0 &&
        !selectedDivisions.includes(pkg.destination.division)
      )
        return false;
      if (pkg.price < priceRange[0] || pkg.price > priceRange[1]) return false;
      if (
        pkg.duration.days < durationRange[0] ||
        pkg.duration.days > durationRange[1]
      )
        return false;
      if (
        searchText &&
        !pkg.title.toLowerCase().includes(searchText.toLowerCase()) &&
        !pkg.destination.name.toLowerCase().includes(searchText.toLowerCase())
      )
        return false;
      return true;
    })
    .sort((a, b) => {
      switch (sortOption) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'duration-asc':
          return a.duration.days - b.duration.days;
        case 'duration-desc':
          return b.duration.days - a.duration.days;
        case 'name-asc':
          return a.title.localeCompare(b.title);
        case 'name-desc':
          return b.title.localeCompare(a.title);
        default:
          return 0;
      }
    });

  const totalPages = Math.ceil(filteredPackages.length / itemsPerPage);
  const paginatedPackages = filteredPackages.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-xl text-orange-500">
          {t('loading')}
        </span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <SectionTitle
          title={t('explorePackagesTitle')}
          description={t('explorePackagesDescription')}
          badgeText={t('packagesTitleBadge')}
        />

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="lg:w-64 bg-white rounded-lg shadow p-6 space-y-6">
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">
                {t('search')}
              </h3>
              <input
                type="text"
                value={searchText}
                onChange={(e) => {
                  setSearchText(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder={t('searchPlaceholder')}
                className="input input-bordered w-full"
              />
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-3">
                {t('tourType')}
              </h3>
              <div className="space-y-2">
                {tourTypes.map((type) => (
                  <label
                    key={type}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedTypes.includes(type)}
                      onChange={() => toggleType(type)}
                      className="checkbox checkbox-sm border-gray-400"
                    />
                    <span className="text-gray-700">{type}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-3">
                {t('division')}
              </h3>
              <div className="space-y-2">
                {divisions.map((div) => (
                  <label
                    key={div}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedDivisions.includes(div)}
                      onChange={() => toggleDivision(div)}
                      className="checkbox checkbox-sm border-gray-400"
                    />
                    <span className="text-gray-700">{div}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-3">
                {t('priceRange')}
              </h3>
              <input
                type="range"
                min="0"
                max="50000"
                value={priceRange[1]}
                onChange={(e) => {
                  setPriceRange([0, Number(e.target.value)]);
                  setCurrentPage(1);
                }}
                className="range range-sm"
              />
              <div className="text-gray-700 mt-1">
                {priceRange[0]} - {priceRange[1]}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-3">
                {t('durationFilter')}
              </h3>
              <input
                type="range"
                min="1"
                max="10"
                value={durationRange[1]}
                onChange={(e) => {
                  setDurationRange([0, Number(e.target.value)]);
                  setCurrentPage(1);
                }}
                className="range range-sm"
              />
              <div className="text-gray-700 mt-1">
                1 - {durationRange[1]} {t('days')}
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-4">
              <p className="text-gray-600">
                {t('results', { count: filteredPackages.length })}
              </p>
              <select
                className="select select-bordered border-gray-300"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="featured">{t('sortFeatured')}</option>
                <option value="price-asc">{t('sortPriceAsc')}</option>
                <option value="price-desc">{t('sortPriceDesc')}</option>
                <option value="duration-asc">{t('sortDurationAsc')}</option>
                <option value="duration-desc">{t('sortDurationDesc')}</option>
                <option value="name-asc">{t('sortNameAsc')}</option>
                <option value="name-desc">{t('sortNameDesc')}</option>
              </select>
            </div>

            <div className="space-y-6">
              {paginatedPackages.length > 0 ? (
                paginatedPackages.map((pkg, index) => (
                  <div
                    key={pkg._id}
                    data-aos="fade-up"
                    data-aos-delay={index * 100}
                  >
                    <PackageCard pkg={pkg} />
                  </div>
                ))
              ) : (
                <p className="text-gray-500">{t('noPackages')}</p>
              )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-6">
                <button
                  className="btn btn-sm"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  {t('prev')}
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      className={`btn btn-sm ${
                        page === currentPage ? 'btn-active' : ''
                      }`}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </button>
                  )
                )}
                <button
                  className="btn btn-sm"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  {t('next')}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
