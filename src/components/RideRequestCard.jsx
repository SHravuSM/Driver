import React from "react";
import { FaMapMarkerAlt, FaUser } from "react-icons/fa";

const RideRequestCard = ({
  request,
  driverLocation,
  handleRequest,
  calculateDistance,
}) => {
  const distance = driverLocation
    ? calculateDistance(
        driverLocation.lat,
        driverLocation.lng,
        request.passengerLocation.lat,
        request.passengerLocation.lng
      ).toFixed(2)
    : null;

  return (
    <li className="relative bg-gradient-to-br from-white to-gray-100 border border-gray-300 rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 overflow-hidden">
      {/* Decorative Accent */}
      <div className="absolute -top-6 -right-6 w-20 h-20 bg-blue-500 rounded-full opacity-20 blur-lg"></div>
      <div className="absolute -bottom-6 -left-6 w-28 h-28 bg-teal-400 rounded-full opacity-20 blur-lg"></div>

      {/* Header */}
      <div className="relative z-10 flex justify-between items-center mb-4">
        <h3 className="text-2xl font-bold text-gray-800">Ride Request</h3>
        <span className="bg-indigo-100 text-indigo-600 text-sm font-medium px-4 py-1 rounded-full shadow-md">
          {distance ? `${distance} km away` : "Distance unknown"}
        </span>
      </div>

      {/* Passenger Information */}
      <div className="relative z-10 space-y-3">
        <div className="flex items-center text-gray-700">
          <FaUser className="text-indigo-500 mr-2" />
          <span className="font-semibold text-gray-800">Passenger:</span>
          <span className="ml-2 text-gray-900">{request.passengerName || "Unknown"}</span>
        </div>
        <div className="flex items-center text-gray-700">
          <FaMapMarkerAlt className="text-indigo-500 mr-2 text-xl" />
          <span className="font-semibold text-gray-800">Location:</span>
          <span className="ml-2">
            {request.passengerLocation?.locationName || "Unknown"}
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="relative z-10 mt-6 flex justify-between items-center">
        <button
          onClick={() => handleRequest(request.id, "accepted")}
          className="flex-1 bg-green-500 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-green-600 hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-300 focus:ring-offset-2 mr-3"
        >
          Pick Up
        </button>
        <button
          onClick={() => handleRequest(request.id, "rejected")}
          className="flex-1 bg-red-500 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-red-600 hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-300 focus:ring-offset-2"
        >
          Sorry
        </button>
      </div>
    </li>
  );
};

export default RideRequestCard;
