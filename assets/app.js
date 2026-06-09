(() => {
  // Inline the SVG sprite so <use href="#id"> works reliably.
  // Some browsers/environments are inconsistent with external sprites (file.svg#id).
  const rewriteExternalSpriteUses = () => {
    document.querySelectorAll('use[href], use[xlink\\:href]').forEach((use) => {
      ['href', 'xlink:href'].forEach((attr) => {
        const v = use.getAttribute(attr);
        if (!v) return;
        const i = v.indexOf('icons.svg#');
        if (i === -1) return;
        const id = v.slice(i + 'icons.svg#'.length);
        if (!id) return;
        use.setAttribute(attr, `#${id}`);
      });
    });
  };

  const injectIconsSprite = async () => {
    if (document.querySelector('svg[data-icons-sprite]')) return;

    // Works around spotty cross-browser support for external SVG sprites via <use href="file.svg#id">.
    // We inline the sprite into the DOM, then rewrite <use> to reference #id.
    const spriteUrl = new URL('assets/icons.svg', location.href);
    const res = await fetch(spriteUrl, { cache: 'force-cache' });
    if (!res.ok) return;
    const text = await res.text();

    const host = document.createElement('div');
    host.innerHTML = text;
    const svg = host.querySelector('svg');
    if (!svg) return;

    svg.setAttribute('data-icons-sprite', 'true');
    svg.style.display = 'none';

    const place = () => {
      if (!document.body) {
        requestAnimationFrame(place);
        return;
      }
      if (!document.querySelector('svg[data-icons-sprite]')) {
        const mount = document.getElementById('icons-sprite');
        if (mount) mount.replaceChildren(svg);
        else document.body.prepend(svg);
      }
      rewriteExternalSpriteUses();
    };
    place();
  };

  rewriteExternalSpriteUses();
  injectIconsSprite().catch(() => {});

  const nav = document.querySelector('[data-nav]');
  const btn = document.querySelector('[data-menu-btn]');

  if (btn && nav) {
    btn.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', String(open));
    });
  }

  // Mark active nav link based on path
  const path = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  document.querySelectorAll('a[data-nav-link]').forEach((a) => {
    const href = (a.getAttribute('href') || '').toLowerCase();
    if (href === path) a.setAttribute('aria-current', 'page');
  });

  // Contact helper: generate mailto from form without a backend
  const form = document.querySelector('form[data-mailto]');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const to = form.getAttribute('data-mailto') || '';
      const fd = new FormData(form);
      const nom = String(fd.get('nom') || '').trim();
      const tel = String(fd.get('telephone') || '').trim();
      const ville = String(fd.get('ville') || '').trim();
      const demande = String(fd.get('demande') || '').trim();
      const urgency = String(fd.get('urgence') || '').trim();

      const subject = encodeURIComponent(`Demande dépannage informatique - ${ville || 'Roanne'}`);
      const body = encodeURIComponent(
        [
          `Nom: ${nom}`,
          `Téléphone: ${tel}`,
          `Ville: ${ville}`,
          `Urgence: ${urgency}`,
          '',
          'Demande:',
          demande,
          '',
          'Envoyé depuis le site CyrilleDepanInfo',
        ].join('\n')
      );

      if (!to) return;
      location.href = `mailto:${encodeURIComponent(to)}?subject=${subject}&body=${body}`;
    });
  }
})();

