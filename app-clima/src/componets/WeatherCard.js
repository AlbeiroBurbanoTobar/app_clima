import React from 'react';


function WeatherCard({ city, temp,country, humidity, description, icon, windSpeed, windDirection }) {
    // Construir la URL del ícono basado en el código de ícono de la API
    const iconUrl = `http://openweathermap.org/img/wn/${icon}.png`;
  
    // Función para convertir grados a dirección del viento
    const windDirectionConverter = deg => {
      if (deg > 45 && deg <= 135) return 'Este';
      if (deg > 135 && deg <= 225) return 'Sur';
      if (deg > 225 && deg <= 315) return 'Oeste';
      return 'Norte';
    };
  
    const windDir = windDirectionConverter(windDirection);
  
    return (
      <div className="weather-card">
        <h1>{city}, {country}</h1>
        <img src={iconUrl} alt="Weather icon" />
        <h2>{temp} °C</h2>
        <p>Humedad: {humidity}%</p>
        <p>{description}</p>
        <p>Viento: {windSpeed} km/h, Dirección: {windDir}</p>
      </div>
    );
  }
  

export default WeatherCard;
