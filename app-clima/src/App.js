import React, { useState } from 'react';
import axios from 'axios';
import WeatherCard from './componets/WeatherCard';
import SearchBar from './componets/SearchBar';
import './App.css';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = cityName => {
    const apiKey = 'd950a9af888e5308f5504375d70f41c8';
    //const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric&lang=es`;
    axios.get(url)
    .then(response => {
      setWeatherData({
        ...response.data,
        country: response.data.sys.country // Esto agrega el país al objeto weatherData
      });
      setError(null); // Limpia errores previos
    })
      .catch(err => {
        // Manejo básico de errores
        if (err.response) {
          // La solicitud fue hecha y el servidor respondió con un código de estado
          // que cae fuera del rango de 2xx
          console.error("Error response", err.response.data);
          console.error("Error status", err.response.status);
          setError(`Error: ${err.response.data.message}`);
        } else if (err.request) {
          // La solicitud fue hecha pero no se recibió respuesta
          console.error("Error request", err.request);
          setError("Error: The request was made but no response was received");
        } else {
          // Algo sucedió al configurar la solicitud que desencadenó un error
          console.error("Error message", err.message);
          setError(`Error: ${err.message}`);
        }
      });
  };

  return (
    <div className="App">
      <SearchBar onSearch={handleSearch} />
      {error && <p className="error-message">{error}</p>} 
      {weatherData && !error && (
        <WeatherCard
        city={weatherData.name}
        country={weatherData.country}
        temp={weatherData.main.temp}
        humidity={weatherData.main.humidity}
        description={weatherData.weather[0].description}
        icon={weatherData.weather[0].icon}
        windSpeed={weatherData.wind.speed}
      windDirection={weatherData.wind.deg}
        />
      )}
    </div>
  );
}

export default App;
