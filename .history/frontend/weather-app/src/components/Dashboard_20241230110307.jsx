import { useState, useEffect } from "react";
// import axios from "axios";
import Weather from "./weather";

const Dashboard = () => {
    const [coordinates, setCoordinates] = useState({ lat: null, lon: null });
    const [error, setError] = useState(null);

    // Fetch user's geolocation coordinates
    useEffect(() => {
        const fetchUserLocation = async () => {
            try {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(
                        (position) => {
                            setCoordinates({
                                lat: position.coords.latitude,
                                lon: position.coords.longitude,
                            });
                        },
                        (err) => {
                            console.error("Error getting location:", err.message);
                            setError("Failed to get user location. Please enable location services.");
                        }
                    );
                } else {
                    setError("Geolocation is not supported by this browser.");
                }
            } catch (err) {
                console.error("Error fetching geolocation:", err);
                setError("Failed to fetch geolocation.");
            }
        };

        fetchUserLocation();
    }, []);

    return (
        <div className="m-10 p-6 bg-gray-100 rounded-md shadow-md">
            {/* Weather and Dashboard Header Section */}
            <div className="mb-6 flex justify-center">
                <h2 className="text-3xl flex justify-center font-bold text-center mb-4">Weather and News Dashboard</h2>
                {error && <p className="text-center text-red-500">{error}</p>}
            </div>

            {/* Weather Card */}
            <div className="flex justify-center">
                {coordinates.lat && coordinates.lon ? (
                    <Weather coordinates={coordinates} />
                ) : (
                    !error && <p>Loading location...</p>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
