import { useState, useEffect } from "react";
import axios from "axios";

const Dashboard = () => {
    const [city, setCity] = useState("Unknown");
    const [country, setCountry] = useState("US");
    const [error, setError] = useState(null);

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
        <div>
            <h1>Weather and News Dashboard</h1>
            {error ? (
                <p className="text-red-500">Error: {error}</p>
            ) : (
                <p>
                    Location: {city}, {country}
                </p>
            )}
        </div>
    );
};

export default Dashboard;
