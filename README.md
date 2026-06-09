# CyrilleDepanInfo (site vitrine)

Site vitrine statique en français pour une micro‑entreprise de dépannage/réparation informatique sur **Roanne et alentours**.

## Lancer le site en local

### Option 1 (simple): ouvrir le fichier

Ouvrez `index.html` dans votre navigateur.

### Option 2 (recommandé): petit serveur local

Dans PowerShell, depuis ce dossier:

```powershell
python -m http.server 5173
```

Puis ouvrez `http://localhost:5173`.

## À personnaliser avant mise en ligne

- Numéro: vérifiez que le numéro est correct sur toutes les pages (`tel:+33614300644`).
- Email: dans `contact.html`, l’email est `cyrille.rey34@gmail.com` (modifiable si besoin).
- Mentions légales: complétez `mentions-legales.html` (adresse, hébergeur…).
- URL du site: remplacez `https://example.com/` (balises `canonical`, `sitemap.xml`, `robots.txt`, JSON-LD).
- Tarifs: `tarifs.html` est réglé sur **50€ / heure** + **10€** par déplacement (+ devis sur demande).

## Fichiers

- Pages: `index.html`, `services.html`, `tarifs.html`, `zone.html`, `faq.html`, `contact.html`, `mentions-legales.html`
- Styles: `assets/style.css`
- JS (menu + formulaire mailto): `assets/app.js`
- OG image + favicon: `assets/og.svg`, `assets/favicon.svg`

