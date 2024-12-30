import { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import ".component.css";

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

    return (
        <div className="bg-slate-600 mx-6 w-60 h-60 shadow-md bg-opacity-15">
            {weather ? (
                <div 
                    // style={{ marginLeft: "28px",
    // background: "aquamarine"}}
                className="flex justify-center self-center py-16 text-white text-lg">
                    <p>
                        Location: {weather.name}
                        <br />
                        Temperature: {weather.main.temp}°C
                        <br />
                        Condition: {weather.weather[0].description}
                        <br />
                        Humidity: {weather.main.humidity}%
                    </p>
                </div>
            ) : (
                <p className="text-white text-center">Loading weather...</p>
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
