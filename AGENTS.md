# AGENTS.md

Read this before changing any file.

## What this is

**My Tasks** — a single-page to-do app. Plain HTML, CSS, JavaScript. Data lives in `localStorage`. No framework, no library, no backend, no API calls, no build or bundling step. The app runs by opening `index.html` directly and deploys to Vercel as static files.

Files: `index.html` (structure), `style.css` (styling), `script.js` (logic), `PRD.md` (source of truth), `README.md`, `journal.md`.

## Rules

1. Do not add frameworks, libraries, Tailwind, a bundler, or a build step. Use plain CSS with literal values; do not add CSS custom properties (`--var`).
2. Do not add a backend, API calls, accounts, due dates, priorities, tags, projects, drag-and-drop reordering, dark mode, or multiple lists.
3. Keep logic in `script.js`, structure in `index.html`, styling in `style.css`. Do not add runtime JS files or a module system.
4. Every interactive element must work with the keyboard alone: Tab to focus, Enter or Space to activate buttons, Escape to cancel an in-progress edit, Enter to save an edit.
5. Every button and input must have a visible focus state and an accessible name. The edit control uses `aria-label="Edit task"`. The edit input must be labelled. Do not hide functional icons from assistive tech.
6. Use semantic HTML (`main`, `header`, `form`, `label`, `input`, `ul`, `li`, `button`, `section`) instead of `div` wherever a semantic element exists. Use `div` only when no semantic element fits.
7. Decorative icons get `aria-hidden="true"`. Functional icons (e.g. the edit pencil) get an accessible name and stay visible to assistive tech.
8. Do not delete or rename existing `localStorage` keys. Current key is `tasks`, an array of `{ id, text, completed }`. If the shape must change, migrate on read and never break loading of the existing array.
9. Reject empty or whitespace-only task text on add and on edit. Show inline feedback linked to the input via `aria-describedby`. Do not rely on colour alone.
10. Provide three filters — All, Active, Completed — as keyboard-operable controls with visible focus states and an accessible group label. The active filter must be programmatically indicated.
11. Show a friendly empty-state message when the current filter has no tasks. The message must be perceivable to screen readers and must not be the only indication of state.
12. Include a polite live region that announces the current task count and filter changes (e.g. "3 active tasks, 1 completed").
13. Tasks must persist across page refresh, tab close, and full browser restart via `localStorage`.
14. After every change, verify the browser console has zero errors and zero warnings introduced by the change. Report changes as: `path/to/file — what changed — why`, plus any `localStorage` migration notes.

## v1.2 inline task editing

Each task has an Edit control (pencil icon, `aria-label="Edit task"`). Activating it replaces the task text with a pre-filled input, focused, cursor at the end. Enter or blur saves. Escape cancels and restores the original. Empty or whitespace-only edits are rejected and the original text restored. Completed tasks are editable. Edits persist to `localStorage` by mutating the existing task object in place (same `id`, same key) and writing the full array back — do not create parallel keys or duplicate tasks. The whole flow must work keyboard-only with visible focus states.

## Design direction

Clean, calm, product-like. Minimal and restrained — not tutorial-style. One accent colour plus a neutral scale of at most 5 steps (e.g. 50/200/500/700/900) for text, borders, and surfaces. Prefer flat fills and soft shadows over gradients. Card shadow: `0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)` or equivalent. Generous spacing, rounded corners. System font stack. Mobile first: usable and readable from 320px upward, with 375px as the primary design width.

## Process

- Before writing code, post a short plan (files touched, approach) and wait for explicit human approval in the current session before editing any file.
- If the PRD is silent on a decision: **stop and ask. Do not guess. Do not add new user-facing features without PRD approval.** If approved, log the decision in `journal.md`.