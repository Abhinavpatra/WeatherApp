import { useState } from 'react';
import './App.css';

export default function App() {
  const [city, setCity] = useState("");
  const [info, setInfo] = useState("enter a pincode");
  const [pin, setPin] = useState("");
  const [info2, setInfo2] = useState("");

  async function getWeather() {
    const apiKey = '1b4de0d3fd5f51d4669f87a945488671';
    const apiLink = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    try {
      const response = await fetch(apiLink);
      const data = await response.json();
      console.log(data);
      let str = data.weather[0].description;
      let str2 = `In the city of ${city}, the Humidity: ${data.main.humidity}, Temperature(ºC): ${(Math.round((data.main.temp - 273) * 10)) / 10}`;
      setInfo(str);
      setInfo2(str2);
      setCity("");
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setInfo("Ya the weather of fuckall in fuckall is fuckall, enter something legit dumbass");
      setInfo2("");
    }
  }

  async function getWeatherByPincode() {
    try {
      const apiKey = 'YOUR_GOOGLE_API_KEY';
      const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?components=postal_code:${pin}&key=${apiKey}`);
      const data = await response.json();
      if (data.status === 'OK') {
        const cityName = data.results[0].address_components[1].long_name;
        setCity(cityName);
        getWeather();
      } else {
        setInfo("City name not found for the given pincode.");
        setInfo2("");
      }
    } catch (err) {
      console.error('Error fetching city name:', err.error);
      setInfo("Error fetching city name. Please try again.");
      setInfo2("");
    }
  }

  return (
    <>
      <h1>Weather for You</h1>
      <input type="text" placeholder='City' value={city} onChange={(e) => setCity(e.target.value)} />
      <button onClick={getWeather}>Get Weather</button>
      <br /><div>OR</div>
      <input type="number" placeholder='Pincode' value={pin} onChange={(e) => setPin(e.target.value)} />
      <button onClick={getWeatherByPincode}>Get Weather</button>
      <p>{info}<br />{info2}</p>
    </>
  );
}
