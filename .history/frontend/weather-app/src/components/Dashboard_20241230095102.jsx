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
        <div style={{margin:"37px"}} className="m-6 p-6 mx-14">
            {/* Weather and Dashboard Header Section */}
            <div className="m-6   ">
                <h2 className=" flex justify-center ">Weather and News Dashboard</h2>
                {error ? (
                    <p className="text-red-500">Error: {error}</p>
                ) : (
                    <p className="">
                        Location: {city}, {country}
                    </p>
                )}
            </div>

            {/* Weather Card */}
            <div className="">
                <div className="">
                    <Weather location={`${city}, ${country}`} />
                </div>
            </div>
        </div>
  
    );
};

export default Dashboard;
