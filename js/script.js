const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');
hamburger.addEventListener('click', () => {
    nav.classList.toggle('active');
});


function toggleBlackAndWhite() {
    document.body.style.filter = 
        document.body.style.filter === "grayscale(100%)" ? "none" : "grayscale(100%)";
}




// last date modifying the date
const lastModified = new Date();
const formattedDate = lastModified.toLocaleDateString('en-US');
const formattedTime = lastModified.toLocaleTimeString('en-US');
document.getElementById('lastModified').textContent = `Last modification: ${formattedDate} at ${formattedTime}`;




const apiKey = '9f08b4cbb36f48b37b0a0936f68f6126'; // Replace with your OpenWeather API key
const city = 'Accra'; // Replace with your preferred city
const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

async function fetchWeather() {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log(data); // Log the API response to the console for debugging

        // Update the DOM with weather data
        document.getElementById('temperature').textContent = `Temperature: ${data.main.temp}°C`;
        document.getElementById('condition').textContent = `Condition: ${data.weather[0].description}`;
        document.getElementById('humidity').textContent = `Humidity: ${data.main.humidity}%`;
        document.getElementById('windSpeed').textContent = `Wind Speed: ${data.wind.speed} m/s`;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        document.getElementById('temperature').textContent = 'Failed to load weather data';
        document.getElementById('condition').textContent = '';
        document.getElementById('humidity').textContent = '';
        document.getElementById('windSpeed').textContent = '';
    }
}

document.addEventListener("DOMContentLoaded", fetchWeather);