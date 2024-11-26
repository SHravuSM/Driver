import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db, auth } from "../firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";

const Driver = () => {
    const [driver, setDriver] = useState(null);
    const [loc, setLoc] = useState(null);
    const [rideStatus, setRideStatus] = useState("Waiting for ride...");
    const [currentLocation, setCurrentLocation] = useState(null);
    const { SignOut } = useAuth()
    const Navigate = useNavigate();

    // Get the current driver details from Firestore
    // useEffect(() => {
    //     const fetchDriverDetails = async () => {
    //         const driverRef = doc(db, "drivers", auth.currentUser.uid);
    //         const driverDoc = await getDoc(driverRef);
    //         if (driverDoc.exists()) {
    //             setDriver(driverDoc.data());
    //         } else {
    //             console.log("No such document!");
    //         }
    //     };

    //     if (auth.currentUser) {
    //         fetchDriverDetails();
    //     }
    // }, []);

    const reverseGeocode = async (latitude, longitude) => {
        const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            // Check if the request is successful and results are found
            if (data.error) {
                console.error("Error with Nominatim API:", data.error);
            } else {
                // Display the location name
                const locationName = data.display_name;
                setLoc(locationName)
                console.log("Location Name:", locationName);
            }
        } catch (error) {
            console.error("Error fetching location data:", error);
        }
    };


    useEffect(() => {
        let watchId;
        if (navigator.geolocation) {
            watchId = navigator.geolocation.watchPosition(
                (position) => {
                    console.log(position);
                    console.log(position.coords.latitude);
                    reverseGeocode(position.coords.latitude, position.coords.longitude)
                    console.log(position.coords.longitude);

                    const newLocation = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    };
                    setCurrentLocation(newLocation);

                    // Update Firestore with the new location
                    const updateLocation = async () => {
                        if (auth.currentUser) {
                            const driverRef = doc(db, "drivers", auth.currentUser.uid);
                            await updateDoc(driverRef, { location: newLocation });
                        }
                    };
                    updateLocation();
                },
                (error) => console.error("Error fetching location:", error),
                { enableHighAccuracy: true }
            );
        }

        return () => {
            if (watchId) navigator.geolocation.clearWatch(watchId);
        };
    }, []);


    const handleAcceptRide = () => {
        setRideStatus("On the way...");
        // You could update ride status in Firestore and navigate to the ride details page
        console.log("Ride Accepted!");
    };

    const handleEndRide = () => {
        setRideStatus("Ride Completed!");
        // Here we would update the ride status to 'completed' in Firestore
        console.log("Ride Completed!");
    };


    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
                <h1 className="text-3xl font-bold text-center text-gray-700">Driver Dashboard</h1>
                <p className="text-gray-600 mt-1">
                    Location: {currentLocation ? `${currentLocation.lat.toFixed(4)}, ${currentLocation.lng.toFixed(4)}` : "Fetching..."}
                </p>
                <p>{loc}</p>
                {/* Driver Info Section */}
                <div className="mt-8">
                    {driver ? (
                        <div>
                            <p className="text-xl font-semibold text-gray-800">Hello, {driver.name}!</p>
                            <p className="text-gray-600 mt-2">
                                Vehicle Type: {driver.vehicleType}
                            </p>
                            <p className="text-gray-600 mt-1">
                                Location: {currentLocation ? `${currentLocation.lat.toFixed(4)}, ${currentLocation.lng.toFixed(4)}` : "Fetching..."}
                            </p>
                        </div>
                    ) : (
                        <p>Loading your details...</p>
                    )}
                </div>

                {/* Ride Status Section */}
                <div className="mt-6">
                    <h3 className="text-xl text-gray-800 font-semibold">Current Ride Status</h3>
                    <p className="text-lg text-gray-600 mt-2">{rideStatus}</p>
                </div>

                {/* Buttons */}
                <div className="mt-8 space-x-4 flex justify-center">
                    <button
                        className="bg-green-500 text-white p-3 rounded-full w-32"
                        onClick={handleAcceptRide}
                    >
                        Accept Ride
                    </button>
                    <button
                        className="bg-red-500 text-white p-3 rounded-full w-32"
                        onClick={handleEndRide}
                    >
                        End Ride
                    </button>
                </div>

                {/* Sign Out Button */}
                <div className="mt-6 text-center">
                    <button
                        className="bg-gray-500 text-white p-3 rounded-lg w-full"
                        onClick={SignOut}
                    >
                        Sign Out
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Driver;