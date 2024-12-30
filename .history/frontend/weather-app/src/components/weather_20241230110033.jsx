import { useState, useEffect } from "react";
import PropTypes from "prop-types"; // Import PropTypes for prop validation
import axios from "axios";

const Weather = ({ coordinates }) => {
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState(null);

    const API_KEY = "570069e559a20106c8ed466794eda372"; // Replace with your API key

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const response = await axios.get(
                    `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&units=metric&appid=${API_KEY}`
                );
                setWeather(response.data);
            } catch (err) {
                console.error("Error fetching weather data:", err);
                setError("Failed to fetch weather data.");
            }
        };

        if (coordinates.lat && coordinates.lon) {
            fetchWeather();
        }
    }, [coordinates]);

    return (
        <div className="bg-slate-600 mx-6 w-60 h-60 shadow-md bg-opacity-15 rounded-md">
            {error ? (
                <p className="text-red-500 text-center p-4">{error}</p>
            ) : weather ? (
                <div className="flex flex-col items-center justify-center h-full text-white">
                    <p className="text-xl font-bold">Location: {weather.name}</p>
                    <p>Temperature: {weather.main.temp}°C</p>
                    <p>Condition: {weather.weather[0].description}</p>
                    <p>Humidity: {weather.main.humidity}%</p>
                </div>
            ) : (
                <p className="text-white text-center p-4">Loading weather...</p>
            )}
        </div>
    );
};

// PropTypes validation for Weather component
Weather.propTypes = {
    coordinates: PropTypes.shape({
        lat: PropTypes.number.isRequired,
        lon: PropTypes.number.isRequired,
    }).isRequired,
};

export default Weather;
