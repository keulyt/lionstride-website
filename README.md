# LionStride Elite Management — Website


##  File Structure

```
lionstride/
│
├── index.html            # Homepage — all main sections
├── athlete.html          # Dynamic athlete profile page (reads ?id= from URL)
├── styles.css            # All styles — design system, layout, components
├── script.js             # All JavaScript — interactions, dynamic rendering
│
├── athletes.json         #  Athlete roster + full profile data
├── news.json             #  News & agency updates
├── targets.json          #  Outreach race targets
├── stories.json          #  Community stories / articles
├── README.md             # This file
│
└── assets/
    ├── favicon.svg       # Site favicon (SVG)
    ├── athletes/         # Athlete portrait photos
    │   └── justilin-foimi.jpg  (replace with real photo)
        └── keuly-yemele.jpg    (replace with real photo)
```

---

##  Homepage Sections

The homepage (`index.html`) contains these sections in order:

| Section | ID | Data Source |
|---|---|---|
| Hero | `#home` | Static HTML |
| About | `#about` | Static HTML |
| Services | `#services` | Static HTML |
| Featured Athlete Carousel | `#featured` | `athletes.json` |
| Athletes Roster Grid | `#athletes` | `athletes.json` |
| Outreach Targets | `#targets` | `targets.json` |
| News & Results | `#news` | `news.json` |
| Stories  | `#stories` | `stories.json` |
| Contact | `#contact` | EmailJS |

---

##  Deploy to GitHub Pages

### Option A — Via GitHub Website (Recommended)

1. Create a new repository on GitHub (e.g. `lionstride`)
2. Upload **all project files** into the repository root
3. Go to **Settings → Pages**
4. Under **Source**, select **Branch: `main`** / **Folder: `/ (root)`**
5. Click **Save**
6. Wait 1–2 minutes — your site is live at:
   ```
   https://your-username.github.io/lionstride/
   ```

### Option B — Via Git CLI

```bash
git clone https://github.com/your-username/lionstride.git
cd lionstride
git add .
git commit -m "Initial commit"
git push origin main
# Then enable GitHub Pages in Settings → Pages
```

### After Deploying

Update the canonical URL in `index.html`:
```html
<link rel="canonical" href="https://your-username.github.io/lionstride/">
```

---

##  Editing Content (JSON Files)

All dynamic content lives in JSON files. **No code changes are needed** to add or update content — just edit the JSON and save.

---

### `athletes.json` — Athlete Roster & Profiles

Each athlete object powers **both** their homepage card and their full profile page at `athlete.html?id={id}`.

**Minimal example:**
```json
{
    "id": "athlete-slug",
    "name": "Full Name",
    "sport": "Sport · Discipline",
    "nationality": "Country",
    "specialty": "Event focus",
    "activeSince": "2020",
    "image": "assets/athletes/athlete-slug.jpg",
    "tags": ["Achievement 1", "Achievement 2", "Achievement 3"],
    "infoFields": [
        { "label": "Nationality",  "value": "Country" },
        { "label": "Sport",        "value": "Long-Distance Running" },
        { "label": "Specialty",    "value": "Marathon" },
        { "label": "Active Since", "value": "2020" }
    ],
    "performanceStats": [
        { "label": "Marathon Best",      "value": "2h30" },
        { "label": "Half Marathon Best", "value": "1h10" },
        { "label": "International Wins", "value": "5+" },
        { "label": "Active Since",       "value": "2020" }
    ],
    "description": "Athlete bio paragraph shown in the Overview section.",
    "results": [
        { "year": "2024", "event": "Paris Marathon", "result": "1st Place", "time": "2h30" }
    ],
    "achievements": [
        { "title": "3× National Champion", "subtitle": "Subtitle text", "icon": "trophy" }
    ],
    "careerPositioning": "Career goals and positioning paragraph.",
    "representation": [
        { "icon": "trophy",   "label": "Elite Athlete Representation" },
        { "icon": "calendar", "label": "Race Placement" },
        { "icon": "chart",    "label": "Career Development" },
        { "icon": "globe",    "label": "Global Exposure" }
    ]
}
```

**Field reference:**

