import  { useState, useEffect } from "react";
import Weather from "./weather";
import News from "./News";
import axios from "axios";

const Dashboard = () => {
    const [location, setLocation] = useState("us"); // Default country code
    const [city, setCity] = useState("Unknown");

    useEffect(() => {
        const fetchIPLocation = async () => {
            try {
                const response = await axios.get(
                    `https://api.ipgeolocation.io/ipgeo?apiKey=YOUR_IP_GEOLOCATION_API_KEY`
                );

                const { city, country_code2 } = response.data;
                setCity(city || "Unknown");
                setLocation(country_code2 || "us");
            } catch (error) {
                console.error("Error fetching IP-based geolocation:", error);
            }
        };

        fetchIPLocation();
    }, []);

    return (
        <div className="flex flex-col items-center bg-gray-100 min-h-screen p-4">
            <h1 className="text-3xl font-bold mb-4">Weather and News Dashboard</h1>
            <div className="text-center bg-white shadow-md p-4 rounded-md mb-4">
                <p className="text-lg font-medium">Detected Location:</p>
                <p className="text-xl text-gray-700">
                    {city} ({location.toUpperCase()})
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-4xl">
                <Weather location={city || location} />
                <News location={location} />
            </div>
        </div>
    );
};

export default Dashboard;
