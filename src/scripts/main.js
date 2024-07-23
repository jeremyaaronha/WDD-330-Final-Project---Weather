// apiKey = "0066e3596484e7ae608d23fe3959f109";
console.log('Weather App is running!');
const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

document.addEventListener("DOMContentLoaded", () => {
    const cityNameElem = document.getElementById("city-name");
    const temperatureElem = document.getElementById("temperature");
    const weatherDescriptionElem = document.getElementById("weather-description");
    const windSpeedElem = document.getElementById("wind-speed");
    const humidityElem = document.getElementById("humidity");
    const pressureElem = document.getElementById('pressure');
    const visibilityElem = document.getElementById('visibility');
    const cloudinessElem = document.getElementById('cloudiness');
    const forecastContainer = document.getElementById("forecast-container");
    const searchInput = document.querySelector(".search-container input");
    const suggestionsContainer = document.querySelector('.suggestions-container');
    const unitToggle = document.getElementById("unit-toggle");
    let isCelsius = true;

    const apiKey = "0066e3596484e7ae608d23fe3959f109"; 

    const fetchWeatherData = async (latitude, longitude) => {
        try {
            const units = isCelsius ? 'metric' : 'imperial'; 
            const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${units}&appid=${apiKey}`);

            if (!weatherResponse.ok) {
                throw new Error(`HTTP error! status: ${weatherResponse.status}`);
            }

            const weatherData = await weatherResponse.json();
            const city = weatherData.name;
            const country = weatherData.sys.country;
            const temperature = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description.charAt(0).toUpperCase() + weatherData.weather[0].description.slice(1);
            const windSpeed = weatherData.wind.speed;
            const humidity = weatherData.main.humidity;
            const weatherIcon = weatherData.weather[0].icon;
            const pressure = weatherData.main.pressure;
            const visibility = weatherData.visibility / 1000; // Convertir de metros a kilómetros
            const cloudiness = weatherData.clouds.all;


            cityNameElem.textContent = `Temperature in ${city}, ${country}`;
            temperatureElem.innerHTML = `<img src="http://openweathermap.org/img/wn/${weatherIcon}@2x.png" alt="${weatherDescription}">${temperature} °${isCelsius ? 'C' : 'F'}`;
            weatherDescriptionElem.textContent = `${weatherDescription}`;
            windSpeedElem.textContent = `Wind Speed: ${windSpeed} ${isCelsius ? 'm/s' : 'mph'}`;
            humidityElem.textContent = `Humidity: ${humidity}%`;
            pressureElem.textContent = `Pressure: ${pressure} hPa`;
            visibilityElem.textContent = `Visibility: ${visibility} km`;
            cloudinessElem.textContent = `Cloudiness: ${cloudiness}%`;

            const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=${units}&appid=${apiKey}`);

            if (!forecastResponse.ok) {
                throw new Error(`HTTP error! status: ${forecastResponse.status}`);
            }

            const forecastData = await forecastResponse.json();
            const forecastList = forecastData.list;

            // temperaturas por dia
            const dailyForecasts = forecastList.reduce((acc, curr) => {
                const date = new Date(curr.dt_txt).toDateString();
                if (!acc[date]) {
                    acc[date] = [];
                }
                acc[date].push(curr);
                return acc;
            }, {});

            // pronostico 5 dias, excluyendo hoy
            const forecastDays = Object.keys(dailyForecasts).slice(0, 5);

            const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

            forecastContainer.innerHTML = '';
            forecastDays.forEach(date => {
                const forecasts = dailyForecasts[date];
                const minTemp = Math.min(...forecasts.map(f => f.main.temp_min));
                const maxTemp = Math.max(...forecasts.map(f => f.main.temp_max));
                const weatherDescription = forecasts[0].weather[0].description;
                const windSpeed = forecasts[0].wind.speed;
                const weatherIcon = forecasts[0].weather[0].icon;
                const pressure = forecasts[0].main.pressure;
                const visibility = forecasts[0].visibility / 1000;
                const cloudiness = forecasts[0].clouds.all;

                const dayDate = new Date(date);
                const dayName = daysOfWeek[dayDate.getUTCDay()];
                const monthName = months[dayDate.getUTCMonth()];
                const formattedDate = `${dayName}, ${monthName} ${dayDate.getUTCDate()}`;

                const forecastElem = document.createElement('div');
                forecastElem.classList.add('forecast-day');
                forecastElem.innerHTML = `
                    <p id="day">${formattedDate}</p>
                    <img id="forecast-img" src="http://openweathermap.org/img/wn/${weatherIcon}@2x.png" alt="${weatherDescription}">
                    <p id="temperature-description">${capitalizeFirstLetter(weatherDescription)}</p>
                    <p id="min-temperature">Min: ${minTemp} °${isCelsius ? 'C' : 'F'}</p>
                    <p id="max-temperature">Max: ${maxTemp} °${isCelsius ? 'C' : 'F'}</p>
                    <p id="wind-speed">Wind Speed: ${windSpeed} ${isCelsius ? 'm/s' : 'mph'}</p>
                    <p id="pressure">Pressure: ${pressure} hPa</p>
                    <p id="visibility">Visibility: ${visibility} km</p>
                    <p id="cloudiness">Cloudiness: ${cloudiness}%</p>
                `;
                forecastContainer.appendChild(forecastElem);
            });

        } catch (error) {
            console.error('Error fetching the weather data:', error);
            cityNameElem.textContent = "Error retrieving weather data.";
            temperatureElem.textContent = "";
            weatherDescriptionElem.textContent = "";
            windSpeedElem.textContent = "";
            humidityElem.textContent = "";
        }
    };

    const fetchWeatherByCity = async (city) => {
        try {
            const geocodeResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
            if (!geocodeResponse.ok) {
                throw new Error(`HTTP error! status: ${geocodeResponse.status}`);
            }

            const geocodeData = await geocodeResponse.json();
            const { lat, lon } = geocodeData.coord;

            await fetchWeatherData(lat, lon);
        } catch (error) {
            console.error('Error fetching the weather data:', error);
            cityNameElem.textContent = "Error retrieving weather data.";
            temperatureElem.textContent = "";
            weatherDescriptionElem.textContent = "";
            windSpeedElem.textContent = "";
            humidityElem.textContent = "";
        }
    };
    const fetchCitySuggestions = async (query) => {
        try {
            const response = await fetch(`https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${query}`, {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': "e910cc3969msh71ab17d4f77c665p1b6bfajsn5ecd6ff742cf",
                    'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data.data.map(city => `${city.city}, ${city.country}`);
        } catch (error) {
            console.error('Error fetching city suggestions:', error);
            return [];
        }
    };

    const showSuggestions = (suggestions) => {
        suggestionsContainer.innerHTML = '';
        suggestions.forEach(suggestion => {
            const suggestionElem = document.createElement('div');
            suggestionElem.classList.add('suggestion');
            suggestionElem.textContent = suggestion;
            suggestionElem.addEventListener('click', () => {
                searchInput.value = suggestion;
                fetchWeatherByCity(suggestion);
                suggestionsContainer.innerHTML = '';
            });
            suggestionsContainer.appendChild(suggestionElem);
        });
    };

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
            await fetchWeatherData(latitude, longitude);
        }, () => {
            cityNameElem.textContent = "Unable to retrieve your location.";
        });
    } else {
        cityNameElem.textContent = "Geolocation is not supported by this browser.";
    }

    searchInput.addEventListener("input", async () => {
        const query = searchInput.value.trim();
        if (query) {
            const suggestions = await fetchCitySuggestions(query);
            showSuggestions(suggestions);
        } else {
            suggestionsContainer.innerHTML = '';
        }
    });

    searchInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            const city = searchInput.value.trim();
            if (city) {
                fetchWeatherByCity(city);
                suggestionsContainer.innerHTML = '';
            }
        }
    });

    unitToggle.addEventListener("click", () => {
        isCelsius = !isCelsius;
        unitToggle.textContent = `Switch to °${isCelsius ? 'F' : 'C'}`;
        const city = cityNameElem.textContent.split(' ')[2];
        if (city) {
            fetchWeatherByCity(city);
        }
    });

});

