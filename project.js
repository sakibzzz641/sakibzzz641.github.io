/* Project detail page: reads ?id=..., takes metadata from DATA.projects
   Content source priority: 1) projects/<id>.md, 2) GitHub README.md */
const $ = s => document.querySelector(s);
const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const lnk = (h, t, c, x) => h ? '<a class="' + c + '" href="' + esc(h) + '"' + (x ? ' target="_blank" rel="noopener"' : '') + '>' + t + '</a>' : '';
const D = DATA, P = D.profile, projects = D.projects || [];
const IC = {
  gh: '<svg class="fill" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>',
  live: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/></svg>'
};

// Module-level state shared between init and async callbacks
const state = {
  toc: [],
  seen: {},
  branch: 'main'
};

const revealObserver = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ? null
  : new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0, rootMargin: '0px 0px -40px' });

function revealElements() {
  document.querySelectorAll('.reveal').forEach(el => {
    if (revealObserver) revealObserver.observe(el);
    else el.classList.add('is-visible');
  });
}

const id = new URLSearchParams(location.search).get('id');
const p = projects.find(x => x.id === id);

$('#logoMark').innerHTML = esc(P.initials || '') + (P.photo ? '<img src="' + esc(P.photo) + '" alt="" onerror="this.remove()">' : '');
$('#logoName').textContent = P.shortName || P.name;
$('#themeBtn').addEventListener('click', () => toggleTheme());
$('#footer').innerHTML = '&copy; ' + new Date().getFullYear() + ' ' + esc(P.name);

const others = projects.filter(x => x.id && x.id !== id);
if (others.length) $('#more').innerHTML =
  '<h2>More projects</h2><div class="mlist">' + others.map(x =>
    '<a class="c-green" href="project.html?id=' + encodeURIComponent(x.id) + '">' +
    '<b>' + esc(x.title) + '</b><span>' + esc((x.category || []).join(', ')) + '</span></a>'
  ).join('') + '</div>';

if (!p) {
  document.title = 'Project not found | ' + P.name;
  $('#phead').remove(); removeToc();
  $('#doc').innerHTML = '<h1>Project not found</h1><p>There is no project with the id &ldquo;' + esc(id || '') + '&rdquo;. <a href="index.html#projects">Back to all projects</a>.</p>';
} else init();

function slugify(s) {
  return s.toLowerCase().replace(/<[^>]+>/g, '').replace(/[^\p{L}\p{N}]+/gu, '-').replace(/^-+|-+$/g, '') || 'section';
}

