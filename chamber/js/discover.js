const spotsUrl = "data/items.json";
const spotContainer = document.getElementById("spotContainer");

async function fetchSpots() {
  try {
    const response = await fetch(spotsUrl);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    const spots = await response.json();
    displaySpots(spots);
  } catch (error) {
    console.error("Error fetching cultural spots:", error);
    spotContainer.innerHTML = '<p style="color: red;">Failed to load spots.</p>';
  }
}

function displaySpots(spots) {
  spotContainer.innerHTML = ''; // Clear existing

  spots.forEach(spot => {
    const card = document.createElement('div');
    card.classList.add('business-card');

    card.innerHTML = `
      <img src="${spot.image || 'default-image.jpg'}" alt="${spot.title}">
      <div class="business-details">
        <h3>${spot.title}</h3>
        <p><strong>Address:</strong> ${spot.address || 'N/A'}</p>
        <p>${spot.description}</p>
      </div>
    `;

    spotContainer.appendChild(card);
  });
}

function showVisitMessage() {
  const msg = document.getElementById("visit-message");
  const lastVisit = localStorage.getItem("lastVisit");
  const now = Date.now();

  if (!lastVisit) {
    msg.textContent = "Welcome! Let us know if you have any questions.";
  } else {
    const diff = now - Number(lastVisit);
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    msg.textContent = days < 1
      ? "Back so soon! Awesome!"
      : `You last visited ${days} day${days > 1 ? "s" : ""} ago.`;
  }

  localStorage.setItem("lastVisit", now);
}





// Run everything
document.addEventListener("DOMContentLoaded", () => {
  fetchSpots();
  showVisitMessage();
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


//   ----------------------

const messageElement = document.querySelector("#visit-message");
const today = Date.now();
const msToDays = 86400000;

// Get the last visit date from localStorage
const lastVisit = Number(localStorage.getItem("lastVisit"));

if (!lastVisit) {
  // First time visit
  messageElement.textContent = "Welcome! Let us know if you have any questions.";
} else {
  const timeDiff = today - lastVisit;
  const daysDiff = Math.floor(timeDiff / msToDays);

  if (daysDiff < 1) {
    messageElement.textContent = "Back so soon! Awesome!";
  } else if (daysDiff === 1) {
    messageElement.textContent = `You last visited 1 day ago.`;
  } else {
    messageElement.textContent = `You last visited ${daysDiff} days ago.`;
  }
}

// Update last visit date in localStorage
localStorage.setItem("lastVisit", today);
