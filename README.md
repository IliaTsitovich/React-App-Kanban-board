# Awesome Kanban Board

A drag-and-drop Kanban board with local profiles — a fully client-side demo app (no backend, no
database) built with React 19 + Vite.

## Table of Content

- [About The App](#about-the-app)
- [Features](#features)
- [Technologies](#technologies)
- [Setup](#setup)
- [Available Scripts](#available-scripts)
- [Demo limitations](#demo-limitations)
- [Deployment](#deployment)
- [Screenshots](#screenshots)

## About The App

A Kanban board is a tool for visualizing work as cards moving through columns
(Backlog → Ready → In Progress → Finished). Each profile created in a browser gets its own board,
which is handy for keeping separate lists. Profiles are not accounts and boards are not private.

## Features

- Drag-and-drop task cards between columns and within a column ([dnd-kit](https://dndkit.com/)),
  with full keyboard support (Tab to a card, Space/arrow keys to move it).
- Add, edit, and delete tasks, with priority, due date, and description.
- Search/filter tasks by title.
- Local profiles, each with its own board. Create, switch, and delete them from the profile screen.
- Light/dark theme toggle (defaults to your OS preference).
- Toast notifications for key actions.
- Everything persists to `localStorage`; two tabs of the app stay in sync with each other.

## Technologies

React 19, React Router 7, Vite, dnd-kit, react-hook-form + zod, sass, sonner.

## Setup

This project pins Node via `.nvmrc`. If you use [nvm](https://github.com/nvm-sh/nvm):

```bash
nvm install
nvm use
```

Then:

```bash
npm install
npm run dev
```

## Available Scripts

- `npm run dev` — start the Vite dev server.
- `npm run build` — production build to `dist/`.
- `npm run preview` — preview the production build locally.
- `npm run lint` — run ESLint.
- `npm run deploy` — build and publish `dist/` to GitHub Pages.

## Demo limitations

This app has no server, so there are no real accounts and no security boundary:

- Profiles have no passwords. Anyone using the same browser can open any profile and its tasks.
- Data lives only in this browser's `localStorage`. It doesn't sync between devices, there is no
  backup, and clearing site data deletes it.
- Don't store anything sensitive here.

Older versions stored emails and password hashes. The app removes them from `localStorage` the next
time it loads; existing boards are kept.

## Deployment

Deployed to GitHub Pages via `gh-pages`. Because GitHub Pages is static hosting with no
server-side rewrites, a hard refresh on a route like `/profiles` is handled by
`public/404.html`, which redirects back into the app while preserving the path.

## Screenshots

_From an earlier version of the app — the board and columns still work the same way, styling and
features (profiles, drag-and-drop) have since been added._

<div>
  <img src="https://github.com/IliaTsitovich/screen-projects/blob/main/kanban/main.png"  title="main-page" alt="main page kanban" width='800' height="600"/>&nbsp;
  <img src="https://github.com/IliaTsitovich/screen-projects/blob/main/kanban/add%20task.png"  title="add" alt="image add new task" width='800' height="600"/>&nbsp;
  <img src="https://github.com/IliaTsitovich/screen-projects/blob/main/kanban/functional.png" title="functional application" alt="functional" width='800' height="600"/>&nbsp;
  <img src="https://github.com/IliaTsitovich/screen-projects/blob/main/kanban/info-task.png" title="info" alt="information task" width='800' height="600"/>&nbsp;
</div>

Picture by [Ilya Tsitovich](https://github.com/IliaTsitovich)