| Field | Description |
|---|---|
| `id` | URL-safe slug — must be unique, e.g. `"jane-doe"` |
| `name` | Full display name |
| `sport` | Shown as the gold eyebrow above the name on the profile |
| `nationality` | Country |
| `specialty` | Short event description |
| `activeSince` | Year turned professional |
| `image` | Relative path to photo, e.g. `"assets/athletes/jane-doe.jpg"` |
| `tags` | Array of up to 3 short badge strings |
| `infoFields` | Array of `{ label, value }` rows shown in the hero info panel |
| `performanceStats` | Array of `{ label, value }` for the 4-column stats grid |
| `description` | Bio shown in the Overview card |
| `results` | Array of `{ year, event, result, time }` for the results table |
| `achievements` | Array of `{ title, subtitle, icon }`. Icon: `"trophy"` or `"medal"` |
| `careerPositioning` | Career goals paragraph |
| `representation` | Array of `{ icon, label }`. Icon: `"trophy"`, `"calendar"`, `"chart"`, or `"globe"` |

> See **`ATHLETES_GUIDE.md`** for a full copy-paste template and step-by-step instructions.

---

### `news.json` — News & Agency Updates

```json
{
    "id": 1,
    "title": "Article headline",
    "date": "2025-06-01",
    "category": "Agency News",
    "description": "1–2 sentence summary shown on the card."
}
```

| Field | Description |
|---|---|
| `id` | Unique number |
| `title` | Full headline |
| `date` | ISO format `YYYY-MM-DD` — used for the date display |
| `category` | Gold badge label (e.g. Agency News, Athlete Update, Outreach) |
| `description` | Short summary shown on the card |

**To add a news item:** Copy an existing object, paste it at the top of the array (newest first), increment the `id`, and fill in the fields.

---

### `targets.json` — Outreach Race Targets

```json
{
    "id": 1,
    "badge": "Target #1",
    "name": "Race Name",
    "location": "City, Country",
    "image": "https://...",
    "date": "January 2026",
    "prizePool": "$5,000",
    "website": "race-website.com",
    "email": "contact@race.com",
    "why": "One-line reason why this race is a priority target.",
    "details": [
        { "icon": "calendar", "label": "Date",             "value": "January 2026" },
        { "icon": "trophy",   "label": "Prize Pool (Top)", "value": "$5,000" },
        { "icon": "globe",    "label": "Website",          "value": "race-website.com" },
        { "icon": "email",    "label": "Contact Email",    "value": "contact@race.com" }
    ]
}
```

| Field | Description |
|---|---|
| `badge` | Label shown top-right of card, e.g. `"Target #1"` |
| `name` | Race name |
| `location` | City, Country |
| `image` | Photo URL or relative path |
| `why` | Short explanation shown in "Why This Race?" block |
| `details` | Array of `{ icon, label, value }` rows. Icon: `"calendar"`, `"trophy"`, `"globe"`, `"email"` |

**To update currency:** Change the `value` inside the `trophy` detail row and the `prizePool` field. All values are plain text — no code changes needed.

---

### `stories.json` — Community Stories

```json
{
    "id": "story-slug",
    "title": "Article Title",
    "preview": "2–3 line preview shown on the card.",
    "image": "assets/stories/photo.jpg",
    "date": "2025-06-01",
    "category": "Athlete Story",
    "content": [
        "First paragraph of the full article.",
        "Second paragraph.",
        "Third paragraph."
    ]
}
```

| Field | Description |
|---|---|
| `id` | Unique slug string |
| `title` | Full article title |
| `preview` | Short preview shown on the card (2–3 sentences) |
| `image` | Path to featured image — leave as `""` for a placeholder icon |
| `date` | ISO format `YYYY-MM-DD` |
| `category` | Badge label, e.g. `"Athlete Story"` |
| `content` | **Array of strings** — each string becomes one paragraph in the modal |

**Interaction:** Clicking a story card opens a smooth full-screen modal with the complete article. The modal closes via the × button, clicking outside, or pressing Escape.

**To add a story:** Copy the object, paste it into the array, fill in the fields. The card and modal render automatically.

---

##  Images

### Athlete Photos
- Folder: `assets/athletes/`
- Format: JPEG or WebP
- Size: **600 × 900 px** (portrait, 2:3 ratio)
- Max file size: ~150 KB
- Name the file to match the `image` field in `athletes.json`

### Story Images
- Folder: `assets/stories/`
- Format: JPEG or WebP
- Size: **1200 × 630 px** (landscape, 16:9 ratio)
- Max file size: ~200 KB

