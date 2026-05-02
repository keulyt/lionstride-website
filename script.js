
document.addEventListener('DOMContentLoaded', init);

function init() {
    setFooterYear();
    initAOS();
    initNav();
    initStickyHeader();
    initParallax();     
    initFeaturedCarousel();
    loadDynamicContent();
    initContactForm();
}
function initParallax() {
    const layers      = document.querySelectorAll('.parallax-layer');
    const athleteImgs = document.querySelectorAll('.athlete-img img');
    const heroEl      = document.querySelector('.hero');
    const heroTop     = heroEl ? heroEl.offsetTop : 0;
    const heroHeight  = heroEl ? heroEl.offsetHeight : 0;
    let ticking       = false;

    function update() {
        const scrollY = window.scrollY;
        const vh      = window.innerHeight;

        layers.forEach(el => {
            const speed = parseFloat(el.dataset.parallaxSpeed) || 0.3;
            const inHero = scrollY < heroTop + heroHeight;
            if (!inHero) return;
            const yOffset = (scrollY - heroTop) * speed;
            el.style.transform = `translate3d(0, ${yOffset}px, 0)`;
        });

        athleteImgs.forEach(img => {
            const card = img.closest('.athlete-card');
            if (!card) return;
            const rect       = card.getBoundingClientRect();
            const cardCenter = rect.top + rect.height / 2;
            const vhCenter   = vh / 2;
             const offset = Math.max(-12, Math.min(12, (vhCenter - cardCenter) * 0.06));
            img.style.setProperty('--parallax-y', `${offset}px`);
        });

        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(update);
            ticking = true;
        }
    }, { passive: true });

    // Run once on load
    update();
}
function initAOS() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 700,
            easing: 'ease-out',
            once: true,
            offset: 60,
        });
    }
}
function initNav() {
    const menuBtn    = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            const isOpen = mobileMenu.classList.toggle('open');
            menuBtn.classList.toggle('active', isOpen);
            menuBtn.setAttribute('aria-expanded', String(isOpen));
            mobileMenu.setAttribute('aria-hidden', String(!isOpen));
            document.body.style.overflow = isOpen ? 'hidden' : '';
        });

        mobileMenu.querySelectorAll('.mobile-nav-link').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('open');
                menuBtn.classList.remove('active');
                menuBtn.setAttribute('aria-expanded', 'false');
                mobileMenu.setAttribute('aria-hidden', 'true');
                document.body.style.overflow = '';
            });
        });

        document.addEventListener('keydown', e => {
            if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
                mobileMenu.classList.remove('open');
                menuBtn.classList.remove('active');
                menuBtn.setAttribute('aria-expanded', 'false');
                mobileMenu.setAttribute('aria-hidden', 'true');
                document.body.style.overflow = '';
            }
        });
    }

    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.classList.toggle('active',
                        link.getAttribute('href') === `#${entry.target.id}`);
                });
            }
        });
    }, { rootMargin: '-40% 0px -55% 0px' });

    sections.forEach(section => observer.observe(section));
}
function initStickyHeader() {
    const header = document.getElementById('site-header');
    if (!header) return;

    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                header.classList.toggle('scrolled', window.scrollY > 40);
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
}
function initFeaturedCarousel() {
    const track   = document.getElementById('featured-track');
    const dots    = document.getElementById('ctrl-dots');
    const prevBtn = document.getElementById('ctrl-prev');
    const nextBtn = document.getElementById('ctrl-next');
    if (!track || !dots) return;

    let slides   = [];
    let dotEls   = [];
    let current  = 0;
    let timer    = null;
    const INTERVAL = 5000;

    fetchAthletes().then(athletes => {
        if (!athletes || !athletes.length) return;

        const featured = athletes.slice(0, 4);
        renderSlides(featured);
        renderDots(featured.length);
        bindControls();
        startTimer();

        slides = track.querySelectorAll('.featured-slide');
        dotEls = dots.querySelectorAll('.ctrl-dot');
    });

    function renderSlides(list) {
        track.innerHTML = list.map((a, i) => `
            <div class="featured-slide${i === 0 ? ' active' : ''}" data-index="${i}">
                <div class="featured-bg">
                    <img src="${a.image}" alt="${a.name}" loading="${i === 0 ? 'eager' : 'lazy'}">
                </div>
                <div class="featured-overlay"></div>
                <div class="featured-content">
                    <div class="featured-tag">Featured Athlete</div>
                    <h3 class="featured-name">${a.name}</h3>
                    <div class="featured-sport">${a.sport}</div>
                   
                    <a href="#contact" class="featured-link">
                        Inquire About Representation
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </a>
                </div>
            </div>
        `).join('');
    }

    function renderDots(count) {
        dots.innerHTML = Array.from({ length: count }, (_, i) => `
            <button class="ctrl-dot${i === 0 ? ' active' : ''}"
                    data-index="${i}"
                    aria-label="Go to athlete ${i + 1}">
            </button>
        `).join('');
    }

    function showSlide(index) {
        slides.forEach((s, i) => s.classList.toggle('active', i === index));
        dotEls.forEach((d, i) => {
            const isActive = i === index;
            d.classList.toggle('active', isActive);
            d.setAttribute('aria-pressed', String(isActive));
        });
        current = index;
    }

    function next() { showSlide((current + 1) % slides.length); }
    function prev() { showSlide((current - 1 + slides.length) % slides.length); }

    function startTimer() { stopTimer(); timer = setInterval(next, INTERVAL); }
    function stopTimer()  { clearInterval(timer); }

    function bindControls() {
        if (prevBtn) prevBtn.addEventListener('click', () => { prev(); startTimer(); });
        if (nextBtn) nextBtn.addEventListener('click', () => { next(); startTimer(); });

        dots.addEventListener('click', e => {
            const dot = e.target.closest('.ctrl-dot');
            if (!dot) return;
            showSlide(parseInt(dot.dataset.index, 10));
            startTimer();
        });

        track.addEventListener('mouseenter', stopTimer);
        track.addEventListener('mouseleave', startTimer);
    }
}
async function loadDynamicContent() {
    const athletesGrid = document.getElementById('athletes-grid');
    const newsGrid      = document.getElementById('news-grid');
    const targetsList   = document.getElementById('targets-list');

    await Promise.allSettled([
        athletesGrid ? loadAthletes(athletesGrid)   : Promise.resolve(),
        newsGrid      ? loadNews(newsGrid)           : Promise.resolve(),
        targetsList   ? loadTargets(targetsList)     : Promise.resolve(),
    ]);

    if (typeof AOS !== 'undefined') AOS.refresh();
}
async function loadAthletes(container) {
    try {
        const athletes = await fetchJSON('athletes.json');
        container.innerHTML = '';

        athletes.forEach((a, i) => {
            const card = document.createElement('article');
            card.className = 'athlete-card';
            card.setAttribute('data-aos', 'fade-up');
            card.setAttribute('data-aos-delay', String(i * 80));

             const tagsHtml = (a.tags || []).map(tag => {
                const isAward = tag.includes('Champ') || tag.includes('Gold') || tag.includes('Major') || tag.includes('MVP') || tag.includes('Record') || tag.includes('Winner');
                return `<span class="athlete-tag">${isAward ? laurelSvg : ''}<span>${tag}</span></span>`;
            }).join('');

            card.innerHTML = `
                <a href="athlete.html?id=${a.id}" class="athlete-card-link" aria-label="View ${a.name}'s profile">
                    <div class="athlete-img">
                        <img src="${a.image}" alt="${a.name}" loading="lazy">
                    </div>
                    <div class="athlete-overlay"></div>
                    <div class="athlete-body">
                        <div class="athlete-sport">${a.sport}</div>
                        <h3 class="athlete-name">${a.name}</h3>
                        <div class="athlete-tags">${tagsHtml}</div>
                        <span class="athlete-profile-cta">
                            View Profile
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                        </span>
                    </div>
                </a>
            `;

            container.appendChild(card);
        });
    } catch (err) {
        console.warn('Could not load athletes:', err);
        container.innerHTML = '<p class="placeholder-text">Athlete data unavailable.</p>';
    }
}
const laurelSvg = `<svg class="tag-icon" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 13C6 13 2 10 2 6C2 4 3 2 6 1C3 2 2 4 2 6C2 10 6 13 6 13Z" stroke="currentColor" stroke-width="0.8" stroke-linecap="round"/>
    <path d="M6 13C6 13 10 10 10 6C10 4 9 2 6 1C9 2 10 4 10 6C10 10 6 13 6 13Z" stroke="currentColor" stroke-width="0.8" stroke-linecap="round"/>
</svg>`;
async function loadTargets(container) {
    try {
        const targets = await fetchJSON('targets.json');
        container.innerHTML = '';

        targets.forEach((t, i) => {
            const card = document.createElement('article');
            card.className = 'target-card';
            card.setAttribute('data-aos', 'fade-up');
            card.setAttribute('data-aos-delay', String(i * 100));

            const detailsHtml = (t.details || []).map(d => `
                <div class="target-detail-row">
                    <span class="target-detail-icon" aria-hidden="true">${targetIcon(d.icon)}</span>
                    <span class="target-detail-label">${d.label}:</span>
                    <span class="target-detail-value">${d.value}</span>
                </div>
            `).join('');

            card.innerHTML = `
                <div class="target-img">
                    <img src="${t.image}" alt="${t.name}, ${t.location}" loading="lazy">
                </div>
                <div class="target-content">
                    <div class="target-top">
                        <h3 class="target-name">${t.name}</h3>
                        <span class="target-badge">${t.badge}</span>
                    </div>
                    <div class="target-location">${t.location}</div>
                    <div class="target-details">${detailsHtml}</div>
                    <div class="target-why-label">Why This Race?</div>
                    <p class="target-why-text">${t.why}</p>
                </div>
            `;

            container.appendChild(card);
        });

    } catch (err) {
        console.warn('Could not load targets:', err);
        container.innerHTML = '<p class="placeholder-text">Outreach target data unavailable.</p>';
    }
}

