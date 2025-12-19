import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DestinationCard from '../components/DestinationCard';
import PackageCard from '../components/PackageCard';
import { toast } from 'react-toastify';
import { SectionTitle } from '../components/SectionTitle';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useTranslation } from 'react-i18next';

export default function Destinations() {
  const { t } = useTranslation();

  const [destinations, setDestinations] = useState([]);
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDestination, setSelectedDestination] = useState(null);

  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedDivisions, setSelectedDivisions] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [durationRange, setDurationRange] = useState([0, 10]);
  const [sortOption, setSortOption] = useState('featured');

  useEffect(() => {
    AOS.init({ duration: 800, easing: 'ease-in-out', once: true });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [destRes, pkgRes] = await Promise.all([
          axios.get('https://travelease-backend.vercel.app/api/destinations'),
          axios.get('https://travelease-backend.vercel.app/api/packages'),
        ]);
        setDestinations(destRes.data.data || []);
        setPackages(pkgRes.data.data || []);
      } catch (error) {
        toast.error('Failed to fetch data');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-spinner loading-xl text-orange-500"></span>
      </div>
    );
  }

  const divisions = Array.from(
    new Set(packages.map((pkg) => pkg.destination.division))
  );

  const tourTypes = Array.from(
    new Set(packages.map((pkg) => pkg.destination.category))
  );

  const filteredPackages = selectedDestination
    ? packages
        .filter((pkg) => pkg.destination.name === selectedDestination.name)
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
          if (pkg.price < priceRange[0] || pkg.price > priceRange[1])
            return false;
          if (
            pkg.duration.days < durationRange[0] ||
            pkg.duration.days > durationRange[1]
          )
            return false;
          if (
            searchText &&
            !pkg.title.toLowerCase().includes(searchText.toLowerCase()) &&
            !pkg.destination.name
              .toLowerCase()
              .includes(searchText.toLowerCase())
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
        })
    : [];

  return (
    <div className="min-h-screen p-6">
      <SectionTitle
        badgeText={t('exploreBadge')}
        title={t('ourDestinations')}
        description={
          selectedDestination
            ? t('packagesIn', { name: selectedDestination.name })
            : t('clickDestination')
        }
      />

      {!selectedDestination && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {destinations.map((destination, index) => (
            <div
              key={index}
              onClick={() => setSelectedDestination(destination)}
              className="cursor-pointer"
            >
              <DestinationCard
                destination={destination}
                packageCount={
                  packages.filter(
                    (pkg) => pkg.destination.name === destination.name
                  ).length
                }
              />
            </div>
          ))}
        </div>
      )}

      {selectedDestination && (
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-64 bg-white rounded-lg shadow p-6 space-y-6">
            <button
              className="mb-4 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600"
              onClick={() => setSelectedDestination(null)}
            >
              {t('backToDestinations')}
            </button>

            <div>
              <h3 className="font-semibold text-gray-800 mb-3">
                {t('search')}
              </h3>
              <input
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder={t('searchPackagesPlaceholder')}
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
                      onChange={() =>
                        setSelectedTypes((prev) =>
                          prev.includes(type)
                            ? prev.filter((t) => t !== type)
                            : [...prev, type]
                        )
                      }
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
                      onChange={() =>
                        setSelectedDivisions((prev) =>
                          prev.includes(div)
                            ? prev.filter((d) => d !== div)
                            : [...prev, div]
                        )
                      }
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
                onChange={(e) => setPriceRange([0, Number(e.target.value)])}
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
                onChange={(e) => setDurationRange([0, Number(e.target.value)])}
                className="range range-sm"
              />
              <div className="text-gray-700 mt-1">
                1 - {durationRange[1]} days
              </div>
            </div>
          </aside>

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
              {filteredPackages.length > 0 ? (
                filteredPackages.map((pkg, idx) => (
                  <div
                    key={pkg._id}
                    data-aos="fade-up"
                    data-aos-delay={idx * 100}
                  >
                    <PackageCard pkg={pkg} />
                  </div>
                ))
              ) : (
                <p className="text-gray-500">{t('noPackages')}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
