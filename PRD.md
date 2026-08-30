# Product Requirement Document: My Tasks

**Version:** 1.1 (refinement of the 18 Aug 2026 build)
**Owner:** Gbolahan Adekola
**Status:** In progress

## 1. The problem

Most to-do apps are heavier than the problem they solve. They add projects, tags, priorities and reminders before the person has even written down what they need to do today. I wanted the opposite: a page I can open, type into, and close.

The first version (v1.0) proved the core loop works: add a task, tick it, delete it, and the data survives a refresh. But it looked like a demo, not a product. No brand, weak button states, no empty state, and it was not fully usable with a keyboard or screen reader.

## 2. Who it is for

- Primary: me, as a designer keeping track of small daily tasks during the Ship & Found bootcamp.
- Secondary: anyone who wants a single-page task list with zero setup and no account.

## 3. Core user goal

Write a task down in under 5 seconds and see it again tomorrow.

Everything in this document serves that one goal. Anything that slows it down is out of scope.

## 4. User flow

1. Open the page.
2. Type a task, press Enter (or click Add).
3. Tick the task when done.
4. Optionally clear completed tasks.
5. Close the tab. Tasks are still there next time.

## 5. What v1.1 changes

| Area | v1.0 | v1.1 |
|---|---|---|
| Brand | No logo, generic "My Tasks" heading | Simple wordmark/logo, consistent colour system |
| Buttons | One visual state | Hover, focus, active and disabled states |
| Empty state | Blank white space | Friendly message when there are no tasks |
| Input | Accepts empty strings | Blocks empty or whitespace-only tasks, shows inline feedback |
| Filters | None | All / Active / Completed |
| Accessibility | Partial | Visible focus rings, labelled controls, live region for counts, works with keyboard only |
| Responsiveness | Desktop-first | Comfortable on a phone screen |

## 6. Out of scope (deliberately)

- Accounts or login
- Due dates, priorities, tags, projects
- Drag-and-drop reordering
- Any backend or database
- Frameworks (React, Tailwind, etc.)

These would each be a good feature. None of them serve the core user goal for this version.

## 7. Success metrics

- Adding a task takes one action (type + Enter).
- Whole app usable with keyboard only.
- No console errors.
- Data persists across refresh and browser restart.
- Deploys on Vercel with no build step.

## 8. Tech stack decision

HTML, CSS and vanilla JavaScript with `localStorage`.

Reason: the tech stack table from class recommends HTML/CSS/JS for lightweight, no-login projects. There is no backend, no auth and no data shared between users, so a framework would be over-engineering.