/**
 * Returns inline SVG for a named target detail icon.
 * @param {string} name — 'calendar' | 'trophy' | 'globe' | 'email'
 */
function targetIcon(name) {
    const icons = {
        calendar: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
        trophy:   `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 010-5H6"/><path d="M18 9h1.5a2.5 2.5 0 000-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0012 0V2z"/></svg>`,
        globe:    `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>`,
        email:    `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`,
    };
    return icons[name] || icons.globe;
}
async function loadNews(container) {
    try {
        const articles = await fetchJSON('news.json');
        container.innerHTML = '';

        articles.forEach((item, i) => {
            const card = document.createElement('article');
            card.className = 'news-card';
            card.setAttribute('data-aos', 'fade-up');
            card.setAttribute('data-aos-delay', String(i * 80));

            card.innerHTML = `
                <div class="news-meta">
                    <span class="news-cat">${item.category}</span>
                    <time class="news-date" datetime="${item.date}">${formatDate(item.date)}</time>
                </div>
                <h3 class="news-title">${item.title}</h3>
                <p class="news-desc">${item.description}</p>
                <div class="news-footer">
                    <a href="#contact" class="news-link">
                        Read More
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </a>
                </div>
            `;

            container.appendChild(card);
        });
    } catch (err) {
        console.warn('Could not load news:', err);
        container.innerHTML = '<p class="placeholder-text">News data unavailable.</p>';
    }
}
function initContactForm() {
    const RECIPIENT = 'contact@lionstridemanagement.com';

    const form      = document.getElementById('contact-form');
    const btn       = document.getElementById('submit-btn');
    const successEl = document.getElementById('form-success');
    const errorEl   = document.getElementById('form-error');
    if (!form || !btn || !successEl) return;

    form.addEventListener('submit', e => {
        e.preventDefault();

        const name    = form.querySelector('#name').value.trim();
        const email   = form.querySelector('#email').value.trim();
        const subject = form.querySelector('#subject').value.trim();
        const message = form.querySelector('#message').value.trim();

         if (!name || !email || !subject || !message) {
            if (errorEl) errorEl.hidden = false;
            return;
        }
        if (errorEl) errorEl.hidden = true;

         const body = [
            'MESSAGE FROM WEBSITE',
            '─────────────────────────────',
            '',
            `Name:     ${name}`,
            `Email:    ${email}`,
            `Subject:  ${subject}`,
            '',
            'Message:',
            message,
            '',
            '─────────────────────────────',
            'Sent via LionStride Management website',
        ].join('\n');

        const mailtoSubject = encodeURIComponent(`Message from website — ${subject}`);
        const mailtoBody    = encodeURIComponent(body);
        const mailtoLink    = `mailto:${RECIPIENT}?subject=${mailtoSubject}&body=${mailtoBody}`;

        window.location.href = mailtoLink;

        form.querySelectorAll('.field-row, .field-group, .btn-submit')
            .forEach(el => { el.style.display = 'none'; });
        successEl.hidden = false;

        form.reset();
    });

    form.querySelectorAll('.field-input').forEach(input => {
        input.addEventListener('input', () => {
            if (errorEl) errorEl.hidden = true;
        });
    });
}

async function fetchJSON(url) {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to fetch ${url}`);
    return res.json();
}

async function fetchAthletes() {
    try {
        const res = await fetch('scroll.json');
        if (!res.ok) throw new Error('Failed');
        return res.json();
    } catch {
        return [];
    }
}

function formatDate(dateString) {
    const date = new Date(dateString + 'T00:00:00');
    return date.toLocaleDateString('en-US', {
        year: 'numeric', month: 'short', day: 'numeric',
    });
}

function setFooterYear() {
    const el = document.getElementById('footer-year');
    if (el) el.textContent = new Date().getFullYear();
}