function init() {
  // Reset state for each project load
  state.toc = [];
  state.seen = {};
  state.branch = 'main';

  document.title = p.title + ' | ' + P.name;
  document.body.classList.add('c-green');
  $('#phead').innerHTML =
    '<div class="wrap">' +
    [...(p.category || []), ...(p.tags || [])].map(t => '<span class="pill">' + esc(t) + '</span>').join('') +
    '<h1>' + esc(p.title) + '</h1>' +
    '<p class="lead">' + esc(p.description) + '</p>' +
    '<div class="cta">' +
    lnk(p.repo, IC.gh + 'GitHub Repository', 'btn line', 1) +
    lnk(p.liveApp, IC.live + 'Live App', 'btn live', 1) +
    '</div></div>';

  const pi = projects.findIndex(x => x.id === p.id), pv = projects[(pi - 1 + projects.length) % projects.length], nx = projects[(pi + 1) % projects.length];
  if (projects.length > 1) $('#pn').innerHTML =
    '<a href="project.html?id=' + encodeURIComponent(pv.id) + '"><small>&larr; Previous</small><b>' + esc(pv.title) + '</b></a>' +
    '<a class="nxt" href="project.html?id=' + encodeURIComponent(nx.id) + '"><small>Next &rarr;</small><b>' + esc(nx.title) + '</b></a>';

  const localMd = p.page || ('projects/' + p.id + '.md');

  marked.use({ renderer: {
    heading(text, level, raw) {
      const b = slugify(raw);
      const n = (state.seen[b] = (state.seen[b] || 0) + 1);
      const sid = n > 1 ? b + '-' + n : b;
      if (level === 2 || level === 3) state.toc.push({ sid, level, text: raw });
      return '<h' + level + ' id="' + sid + '">' + text + '</h' + level + '>';
    },
    image(href, title, text) {
      return '<img class="zoom" src="' + esc(href) + '" alt="' + esc(text) + '" loading="lazy">' + (title ? '<span class="cap">' + esc(title) + '</span>' : '');
    },
    table(h, b) { return '<div class="tw"><table><thead>' + h + '</thead><tbody>' + b + '</tbody></table></div>'; },
    code(code, lang) {
      const c = code.trim(), L = c.split('\n').map(s => s.trim());
      switch ((lang || '').split(/\s/)[0]) {
        case 'mermaid':    return '<pre class="mermaid">' + esc(c) + '</pre>';
        case 'youtube': {
          const m = c.match(/(?:v=|youtu\.be\/|embed\/)([\w-]{11})/) || c.match(/^([\w-]{11})$/);
          return m
            ? '<div class="ratio"><iframe src="https://www.youtube-nocookie.com/embed/' + m[1] + '" title="YouTube video" loading="lazy" allowfullscreen></iframe></div>'
            : '<p class="err">Invalid YouTube link or id.</p>';
        }
        case 'video':      return '<video class="vid" controls preload="metadata" src="' + esc(L[0]) + '"' + (L[1] ? ' poster="' + esc(L[1]) + '"' : '') + '></video>';
        case 'gallery':    return '<div class="gal">' + L.filter(Boolean).map(l => {
          const a = l.split('|').map(x => x.trim());
          return '<img class="zoom" src="' + esc(a[0]) + '" alt="' + esc(a[1] || '') + '" loading="lazy">';
        }).join('') + '</div>';
        case 'embed':      return '<div class="embed"><iframe src="' + esc(L[0]) + '" style="height:' + (parseInt(L[1]) || 560) + 'px" loading="lazy" allowfullscreen title="Embedded content"></iframe></div>';
        case 'datatable':  return '<div class="dt" data-src="' + esc(L[0]) + '"></div>';
        default:           return false;
      }
    }
  }});

  function doRender(content, isReadme) {
    // Each step is isolated: one failing step must not blank the page
    const step = (name, fn) => { try { fn(); } catch (e) { console.error('[project.js] ' + name + ' failed:', e); } };
    try {
      const processed = isReadme ? processReadme(content) : content;
      $('#doc').innerHTML = marked.parse(processed);
    } catch (e) {
      console.error('renderContent error:', e);
      showError('render-failed');
      return;
    }
    step('buildToc', () => buildToc(state.toc));
    if (isReadme) step('fixRelative', fixRelative);
    step('wrapTables', wrapTables);
    step('initTables', initTables);
    step('initMermaid', initMermaid);
    step('initLightbox', initLightbox);
    step('revealElements', revealElements);
  }

  fetch(localMd)
    .then(r => { if (!r.ok) throw 0; return r.text(); })
    .then(md => doRender(md, false))
      .catch(() => {
      if (!(p.repoSlug && p.repo)) return showError('no-content');
      const ck = 'readme:' + p.repoSlug;
      try { const c = JSON.parse(sessionStorage.getItem(ck)); if (c && c.md) { state.branch = c.branch; return doRender(c.md, true); } } catch (e) {}
      showLoading('Loading README from GitHub...');
      const get = b => fetch('https://raw.githubusercontent.com/' + p.repoSlug + '/' + b + '/README.md')
        .then(r => { if (!r.ok) throw 0; return r.text().then(md => ({ b, md })); });
      get('main').catch(() => get('master'))
        .then(o => { state.branch = o.b; try { sessionStorage.setItem(ck, JSON.stringify({ branch: o.b, md: o.md })); } catch (e) {} doRender(o.md, true); })
        .catch(() => showError('readme-fetch-failed'));
    });
}

