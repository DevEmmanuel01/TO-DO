# Project Journal: My Tasks

Written as I go. Newest entry at the bottom.

---

## 18 Aug 2026 – First build (v1.0)

**Worked on:** Scaffolded the app from a single prompt in Antigravity: build a to-do dashboard with HTML, CSS and JS, persist data with web storage, no Tailwind or CSS variables, keep it plain. Agent produced `index.html`, `style.css`, `script.js` (482 lines total).

**Decisions:** Kept it to three files. Kept it plain so I could read every line. Asked the agent to initialise Git and make the initial commit instead of doing it in the terminal.

**Challenges:** Setup earlier in the week had permission errors on macOS. Fixed with elevated privileges. The app itself built and ran first try.

**Result:** Add, toggle, delete, clear completed, counters, localStorage persistence. Pushed to GitHub. Deployed on Vercel.

---

## 30 Aug 2026 – Refinement pass (v1.1)

**Worked on:** Went back to v1.0 with the roadmap from class. Instead of prompting "make it nicer," I audited it against one core user goal (write a task in under 5 seconds, see it tomorrow).

Problems found in v1.0:
- No brand or logo. Generic heading.
- Buttons have one state only. No hover, focus, active.
- No empty state. Blank white space when there are no tasks.
- Accepts empty or whitespace-only tasks.
- Focus rings not visible. Counters do not announce changes to screen readers.
- Delete icon has no accessible name.
- Not comfortable on a phone.

**Decisions:**
- Wrote `PRD.md` before touching code. Listed out-of-scope items explicitly so I would stop adding features.
- Wrote `AGENTS.md` as a context file so the agent works inside the same constraints every time, not just this session.
- Added filters (All / Active / Completed). Rejected due dates because they add a decision at input time.
- One accent colour, no gradients. Logo is a simple wordmark plus a check mark so it does not fight the content.
- Kept the existing `localStorage` key so old tasks still load.

**Prompt used:** Structured with role, context, task, constraints, output format. Told the agent to show a plan first and wait for approval.

**Challenges:** The agent's first pass got the layout technically right but visually wrong: it crammed elements together with tight spacing, and some styling did not match the calm, spaced-out direction in AGENTS.md. I pushed back and had it increase the spacing between the stats card and the input form, enlarge the padding and font size on the filter buttons so they work as touch targets, and add a proper icon to the empty state instead of text alone. I also had it hide the Clear Completed button when the list is empty, since a button that does nothing should not be on screen. Lesson: the agent gets you 80% there, the design eye is still my job.

**Result:** v1.1 is live on Vercel. Keyboard-only test passed: everything reachable with Tab, tasks add with Enter, toggle with Space. Layout holds at 375px and works comfortably on my phone. All changes went in under one documented commit covering the full v1.1 refinement list, plus the three follow-up fixes above.

**Commits this session:** PRD, context file, logo and brand, button states, empty state, input validation, filters, accessibility, responsive layout, README, journal.

## 6 Sept 2026 — v1.2: inline editing

**Worked on:** shipped inline task editing (edit button → input → Enter/blur saves, Escape cancels, same validation as Add).

**Chose:** editing over dark mode or due dates. It directly serves the core goal (fast task capture, fast correction) and maps to this week's class content — updating part of a record is a PATCH, not a delete-and-recreate.

**Parked:** due dates, drag-to-reorder, dark mode. Still out of scope — none of them serve the "under 5 seconds" goal yet.
