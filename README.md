# Awesome Kanban Board

A drag-and-drop Kanban board with local user accounts and an admin panel — a fully client-side
demo app (no backend, no database) built with React 19 + Vite.

## Table of Content

- [About The App](#about-the-app)
- [Features](#features)
- [Technologies](#technologies)
- [Setup](#setup)
- [Available Scripts](#available-scripts)
- [A note on authentication security](#a-note-on-authentication-security)
- [Deployment](#deployment)
- [Screenshots](#screenshots)

## About The App

A Kanban board is a tool for visualizing work as cards moving through columns
(Backlog → Ready → In Progress → Finished). This version adds local accounts, so each person who
registers in the same browser gets their own private board.

## Features

- Drag-and-drop task cards between columns and within a column ([dnd-kit](https://dndkit.com/)),
  with full keyboard support (Tab to a card, Space/arrow keys to move it).
- Add, edit, and delete tasks, with priority, due date, and description.
- Search/filter tasks by title.
- Local account registration and login — each user has their own board, isolated from others.
- The first account ever registered becomes an admin automatically.
- Admin panel to view all registered accounts, promote/demote, and delete users.
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

## A note on authentication security

Registration/login in this app is **entirely local**: there is no server, and "accounts" are
just entries in this browser's `localStorage`. Passwords are salted and hashed (SHA-256) before
being stored, so they aren't kept in plaintext — but because the code, the salt, and the hash all
live in the same browser the user controls, this offers **no real protection**. Anyone with
DevTools access to their own browser could inspect or edit their stored user record (e.g. change
their own role to `admin`). This is fine for a personal/demo Kanban board; do not reuse this
pattern for anything that needs genuine security.

## Deployment

Deployed to GitHub Pages via `gh-pages`. Because GitHub Pages is static hosting with no
server-side rewrites, a hard refresh on a route like `/login` or `/admin` is handled by
`public/404.html`, which redirects back into the app while preserving the path.

## Screenshots

_From an earlier version of the app — the board and columns still work the same way, styling and
features (auth, drag-and-drop, admin panel) have since been added._

<div>
  <img src="https://github.com/IliaTsitovich/screen-projects/blob/main/kanban/main.png"  title="main-page" alt="main page kanban" width='800' height="600"/>&nbsp;
  <img src="https://github.com/IliaTsitovich/screen-projects/blob/main/kanban/add%20task.png"  title="add" alt="image add new task" width='800' height="600"/>&nbsp;
  <img src="https://github.com/IliaTsitovich/screen-projects/blob/main/kanban/functional.png" title="functional application" alt="functional" width='800' height="600"/>&nbsp;
  <img src="https://github.com/IliaTsitovich/screen-projects/blob/main/kanban/info-task.png" title="info" alt="information task" width='800' height="600"/>&nbsp;
</div>

Picture by [Ilya Tsitovich](https://github.com/IliaTsitovich)