function removeToc() { const t = $('#toc'); if (t) t.remove(); }

function showLoading(msg) {
  removeToc();
  $('#doc').innerHTML = '<p class="note">&#9203; ' + esc(msg) + '</p>';
}

function showError(type) {
  removeToc();
  let msg = '';
  if (type === 'no-content') {
    msg = 'The full write-up for this project is not available yet. Add <code>projects/' + esc(p.id) + '.md</code> to publish it.';
  } else if (type === 'readme-fetch-failed') {
    msg = 'Could not load the project write-up from GitHub. <a href="' + esc(p.repo) + '" target="_blank" rel="noopener">View on GitHub</a>.';
  } else {
    msg = 'An unexpected error occurred. Please try again later.';
  }
  $('#doc').innerHTML = '<p class="note">' + msg + '</p>';
}

// ────────────────────────────────────────────────────────────────────
//  README pre-processing for clean portfolio display
// ────────────────────────────────────────────────────────────────────
/**
 * Clean up a GitHub README before rendering:
 *  - Remove top-level H1 (already shown in #phead)
 *  - Extract Shield badges into a compact row at top
 *  - Fix relative image paths -> absolute RAW URLs
 *  - Fix relative anchor links back to the repo
 *  - Wrap everything in <div class="readme">
 */
function processReadme(raw) {
  // Remove ALL badges (shields.io etc.), linked or not, markdown or HTML
  const H = 'https?:\\/\\/(?:img\\.shields\\.io|badgen\\.net|forthebadge\\.com|badge\\.fury\\.io|api\\.visitorbadge\\.io|hits\\.seeyoufarm\\.com|komarev\\.com)[^)\\s"\']*';
  const noBadges = raw
    .replace(new RegExp('\\[\\s*!\\[[^\\]]*\\]\\(\\s*' + H + '[^)]*\\)\\s*\\]\\([^)]*\\)', 'gi'), '')
    .replace(new RegExp('!\\[[^\\]]*\\]\\(\\s*' + H + '[^)]*\\)', 'gi'), '')
    .replace(new RegExp('<a\\b[^>]*>\\s*<img\\b[^>]*src=["\']' + H + '["\'][^>]*>\\s*</a>', 'gi'), '')
    .replace(new RegExp('<img\\b[^>]*src=["\']' + H + '["\'][^>]*>', 'gi'), '')
    .replace(/^[ \t]*$/gm, '')
    .replace(/\n{3,}/g, '\n\n');

  // Remove top-level H1 only (first # header at start of doc)
  let body = noBadges.replace(/^\n*# +(.+?) *\n+/m, '');

  // Fix relative image paths -> absolute raw URLs
  const ghRawBase = 'https://raw.githubusercontent.com/' + p.repoSlug + '/' + state.branch;
  body = body.replace(/!\[([^\]]*)\]\((?!https?:\/\/)([^)]+)\)/g, (_, alt, path) => {
    const abs = ghRawBase + '/' + path.replace(/^\//, '');
    return '![' + alt.replace(/[\[\]]/g, '') + '](' + abs.replace(/ /g, '%20') + ')';
  });

  // Fix relative anchor/link paths back to repo
  body = body.replace(/\[([^\]]*)\]\(\.\/([^)]+)\)/g, (_, txt, link) => {
    if (link.includes('.md')) return '[' + esc(txt) + '](' + esc(p.repo) + ')';
    return '[' + esc(txt) + '](' + esc(p.repo + '/blob/main/' + link) + ')';
  });

  return '<div class="readme">\n\n' + body + '\n\n</div>';
}

