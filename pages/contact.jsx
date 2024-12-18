import Link from 'next/link';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Loader from '@/components/loader';
import { FaCheck } from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [confirmation, setConfirmation] = useState(false);

  const [status, setStatus] = useState('');
  const [loading, setloading] = useState('');

  // Fetch userId from localStorage (if logged in)
  const userId = typeof window !== 'undefined' ? localStorage.getItem('userId') : null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    setloading(true)
    e.preventDefault();

    // Add userId to the form data if it's available
    const dataToSubmit = {
      ...formData,
      userId: userId || null // Include userId, defaulting to null if not found
    };

    // Call API to save the data
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSubmit),
      });

      const result = await res.json();

      if (res.status === 200) {
    setloading(false)

        setStatus('Message sent successfully!');
        setConfirmation(true);

        setTimeout(() => {
          setConfirmation(false);
        }, 2000);
        setFormData({ name: '', email: '', message: '' }); // reset form
      } else {
        setStatus('There was an error submitting your message.');
      }
    } catch (error) {
      console.error('Error:', error);
      setStatus('There was an error submitting your message.');
    }
  };

      if (loading) return <Loader />;

  return (
    <motion.section
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative bg-white "
    >
      <div className="container px-5 py-16 mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-4">
            Get in Touch
          </h1>
          <p className="text-gray-400 text-lg">
            We'd love to hear from you! <br />
            Drop us a message and we’ll get back to you shortly.
          </p>
        </div>

        <div className="max-w-2xl mx-auto bg-gray-900 rounded-lg shadow-lg p-8 border border-gray-700">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-wrap -m-2">
              {/* Name Field */}
              <div className="p-2 w-full sm:w-1/2">
                <div className="relative">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-400"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full mt-2 p-3 bg-gray-800 border border-gray-700 rounded-md text-white focus:ring-gray-500 focus:border-gray-500"
                  />
                </div>
              </div>
              {/* Email Field */}
              <div className="p-2 w-full sm:w-1/2">
                <div className="relative">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-400"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full mt-2 p-3 bg-gray-800 border border-gray-700 rounded-md text-white focus:ring-gray-500 focus:border-gray-500"
                  />
                </div>
              </div>
              {/* Message Field */}
              <div className="p-2 w-full">
                <div className="relative">
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-400"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full mt-2 p-3 bg-gray-800 border border-gray-700 rounded-md text-white focus:ring-gray-500 focus:border-gray-500 h-28 resize-none"
                  ></textarea>
                </div>
              </div>
              {/* Submit Button */}
              <div className="p-2 w-full text-center">
                <button
                  type="submit"
                  className="w-full sm:w-48 bg-white text-black font-semibold py-3 rounded-full shadow-md hover:opacity-90 transition-transform transform active:scale-95"
                >
                  Send Message
                </button>
                {status && (
                  <p className="mt-4 text-center text-gray-400">{status}</p>
                )}
              </div>
            </div>
          </form>
          {/* Contact Info */}
          <div className="mt-8 border-t border-gray-700 pt-8 text-center text-gray-400">
            <a
              href="mailto:tameer2k23@gmail.com"
              className="text-white hover:underline"
            >
              tameer2k23@gmail.com
            </a>
            <p className="mt-4">
              SGC Office S#23, 3rd Floor, Malikabad Centre near 6th Rd, Murree
              Rd, Rawalpindi
            </p>
          </div>
        </div>
      </div>

       {confirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md shadow-lg text-center">
            <div className="flex flex-col justify-center items-center gap-5">
              <div className="bg-green-400  p-6 rounded-full flex items-center justify-center">
                <FaCheck size={25} color="white" className="" />
              </div>
              <div className="flex justify-center gap-3">
                {status}
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.section>
  );
};

export default Contact;
