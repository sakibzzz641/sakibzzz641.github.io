/* projects.js — #projects এর ভেতরে featured + grid card বানায় */
(function () {
  var root = document.getElementById('projects');
  var list = window.PROJECTS;
  if (!root || !list) return;

  var esc = function (s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  };
  var GH = '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38v-1.33c-2.23.48-2.7-1.07-2.7-1.07-.36-.92-.89-1.17-.89-1.17-.73-.5.06-.49.06-.49.8.06 1.23.83 1.23.83.72 1.22 1.88.87 2.33.66.07-.52.28-.87.5-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.6 7.6 0 0 1 4 0c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.28.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48v2.2c0 .21.15.46.55.38A8 8 0 0 0 16 8c0-4.42-3.58-8-8-8z"/></svg>';

  function card(p, featured) {
    var img = p.image
      ? '<div class="pj-img"><img src="' + esc(p.image) + '" alt="' + esc(p.title) + ' cover" loading="lazy" onerror="this.parentNode.remove()"></div>'
      : '';
    var tags = (p.tags || []).map(function (t) { return '<span>' + esc(t) + '</span>'; }).join('');
    var code = p.repo
      ? '<a href="https://github.com/' + esc(p.repo) + '" target="_blank" rel="noopener">' + GH + 'Code</a>'
      : '';
    return '<article class="pj-card' + (featured ? ' is-featured' : '') + '">' + img +
      '<div class="pj-bar"><span class="pj-dots"><i></i><i></i><i></i></span>' +
      (p.file ? '<span class="pj-file">' + esc(p.file) + '</span>' : '') +
      (p.category ? '<span class="pj-pill">' + esc(p.category) + '</span>' : '') + '</div>' +
      '<div class="pj-body">' +
      '<h3 class="pj-title">' + esc(p.title) + '</h3>' +
      '<p class="pj-sum">' + esc(p.summary) + '</p>' +
      (p.highlight ? '<p class="pj-hl">' + p.highlight + '</p>' : '') + // <b> allowed (your own data)
      (tags ? '<div class="pj-tags">' + tags + '</div>' : '') +
      '<div class="pj-actions">' + code +
      '<a class="pj-case" href="project.html?id=' + encodeURIComponent(p.id) + '">Read full case →</a></div>' +
      '</div></article>';
  }

  var feat = list.filter(function (p) { return p.featured; });
  var rest = list.filter(function (p) { return !p.featured; });
  root.innerHTML =
    (feat.length ? '<div class="pj-featured">' + feat.map(function (p) { return card(p, true); }).join('') + '</div>' : '') +
    (rest.length ? '<div class="pj-grid">' + rest.map(function (p) { return card(p, false); }).join('') + '</div>' : '');
})();
