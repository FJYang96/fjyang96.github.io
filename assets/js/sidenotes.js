(function () {
  function buildSidenotes() {
    var article = document.querySelector('.article-content');
    if (!article) return;

    var references = article.querySelectorAll('a.footnote');
    if (!references.length) return;

    references.forEach(function (reference) {
      var targetId = decodeURIComponent(reference.getAttribute('href').slice(1));
      var footnote = document.getElementById(targetId);
      if (!footnote) return;

      var note = document.createElement('aside');
      note.className = 'sidenote';
      note.setAttribute('aria-hidden', 'true');
      note.innerHTML = '<span class="sidenote-number">' + reference.textContent + '</span>' + footnote.innerHTML;

      note.querySelectorAll('.reversefootnote').forEach(function (backlink) {
        backlink.remove();
      });

      var marker = reference.closest('sup') || reference;
      marker.insertAdjacentElement('afterend', note);
    });

    article.classList.add('sidenotes-ready');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', buildSidenotes);
  } else {
    buildSidenotes();
  }
})();
