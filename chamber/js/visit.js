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

// Update localStorage with today’s visit
localStorage.setItem("lastVisit", today);
