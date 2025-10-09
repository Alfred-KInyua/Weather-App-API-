const API_KEY = "9d2402c9907e4accdd47a8578b8bb50c";
const base_url = "https://api.openweathermap.org/data/2.5";

const defaultCity = "Nairobi";
const countryCode = "KE";
const units = "metric";

const cityInput = document.getElementById("city-input");
const searchBtn = document.getElementById("search-btn");
const currentWeatherDiv = document.getElementById("current-weather");
const forecastContainer = document.getElementById("forecast-container");
const errorMessage = document.getElementById("error-message");
const loader = document.getElementById("loader");

const weatherIcons = { 
    // Icon mapping
};

window.addEventListener('load', () => {
    getWeatherData(defaultCity);
});

searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        getWeatherData(city);
    }
});

cityInput.addEventListener('keypress', (e) => {
    if (e.key === "Enter") {
        const city = cityInput.value.trim();
        if (city) {
            getWeatherData(city);
        }
    }
});

// Fetch weather data from API 
async function getWeatherData(city) { 
    // Show loader and hide error 
    loader.style.display = 'block'; 
    errorMessage.style.display = 'none'; 
    currentWeatherDiv.innerHTML = ''; 
    forecastContainer.innerHTML = ''; 

    try { 
        // Fetch current weather 
        const currentRes = await fetch(`${base_url}/weather?q=${city},${countryCode}&appid=${API_KEY}&units=${units}`); 
        const currentData = await currentRes.json(); 

        // Handle API errors 
        if (currentData.cod !== 200) { 
            throw new Error(currentData.message); 
        } 

        // Fetch forecast 
        const forecastRes = await fetch(`${base_url}/forecast?q=${city},${countryCode}&appid=${API_KEY}&units=${units}`); 
        const forecastData = await forecastRes.json(); 

        // Display the data 
        displayCurrentWeather(currentData); 
        displayForecast(forecastData); 
    } catch (error) { 
        // Show error message 
        errorMessage.style.display = 'block'; 
        errorMessage.textContent = `Error: ${error.message}`; 
        console.error('Error fetching weather data:', error); 
    } finally { 
        // Hide loader 
        loader.style.display = 'none'; 
    } 
}

// Remaining functions: displayCurrentWeather, displayForecast, formatDate, formatShortDate

 function displayCurrentWeather(data) { 
            const { name, sys, main, weather, wind, dt } = data; 
            const date = new Date(dt * 1000); 
             
            currentWeatherDiv.innerHTML = ` 
                <h2 class="location">${name}, ${sys.country}</h2> 
                <div class="date">${formatDate(date)}</div> 
                <div class="temp">${Math.round(main.temp)}°C</div> 
                <div class="weather-icon"> 
                    <i class="${weatherIcons[weather[0].icon]}"></i> 
                </div> 
                <div class="weather
description">${weather[0].description}</div> 
                <div class="weather-details"> 
                    <div class="detail"> 
                        <i class="fas fa-temperature-high"></i> 
                        <span>Feels like: 
${Math.round(main.feels_like)}°C</span> 
                    </div> 
                    <div class="detail"> 
                        <i class="fas fa-tint"></i> 
                        <span>Humidity: ${main.humidity}%</span> 
                    </div> 
                    <div class="detail"> 
                        <i class="fas fa-wind"></i> 
                        <span>Wind: ${wind.speed} m/s</span> 
                    </div> 
                </div> 
            `; 
        }
          // Display 5-day forecast 
        function displayForecast(data) { 
            // Group forecast by day 
            const dailyForecast = {}; 
             
            data.list.forEach(item => { 
                const date = new Date(item.dt * 1000); 
                const dateStr = date.toDateString(); 
                 
                if (!dailyForecast[dateStr]) { 
                    dailyForecast[dateStr] = { 
                        minTemp: item.main.temp_min, 
                        maxTemp: item.main.temp_max, 
                        weather: item.weather[0], 
                        date: date 
                    }; 
                } else { 
                    // Update min and max temperatures 
                    if (item.main.temp_min < dailyForecast[dateStr].minTemp) 
{ 
                        dailyForecast[dateStr].minTemp = item.main.temp_min; 
                    } 
                    if (item.main.temp_max > dailyForecast[dateStr].maxTemp) 
{ 
                        dailyForecast[dateStr].maxTemp = item.main.temp_max; 
                    } 
                } 
            }); 
             
            // Get the next 5 days (skip today) 
            const forecastDays = Object.keys(dailyForecast).slice(1, 6); 
             
            // Display each day 
            forecastDays.forEach(day => { 
                const forecast = dailyForecast[day]; 
                const dayElement = document.createElement('div'); 
                dayElement.className = 'forecast-day'; 
                dayElement.innerHTML = ` 
                    <div class="forecast
date">${formatShortDate(forecast.date)}</div> 
                    <div class="forecast-icon"> 
                        <i 
class="${weatherIcons[forecast.weather.icon]}"></i> 
                    </div> 
                    <div class="forecast-temp"> 
                        <span>${Math.round(forecast.maxTemp)}°C</span> /  
                        <span>${Math.round(forecast.minTemp)}°C</span> 
                    </div> 
                    <div class="forecast
description">${forecast.weather.description}</div> 
                `; 
                forecastContainer.appendChild(dayElement); 
            }); 
        }
          // Helper functions 
        function formatDate(date) { 
return date.toLocaleDateString('en-US', {  
weekday: 'long',  
year: 'numeric',  
month: 'long',  
day: 'numeric'  
}); 
} 
function formatShortDate(date) { 
return date.toLocaleDateString('en-US', {  
weekday: 'short',  
month: 'short',  
day: 'numeric'  
}); 
} 