import { useState, useEffect } from "react";
import axios from "axios";
import Weather from "./weather"; // Assuming you have a Weather component to display weather info

const Dashboard = () => {
    const [city, setCity] = useState("Unknown");
    const [country, setCountry] = useState("US");
    const [error, setError] = useState(null);

    // Fetch user's IP-based geolocation
    useEffect(() => {
        const fetchIPLocation = async () => {
            try {
                const response = await axios.get(
                    `https://api.ipgeolocation.io/ipgeo?apiKey=8c45df3473e74a6dbedcfe985b323efa`
                );
                const { city, country_code2, country_name } = response.data;

                setCity(city || "Unknown");
                setCountry(country_name || country_code2 || "US");
            } catch (err) {
                setError(err.response?.data || "Failed to fetch geolocation.");
                console.error("Error:", err.response?.data || err.message);
            }
        };

        fetchIPLocation();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Weather and Dashboard Header Section */}
            <div className="bg-white shadow-md rounded-lg p-6 mb-6 ml-6 text-center">
                <h1 className="text-3xl font-bold mb-4">Weather and News Dashboard</h1>
                {error ? (
                    <p className="text-red-500">Error: {error}</p>
                ) : (
                    <p className="text-lg font-medium">
                        Location: {city}, {country}
                    </p>
                )}
            </div>

            {/* Weather Card */}
            <div className="flex justify-center">
                <div className="w-full max-w-sm">
                    <Weather location={`${city}, ${country}`} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
