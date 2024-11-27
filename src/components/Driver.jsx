import React, { useEffect, useState } from 'react';
import DriverBoard from './DriverBoard';
import { collection, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { useAuth } from '../context/AuthContext';

const calculateDistance = (lat1, lng1, lat2, lng2) => {
    const toRad = (value) => (value * Math.PI) / 180;
    const earthRadius = 6371; // Radius of the Earth in kilometers

    const dLat = toRad(lat2 - lat1);
    const dLng = toRad(lng2 - lng1);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return earthRadius * c; // Distance in kilometers
};

export default function Driver() {
    const [isMenuOpen, setIsMenuOpen] = useState(false); // State to control the menu toggle
    const [rideRequests, setRideRequests] = useState([]);
    const [driverLocation, setDriverLocation] = useState(null);
    const { user } = useAuth();
    const driverId = user?.uid; // Replace with the logged-in driver's ID

    useEffect(() => {
        // Real-time listener for ride requests for this driver
        const unsubscribe = onSnapshot(
            collection(db, "rideRequests"),
            (snapshot) => {
                const requests = snapshot.docs
                    .map((doc) => ({ id: doc.id, ...doc.data() }))
                    .filter((request) => request.driverId === driverId && request.status === "pending");

                setRideRequests(requests);
            }
        );

        return () => unsubscribe();
    }, [driverId]);

    useEffect(() => {
        const watchId = navigator.geolocation.watchPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setDriverLocation({ lat: latitude, lng: longitude });
            },
            (error) => console.error("Error fetching location:", error),
            { enableHighAccuracy: true, maximumAge: 0, timeout: 5000 }
        );

        return () => {
            navigator.geolocation.clearWatch(watchId);
        };
    }, []);

    const handleRequest = async (requestId, status) => {
        try {
            const requestDoc = doc(db, "rideRequests", requestId);
            await updateDoc(requestDoc, { status });

            alert(`Request ${status === "accepted" ? "accepted" : "rejected"}`);
        } catch (error) {
            console.error("Error updating request status:", error);
        }
    };

    // Toggle the menu state
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="relative">
            {/* Navbar */}
            <nav className="bg-white text-white p-4 shadow-md">
                <div className="flex items-center justify-between">

                    {/* Hamburger Icon for Mobile */}
                    <div
                        id="hamburger"
                        onClick={toggleMenu}
                        className={`md:hidden cursor-pointer z-20 transition-transform duration-300 ease-in-out ${isMenuOpen ? ' m-2 scale-100' : ' shadow-[1px_1px_1px_red] p-2 rounded-lg scale-100'}`}
                    >
                        <div
                            className={`w-8 h-1 bg-red-500 mb-2 transition-transform duration-300 rounded-md ease-in-out ${isMenuOpen ? '-rotate-45 bg-orange-400 w-4 translate-y-[7px] ' : ''}`}
                        ></div>
                        <div
                            className={`w-8 h-1 bg-slate-200 mb-2 transition-opacity duration-300 rounded-md ease-in-out ${isMenuOpen ? 'ml-1 bg-blue-500 rotate-1 w-7 ' : ''}`}
                        ></div>
                        <div
                            className={`w-8 h-1 bg-green-800 transition-transform duration-300 rounded-md ease-in-out ${isMenuOpen ? 'rotate-45 bg-red-500 w-4 -translate-y-[7px]' : ''}`}
                        ></div>
                    </div>

                    {/* Logo */}
                    <div className="text-xl font-semibold">Vihar Driver</div>

                </div>

                {/* Mobile Menu */}
                <div
                    className={`absolute top-0 left-0 w-full bg-white transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-200 ease-in-out md:hidden`}
                >
                    <DriverBoard />
                </div>
            </nav>

            {/* Main Content */}
            <div className="p-6 space-y-6">
                {/* Hero Section */}
                <div className="bg-gradient-to-r from-blue-500 to-teal-400 p-8 rounded-lg shadow-lg text-white text-center">
                    <h1 className="text-3xl font-semibold">Welcome to the Driver Page</h1>
                    <p className="text-xl mt-2">Manage your rides and monitor your performance effortlessly</p>
                </div>

                {/* Content Cards */}
                {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                        <h2 className="text-xl font-semibold">Your Dashboard</h2>
                        <p className="mt-2 text-gray-600">View your current rides, schedule, and earnings.</p>
                        <button className="mt-4 py-2 px-4 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors duration-200">Go to Dashboard</button>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                        <h2 className="text-xl font-semibold">Settings</h2>
                        <p className="mt-2 text-gray-600">Adjust your preferences and update your account information.</p>
                        <button className="mt-4 py-2 px-4 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors duration-200">Manage Settings</button>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                        <h2 className="text-xl font-semibold">Profile</h2>
                        <p className="mt-2 text-gray-600">Update your profile and driver details.</p>
                        <button className="mt-4 py-2 px-4 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors duration-200">Edit Profile</button>
                    </div> */}


                <div>
                    <h1>Ride Requests</h1>
                    {rideRequests.length > 0 ? (
                        <ul className="space-y-4">
                            {rideRequests.map((request) => {
                                console.log(request);

                                const distance = driverLocation
                                    ? calculateDistance(
                                        driverLocation.lat,
                                        driverLocation.lng,
                                        request.passengerLocation.lat,
                                        request.passengerLocation.lng
                                    ).toFixed(2)
                                    : null;

                                return (
                                    <li key={request.id} className="border p-4 rounded shadow">
                                        <p><strong>Passenger Name:</strong> {request.passengerName || "Unknown"}</p>
                                        <p><strong>Passenger Location:</strong> {request.passengerLocation?.locationName || "Unknown"}</p>
                                        {distance && (
                                            <p><strong>Distance:</strong> {distance} km away</p>
                                        )}
                                        <button
                                            onClick={() => handleRequest(request.id, "accepted")}
                                            className="bg-green-500 text-white py-2 px-4 rounded mt-2"
                                        >
                                            Accept
                                        </button>
                                        <button
                                            onClick={() => handleRequest(request.id, "rejected")}
                                            className="bg-red-500 text-white py-2 px-4 rounded mt-2 ml-2"
                                        >
                                            Reject
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>
                    ) : (
                        <p>No ride requests at the moment.</p>
                    )}
                </div>

            </div>
        </div>
    );
}