// ────────────────────────────────────────────────────────────────────
//  Table of contents
// ────────────────────────────────────────────────────────────────────
function buildToc(toc) {
  if (toc.length < 2) { removeToc(); return; }
  $('#toc').innerHTML =
    '<details' + (matchMedia('(max-width:860px)').matches ? '' : ' open') + '><summary>On this page</summary>' + toc.map(t =>
      '<a class="l' + t.level + '" href="#' + t.sid + '">' + esc(t.text) + '</a>'
    ).join('') + '</details>';
  const io = new IntersectionObserver(es => {
    es.forEach(e => {
      if (e.isIntersecting) {
        document.querySelectorAll('#toc a').forEach(a =>
          a.classList.toggle('on', a.hash === '#' + e.target.id)
        );
      }
    });
  }, { rootMargin: '-80px 0px -70% 0px' });
  toc.forEach(t => { const el = document.getElementById(t.sid); if (el) io.observe(el); });
}

// ────────────────────────────────────────────────────────────────────
//  Mermaid diagrams
// ────────────────────────────────────────────────────────────────────
function initMermaid() {
  const nodes = [...document.querySelectorAll('.mermaid')];
  if (!nodes.length) return;
  nodes.forEach(n => n.dataset.src = n.textContent);
  const run = () => {
    nodes.forEach(n => { n.removeAttribute('data-processed'); n.textContent = n.dataset.src; });
    mermaid.initialize({ startOnLoad: false, theme: document.documentElement.dataset.theme === 'dark' ? 'dark' : 'neutral', fontFamily: 'Inter,sans-serif' });
    mermaid.run({ nodes });
  };
  const go = () => { run(); document.addEventListener('themechange', run); };
  if (window.mermaid) return go();
  const s = document.createElement('script');
  s.src = 'https://cdn.jsdelivr.net/npm/mermaid@10.9.1/dist/mermaid.min.js';
  s.onload = go;
  document.head.appendChild(s);
}

// ────────────────────────────────────────────────────────────────────
//  Sortable + searchable CSV tables
// ────────────────────────────────────────────────────────────────────
function csv(t) {
  const r = [];
  let row = [], f = '', q = false;
  for (let i = 0; i < t.length; i++) {
    const c = t[i];
    if (q) {
      if (c === '"') { if (t[i + 1] === '"') { f += '"'; i++ } else q = false; }
      else f += c;
    } else if (c === '"') q = true;
    else if (c === ',') { row.push(f); f = ''; }
    else if (c === '\n' || c === '\r') {
      if (c === '\r' && t[i + 1] === '\n') i++;
      row.push(f); r.push(row); row = []; f = '';
    } else f += c;
  }
  if (f || row.length) { row.push(f); r.push(row); }
  return r.filter(x => x.join('') !== '');
}

function initTables() {
  document.querySelectorAll('.dt').forEach(el =>
    fetch(el.dataset.src)
      .then(r => { if (!r.ok) throw 0; return r.text(); })
      .then(t => dtable(el, csv(t)))
      .catch(() => { el.innerHTML = '<p class="err">Could not load ' + esc(el.dataset.src) + '</p>'; })
  );
}

function dtable(el, rows) {
  const head = rows[0], body = rows.slice(1);
  let q = '', col = -1, dir = 1, shown = 15;
  el.innerHTML = '<div class="dtbar">' +
    '<input type="search" placeholder="Search rows" aria-label="Search table">' +
    '<span></span>' +
    '</div><div class="tw"><table></table></div>' +
    '<button class="fbtn" type="button" hidden>Show more rows</button>';
  const inp = el.querySelector('input'), tb = el.querySelector('table'), info = el.querySelector('span'), more = el.querySelector('button');
  const num = v => { const n = parseFloat(String(v).replace(/[,$%\s]/g, '')); return isNaN(n) ? null : n; };
  function draw() {
    let r = body.filter(x => !q || x.join(' ').toLowerCase().includes(q));
    if (col >= 0) r = r.slice().sort((a, b) => {
      const x = num(a[col]), y = num(b[col]);
      return dir * (x !== null && y !== null ? x - y : String(a[col]).localeCompare(String(b[col])));
    });
    tb.innerHTML = '<thead><tr>' + head.map((h, i) =>
      '<th tabindex="0" data-i="' + i + '"' + (i === col ? ' aria-sort="' + (dir > 0 ? 'ascending' : 'descending') + '"' : '') + '>' + esc(h) + '</th>'
    ).join('') + '</tr></thead><tbody>' +
    r.slice(0, shown).map(x => '<tr>' + head.map((_, i) => '<td>' + esc(x[i]) + '</td>').join('') + '</tr>').join('') + '</tbody>';
    info.textContent = Math.min(shown, r.length) + ' of ' + r.length + ' rows';
    more.hidden = r.length <= shown;
  }
  inp.oninput = () => { q = inp.value.toLowerCase().trim(); shown = 15; draw(); };
  tb.onclick = e => { const h = e.target.closest('th'); if (!h) return; const i = +h.dataset.i; dir = (col === i) ? -dir : 1; col = i; draw(); };
  tb.onkeydown = e => { if (e.key === 'Enter' && e.target.tagName === 'TH') e.target.click(); };
  more.onclick = () => { shown += 15; draw(); };
  draw();
}

