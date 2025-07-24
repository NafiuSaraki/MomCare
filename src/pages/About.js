import React from "react";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-green-50 rounded-lg shadow-md my-12">
      <h1 className="text-4xl font-extrabold text-green-900 mb-8 text-center">
        About MumCare
      </h1>

      <p className="text-lg text-green-800 mb-6 leading-relaxed">
        MumCare is a maternal and child health app designed to support pregnant women and new mothers. The app provides reliable health information in both English and Hausa, using verified resources from trusted organizations like the <strong>World Health Organization (WHO)</strong> and <strong>UNICEF</strong> to promote the health and well-being of mothers and babies.
      </p>

      <h2 className="text-2xl font-semibold text-green-900 mb-4">
        Our Mission
      </h2>
      <p className="text-green-800 mb-6 leading-relaxed">
        MumCare’s mission is to simplify access to accurate health information for pregnant women by offering modern care tips and guidance. The goal is to reduce maternal and infant mortality rates, especially in underserved communities.
      </p>

      <h2 className="text-2xl font-semibold text-green-900 mb-4">
        Information Sources
      </h2>
      <p className="text-green-800 mb-6 leading-relaxed">
        This app is built using expert-reviewed content from <strong>WHO</strong> and <strong>UNICEF</strong>. This ensures that all information provided is credible, relevant, and evidence-based.
      </p>

      <h2 className="text-2xl font-semibold text-green-900 mb-4">
        3MTT Knowledge Showcase
      </h2>
      <p className="text-green-800 mb-6 leading-relaxed">
        MumCare is part of the <strong>3MTT Software Development Track</strong>, where participants were trained to use modern technology to solve real-life problems in society through innovation and creativity.
      </p>

      <h2 className="text-2xl font-semibold text-green-900 mb-4">
        About the Developer
      </h2>
      <p className="text-green-800 mb-6 leading-relaxed">
        The app was developed by <strong>Nafiu Baba Saraki</strong>, a 3MTT participant, with the aim of empowering pregnant women through easy-to-understand, localized health education in Hausa and English.
      </p>

      <p className="text-green-800 leading-relaxed text-center mb-6">
        For more information, contact us via email:{" "}
        <a
          href="mailto:babanafiusaraki@gmail.com"
          className="text-green-700 underline hover:text-green-900"
        >
          babanafiusaraki@gmail.com
        </a>
      </p>

      <div className="flex justify-center">
        <Link
          to="/contact"
          className="bg-green-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-800 transition"
        >
          Contact Us
        </Link>
      </div>
    </div>
  );
}