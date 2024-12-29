import { useState, useEffect } from "react";
import axios from "axios";
import Weather from ""; // Import Weather Component
import News from "./News"; // Import News Component

const Dashboard = () => {
    const [city, setCity] = useState("Unknown");
    const [country, setCountry] = useState("US");
    const [weather, setWeather] = useState(null);
    const [news, setNews] = useState([]);
    const [error, setError] = useState(null);

    // Fetch location data
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
                setError("Failed to fetch geolocation.");
                console.error(err);
            }
        };

        fetchIPLocation();
    }, []);

    // Fetch weather data
    useEffect(() => {
        if (city && country) {
            const fetchWeather = async () => {
                try {
                    const weatherResponse = await axios.get(
                        `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=570069e559a20106c8ed466794eda372&units=metric`
                    );
                    setWeather(weatherResponse.data);
                } catch (err) {
                    setError("Failed to fetch weather.");
                    console.error(err);
                }
            };

            fetchWeather();
        }
    }, [city, country]);

    // Fetch news data
    useEffect(() => {
        const fetchNews = async () => {
            try {
                const newsResponse = await axios.get(
                    `https://newsapi.org/v2/top-headlines?country=${location}&apiKey=285a0a0a4990450f912b15b90e783319`
                );
                setNews(newsResponse.data.articles);
            } catch (err) {
                setError("Failed to fetch news.");
                console.error(err);
            }
        };

        fetchNews();
    }, []);

    return (
        <div className="p-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <div className="bg-white shadow-lg rounded-lg p-4">
                <h2 className="text-xl font-semibold mb-4">Location</h2>
                {error ? (
                    <p className="text-red-500">{error}</p>
                ) : (
                    <p>
                        Location: {city}, {country}
                    </p>
                )}
            </div>

            {/* Weather Card */}
            <Weather weather={weather} />

            {/* News Card */}
            <News news={news} />
        </div>
    );
};

export default Dashboard;