### Compression
Use **[Squoosh.app](https://squoosh.app)** to compress images without visible quality loss before uploading.

---

##  Contact Form (EmailJS)

The contact form sends directly to `contact@lionstridemanagement.com` using **EmailJS** — no backend or server required.

**Current credentials (already configured in `script.js`):**

| Setting | Value |
|---|---|
| Public Key | `LiKI0xIHSb_uPH3GS` |
| Service ID | `service_i2ymauu` |
| Template ID | `template_c0gshgw` |

**EmailJS template variables** — your template at `template_c0gshgw` must use these exact names:

| Variable | Contains |
|---|---|
| `{{from_name}}` | Sender's full name |
| `{{from_email}}` | Sender's email address |
| `{{reply_to}}` | Same as from_email (for easy Reply) |
| `{{subject}}` | Selected topic |
| `{{message}}` | Message body |

**To update credentials**, change the constants at the top of `initContactForm()` in `script.js`:
```js
const EMAILJS_PUBLIC_KEY  = 'YOUR_NEW_KEY';
const EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
```

---

##  Design System

### Color Palette (`styles.css` — `:root`)

| Variable | Hex | Usage |
|---|---|---|
| `--clr-bg` | `#0a0a0c` | Page background |
| `--clr-bg-2` | `#0e0e12` | Alternate section background |
| `--clr-card` | `#18181f` | Card surfaces |
| `--clr-gold` | `#c9a84c` | Primary gold accent |
| `--clr-gold-light` | `#dfc276` | Hover / highlight gold |
| `--clr-text` | `#f0ece4` | Primary text |
| `--clr-text-2` | `#a8a49c` | Secondary / body text |
| `--clr-text-3` | `#6b6760` | Muted / label text |

### Typography

| Variable | Font | Usage |
|---|---|---|
| `--font-display` | Cormorant Garamond | All headings, names, numbers |
| `--font-body` | Inter | All body text, labels, buttons |

Fonts are loaded from Google Fonts in `<head>`. To change fonts, update the `<link>` tag and the two CSS variables.

### Featured Carousel Timing

In `script.js`, find `initFeaturedCarousel()` and adjust:
```js
const INTERVAL = 5000; // milliseconds — 5 seconds per slide
```

---

## ⚡ Performance Features

- All images use `loading="lazy"` (first carousel image uses `loading="eager"`)
- All scripts use `defer` for non-blocking page load
- Scroll listener uses `requestAnimationFrame` throttling (no jank)
- Parallax effects use `translate3d` for GPU acceleration
- `will-change: transform` applied to animated elements
- `@media (prefers-reduced-motion: reduce)` disables all animations for accessibility
- `@media print` styles strip unnecessary elements for clean printing
- Grain texture uses an inline SVG data URI — zero extra HTTP requests

---

##  Browser Support

| Browser | Supported |
|---|---|
| Chrome / Edge | ✅ Latest 2 versions |
| Firefox | ✅ Latest 2 versions |
| Safari | ✅ Latest 2 versions |
| Mobile (iOS / Android) | ✅ Fully responsive |

Uses: CSS Grid, `backdrop-filter`, `aspect-ratio`, `clamp()`, CSS custom properties, ES6+ (`async/await`, `fetch`, template literals).

---

onfirm the email arrives at `contact@lionstridemanagement.com`

### Deploy & Test
- [ ] Enable GitHub Pages (Settings → Pages → Branch: main)
- [ ] Test all nav links scroll to correct sections
- [ ] Test athlete card → profile page navigation (`athlete.html?id=justilin-foimi`)
- [ ] Test Stories modal opens and closes correctly
- [ ] Test site on mobile device or Chrome DevTools mobile emulator
- [ ] Run [PageSpeed Insights](https://pagespeed.web.dev/) on the live URL

---

## 🔗 Quick Links

| Resource | URL |
|---|---|
| EmailJS Dashboard | [emailjs.com](https://www.emailjs.com) |
| Image Compression | [squoosh.app](https://squoosh.app) |
| PageSpeed Testing | [pagespeed.web.dev](https://pagespeed.web.dev) |
| Google Fonts | [fonts.google.com](https://fonts.google.com) |
| AOS Documentation | [michalsnik.github.io/aos](https://michalsnik.github.io/aos/) |
