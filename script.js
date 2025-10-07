const API_KEY = "9d2402c9907e4accdd47a8578b8bb50c";
const base_url = "https://api.openweathermap.org/data/2.5";

const defaultCity = "London";
const countryCode = "GB";
const units = "metric";

const url = `${base_url}/forecast?q=${city},${countryCode}&units=${units}&appid=${API_KEY}`;

const cityInput = document.getElementById("city-input");
const searchBtn = document.getElementById("search-btn");
const currentWeatherDiv = document.getElementById("current-weather");
const forecastContainer = document.getElementById("forecast-container");
const errorMessage = document.getElementById("error-message");
const loader = document.getElementById("loader");

 const weatherIcons = { 
            '01d': 'fas fa-sun',         // clear sky (day) 
            '01n': 'fas fa-moon',        // clear sky (night) 
            '02d': 'fas fa-cloud-sun',   // few clouds (day) 
            '02n': 'fas fa-cloud-moon',  // few clouds (night) 
            '03d': 'fas fa-cloud',       // scattered clouds 
            '03n': 'fas fa-cloud', 
            '04d': 'fas fa-cloud',       // broken clouds 
            '04n': 'fas fa-cloud', 
            '09d': 'fas fa-cloud-rain',  // shower rain 
            '09n': 'fas fa-cloud-rain', 
            '10d': 'fas fa-cloud-sun-rain', // rain (day) 
            '10n': 'fas fa-cloud-moon-rain',// rain (night) 
            '11d': 'fas fa-bolt',        // thunderstorm 
            '11n': 'fas fa-bolt', 
            '13d': 'fas fa-snowflake',   // snow 
            '13n': 'fas fa-snowflake', 
            '50d': 'fas fa-smog',        // mist 
            '50n': 'fas fa-smog' 
        };

window.addEventListener('load',()=>{
getWeatherData(defaultCity);
});

searchBtn.addEventListener('click'()=>{
    const city=cityInput.value.trim();
    if (city){
        getWeatherData(city);
    }
});

cityInput.addEventListener('keypress'(e)=>{
    if(e.keypress==="Enter"){
        const city= cityInput.value.trim();
          if (city) { 
          getWeatherData(city); 
                } 
    }
});