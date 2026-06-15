document.addEventListener("DOMContentLoaded", async () => {
  // Latest news ticker
  try {
    const response = await fetch("./lionstride-news.json");
    const newsItems = await response.json();

    if (Array.isArray(newsItems) && newsItems.length > 0) {
      const ticker = document.createElement("div");
      ticker.className = "lionstride-ticker";

      const track = document.createElement("div");
      track.className = "lionstride-ticker-track";

      newsItems.forEach(item => {
        const span = document.createElement("span");
        span.textContent = item;
        track.appendChild(span);
      });

      ticker.appendChild(track);

      const header = document.querySelector(".header");
      if (header) {
        header.insertAdjacentElement("afterend", ticker);
      } else {
        document.body.prepend(ticker);
      }
    }
  } catch (error) {
    console.warn("LionStride news ticker could not load:", error);
  }

  // Make World Athletics profile links clickable if athlete.worldAthletics exists in page data
  setTimeout(() => {
    const athleteProfile = window.currentAthlete || window.athlete;

    if (athleteProfile && athleteProfile.worldAthletics) {
      const target = document.querySelector(".athlete-info, .profile-info, .athlete-details");

      if (target && !document.querySelector(".lionstride-wa-link")) {
        const link = document.createElement("a");
        link.href = athleteProfile.worldAthletics;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.className = "lionstride-wa-link";
        link.textContent = "View World Athletics Profile";
        target.appendChild(link);
      }
    }
  }, 800);
});
