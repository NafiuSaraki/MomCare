import React, { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill out all fields before submitting.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        setSubmitted(true);
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        setError(data.message || "Something went wrong while sending your message.");
      }
    } catch {
      setError("Could not connect to the server. Please try again later.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-green-50 rounded-lg shadow-md my-12">
      <h1 className="text-4xl font-extrabold text-green-900 mb-8 text-center">
        Contact Us
      </h1>

      {/* Success alert */}
      {submitted && (
        <div className="bg-green-100 border-l-4 border-green-600 text-green-900 px-4 py-3 mb-6 shadow-md text-center text-lg font-bold rounded-md animate-pulse">
          Your message has been sent successfully! Thank you for reaching out.
        </div>
      )}

      {/* Error alert */}
      {error && (
        <div className="bg-red-100 border-l-4 border-red-600 text-red-900 px-4 py-3 mb-6 shadow-md text-center text-lg font-bold rounded-md">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block mb-2 font-semibold text-green-800">
            Your Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter your name"
          />
        </div>

        <div>
          <label htmlFor="email" className="block mb-2 font-semibold text-green-800">
            Your Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label htmlFor="message" className="block mb-2 font-semibold text-green-800">
            Your Message
          </label>
          <textarea
            name="message"
            id="message"
            rows="5"
            value={formData.message}
            onChange={handleChange}
            className="w-full p-3 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Write your message here"
          />
        </div>

        <button
          type="submit"
          className="bg-green-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-800 transition w-full"
        >
          Send Message
        </button>
      </form>
    </div>
  );
}