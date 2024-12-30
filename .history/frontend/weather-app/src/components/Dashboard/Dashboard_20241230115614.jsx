// In Dashboard.jsx

import { useState, useEffect } from "react";
import axios from "axios";
import Weather from "../Weather/weather";
import News from "../News/News";
import "./dashboard.css"; // Import the CSS file

const Dashboard = () => {
    const [city, setCity] = useState("Unknown");
    const [country, setCountry] = useState("US");
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchIPLocation = async () => {
            try {
                const response = await axios.get(
                    `https://api.ipgeolocation.io/ipgeo?apiKey=8c45df3473e74a6dbedcfe985b323efa`
                );
                const { city, country_code2, country_name, latitude, longitude } = response.data;

                setCity(city || "Unknown");
                setCountry(country_name || country_code2 || "US");
                setLatitude(parseFloat(latitude));
                setLongitude(parseFloat(longitude));
            } catch (err) {
                setError(err.response?.data || "Failed to fetch geolocation.");
                console.error("Error:", err.response?.data || err.message);
            }
        };

        fetchIPLocation();
    }, []);

    return (
        <div className="dashboard-container">
            {/* Weather and Dashboard Header Section */}
            <div className="header-section">
                <h2 className="heading">Weather and News Dashboard</h2>
                {error ? (
                    <p className="error-text">Error: {error}</p>
                ) : (
                    <p className="location-text">
                        Location: {city}, {country}
                    </p>
                )}
            </div>

            {/* Weather Card */}
            <div className="weather-card">
                {latitude !== null && longitude !== null ? (
                    <Weather coordinates={{ latitude, longitude }} />
                ) : (
                    <p>Loading weather...</p>
                )}
            </div>

            {/* News Section */}
            <div className="news-section">
                <News location={`${city}, ${country}`} />
            </div>
        </div>
    );
};

export default Dashboard; // Ensure the default export