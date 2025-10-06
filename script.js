const API_KEY = "9d2402c9907e4accdd47a8578b8bb50c";
const base_url = "https://api.openweathermap.org/data/2.5";

const city = "London";
const countryCode = "GB";
const units = "metric";

const url = `${base_url}/forecast?q=${city},${countryCode}&units=${units}&appid=${API_KEY}`;

const cityInput = document.getElementById("city-input");
const searchBtn = document.getElementById("search-btn");
const currentWeatherDiv = document.getElementById("current-weather");
const forecastContainer = document.getElementById("forecast-container");
const errorMessage = document.getElementById("error -message");
const loader = document.getElementById("loader");
