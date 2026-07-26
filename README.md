# Assassin's Creed Hub

A frontend-only, dark-themed fan reference site for the Assassin's Creed franchise — browse every
released title, protagonist, historical era, and setting, compare games side-by-side, and save
favorites.

**This project was written but not built/run in this environment** (the sandbox that generated it
has no internet access, so `npm install` couldn't be executed here). It uses only stable, well-known
package versions, so it should install and run normally on your machine.

## Stack

- React 18 + Vite
- Redux Toolkit (`games`, `characters`, `favorites`, `search`, `filters`, `theme` slices)
- React Router DOM v6
- Ant Design v5 (`ConfigProvider` switches live between dark and light algorithms/tokens)
- Dark/Light mode toggle (sun/moon button in the top navbar), persisted to `localStorage` and
  respecting the OS `prefers-color-scheme` on first visit
- LocalStorage-backed favorites
- No TypeScript

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL (typically `http://localhost:5173`).

To build for production:

```bash
npm run build
npm run preview
```

## Project structure

```
src/
  data/            mock datasets (games, characters, historical settings, timeline)
  store/           Redux Toolkit store + slices
  components/      shared UI (Navbar, Footer, cards, error/loading states)
  pages/           one file per route
  App.jsx          route table + lazy-loaded pages
  main.jsx         Redux/AntD/Router providers
  index.css        design tokens + cinematic theme (dark, red & gold accents)
```

## Notes

- All game/character data is static/local — there is no real backend. Redux thunks simulate an
  async API call (with a short delay) so loading and error states are real and exercised in the UI.
- Favorites persist across reloads via `localStorage`.
- Screenshots, trailers, and cover art are rendered as themed CSS gradients rather than licensed
  images, since real Assassin's Creed artwork is copyrighted.
- Per the project brief, the app makes no mention of Hasan ibn Sabbah or the Nizari Ismailis
  anywhere in its content.
