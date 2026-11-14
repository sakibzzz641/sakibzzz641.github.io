/* Project detail page: reads ?id=..., takes metadata from DATA.projects
   Content source priority: 1) projects/<id>.md, 2) GitHub README.md */
const $ = s => document.querySelector(s);
const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const lnk = (h, t, c, x) => h ? '<a class="' + c + '" href="' + esc(h) + '"' + (x ? ' target="_blank" rel="noopener"' : '') + '>' + t + '</a>' : '';
const D = DATA, P = D.profile, projects = D.projects || [];

const revealObserver = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ? null
  : new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: .12, rootMargin: '0px 0px -40px' });

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
$('#footer').innerHTML = '&copy; ' + new Date().getFullYear() + ' ' + esc(P.name);

const others = projects.filter(x => x.id && x.id !== id);
if (others.length) $('#more').innerHTML =
  '<h2>More projects</h2><div class="mlist">' + others.map(x =>
    '<a class="c-' + esc(x.color || 'green') + '" href="project.html?id=' + encodeURIComponent(x.id) + '">' +
    '<b>' + esc(x.title) + '</b><span>' + esc((x.category || []).join(', ')) + '</span></a>'
  ).join('') + '</div>';

if (!p) {
  document.title = 'Project not found | ' + P.name;
  $('#phead').remove(); $('#toc').remove();
  $('#doc').innerHTML = '<h1>Project not found</h1><p>There is no project with the id &ldquo;' + esc(id || '') + '&rdquo;. <a href="index.html#projects">Back to all projects</a>.</p>';
} else init();

// ── Shared state for current project branch ──────────────────────────
let _currentBranch = 'main';
let _toc = [];

function init() {
  document.title = p.title + ' | ' + P.name;
  document.body.classList.add('c-' + (p.color || 'green'));
  $('#phead').innerHTML =
    '<div class="wrap reveal">' +
    [...(p.category || []), ...(p.tags || [])].map(t => '<span class="pill">' + esc(t) + '</span>').join('') +
    '<h1>' + esc(p.title) + '</h1>' +
    '<p class="lead">' + esc(p.description) + '</p>' +
    '<div class="cta">' +
    lnk(p.repo, 'GitHub Repository &#8599;', 'btn fill', 1) +
    lnk(p.liveApp, 'Live App &#8599;', 'btn line', 1) +
    '</div></div>';

  const seen = {};
  const slug = s => s.toLowerCase().replace(/<[^>]+>/g, '').replace(/[^\p{L}\p{N}]+/gu, '-').replace(/^-+|-+$/g, '') || 'section';

  marked.use({ renderer: {
    heading(text, level, raw) {
      const b = slug(raw), n = (seen[b] = (seen[b] || 0) + 1);
      const sid = n > 1 ? b + '-' + n : b;
      if (level === 2 || level === 3) _toc.push({ sid, level, text: raw });
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
          return m ? '<div class="ratio"><iframe src="https://www.youtube-nocookie.com/embed/' + m[1] + '" title="YouTube video" loading="lazy" allowfullscreen></iframe></div>' : '<p class="err">Invalid YouTube link or id.</p>';
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

  // Try local markdown first, then fall back to GitHub README
  fetch(p.page || 'projects/' + p.id + '.md')
    .then(r => { if (!r.ok) throw 0; return r.text(); })
    .then(md => renderContent(md, false))
    .catch(() => {
      if (p.repoSlug && p.repo) {
        showLoading('Fetching README from GitHub...');
        const ghApiUrl = 'https://api.github.com/repos/' + p.repoSlug;
        fetch(ghApiUrl)
          .then(r => { if (!r.ok) throw 0; return r.json(); })
          .then(info => {
            _currentBranch = info.default_branch || 'main';
            const rawUrl = 'https://raw.githubusercontent.com/' + p.repoSlug + '/' + _currentBranch + '/README.md';
            return fetch(rawUrl);
          })
          .then(r => { if (!r.ok) throw 0; return r.text(); })
          .then(rawMd => renderContent(rawMd, true))
          .catch(() => showError('readme-fetch-failed'));
      } else {
        showError('no-content');
      }
    });
}

function showLoading(msg) {
  $('#toc').remove();
  $('#doc').innerHTML = '<p class="note">⏳ ' + esc(msg) + '</p>';
}

function showError(type) {
  $('#toc').remove();
  let msg = '';
  if (type === 'no-content') {
    msg = 'The full write-up for this project is not available yet. Add <code>projects/' + esc(p.id) + '.md</code> to publish it. If you opened this file straight from disk, run a local server instead (for example <code>python -m http.server</code>), because browsers block file loading from <code>file://</code>.';
  } else {
    msg = 'Could not load the project write-up. <a href="' + esc(p.repo) + '" target="_blank" rel="noopener">View on GitHub</a>.';
  }
  $('#doc').innerHTML = '<p class="note">' + msg + '</p>';
}

// ════════════════════════════════════════════════════════════════════
//  Render pipeline
// ════════════════════════════════════════════════════════════════════
function renderContent(rawMd, isReadme) {
  const processed = isReadme ? processReadme(rawMd) : rawMd;
  $('#doc').innerHTML = marked.parse(processed);
  $('#doc').classList.add('reveal');
  buildToc(_toc);
  initTables();
  initMermaid();
  initLightbox();
  revealElements();
}

// ════════════════════════════════════════════════════════════════════
//  README processing (GitHub-specific cleanup)
// ════════════════════════════════════════════════════════════════════
/**
 * Clean up a GitHub README for portfolio display:
 *  - Removes top-level H1 (already shown in #phead)
 *  - Moves Shields badges into a compact row at top
 *  - Fixes relative image paths → absolute RAW URLs
 *  - Fixes relative anchor links (e.g. [text](./README.md)) → repo links
 *  - Wraps everything in <div class="readme">
 */
function processReadme(raw) {
  // Extract Shield badges into their own container
  const shieldRe = /!\[([^\]]*)\]\((https:\/\/img\.shields\.io\/[^)]+)\)/g;
  const shields = [];
  let noShields = raw.replace(shieldRe, (_, alt, url) => {
    shields.push('<img src="' + esc(url) + '" alt="' + esc(alt) + '">');
    return '';
  });

  // Remove top-level H1 (header already shows the project name)
  let body = noShields.replace(/^\n*# +(.+?) *\n+/m, '');

  // Fix relative image paths: ![](relative/path) → absolute RAW URL
  const ghRawBase = 'https://raw.githubusercontent.com/' + p.repoSlug + '/' + _currentBranch;
  body = body.replace(/!\[([^\]]*)\]\((?!https?:\/\/)([^)]+)\)/g, (_, alt, path) => {
    const abs = ghRawBase + '/' + path.replace(/^\//, '');
    return '![' + esc(alt) + '](' + esc(abs) + ')';
  });

  // Fix relative anchor links ([text](./path.md) etc.) → link to repo/blob
  body = body.replace(/\[([^\]]*)\]\(\.\/([^)]+)\)/g, '[_ref_$1_$2]');
  body = body.replace(/_ref_([^\]]*)_([^)]+)/g, (_, txt, link) => {
    if (link.includes('.md')) return '[' + esc(txt) + '](' + esc(p.repo) + ')';
    return '[' + esc(txt) + '](' + esc(p.repo + '/blob/main/' + link) + ')';
  });

  // Wrap in .readme wrapper, prepend badge row if any
  const badgeHtml = shields.length ? '<div class="badges">' + shields.join('') + '</div>\n\n' : '';
  return '<div class="readme">' + badgeHtml + body + '</div>';
}

