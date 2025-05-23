import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  CircularProgress
} from '@mui/material';

const WeatherDisplay = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        // For now, we'll use a placeholder city
        const city = 'London';
        const apiKey = process.env.REACT_APP_OPENWEATHER_API_KEY || 'YOUR_API_KEY';
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );

        if (!response.ok) {
          throw new Error('Weather data not available');
        }

        const data = await response.json();
        setWeatherData(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent>
          <Typography color="error">
            {error}
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent>
        {weatherData && (
          <>
            <Typography variant="h5" gutterBottom>
              {weatherData.name}
            </Typography>
            <Typography variant="h3" gutterBottom>
              {Math.round(weatherData.main.temp)}°C
            </Typography>
            <Typography variant="body1">
              {weatherData.weather[0].description}
            </Typography>
            <Box mt={2}>
              <Typography variant="body2">
                Humidity: {weatherData.main.humidity}%
              </Typography>
              <Typography variant="body2">
                Wind Speed: {weatherData.wind.speed} m/s
              </Typography>
            </Box>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default WeatherDisplay;