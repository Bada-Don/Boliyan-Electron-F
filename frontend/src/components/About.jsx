// components/About.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { 
  SparklesIcon, 
  HeartIcon, 
  GlobeAltIcon, 
  UserGroupIcon,
  LightBulbIcon,
  StarIcon
} from '@heroicons/react/24/outline';

const About = ({ isDarkMode }) => {
  const features = [
    {
      icon: SparklesIcon,
      title: "AI-Powered Transliteration",
      description: "Advanced machine learning algorithms ensure accurate and contextual transliteration across languages."
    },
    {
      icon: HeartIcon,
      title: "Built with Love",
      description: "Created with passion for preserving and bridging languages, making communication effortless."
    },
    {
      icon: GlobeAltIcon,
      title: "Cross-Cultural Bridge",
      description: "Breaking down language barriers to connect people and cultures around the world."
    },
    {
      icon: UserGroupIcon,
      title: "Community Driven",
      description: "Powered by user feedback and contributions to continuously improve accuracy."
    }
  ];

  const stats = [
    { number: "1.8K+", label: "Transliterations" },
    { number: "45%", label: "Accuracy" },
    { number: "3", label: "Languages" },
    { number: "24/7", label: "Available" }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="h-full w-full"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-16 min-h-screen">
        
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center space-y-6"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${
              isDarkMode ? 'bg-white/10 text-white' : 'bg-black/10 text-black'
            }`}
          >
            <LightBulbIcon className="w-5 h-5" />
            <span className="text-sm font-medium">About Boliyan</span>
          </motion.div>
          
          <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-bold ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Bridging Languages,
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
              Connecting Hearts
            </span>
          </h1>
          
          <p className={`text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Boliyan is more than just a transliteration tool—it's a bridge between languages, 
            cultures, and communities. We believe that language should never be a barrier to communication.
          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
              className={`text-center p-6 rounded-2xl ${
                isDarkMode ? 'bg-white/5 border border-white/10' : 'bg-black/5 border border-black/10'
              }`}
            >
              <div className={`text-3xl font-bold ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                {stat.number}
              </div>
              <div className={`text-sm ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Features Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="space-y-8"
        >
          <div className="text-center">
            <h2 className={`text-3xl font-bold ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Why Choose Boliyan?
            </h2>
            <p className={`mt-4 text-lg ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Discover what makes our transliteration platform special
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className={`p-6 rounded-2xl border transition-all ${
                  isDarkMode 
                    ? 'bg-white/5 border-white/10 hover:bg-white/10' 
                    : 'bg-black/5 border-black/10 hover:bg-black/10'
                }`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                  isDarkMode ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-600'
                }`}>
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className={`text-xl font-semibold mb-2 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {feature.title}
                </h3>
                <p className={`${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Mission Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className={`p-8 rounded-2xl text-center ${
            isDarkMode 
              ? 'bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-white/10' 
              : 'bg-gradient-to-r from-blue-50 to-purple-50 border border-gray-200'
          }`}
        >
          <StarIcon className={`w-12 h-12 mx-auto mb-4 ${
            isDarkMode ? 'text-yellow-400' : 'text-yellow-500'
          }`} />
          <h2 className={`text-2xl font-bold mb-4 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Our Mission
          </h2>
          <p className={`text-lg leading-relaxed max-w-2xl mx-auto ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            To make cross-language communication seamless and accessible to everyone. 
            We're committed to preserving linguistic diversity while breaking down communication barriers 
            in our increasingly connected world.
          </p>
        </motion.div>

        {/* Call to Action */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="text-center space-y-4"
        >
          <h3 className={`text-xl font-semibold ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Ready to start transliterating?
          </h3>
          <p className={`${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Join thousands of users who trust Boliyan for their transliteration needs.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default About;