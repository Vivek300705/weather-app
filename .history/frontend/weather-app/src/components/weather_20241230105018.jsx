import { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import "../App.css"
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
        <div>
            {/* Header Section */}
            <div>
                <h5 className="flex text-sm font-medium justify-center py-7">
                    Weather in {location}
                </h5>
            </div>

            {/* Weather Card */}
            <div className="bg-slate-600 mx-auto w-60 h-60 shadow-md bg-opacity-15 rounded-md">
                {weather ? (
                    <div className="flex justify-center items-center py-16 text-white text-center">
                        <div>
                            Location: {weather.name} <br />
                            Temperature: {weather.main.temp}°C <br />
                            Condition: {weather.weather[0].description} <br />
                            Humidity: {weather.main.humidity}%
                        </div>
                    </div>
                ) : (
                    <div className="flex justify-center items-center h-full text-white text-center">
                        Loading weather...
                    </div>
                )}
            </div>
        </div>
    );
};

// PropTypes validation for 'location' prop
Weather.propTypes = {
    location: PropTypes.string.isRequired, // Ensures 'location' is a required string
};

export default Weather;
