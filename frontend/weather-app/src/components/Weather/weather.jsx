import { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import "./weather.css"; // Import the CSS file

const Weather = ({ coordinates }) => {
    const [weather, setWeather] = useState(null);

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const response = await axios.get(
                    `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.latitude}&lon=${coordinates.longitude}&units=metric&appid=570069e559a20106c8ed466794eda372`
                );
                setWeather(response.data);
            } catch (error) {
                console.error("Error fetching weather data:", error);
            }
        };

        if (coordinates) fetchWeather();
    }, [coordinates]);

    // Weather icon based on condition
    const getWeatherIcon = (condition) => {
        switch (condition) {
            case 'Clear':
                return "☀️"; // Sun
            case 'Clouds':
                return "☁️"; // Cloud
            case 'Rain':
                return "🌧️"; // Rain
            case 'Snow':
                return "❄️"; // Snow
            default:
                return "🌥️"; // Default cloudy icon
        }
    };

    return (
        <div className="weather-container">
            {weather ? (
                <div className="weather-info">
                    <div className="weather-header">
                        <h3>{weather.name}, {weather.sys.country}</h3>
                        <span className="weather-icon">
                            {getWeatherIcon(weather.weather[0].main)}
                        </span>
                    </div>
                    <div className="weather-details">
                        <p>
                            <strong>Temperature:</strong> {weather.main.temp}°C
                        </p>
                        <p>
                            <strong>Condition:</strong> {weather.weather[0].description}
                        </p>
                        <p>
                            <strong>Humidity:</strong> {weather.main.humidity}%
                        </p>
                    </div>
                </div>
            ) : (
                <p className="loading-text">Loading weather...</p>
            )}
        </div>
    );
};

Weather.propTypes = {
    coordinates: PropTypes.shape({
        latitude: PropTypes.number.isRequired,
        longitude: PropTypes.number.isRequired,
    }).isRequired,
};

export default Weather;
