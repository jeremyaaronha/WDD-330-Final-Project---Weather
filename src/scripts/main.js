// apiKey = "0066e3596484e7ae608d23fe3959f109";
console.log('Weather App is running!');

document.addEventListener("DOMContentLoaded", () => {
    const cityNameElem = document.getElementById("city-name");
    const temperatureElem = document.getElementById("temperature");
    const forecastContainer = document.getElementById("forecast-container");
    const searchInput = document.querySelector(".search-container input");
    const suggestionsContainer = document.querySelector('.suggestions-container');
    const unitToggle = document.getElementById("unit-toggle");
    // const loginForm = document.getElementById("login-form");
    // const registerForm = document.getElementById("register-form");
    // const loginButton = document.getElementById("login-button");
    // const registerButton = document.getElementById("register-button");
    // const loginCloseButton = document.getElementById("login-close");
    // const registerCloseButton = document.getElementById("register-close");
    let isCelsius = true; // Variable para controlar la unidad de medida
    const apiKey = "0066e3596484e7ae608d23fe3959f109"; 
    const geoDbApiKey = "e910cc3969msh71ab17d4f77c665p1b6bfajsn5ecd6ff742cf"; 


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
            const weatherIcon = weatherData.weather[0].icon;
            const weatherDescription = weatherData.weather[0].description;

            cityNameElem.textContent = `Temperature in ${city}, ${country}`;
            temperatureElem.innerHTML = `
            
            <img src="http://openweathermap.org/img/wn/${weatherIcon}@2x.png" alt="${weatherDescription}">${temperature} °${isCelsius ? 'C' : 'F'}
        `;

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
                acc[date].push(curr.main.temp_min, curr.main.temp_max);
                return acc;
            }, {});

            // pronostico 5 dias, excluyendo hoy
            const forecastDays = Object.keys(dailyForecasts).slice(0, 5);

            const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

            forecastContainer.innerHTML = '';
            forecastDays.forEach(date => {
                const temps = dailyForecasts[date];
                const minTemp = Math.min(...temps);
                const maxTemp = Math.max(...temps);

                const dayDate = new Date(date);
                const dayName = daysOfWeek[dayDate.getUTCDay()];
                const monthName = months[dayDate.getUTCMonth()];
                const formattedDate = `${dayName}, ${monthName} ${dayDate.getUTCDate()}`;

                const forecastElem = document.createElement('div');
                forecastElem.classList.add('forecast-day');
                forecastElem.innerHTML = `
                    <p>${formattedDate}</p>
                    <img src="http://openweathermap.org/img/wn/${forecastList.find(item => new Date(item.dt_txt).toDateString() === date).weather[0].icon}@2x.png" alt="${forecastList.find(item => new Date(item.dt_txt).toDateString() === date).weather[0].description}">
                    <p>Min: ${minTemp} °${isCelsius ? 'C' : 'F'}</p>
                    <p>Max: ${maxTemp} °${isCelsius ? 'C' : 'F'}</p>
                `;
                forecastContainer.appendChild(forecastElem);
            });

        } catch (error) {
            console.error('Error fetching the weather data:', error);
            cityNameElem.textContent = "Error retrieving weather data.";
            temperatureElem.textContent = "";
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


// // registro
// registerForm.addEventListener("submit", (e) => {
//     e.preventDefault();
//     const username = registerForm.querySelector('input[placeholder="Username"]').value;
//     const email = registerForm.querySelector('input[placeholder="Email"]').value;
//     const password = registerForm.querySelector('input[placeholder="Password"]').value;

//     // Verificar si el usuario ya existe en localStorage
//     const users = JSON.parse(localStorage.getItem('users')) || [];
//     const userExists = users.some(user => user.email === email || user.username === username);

//     if (userExists) {
//         alert('Username or email is already taken. Please choose another.');
//     } else {
//         const newUser = { username, email, password };
//         users.push(newUser);
//         localStorage.setItem('users', JSON.stringify(users));
//         alert('Registration successful! You can now log in.');
//         registerForm.style.display = "none";
//         loginForm.style.display = "block";
//     }
// });


// // actualizar el header después del inicio de sesión
// const updateHeaderForLoggedInUser = (username) => {
//     const loginRegisterDiv = document.querySelector(".login-register");
//     loginRegisterDiv.innerHTML = `Bienvenido, ${username}! <a href="#" id="logout">Cerrar sesión</a>`;

//     // Añadir el evento de cerrar sesión
//     const logoutLink = document.getElementById("logout");
//     logoutLink.addEventListener("click", (e) => {
//         e.preventDefault();
//         localStorage.removeItem("loggedInUser");
//         location.reload();
//     });
// };

// // inicio de sesión
// loginForm.addEventListener("submit", (e) => {
//     e.preventDefault();
//     const identifier = loginForm.querySelector('input[type="text"]').value; // Puede ser correo electrónico o nombre de usuario
//     const password = loginForm.querySelector('input[type="password"]').value;

//     // Verificar usuario en localStorage
//     const users = JSON.parse(localStorage.getItem('users')) || [];
//     const user = users.find(user => (user.email === identifier || user.username === identifier) && user.password === password);

//     if (user) {
//         alert(`Welcome, ${user.username}!`);
//         localStorage.setItem("loggedInUser", JSON.stringify(user));
//         loginForm.style.display = "none";
//         updateHeaderForLoggedInUser(user.username);
//     } else {
//         alert('Invalid email/username or password. Please try again.');
//     }
// });



// // Verificar si hay un usuario al cargar la página
// document.addEventListener("DOMContentLoaded", () => {
//     const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
//     if (loggedInUser) {
//         updateHeaderForLoggedInUser(loggedInUser.username);
//     }
// });


});
