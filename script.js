/* ============ Shared behaviour across all pages ============ */

// Mobile nav toggle
document.addEventListener('DOMContentLoaded', () => {
  const burger = document.querySelector('.burger');
  const links = document.querySelector('.nav-links');
  if (burger && links) {
    burger.addEventListener('click', () => links.classList.toggle('open'));
    links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => links.classList.remove('open')));
  }
});

/* ============ Project data (shared by project.html & project-detail.html) ============ */
const PROJECTS = [
  {
    id: 'journal-app',
    title: 'Journal App',
    category: 'Mobile App Design',
    tags: 'App Design, Mobile UI',
    gradient: 'linear-gradient(135deg,#34d399,#059669)',
    summary: 'A calming daily journaling app designed to make writing feel like a two-minute habit, not a chore.',
    image: 'Mobile App UI Design Inspiration for 2026.jpg',
    details: [
      'Most journaling apps feel like blank-page anxiety. Journal App set out to make the first entry of the day take under two minutes.',
      'I designed short guided prompts and a simple mood tracker up front, with the option to write freely once the habit sticks.',
      'Testers who used the guided prompts kept a daily streak noticeably longer than those starting from a blank page.'
    ]
  },
  {
    id: 'web-coffeeshop',
    title: 'Web Coffee Shop',
    category: 'Website Design',
    tags: 'Web Design, E-commerce',
    gradient: 'linear-gradient(135deg,#f472b6,#a855f7)',
    summary: 'A warm, menu-first website for a local coffee shop, built to make ordering online feel as easy as ordering at the counter.',
    image: 'Specialty Coffee - Elegant Café Landing Page Design.jpg',
    details: [
      'The coffee shop wanted a site that felt like walking into the store — warm tones, clear menu, no clutter.',
      'I designed a single-scroll menu with large photography and a sticky order button, so customers never lose their place while browsing.',
      'Online orders picked up noticeably after launch, with most customers completing checkout in under a minute.'
    ]
  },
  {
    id: 'logo',
    title: 'Brand',
    category: 'Media Social Kit',
    tags: 'Logo Design, Moodboard',
    gradient: 'linear-gradient(135deg,#60a5fa,#2563eb)',
    image: 'download (2).jpg',
    summary: 'A logo, color palette, and moodboard-driven identity kit built to keep a brand feeling consistent across every touchpoint.',
    details: [
      'The brand had no consistent identity — different fonts and colors from post to post with no clear visual anchor.',
      'I started with a moodboard to lock the mood and palette, then designed a simplified logomark that reads clearly even at small social sizes.',
      'The final kit included reusable templates so the team could stay on-brand without needing a designer for every graphic.'
    ]
  }
];

/* ============ Project grid renderer (project.html) ============ */
function renderProjectGrid(containerId, page = 1, perPage = 6) {
  const el = document.getElementById(containerId);
  if (!el) return;
  const start = (page - 1) * perPage;
  const items = PROJECTS.slice(start, start + perPage);
  el.innerHTML = items.map(p => `
    <a class="project-card" href="detailproject.html?id=${p.id}">
      <div class="project-thumb" style="background:${p.gradient}">
        <img src="${p.image}" alt="${p.title}" style="width:100%;height:100%;object-fit:cover;">
        <span class="tag">${p.category}</span>
      </div>
      <div class="project-body">
        <div class="project-info">
          <h4 style="color:#0d1524">${p.title}</h4>
          <span class="meta" style="color:#3a4a63">${p.tags}</span>
        </div>
        <span class="btn-arrow">&rarr;</span>
      </div>
    </a>
  `).join('');
}

function setupProjectPager(containerId, dotsId, perPage = 6) {
  const dotsEl = document.getElementById(dotsId);
  if (!dotsEl) return;
  const pageCount = Math.ceil(PROJECTS.length / perPage);
  dotsEl.innerHTML = '';
  for (let i = 1; i <= pageCount; i++) {
    const dot = document.createElement('button');
    dot.className = 'dot' + (i === 1 ? ' active' : '');
    dot.setAttribute('aria-label', 'Go to page ' + i);
    dot.addEventListener('click', () => {
      renderProjectGrid(containerId, i, perPage);
      dotsEl.querySelectorAll('.dot').forEach(d => d.classList.remove('active'));
      dot.classList.add('active');
      document.getElementById(containerId).scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    dotsEl.appendChild(dot);
  }
}

/* ============ Project detail renderer (project-detail.html) ============ */
function renderProjectDetail() {
  const root = document.getElementById('project-detail');
  if (!root) return;
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id') || PROJECTS[0].id;
  const idx = PROJECTS.findIndex(p => p.id === id);
  const p = PROJECTS[idx] || PROJECTS[0];
  const prev = PROJECTS[(idx - 1 + PROJECTS.length) % PROJECTS.length];
  const next = PROJECTS[(idx + 1) % PROJECTS.length];

  document.title = p.title + ' — Jenna Ortega';

  document.getElementById('detail-eyebrow').textContent = p.category;
  document.getElementById('detail-title').textContent = p.title;
  document.getElementById('detail-summary').textContent = p.summary;
  document.getElementById('detail-hero-img').style.background = p.gradient;
  document.getElementById('detail-hero-photo').src = p.image;
  document.getElementById('detail-hero-photo').alt = p.title;

  document.getElementById('detail-body').innerHTML =
    '<h3>Project overview</h3>' +
    p.details.map(d => `<p>${d}</p>`).join('');

  document.getElementById('prev-link').href = 'detailproject.html?id=' + prev.id;
  document.getElementById('prev-title').textContent = prev.title;
  document.getElementById('next-link').href = 'detailproject.html?id=' + next.id;
  document.getElementById('next-title').textContent = next.title;
}

/* ============ Contact form (contact.html) ============ */
function setupContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const original = btn.textContent;
    btn.textContent = 'Message sent ✓';
    btn.disabled = true;
    form.reset();
    setTimeout(() => { btn.textContent = original; btn.disabled = false; }, 2600);
  });
}