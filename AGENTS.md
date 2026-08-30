# Context for AI agents working on this project

Read this before changing any file.

## What this is

A single-page to-do app called **My Tasks**. Built with plain HTML, CSS and JavaScript. Data lives in `localStorage`. No build step, no framework, no backend.

Files:
- `index.html` – structure
- `style.css` – all styling
- `script.js` – all logic
- `PRD.md` – what we are building and why
- `README.md` – case study
- `journal.md` – development log

## Rules

1. Do not add frameworks, libraries, Tailwind, or CSS variables. Plain CSS only.
2. Do not add a backend, API calls, or accounts.
3. Keep the three-file structure. Do not split into modules.
4. Every interactive element must be reachable and usable with the keyboard alone.
5. Every button and input must have a visible focus state and an accessible name.
6. Use semantic HTML (`main`, `header`, `form`, `ul`, `li`, `button`) before reaching for `div`.
7. Any icon that is decorative must be hidden from screen readers (`aria-hidden="true"`).
8. Do not delete or rename existing `localStorage` keys. Existing saved tasks must still load.
9. Explain your plan before writing code, and wait for approval.
10. After each change, list exactly which files were touched and what changed.

## Design direction

- Clean, calm, product-like. Think Linear or Things, not a tutorial demo.
- One accent colour, one neutral scale. No gradients.
- Generous spacing, rounded corners, soft shadow on the card.
- Font: system font stack.
- Mobile first: must look right at 375px wide.
