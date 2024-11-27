import React, { useState } from "react";
import { auth, db } from "../firebaseConfig";
import RIKSHA from '../images/rickshaw.png';
import CAR from '../images/car.png';
import BIKE from '../images/motorcycle.png';
import SCOOTER from '../images/scooter.png';
import { doc, setDoc } from "firebase/firestore";

const VehicleTypeSelector = () => {
    const [selectedVehicle, setSelectedVehicle] = useState(""); // State for selected vehicle
    const [isOpen, setIsOpen] = useState(false); // State to control dropdown visibility

    // Toggle the dropdown visibility
    const toggleDropdown = () => {
        setIsOpen((prev) => !prev);
    };

    // Handle vehicle selection
    const handleSelect = async (vehicle) => {
        setSelectedVehicle(vehicle);
        if (auth.currentUser) {
            const driverRef = doc(db, "drivers", auth.currentUser.uid);
            await setDoc(driverRef, { vehicleType: vehicle }, { merge: true })
                .then(() => {
                    console.log("Location updated in Firestore");
                })
                .catch((error) => {
                    console.error("Error updating location in Firestore:", error);
                });
        }
        setIsOpen(false); // Close dropdown after selection
    };

    return (
        <div className="w-full max-w-sm mx-auto mt-8">
            {/* Dropdown */}
            <div className="relative">
                <button
                    onClick={toggleDropdown}
                    className="w-full bg-gray-800 text-white py-3 rounded-lg flex justify-between items-center px-4 shadow-lg hover:bg-gray-700 transition"
                >
                    <span className="text-sm">
                        {selectedVehicle || "Change Vehicle"}
                    </span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-5 w-5 text-white transform transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 9l-7 7-7-7"
                        />
                    </svg>
                </button>

                {/* Dropdown Menu */}
                {isOpen && (
                    <div className="absolute left-0 w-full mt-2 bg-white shadow-lg rounded-lg z-10">
                        <div className="flex flex-col">
                            <button
                                className="flex items-center w-full px-4 py-3 hover:bg-gray-100 text-gray-800 transition"
                                onClick={() => handleSelect("Auto")}
                            >
                                <img className="mr-4 h-5" src={RIKSHA} alt="Auto" />
                                Auto
                            </button>
                            <button
                                className="flex items-center w-full px-4 py-3 hover:bg-gray-100 text-gray-800 transition"
                                onClick={() => handleSelect("Car")}
                            >
                                <img className="mr-4 h-6" src={CAR} alt="Car" />
                                Car
                            </button>
                            <button
                                className="flex items-center w-full px-4 py-3 hover:bg-gray-100 text-gray-800 transition"
                                onClick={() => handleSelect("Bike")}
                            >
                                <img className="mr-4 h-5" src={BIKE} alt="Bike" />
                                Bike
                            </button>
                            <button
                                className="flex items-center w-full px-4 py-3 hover:bg-gray-100 text-gray-800 transition"
                                onClick={() => handleSelect("Scooter")}
                            >
                                <img className="mr-4 h-5" src={SCOOTER} alt="Scooter" />
                                Scooter
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default VehicleTypeSelector;
