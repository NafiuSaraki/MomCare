import React from "react";
import { useNavigate } from "react-router-dom";
import heroImage from "../assets/momcare.png";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="bg-green-50 min-h-screen flex flex-col md:flex-row items-center md:items-start p-6 md:p-16 pt-20 md:pt-24">
      <div className="flex-1 text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-extrabold text-green-800 leading-tight">
          MomCare
        </h1>
        <p className="mt-6 text-lg md:text-xl text-green-700 max-w-md mx-auto md:mx-0">
          Caring for mother and baby’s health made easy! Information to support pregnant women.
        </p>
        <div className="mt-8 flex justify-center md:justify-start gap-4">
          <button
            onClick={() => navigate("/register")}
            className="bg-green-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-800 transition"
          >
            Get Started
          </button>
          <button
            onClick={() => navigate("/about")}
            className="bg-white text-green-700 border border-green-700 px-6 py-3 rounded-lg font-semibold hover:bg-green-100 transition"
          >
            Learn More
          </button>
        </div>
      </div>

      {/* Right image */}
      <div className="flex-1 mt-10 md:mt-0 flex justify-center">
        <img
          src={heroImage}
          alt="UwaLafiya Hero"
          className="max-w-full max-h-96 rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
}
