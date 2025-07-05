// components/Header.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import icon from '../assets/icon.png';

const Header = ({ isDarkMode, setIsDarkMode, currentPage, setCurrentPage }) => {
  const handleLogoClick = () => {
    setCurrentPage('home');
  };

  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`backdrop-blur-lg border-b ${
        isDarkMode 
          ? 'bg-black/40 border-white/10' 
          : 'bg-white/60 border-gray-200/50'
      } sticky top-0 z-20`}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
        <motion.div 
          className="flex items-center gap-2 sm:gap-3 cursor-pointer"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400 }}
          onClick={handleLogoClick}
        >
          <div className={`w-[4rem] rounded-xl ${
            isDarkMode ? 'bg-black/60' : 'bg-white/60'
          }`}>
            <img src={icon} alt="Boliyan Logo" />
          </div>
          <div>
            <h1 className={`text-xl sm:text-2xl font-bold ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Boliyan
            </h1>
            <p className={`text-xs sm:text-sm ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Transliteration made easy!
            </p>
          </div>
        </motion.div>

        <div className="flex items-center gap-2 sm:gap-4">
          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentPage('about')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                currentPage === 'about'
                  ? (isDarkMode ? 'bg-white/20 text-white' : 'bg-black/20 text-black')
                  : (isDarkMode ? 'text-gray-300 hover:text-white hover:bg-white/10' : 'text-gray-700 hover:text-black hover:bg-black/10')
              }`}
            >
              About
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentPage('contact')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                currentPage === 'contact'
                  ? (isDarkMode ? 'bg-white/20 text-white' : 'bg-black/20 text-black')
                  : (isDarkMode ? 'text-gray-300 hover:text-white hover:bg-white/10' : 'text-gray-700 hover:text-black hover:bg-black/10')
              }`}
            >
              Contact
            </motion.button>
          </nav>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <motion.select
              whileHover={{ scale: 1.05 }}
              value={currentPage}
              onChange={(e) => setCurrentPage(e.target.value)}
              className={`px-3 py-2 rounded-lg border-0 outline-none font-medium ${
                isDarkMode 
                  ? 'bg-white/20 text-white' 
                  : 'bg-black/20 text-black'
              }`}
            >
              <option value="home">Home</option>
              <option value="about">About</option>
              <option value="contact">Contact</option>
            </motion.select>
          </div>

          {/* Theme Toggle */}
          <motion.button
            whileHover={{ scale: 1.1, rotate: 180 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`p-2 sm:p-3 rounded-xl transition-colors ${
              isDarkMode 
                ? 'bg-gray-200 text-black hover:bg-white' 
                : 'bg-black text-white hover:bg-gray-700'
            }`}
          >
            {isDarkMode ? <SunIcon className="w-4 h-4 sm:w-5 sm:h-5" /> : <MoonIcon className="w-4 h-4 sm:w-5 sm:h-5" />}
          </motion.button>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;