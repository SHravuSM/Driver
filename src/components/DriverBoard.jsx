import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db, auth } from "../firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import VehicleTypeSelector from './VehicleTypeSelector';

const DriverBoard = () => {
    const [driver, setDriver] = useState(null);
    const [rideStatus, setRideStatus] = useState("Waiting for ride...");
    const [currentLocation, setCurrentLocation] = useState('');
    const [vehicleType, setVehicleType] = useState(""); // Store selected vehicle type
    const { SignOut } = useAuth();

    // Fetch driver details from Firestore
    useEffect(() => {
        const fetchDriverDetails = async (user) => {
            const driverRef = doc(db, "drivers", user);
            const driverDoc = await getDoc(driverRef);
            if (driverDoc.exists()) {
                setDriver(driverDoc.data());
            }
        };

        if (auth.currentUser) {
            fetchDriverDetails(auth.currentUser.uid);
        }
    }, []);

    // Reverse geocoding for human-readable location
    const reverseGeocode = async (latitude, longitude) => {
        const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;
        const response = await fetch(url);
        const data = await response.json();
        return data.display_name || "Unknown location";
    };

    // Real-time location tracking
    useEffect(() => {
        const watchId = navigator.geolocation.watchPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                const locationName = await reverseGeocode(latitude, longitude);

                const newLocation = {
                    lat: latitude,
                    lng: longitude,
                    locationName,
                };

                setCurrentLocation(newLocation);

                if (auth.currentUser) {
                    const driverRef = doc(db, "drivers", auth.currentUser.uid);

                    await setDoc(driverRef, { location: newLocation }, { merge: true })
                        .then(() => {
                            console.log("Location updated in Firestore");
                        })
                        .catch((error) => {
                            console.error("Error updating location in Firestore:", error);
                        });
                }
            },
            (error) => {
                console.error("Error fetching location:", error);
            },
            { enableHighAccuracy: true, maximumAge: 0, timeout: 5000 }
        );

        return () => {
            navigator.geolocation.clearWatch(watchId);
        };
    }, []);

    // Ride status handlers
    const handleAcceptRide = () => {
        setRideStatus("On the way...");
        console.log("Ride Accepted!");
    };

    const handleEndRide = () => {
        setRideStatus("Ride Completed!");
        console.log("Ride Completed!");
    };

    return (
        <div className="min-h-screen bg-none bg-transparent relative flex flex-col items-center justify-center p-6">
            {/* Top-right location display with sliding animation */}
            <div className="absolute top-4 right-4 h-12 w-72 md:w-auto text-slate-500 bg-gray-200 p-3 rounded-lg shadow-md text-sm md:text-base overflow-hidden">
                {currentLocation ? (
                    <div className="w-full overflow-hidden">
                        <div
                            className="whitespace-nowrap animate-scroll"
                        >
                            <span className="sm:font-extrabold">{currentLocation.locationName}</span>
                        </div>
                    </div>
                ) : (
                    <p>Fetching location...</p>
                )}
            </div>

            {/* Driver Dashboard Container */}
            <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6">
                {/* Title */}
                <h1 className="text-2xl font-bold text-center text-gray-700 mb-4">
                    Driver Dashboard
                </h1>

                {/* Driver Info Section */}
                {driver ? (
                    <div className="mb-6">
                        <p className="text-lg font-semibold text-gray-800">
                            Hello, {driver.name}!
                        </p>
                        <p className="text-gray-600">Vehicle Type: {driver.vehicleType}</p> {/* Display selected vehicle */}
                    </div>
                ) : (
                    <p className="text-center text-gray-500">Loading your details...</p>
                )}

                {/* Vehicle Type Selector */}
                <div className="mb-6 w-40">
                    <VehicleTypeSelector setVehicleType={setVehicleType} />
                </div>

                {/* Ride Status Section */}
                <div className="bg-gray-100 p-4 rounded-lg shadow-md text-center mb-6">
                    <h3 className="text-lg font-semibold text-gray-800">Ride Status</h3>
                    <p className="text-gray-600">{rideStatus}</p>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-center space-x-4 mb-6">
                    <button
                        className="bg-green-500 hover:bg-green-600 text-white font-medium px-4 py-2 rounded-lg shadow-md transition"
                        onClick={handleAcceptRide}
                    >
                        Accept Ride
                    </button>
                    <button
                        className="bg-red-500 hover:bg-red-600 text-white font-medium px-4 py-2 rounded-lg shadow-md transition"
                        onClick={handleEndRide}
                    >
                        End Ride
                    </button>
                </div>

                {/* Sign Out */}
                <button
                    className="w-full bg-gray-700 hover:bg-gray-800 text-white font-medium py-2 rounded-lg shadow-md transition"
                    onClick={SignOut}
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default DriverBoard;