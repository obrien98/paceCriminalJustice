function formatEventDate(dateValue) {
    return new Date(`${dateValue}T12:00:00`).toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric"
    });
}

function escapeHtml(value) {
    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#39;");
}

function setFooterYear() {
    const year = document.getElementById("year");

    if (year) {
        year.textContent = new Date().getFullYear();
    }
}

function setupNavigation() {
    const hamburger = document.getElementById("hamburger");
    const navRight = document.getElementById("navRight");

    if (!hamburger || !navRight) {
        return;
    }

    hamburger.addEventListener("click", () => {
        const isOpen = navRight.classList.toggle("active");
        hamburger.setAttribute("aria-expanded", String(isOpen));
    });
}

function setupLightbox() {
    if (typeof GLightbox === "function") {
        GLightbox({
            selector: ".glightbox",
            touchNavigation: true,
            loop: true,
            zoomable: true
        });
    }
}

function renderLeadership() {
    const grid = document.getElementById("leadershipGrid");

    if (!grid) {
        return;
    }

    if (!siteData.officers.length) {
        grid.innerHTML = `
            <div class="leader-card">
                <img src="images/officer-placeholder.jpeg" alt="Leadership placeholder" class="leader-img">
                <h3>Leadership Team</h3>
                <p class="leader-role">Profiles Coming Soon</p>
                <p class="leader-bio">Add officers in scripts/data.js to feature names, roles, photos, and contact information here.</p>
            </div>
        `;
        return;
    }

    grid.innerHTML = siteData.officers.map((member) => `
        <article class="leader-card">
            <img src="${escapeHtml(member.image || "images/officer-placeholder.jpeg")}" alt="${escapeHtml(member.name)}" class="leader-img">
            <h3>${escapeHtml(member.name)}</h3>
            <p class="leader-role">${escapeHtml(member.role)}</p>
            <p class="leader-bio">${escapeHtml(member.bio || "Leadership profile coming soon.")}</p>
            <div class="social-icons">
                ${member.email ? `<a href="mailto:${escapeHtml(member.email)}" aria-label="Email ${escapeHtml(member.name)}"><i class="fa-regular fa-envelope"></i></a>` : ""}
                <a href="https://www.instagram.com/paceplv.cjs" aria-label="Instagram" target="_blank" rel="noreferrer"><i class="fa-brands fa-instagram"></i></a>
            </div>
        </article>
    `).join("");
}

function renderEvents(gridId, includeCurrentEvent = true) {
    const grid = document.getElementById(gridId);

    if (!grid) {
        return;
    }

    const currentId = new URLSearchParams(window.location.search).get("id");
    const events = includeCurrentEvent
        ? siteData.events
        : siteData.events.filter((event) => event.id !== currentId);

    if (!events.length) {
        grid.innerHTML = `
            <article class="event-empty">
                <h3>No events posted yet</h3>
                <p>Use this section to feature upcoming panels, workshops, speaker events, and networking opportunities.</p>
                <a href="https://settersyncplv.pace.edu/organization/criminal-justice-society" class="view-more-btn" target="_blank" rel="noreferrer">Visit SetterSync</a>
            </article>
        `;
        return;
    }

    grid.innerHTML = events.map((event) => `
        <a href="event.html?id=${encodeURIComponent(event.id)}" class="event-card">
            <div class="event-img">
                <img src="${escapeHtml(event.image || "images/img1.png")}" alt="${escapeHtml(event.name)}">
            </div>
            <div class="event-content">
                <h3>${escapeHtml(event.name)}</h3>
                <div class="event-meta">
                    <p><i class="fa-regular fa-calendar"></i>${escapeHtml(formatEventDate(event.date))} ${escapeHtml(event.time)}</p>
                    <p><i class="fa-solid fa-location-dot"></i>${escapeHtml(event.location)}</p>
                </div>
                <div class="event-footer">Criminal Justice Society</div>
            </div>
        </a>
    `).join("");
}

function renderEventDetail() {
    const shell = document.getElementById("eventDetail");

    if (!shell) {
        return;
    }

    const eventId = new URLSearchParams(window.location.search).get("id");
    const event = siteData.events.find((entry) => entry.id === eventId);

    if (!event) {
        return;
    }

    document.title = `${event.name} | Pace Criminal Justice Society`;

    shell.innerHTML = `
        <p class="event-detail-kicker">Featured Event</p>
        <h1>${escapeHtml(event.name)}</h1>
        <p class="event-detail-summary">Use this page for event context, then send students to SetterSync for the official RSVP flow.</p>
        <div class="event-detail-meta">
            <div>
                <span>Date</span>
                <strong>${escapeHtml(formatEventDate(event.date))}</strong>
            </div>
            <div>
                <span>Time</span>
                <strong>${escapeHtml(event.time)}</strong>
            </div>
            <div>
                <span>Location</span>
                <strong>${escapeHtml(event.location)}</strong>
            </div>
        </div>
        <p class="event-detail-description">${escapeHtml(event.description || "Details coming soon.")}</p>
        <div class="join-actions" style="margin-top: 1.5rem;">
            <a class="cta-primary" href="https://settersyncplv.pace.edu/organization/criminal-justice-society" target="_blank" rel="noreferrer">View on SetterSync</a>
            <a class="cta-secondary" href="index.html#events">Back to Events</a>
        </div>
    `;
}

document.addEventListener("DOMContentLoaded", () => {
    setFooterYear();
    setupNavigation();
    setupLightbox();
    renderLeadership();
    renderEvents("eventsGrid", true);
    renderEventDetail();
    renderEvents("relatedEventsGrid", false);
});
