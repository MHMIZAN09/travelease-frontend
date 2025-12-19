import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

const BackToTopProgress = () => {
  const [scrollPercentage, setScrollPercentage] = useState(0);

  // Update scroll progress
  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (scrollTop / docHeight) * 100;
    setScrollPercentage(scrolled);
  };

  // Scroll to top smoothly
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const radius = 24;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (scrollPercentage / 100) * circumference;

  return (
    <div
      onClick={scrollToTop}
      className={`
        fixed bottom-8 right-8 w-16 h-16 cursor-pointer z-50
        rounded-full flex items-center justify-center
        shadow-lg transition-transform duration-300
        ${scrollPercentage > 5 ? 'opacity-100' : 'opacity-0'}
        hover:scale-110
      `}
    >
      <svg width="60" height="60">
        {/* Background circle */}
        <circle
          cx="30"
          cy="30"
          r={radius}
          stroke="#e5e7eb"
          strokeWidth="4"
          fill="transparent"
        />
        {/* Progress circle */}
        <circle
          cx="30"
          cy="30"
          r={radius}
          stroke="#137537"
          strokeWidth="4"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform="rotate(-90 30 30)"
        />
      </svg>
      {/* Center icon */}
      <ArrowUp size={30} className="absolute text-[#137537]" />
    </div>
  );
};

export default BackToTopProgress;
