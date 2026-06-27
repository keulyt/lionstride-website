document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("raceCalendarContainer");
  if (!container) return;

  try {
    const response = await fetch("./race-calendar.json");

    if (!response.ok) {
      throw new Error("Race calendar JSON not found");
    }

    const months = await response.json();

    container.innerHTML = months.map(month => `
      <div class="race-month">
        <h3 class="race-month-title">${month.month}</h3>

        <div class="race-grid">
          ${month.races.map(race => `
            <div class="race-card">
              <span class="race-status">${race.status}</span>

              <h3>${race.name}</h3>

              <div class="race-meta">📍 ${race.location}</div>
              <div class="race-meta">📅 ${race.date}</div>
              <div class="race-meta">🏃 ${race.distance}</div>
              <div class="race-meta">🌍 ${race.category}</div>

              <div class="race-athletes">
                <strong>LionStride Athletes</strong>
                <span>${race.athletes.join(", ")}</span>
              </div>

              <div class="race-score">
                ${race.score} ${race.opportunity}
              </div>
            </div>
          `).join("")}
        </div>
      </div>
    `).join("");

  } catch (error) {
    console.warn("Race calendar could not load:", error);
    container.innerHTML = `
      <p style="color:#c9a84c; text-align:center;">
        Race calendar is currently being updated.
      </p>
    `;
  }
});
