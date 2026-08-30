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

**Challenges:** [FILL IN after running the prompt – what did the agent get wrong on the first pass? What did you have to push back on?]

**Result:** [FILL IN – e.g. v1.1 live on Vercel, keyboard-only test passed, looks right at 375px.]

**Commits this session:** PRD, context file, logo and brand, button states, empty state, input validation, filters, accessibility, responsive layout, README, journal.
