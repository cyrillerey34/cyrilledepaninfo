(() => {
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