// ────────────────────────────────────────────────────────────────────
//  Click-to-zoom lightbox
// ────────────────────────────────────────────────────────────────────
function initLightbox() {
  const lb = $('#lb'), img = $('#lbImg'), cap = $('#lbCap');
  const list = () => [...document.querySelectorAll('img.zoom')];
  let cur = 0;
  const show = i => {
    const a = list(); cur = (i + a.length) % a.length;
    img.src = a[cur].currentSrc || a[cur].src;
    cap.textContent = a[cur].alt || '';
    lb.hidden = false;
    document.body.style.overflow = 'hidden';
  };
  const hide = () => { lb.hidden = true; document.body.style.overflow = ''; };
  // README images are often wrapped in a link ([![alt](img)](url)) and raw <img> tags
  // have no .zoom class, so make every image in the doc zoomable
  document.querySelectorAll('#doc img:not(.zoom)').forEach(im => im.classList.add('zoom'));
  $('#doc').addEventListener('click', e => {
    const t = e.target.closest('img.zoom');
    if (!t) return;
    e.preventDefault();   // stop the wrapping <a> from navigating to GitHub
    e.stopPropagation();
    show(list().indexOf(t));
  });
  lb.addEventListener('click', e => {
    if (e.target.closest('.x') || e.target === lb) hide();
    else if (e.target.closest('.pv')) show(cur - 1);
    else if (e.target.closest('.nx')) show(cur + 1);
  });
  document.addEventListener('keydown', e => {
    if (lb.hidden) return;
    if (e.key === 'Escape') hide();
    if (e.key === 'ArrowLeft') show(cur - 1);
    if (e.key === 'ArrowRight') show(cur + 1);
  });
}

// ────────────────────────────────────────────────────────────────────
//  README html fixes (raw <table>, relative <img src>, relative links)
// ────────────────────────────────────────────────────────────────────
function wrapTables() {
  document.querySelectorAll('#doc table').forEach(t => {
    if (t.closest('.tw')) return;
    const w = document.createElement('div'); w.className = 'tw';
    t.parentNode.insertBefore(w, t); w.appendChild(t);
  });
}
function fixRelative() {
  if (!p.repoSlug) return;
  const raw = 'https://raw.githubusercontent.com/' + p.repoSlug + '/' + state.branch + '/';
  const blob = p.repo + '/blob/' + state.branch + '/';
  const rel = u => u && !/^([a-z][a-z0-9+.-]*:|\/\/|#)/i.test(u);
  document.querySelectorAll('#doc img[src],#doc source[src],#doc video[src]').forEach(el => {
    const u = el.getAttribute('src'); if (rel(u)) el.setAttribute('src', raw + u.replace(/^\.?\//, ''));
  });
  document.querySelectorAll('#doc a[href]').forEach(a => {
    const u = a.getAttribute('href'); if (rel(u)) a.setAttribute('href', blob + u.replace(/^\.?\//, ''));
  });
}
