.race-calendar-section {
  background:
    radial-gradient(circle at top left, rgba(201,168,76,0.12), transparent 35%),
    linear-gradient(180deg, #0a0a0c 0%, #111116 100%);
}

.race-month {
  margin-top: 56px;
}

.race-month-title {
  font-family: var(--font-display);
  color: #c9a84c;
  font-size: clamp(2rem, 4vw, 3rem);
  margin-bottom: 24px;
  border-bottom: 1px solid rgba(201,168,76,0.25);
  padding-bottom: 12px;
}

.race-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 28px;
}

.race-card {
  position: relative;
  overflow: hidden;
  background: linear-gradient(145deg, rgba(24,24,31,0.95), rgba(10,10,12,0.95));
  border: 1px solid rgba(201,168,76,0.28);
  border-radius: 26px;
  padding: 30px;
  box-shadow: 0 24px 60px rgba(0,0,0,0.35);
}

.race-card::before {
  content: "";
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at top right, rgba(201,168,76,0.18), transparent 35%);
  pointer-events: none;
}

.race-card h3 {
  position: relative;
  font-family: var(--font-display);
  color: #f0ece4;
  font-size: 1.7rem;
  line-height: 1.1;
  margin-bottom: 18px;
}

.race-meta {
  position: relative;
  color: #a8a49c;
  font-size: 0.95rem;
  margin-bottom: 8px;
}

.race-status {
  position: relative;
  display: inline-block;
  margin: 16px 0;
  padding: 7px 14px;
  border-radius: 999px;
  background: rgba(201,168,76,0.14);
  color: #dfc276;
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.race-athletes {
  position: relative;
  margin-top: 14px;
  padding-top: 16px;
  border-top: 1px solid rgba(255,255,255,0.08);
  color: #f0ece4;
  font-size: 0.95rem;
  line-height: 1.7;
}

.race-score {
  position: relative;
  margin-top: 18px;
  color: #c9a84c;
  font-weight: 800;
  font-size: 0.95rem;
}
