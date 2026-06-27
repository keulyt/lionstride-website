document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("raceCalendarContainer");
  if (!container) return;

  try {
    const response = await fetch("./race-calendar.json");
    if (!response.ok) throw new Error("Race calendar JSON not found");

    const months = await response.json();

    container.innerHTML = `
      <div class="race-timeline">
        ${months.map(month => `
          <div class="race-month-block">
            <div class="race-month-label">${month.month}</div>

            <div class="race-luxury-grid">
              ${month.races.map(race => `
                <article class="race-luxury-card">
                  <div class="race-card-top">
                    <span class="race-country">${getFlag(race.location)}</span>
                    <span class="race-status-pill">${race.status}</span>
                  </div>

                  <h3>${race.name}</h3>

                  <div class="race-details">
                    <span>📍 ${race.location}</span>
                    <span>📅 ${race.date}</span>
                    <span>🏃 ${race.distance}</span>
                  </div>

                  <div class="race-athlete-box">
                    <p>LionStride Athletes</p>
                    <div class="race-athlete-chips">
                      ${race.athletes.map(a => `<span>${a}</span>`).join("")}
                    </div>
                  </div>

                  <div class="race-card-bottom">
                    <span>${race.score}</span>
                    <strong>${race.opportunity}</strong>
                  </div>
                </article>
              `).join("")}
            </div>
          </div>
        `).join("")}
      </div>
    `;

  } catch (error) {
    console.warn("Race calendar could not load:", error);
    container.innerHTML = `
      <p style="color:#c9a84c;text-align:center;">
        Race calendar is currently being updated.
      </p>
    `;
  }

  function getFlag(location) {
    if (location.includes("Cameroon")) return "🇨🇲";
    if (location.includes("Chad")) return "🇹🇩";
    if (location.includes("Gabon")) return "🇬🇦";
    return "🌍";
  }
});
