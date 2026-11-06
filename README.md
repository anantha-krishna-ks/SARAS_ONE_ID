# ExcelSoft OneID Console

Identity, access and trust management console — built with **React 18 + Vite**.

The UI, field vocabulary and page/operation set follow the OneID Data Dictionary
and the OneID UI Navigation Flow: tenants, users, roles, permissions, events,
notifications, jobs, schedules, and the schedule / execution / application /
navigation / audit logs, plus login + MFA.

## Getting started

```bash
npm install
npm run dev      # start the Vite dev server
npm run build    # production build to dist/
npm run preview  # preview the production build
```

## Project structure

```
index.html          Vite entry (loads /src/main.jsx)
src/
  main.jsx          React entry — mounts <App/>
  App.jsx           The whole console (screens, modals, shell)
  data.js           Data model + pure view helpers (badges, list builder)
  theme.css         Design tokens (CSS vars), resets, hover states, keyframes
public/assets/      Logo + login background
preview.html        Standalone CDN build for quick, no-install preview
```

`preview.html` is a self-contained mirror for environments without a Node
toolchain; the source of truth is `src/`.
