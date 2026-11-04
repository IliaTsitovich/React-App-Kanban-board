# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Recruiters and developers evaluating Ilya Tsitovich's work. They arrive from a portfolio or the GitHub repository, usually with a few minutes to spare, and try the app to judge how well it was built.

## Product Purpose

Awesome Kanban Board is a portfolio project: a working drag-and-drop task board that demonstrates frontend quality. Success means a visitor can see careful, considered work within a couple of minutes of using it.

## Positioning

A complete Kanban workflow that runs entirely in the browser and is honest about what it is. It makes no account or privacy promises it cannot keep.

## Operating Context

Visitors open the public site at https://iliatsitovich.github.io/React-App-Kanban-board/, create a profile, and try the board. They typically arrive with no tasks of their own and no prior explanation. Pushes to `main` deploy through GitHub Actions after lint, audit, and build pass.

## Capabilities and Constraints

- Four fixed columns: Backlog, Ready, In Progress, Finished.
- Tasks have a title, description, priority, and due date, and can be added, edited, deleted, searched by title, and moved by mouse or keyboard.
- New cards are added to Backlog.
- New profiles start with example tasks that teach the board; a single action clears them.
- Local profiles each own a board. "Profile" is the product term; these are not accounts.
- Profiles have no passwords, so anyone using the same browser can open them.
- Data lives only in the browser's `localStorage`. It does not sync between devices, has no backup, and is lost if site data is cleared. Open tabs of the same browser stay in sync.
- Light and dark themes are available, defaulting to the OS preference.
- Hosted on GitHub Pages, so custom response headers and server-side rewrites are unavailable.
- Open decision: a backend and real accounts may be added later. Until then, nothing may imply accounts, sync, or privacy.

## Brand Commitments

- Product name: Awesome Kanban Board.
- Author credit linking to https://github.com/IliaTsitovich.

## Evidence on Hand

- The live site and public repository at https://github.com/IliaTsitovich/React-App-Kanban-board.
- README screenshots come from an earlier version and do not show the current interface.
- There are no testimonials, user numbers, or case studies. Do not invent any.

## Product Principles

- Quality must be evident quickly: the first few minutes decide how the work is judged.
- A first-time visitor should be able to start without explanation.
- Say plainly what the product cannot do; never imply protection or persistence it lacks.
- Handle failure honestly: never report success for work that was not saved.

## Accessibility & Inclusion

Moving cards must remain fully possible by keyboard.
