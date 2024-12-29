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
        <div className="">
            <h1 className="text-2xl font-semibold mb-4">Weather and News Dashboard</h1>
            {error ? (
                <p className="text-red-500">Error: {error}</p>
            ) : (
                <div>
                    <p>Location: {city}, {country}</p>
                    <Weather location={`${city}, ${country}`} /> {/* Pass location as a prop to Weather component */}
                </div>
            )}
        </div>
    );
};

export default Dashboard;
