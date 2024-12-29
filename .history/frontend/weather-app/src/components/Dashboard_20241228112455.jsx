import  { useState, useEffect } from "react";
import axios from "axios";

const Dashboard = () => {
    const [city, setCity] = useState("Unknown");
    const [country, setCountry] = useState("us");
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchIPLocation = async () => {
            try {
                // Use 'await' to handle the async operation
                const response = await axios.get(
                    ` https://api.ipgeolocation.io/ipgeo?apiKey=8c45df3473e74a6dbedcfe985b323efa&fields=country_code2,country_name`
                );
                const { city, country_code2 } = response.data;

                // Update state with the fetched data
                setCity(city || "Unknown");
                setCountry(country_code2 || "us");
            } catch (err) {
                // Handle errors
                setError(err.response?.data || "Failed to fetch geolocation.");
                console.error("Error:", err.response?.data || err.message);
            }
        };

        // Call the function
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
