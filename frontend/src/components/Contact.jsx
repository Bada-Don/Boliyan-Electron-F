// components/Contact.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  PaperAirplaneIcon,
  HeartIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/outline";

const Contact = ({ isDarkMode }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [showMap, setShowMap] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: '8cf5a3b1-d9bf-4d6f-bb79-7e87f3597514',
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
      // Reset status after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  const handleEmailClick = () => {
    window.open("mailto:harshitashwani@gmail.com", "_blank");
  };

  const handlePhoneClick = () => {
    window.open("https://wa.me/917696513958", "_blank");
  };

  const handleLocationClick = () => {
    setShowMap(!showMap);
  };

  const handleLinkedInClick = () => {
    window.open("https://linkedin.com/in/your-profile", "_blank");
  };

  const contactInfo = [
    {
      icon: EnvelopeIcon,
      title: "Email Us",
      content: "harshitashwani@gmail.com",
      description: "Get in touch for support or inquiries",
      onClick: handleEmailClick,
      clickable: true,
    },
    {
      icon: PhoneIcon,
      title: "Call Us",
      content: "+91 7696513958",
      description: "Available Monday to Friday, 9 AM - 6 PM",
      onClick: handlePhoneClick,
      clickable: true,
    },
    {
      icon: MapPinIcon,
      title: "Visit Us",
      content: "Ropar, Punjab, India",
      description: "Our headquarters in the heart of Punjab",
      onClick: handleLocationClick,
      clickable: true,
    },
  ];

  const features = [
    {
      icon: ChatBubbleLeftRightIcon,
      title: "Quick Response",
      description: "I typically respond within 24 hours",
    },
    {
      icon: HeartIcon,
      title: "Personal Touch",
      description: "Every message is read by myself",
    },
    {
      icon: PaperAirplaneIcon,
      title: "Multiple Channels",
      description: "Reach me through your preferred method",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="h-full w-full"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-12 min-h-screen">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center space-y-4"
        >
          <h1
            className={`text-4xl sm:text-5xl font-bold ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Get in{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
              Touch
            </span>
          </h1>
          <p
            className={`text-lg sm:text-xl max-w-2xl mx-auto ${
              isDarkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Have questions, suggestions, or just want to say hello? We'd love to
            hear from you!
          </p>
        </motion.div>

        {/* Contact Features */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid md:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              className={`text-center p-6 rounded-2xl ${
                isDarkMode
                  ? "bg-white/5 border border-white/10"
                  : "bg-black/5 border border-black/10"
              }`}
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 ${
                  isDarkMode
                    ? "bg-blue-500/20 text-blue-400"
                    : "bg-blue-100 text-blue-600"
                }`}
              >
                <feature.icon className="w-6 h-6" />
              </div>
              <h3
                className={`font-semibold mb-2 ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                {feature.title}
              </h3>
              <p
                className={`text-sm ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="space-y-6"
          >
            <div>
              <h2
                className={`text-2xl font-bold mb-4 ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Contact Information
              </h2>
              <p
                className={`${isDarkMode ? "text-gray-300" : "text-gray-600"}`}
              >
                Choose your preferred way to reach us. We're here to help!
              </p>
            </div>

            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  className={`p-4 rounded-xl border transition-all duration-300 ${
                    info.clickable
                      ? `cursor-pointer hover:scale-105 ${
                          isDarkMode
                            ? "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20"
                            : "bg-black/5 border-black/10 hover:bg-black/10 hover:border-black/20"
                        }`
                      : isDarkMode
                      ? "bg-white/5 border-white/10"
                      : "bg-black/5 border-black/10"
                  }`}
                  onClick={info.onClick}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`p-2 rounded-lg ${
                        isDarkMode
                          ? "bg-blue-500/20 text-blue-400"
                          : "bg-blue-100 text-blue-600"
                      }`}
                    >
                      <info.icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <h3
                        className={`font-semibold ${
                          isDarkMode ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {info.title}
                      </h3>
                      <p
                        className={`text-sm mb-1 ${
                          isDarkMode ? "text-blue-400" : "text-blue-600"
                        }`}
                      >
                        {info.content}
                      </p>
                      <p
                        className={`text-xs ${
                          isDarkMode ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        {info.description}
                      </p>

                      {/* Google Maps Embed for Location */}
                      {info.title === "Visit Us" && showMap && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="mt-4 rounded-lg overflow-hidden"
                        >
                          <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d72060.68736831019!2d76.48346821609512!3d30.962697516540896!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390555b542ad06ab%3A0x6489ccba3c7f2fa7!2sRupnagar%2C%20Punjab%20140001!5e1!3m2!1sen!2sin!4v1751687600984!5m2!1sen!2sin"
                            width="100%"
                            height="200"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="rounded-lg"
                          />
                        
                        </motion.div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social Media Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="space-y-4"
            >
              <h3
                className={`text-lg font-semibold ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Connect with me
              </h3>

              <div className="flex gap-4">
                {/* LinkedIn */}
                <motion.a
                  href="https://www.linkedin.com/in/harshit-singla-7b459522a/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center gap-3 p-4 rounded-xl border transition-all duration-300 cursor-pointer ${
                    isDarkMode
                      ? "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20"
                      : "bg-black/5 border-black/10 hover:bg-black/10 hover:border-black/20"
                  }`}
                >
                  <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </div>
                  <div>
                    <p
                      className={`font-medium ${
                        isDarkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      LinkedIn
                    </p>
                    <p
                      className={`text-sm ${
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      Professional network
                    </p>
                  </div>
                </motion.a>

                {/* GitHub */}
                <motion.a
                  href="https://github.com/Bada-Don/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center gap-3 p-4 rounded-xl border transition-all duration-300 cursor-pointer ${
                    isDarkMode
                      ? "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20"
                      : "bg-black/5 border-black/10 hover:bg-black/10 hover:border-black/20"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      isDarkMode
                        ? "bg-gray-800 text-white"
                        : "bg-gray-900 text-white"
                    }`}
                  >
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  </div>
                  <div>
                    <p
                      className={`font-medium ${
                        isDarkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      GitHub
                    </p>
                    <p
                      className={`text-sm ${
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      View my projects
                    </p>
                  </div>
                </motion.a>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className={`p-6 rounded-2xl border ${
              isDarkMode
                ? "bg-white/5 border-white/10"
                : "bg-black/5 border-black/10"
            }`}
          >
            <h2
              className={`text-2xl font-bold mb-6 ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Send us a Message
            </h2>

            {submitStatus === "success" && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 rounded-lg bg-green-500/20 border border-green-500/30 text-green-400"
              >
                <div className="flex items-center gap-2">
                  <HeartIcon className="w-5 h-5" />
                  <span>
                    Thank you! Your message has been sent successfully. I'll get back to you soon!
                  </span>
                </div>
              </motion.div>
            )}

            {submitStatus === "error" && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 rounded-lg bg-red-500/20 border border-red-500/30 text-red-400"
              >
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>
                    Sorry! There was an error sending your message. Please try again or contact me directly via email.
                  </span>
                </div>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-4 py-3 rounded-lg border-0 outline-none transition-all ${
                      isDarkMode
                        ? "bg-white/10 text-white placeholder-gray-400 focus:bg-white/20"
                        : "bg-black/10 text-black placeholder-gray-500 focus:bg-black/20"
                    }`}
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-4 py-3 rounded-lg border-0 outline-none transition-all ${
                      isDarkMode
                        ? "bg-white/10 text-white placeholder-gray-400 focus:bg-white/20"
                        : "bg-black/10 text-black placeholder-gray-500 focus:bg-black/20"
                    }`}
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className={`w-full px-4 py-3 rounded-lg border-0 outline-none transition-all ${
                    isDarkMode
                      ? "bg-white/10 text-white placeholder-gray-400 focus:bg-white/20"
                      : "bg-black/10 text-black placeholder-gray-500 focus:bg-black/20"
                  }`}
                  placeholder="What's this about?"
                />
              </div>

              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className={`w-full px-4 py-3 rounded-lg border-0 outline-none transition-all resize-none ${
                    isDarkMode
                      ? "bg-white/10 text-white placeholder-gray-400 focus:bg-white/20"
                      : "bg-black/10 text-black placeholder-gray-500 focus:bg-black/20"
                  }`}
                  placeholder="Tell us what's on your mind..."
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-3 px-6 rounded-lg font-medium flex items-center justify-center gap-2 transition-all ${
                  isSubmitting
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
                }`}
              >
                {isSubmitting ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                    />
                    Sending...
                  </>
                ) : (
                  <>
                    <PaperAirplaneIcon className="w-5 h-5" />
                    Send Message
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className={`text-center p-6 rounded-2xl ${
            isDarkMode
              ? "bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-white/10"
              : "bg-gradient-to-r from-blue-50 to-purple-50 border border-gray-200"
          }`}
        >
          <HeartIcon
            className={`w-8 h-8 mx-auto mb-3 ${
              isDarkMode ? "text-red-400" : "text-red-500"
            }`}
          />
          <h3
            className={`text-lg font-semibold mb-2 ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            We Value Your Feedback
          </h3>
          <p className={`${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
            Your suggestions help us improve Boliyan for everyone. Whether it's
            a bug report, feature request, or just a friendly hello, we
            appreciate every message!
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Contact;