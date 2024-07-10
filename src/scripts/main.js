console.log('Weather App is running!');

document.addEventListener("DOMContentLoaded", () => {
    const cityNameElem = document.getElementById("city-name");
    const temperatureElem = document.getElementById("temperature");

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
            const apiKey = "e910cc3969msh71ab17d4f77c665p1b6bfajsn5ecd6ff742cf"; // Reemplaza con tu clave de API de RapidAPI
            const apiHost = "weatherapi-com.p.rapidapi.com";

            // Configuración de la solicitud a la API
            const options = {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': apiKey,
                    'X-RapidAPI-Host': apiHost
                }
            };

            try {
                // Llamada a la API para obtener la temperatura
                const weatherResponse = await fetch(`https://weatherapi-com.p.rapidapi.com/current.json?q=${latitude},${longitude}`, options);

                if (!weatherResponse.ok) {
                    throw new Error(`HTTP error! status: ${weatherResponse.status}`);
                }

                const weatherData = await weatherResponse.json();
                const city = weatherData.location.name;
                const temperature = weatherData.current.temp_c;

                cityNameElem.textContent = `Temperature in ${city}`;
                temperatureElem.textContent = `${temperature} °C`;
            } catch (error) {
                console.error('Error fetching the weather data:', error);
                cityNameElem.textContent = "Error retrieving weather data.";
                temperatureElem.textContent = "";
            }
        }, () => {
            cityNameElem.textContent = "Unable to retrieve your location.";
        });
    } else {
        cityNameElem.textContent = "Geolocation is not supported by this browser.";
    }
});