// ════════════════════════════════════════════════════════════════════
//  Table of contents
// ════════════════════════════════════════════════════════════════════
function buildToc(toc) {
  if (toc.length < 2) { $('#toc').remove(); return; }
  $('#toc').innerHTML =
    '<b>On this page</b>' + toc.map(t =>
      '<a class="l' + t.level + '" href="#' + t.sid + '">' + esc(t.text) + '</a>'
    ).join('');
  const io = new IntersectionObserver(es => {
    es.forEach(e => {
      if (e.isIntersecting) {
        document.querySelectorAll('#toc a').forEach(a =>
          a.classList.toggle('on', a.hash === '#' + e.target.id)
        );
      }
    });
  }, { rootMargin: '-80px 0px -70% 0px' });
  toc.forEach(t => io.observe(document.getElementById(t.sid)));
}

// ════════════════════════════════════════════════════════════════════
//  Mermaid diagrams
// ════════════════════════════════════════════════════════════════════
function initMermaid() {
  if (!document.querySelector('.mermaid')) return;
  const s = document.createElement('script');
  s.src = 'https://cdn.jsdelivr.net/npm/mermaid@10.9.1/dist/mermaid.min.js';
  s.onload = () => { mermaid.initialize({ startOnLoad: false, theme: 'neutral', fontFamily: 'Inter,sans-serif' }); mermaid.run(); };
  document.head.appendChild(s);
}

// ════════════════════════════════════════════════════════════════════
//  Sortable + searchable CSV tables
// ════════════════════════════════════════════════════════════════════
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

// ════════════════════════════════════════════════════════════════════
//  Click-to-zoom lightbox
// ════════════════════════════════════════════════════════════════════
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
  $('#doc').addEventListener('click', e => {
    const t = e.target.closest('img.zoom');
    if (t) show(list().indexOf(t));
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
