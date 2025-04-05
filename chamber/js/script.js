// Toggle navigation menu (Hamburger)
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');

hamburger.addEventListener('click', () => {
  nav.classList.toggle('active');
});

// Toggle black & white mode
function toggleBlackAndWhite() {
  document.body.style.filter =
    document.body.style.filter === "grayscale(100%)" ? "none" : "grayscale(100%)";
}

// Display last modified date
const lastModified = new Date();
document.getElementById('lastModified').textContent = 
  `Last modification: ${lastModified.toLocaleDateString('en-US')} at ${lastModified.toLocaleTimeString('en-US')}`;

// Weather API
const apiKey = '9f08b4cbb36f48b37b0a0936f68f6126'; // Replace with your OpenWeather API key
const city = 'Accra';
const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

async function fetchWeather() {
  try {
    const response = await fetch(weatherUrl);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    const data = await response.json();

    document.getElementById('temperature').textContent = `Temperature: ${data.main.temp}°C`;
    document.getElementById('condition').textContent = `Condition: ${data.weather[0].description}`;
    document.getElementById('humidity').textContent = `Humidity: ${data.main.humidity}%`;
    document.getElementById('windSpeed').textContent = `Wind Speed: ${data.wind.speed} m/s`;
  } catch (error) {
    console.error('Error fetching weather:', error);
    document.getElementById('temperature').textContent = 'Failed to load weather data';
  }
}

document.addEventListener("DOMContentLoaded", fetchWeather);

// Fetch and display business members
const businessContainer = document.getElementById('business-container');
const gridButton = document.getElementById('grid');
const listButton = document.getElementById('list');
const membersUrl = "./data/member.json";

async function fetchMembers() {
  try {
    const response = await fetch(membersUrl);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    const members = await response.json();

    displayMembers(members, "grid"); // Default view is grid
  } catch (error) {
    console.error("Error fetching members:", error);
    businessContainer.innerHTML = '<p style="color: red;">Failed to load members.</p>';
  }
}

function displayMembers(members, viewType) {
  businessContainer.innerHTML = ''; // Clear existing content

  if (viewType === "grid") {
      members.forEach(member => {
          const businessItem = document.createElement('div');
          businessItem.classList.add('business-card');

          businessItem.innerHTML = `
              <img src="${member.image || 'default-image.png'}" alt="${member.name} Logo">
              <hr style="width: 80%; margin: 10px auto; border: 1px solid #ccc;">
              <div class="business-details">
                  <h3>${member.name}</h3>
                  <p><strong>Address:</strong> ${member.address || 'N/A'}</p>
                  <p><strong>Phone:</strong> ${member.phone || 'N/A'}</p>
                  <p><strong>Membership Level:</strong> ${member.membership || 'N/A'}</p>
                  <p><strong>Website:</strong> 
                      ${member.website ? `<a href="${member.website}" target="_blank">Visit our site</a>` : 'N/A'}
                  </p>
              </div>
          `;

          businessContainer.appendChild(businessItem);
      });
  } else if (viewType === "list") {
      // Create a table for the list view
      const table = document.createElement('table');
      table.classList.add('business-table');
      table.innerHTML = `
          <thead>
              <tr>
                  <th>Business Name</th>
                  <th>Address</th>
                  <th>Phone</th>
                  <th>Membership Level</th>
                  <th>Website</th>
                  <th>Image</th>
              </tr>
          </thead>
          <tbody>
              ${members.map(member => `
                  <tr>
                      <td>${member.name}</td>
                      <td>${member.address || 'N/A'}</td>
                      <td>${member.phone || 'N/A'}</td>
                      <td>${member.membership || 'N/A'}</td>
                      <td>${member.website ? `<a href="${member.website}" target="_blank">Visit our site</a>` : 'N/A'}</td>
                      <td><img src="${member.image || 'default-image.png'}" alt="${member.name} Logo" style="width: 50px;"></td>
                  </tr>
              `).join('')}
          </tbody>
      `;
      
      businessContainer.appendChild(table);
  }
}


    

// Toggle between grid and list views
gridButton.addEventListener('click', () => displayMembers(membersData, "grid"));
listButton.addEventListener('click', () => displayMembers(membersData, "list"));

let membersData = [];
document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch(membersUrl);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    membersData = await response.json();
    displayMembers(membersData, "grid"); // Default view is grid
  } catch (error) {
    console.error("Error fetching members:", error);
  }
});


// -------------------------display form information on the thank you page
function displayClientData() {
  const urlParams = new URLSearchParams(window.location.search);

  // Extract data from query parameters
  const clientInfo = {
      firstname: urlParams.get('first-name'),
      lastname: urlParams.get('last-name'),
      email: urlParams.get('email'),
      phone: urlParams.get('phone'),
      business: urlParams.get('organization'),
      membership: urlParams.get('membership'),
      timestamp: urlParams.get('timestamp') || new Date().toLocaleString(), // Default to current date if missing
  };

  // Check if form data was received
  const hasData = Object.values(clientInfo).some(value => value !== null && value !== "");

  if (hasData) {
      // Populate the page with client data
      document.getElementById("displayFirstName").textContent = clientInfo.firstname;
      document.getElementById("displayLastName").textContent = clientInfo.lastname;
      document.getElementById("displayEmail").textContent = clientInfo.email;
      document.getElementById("displayPhone").textContent = clientInfo.phone;
      document.getElementById("displayBusiness").textContent = clientInfo.business;
      document.getElementById("displayMembership").textContent = clientInfo.membership;
      document.getElementById("displayTimestamp").textContent = clientInfo.timestamp;

      // Show the data container
      document.getElementById("data-display").style.display = "block";
      document.getElementById("error-message").style.display = "none";
  } else {
      // Show the error message if no data is received
      document.getElementById("data-display").style.display = "none";
      document.getElementById("error-message").style.display = "block";
  }
}

// Run script after the page loads
document.addEventListener("DOMContentLoaded", displayClientData);





