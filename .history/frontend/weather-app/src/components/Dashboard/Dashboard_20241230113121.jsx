import { useState, useEffect } from "react";
import axios from "axios";
import Weather from "../Weather/weather";
import "./component.css";

const Dashboard = () => {
    const [city, setCity] = useState("Unknown");
    const [country, setCountry] = useState("US");
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [error, setError] = useState(null);

    // Fetch user's IP-based geolocation
    useEffect(() => {
        const fetchIPLocation = async () => {
            try {
                const response = await axios.get(
                    `https://api.ipgeolocation.io/ipgeo?apiKey=8c45df3473e74a6dbedcfe985b323efa`
                );
                const { city, country_code2, country_name, latitude, longitude } = response.data;

                setCity(city || "Unknown");
                setCountry(country_name || country_code2 || "US");
                setLatitude(parseFloat(latitude)); // Convert latitude to a number
                setLongitude(parseFloat(longitude)); // Convert longitude to a number
            } catch (err) {
                setError(err.response?.data || "Failed to fetch geolocation.");
                console.error("Error:", err.response?.data || err.message);
            }
        };

        fetchIPLocation();
    }, []);

    return (
        <div className="m-10 p-6 bg-gray-100 rounded-md shadow-md">
            {/* Weather and Dashboard Header Section */}
            <div className="mb-6 text-center">
                <h2 className="text-3xl font-bold text-center mb-4">Weather and News Dashboard</h2>
                {error ? (
                    <p className="text-center text-red-500">Error: {error}</p>
                ) : (
                    <p className="text-center text-lg text-gray-700">
                        Location: {city}, {country}
                    </p>
                )}
            </div>

            {/* Weather Card */}
            <div className="">
                {latitude !== null && longitude !== null ? (
                    <Weather coordinates={{ latitude, longitude }} />
                ) : (
                    <p>Loading weather...</p>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
