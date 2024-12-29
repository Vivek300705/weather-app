import { useState, useEffect } from "react";
import axios from "axios";

const Weather = ({ location }) => {
    const [weather, setWeather] = useState(null);

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const response = await axios.get(
                    `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=570069e559a20106c8ed466794eda372`
                );
                setWeather(response.data);
            } catch (error) {
                console.error("Error fetching weather data:", error);
            }
        };

        if (location) fetchWeather();
    }, [location]);

    return (
        <div className="p-4 bg-blue-100 shadow-md rounded-md">
            {weather ? (
                <div>
                    <h2 className="text-2xl font-semibold mb-2">Weather in {weather.name}</h2>
                    <p className="text-lg">Temperature: {weather.main.temp}°C</p>
                    <p className="text-lg">Condition: {weather.weather[0].description}</p>
                    <p className="text-lg">Humidity: {weather.main.humidity}%</p>
                </div>
            ) : (
                <p>Loading weather...</p>
            )}
        </div>
    );
};

export default Weather;
