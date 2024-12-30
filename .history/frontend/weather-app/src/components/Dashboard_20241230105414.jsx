import { useState, useEffect } from "react";
import axios from "axios";
import Weather from "./weather";
import "../App.css"
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
        <div className="m-10 p-6 bg-gray-100 flex  rounded-md shadow-md">
            {/* Weather and Dashboard Header Section */}
            <div 
            // style={{textAlign: 'center'}}
            className="mb-6 justify-center ">
                <h2 className="text-3xl font-bold mb-4">Weather and News Dashboard</h2>
                {error ? (
                    <p className="text-center text-red-500">Error: {error}</p>
                ) : (
                    <p className="text-center text-lg text-gray-700">
                        Location: {city}, {country}
                    </p>
                )}
            </div>

            {/* Weather Card */}
            <div className="flex justify-center">
                <Weather location={`${city}, ${country}`} />
            </div>
        </div>
    );
};

export default Dashboard;
