# Mission Control on grok.com

Daniel Freed’s plan: **one Grok project per work project** on the main Grok site ([grok.com](https://grok.com)), plus a colorful office page so he can see which bots are working and on what.

---

## Live office URL

**Primary (verified HTTP 200):**  
https://rawcdn.githack.com/freeddan-lgtm/mission-control-office/main/index.html

**Standalone fallback (office data baked in):**  
https://rawcdn.githack.com/freeddan-lgtm/mission-control-office/main/mission-control-standalone.html

**Source repo:** https://github.com/freeddan-lgtm/mission-control-office

**Vercel production (deployed, not publicly open yet):**  
https://mission-control-freeddan-6550s-projects.vercel.app/  

Vercel CLI was logged out (`vercel whoami` → Logged out). Deploy succeeded via the Vercel connector into project `mission-control` (`prj_9m5RGmRWUspVh8eC1MqJhOnOSPFk`). Anonymous `curl` gets a **302 to Vercel SSO**, so the page is not public until Deployment Protection / SSO is turned off for that team project.

**To finish the Vercel public URL**, Daniel (or parent agent with him) should:

1. Open this one-time team authorize link (expires ~10 minutes from creation; request a fresh one if expired):  
   https://vercel.com/sso/session-requests/esoVbrvQNUJkXQYGUkjBvyN4SDfSbbq0  
   Team: `team_k9bV9obMTNf4lmVkJt3nD5Ci` (`freeddan-6550s-projects`)
2. After approve, set `ssoProtection` to `null` on project `mission-control`, then redeploy from `/workspace/mission-control-grok`.

Until then, use the **rawcdn.githack** URL in all project instructions.

Bots update the office by editing `office.json` in the GitHub repo (or in `/workspace/mission-control-grok/office.json` and pushing). The multi-file page loads `office.json` live.

---

## Part 1 — Research (real sources only)

### (a) How grok.com Projects work

| Topic | Finding | Verified? | Sources |
| --- | --- | --- | --- |
| Where | Projects live in the left sidebar on **grok.com** (not every alternate host). | Verified (third-party walkthrough citing official help note about hosts) | [tipsmake.com walkthrough](https://tipsmake.com/project-feature-in-grok-ai-ehbwv); [metagrok](https://metagrok.io/how-to/why-grok-bot-cannot-access-grok-com-projects) links [grok.com/project](https://grok.com/project) |
| Create | **Create project** → name (+ files at create). Instructions / share live on the project page. | Verified (screenshots Sep 2026) | [AI Tools Field Guide — Projects](https://sean.theinformed.org/ai-tools/projects.html); [Grok skills/projects/automations](https://sean.theinformed.org/ai-tools/grok-skills-and-automations.html); [YouTube 2026 create guide](https://www.youtube.com/watch?v=bkYGfhzJFy4) |
| Instructions | Standing project instructions; also a **project config tab** for instructions + automations on the project canvas. | Verified (release notes + field guide) | [xAI release notes mirror](https://releases.sh/xai/release-notes-2) (Aug 1 / Sep notes); [field guide](https://sean.theinformed.org/ai-tools/grok-skills-and-automations.html) |
| Files | Upload sources; editable file tree; HTML previews as rendered; CSV/Office/3D previews; large storage claimed (~100 GB in field guide). | Verified for existence of files/previews; storage number is third-party | Release notes; [projects field guide](https://sean.theinformed.org/ai-tools/projects.html) |
| Chats | Separate conversations inside one project share instructions + files. “New conversation” / new chat per task. Pin conversations. | Verified | tipsmake; release notes (Aug 8, Aug 22) |
| Sharing | Share Project dialog exists (invite + general access). As of **Sep 2026** invite search often failed — treat sharing as unreliable. Sharing a project includes conversations (per release note). | Dialog verified; reliable sharing **unknown / unverified as of research date** | Field guide (tested 17 Sep 2026); release notes Aug 15 |
| Automations | Project can attach automations; “Your Automations” in project settings. | Verified | Field guide; release notes |
| Include / launch a Grok Bot **inside** a Project | **No verified automatic bind.** Bots appear in the separate **Bots / Grok Bot** sidebar section. Projects and Bots are separate workspaces; Bot does not auto-load Project chats/files/instructions. | Verified as separate products; “project launches bot” **not found / unverified** | [docs.x.ai FAQ](https://docs.x.ai/grok-bot/faq); [metagrok handoff note](https://metagrok.io/how-to/why-grok-bot-cannot-access-grok-com-projects); release notes “Grok Bot on grok.com” |

**Note:** `docs.x.ai` “Project rules / AGENTS.md” is for **Grok Build / coding CLI**, not the same thing as grok.com UI Projects. Do not confuse them. Source: [docs.x.ai project-rules](https://docs.x.ai/build/features/project-rules).

### (b) Grok Bot section on grok.com vs Grok Bot desktop app

| Finding | Verified? | Sources |
| --- | --- | --- |
| Grok (chat app on grok.com) and **Grok Bot** are **two different products**. | Verified | [docs.x.ai/grok-bot/faq](https://docs.x.ai/grok-bot/faq); [docs.x.ai/grok-bot/overview](https://docs.x.ai/grok-bot/overview) |
| Same Bots + conversations sync across Grok Bot **desktop and phone** apps when signed in. Also reachable in **X Chat** (rolling out). | Verified | FAQ; [cursor.com help — Grok Bot in X Chat](https://cursor.com/help/grok-bot/x-chat) |
| **Grok Bot on grok.com**: Bots appear in the sidebar Bots section for eligible SuperGrok tiers (release notes: SuperGrok Plus / Heavy; earlier note SuperGrok Heavy). Chat with a Bot or group without leaving the browser. | Verified in release notes | [releases.sh/xai/release-notes-2](https://releases.sh/xai/release-notes-2) (“Grok Bot on grok.com”) |
| Cursor-plan-only access may **not** unlock the Bots section inside the main Grok app (forum: SuperGrok-tied). | Partially verified (Cursor forum staff reply) | [forum.cursor.com thread](https://forum.cursor.com/t/grok-bot-subscribed-with-cursor-how-to-access-in-grok-app/174183) |
| Whether **every** bot/chat from the desktop app always shows 1:1 on grok.com for Daniel’s exact plan | **Unknown** — depends on plan linkage (The X Subscription / SuperGrok / Cursor). Re-check in his account. | — |

### (c) Live web page or Grok Imagine visuals in a project/chat

| Capability | Verified? | Sources |
| --- | --- | --- |
| **Imagine inside Projects** — generate images from a project’s composer. | Verified | Release notes Sep 5, 2026 |
| New canvas from Imagine can create a project with canvas ready. | Verified | Release notes Sep 26, 2026 |
| **HTML files in a project preview as rendered** (with toggle). | Verified | Release notes (“Projects: HTML files now preview as rendered with toggle”) |
| **Grok Build / Build Mode** — describe a site, get a **live preview** in chat, publish to grok.me or a domain. Available on web/iOS/Android. | Verified (official x.ai) | [x.ai/news/grok-build-mode](https://x.ai/news/grok-build-mode); [x.ai/news/grok-build-for-everyone](https://x.ai/news/grok-build-for-everyone); [x.ai/grok/build-mode](https://x.ai/grok/build-mode) |
| Native “always-on iframe of an external Mission Control URL” as a first-class project pane | **Not verified** — no primary doc found for embedding arbitrary external live URLs as a permanent project chrome. Practical workaround: put the office URL in instructions + files, open it beside grok.com, or use Build Mode / HTML preview for an in-Grok visual. | — |

### (d) Most practical way to put Mission Control on grok.com **today**

**Verified practical path (no guessing):**

1. On **grok.com**, create **three Projects**: Mission Control, Agent World, Show Buddies.  
2. Paste the **project instructions** below into each project’s Instructions.  
3. Upload `office.json` (and optionally this README) as project files; put the **office live URL** in instructions.  
4. Use **one new conversation per task** inside the matching project.  
5. Keep bots in the **Grok Bot** sidebar (or Grok Bot app). They are the workers; Projects are the folders/context. When a bot needs project context, **hand-copy / attach** files (official split).  
6. Open the office URL in a browser tab (or phone) next to grok.com — top half of the phone shows desks + chatter; project list underneath.  
7. Optional later: Grok Build Mode to recreate a similar office *inside* Grok with a grok.me link; or HTML file preview inside the Mission Control project.

**What we could not verify:** a single official switch that “installs” a custom Mission Control UI into the grok.com chrome itself, or that auto-attaches named Bots as members of a Project.

---

## Part 2 — Office build

Built under `/workspace/mission-control-grok/`:

| File | Role |
| --- | --- |
| `index.html` | Mission Control shell |
| `styles.css` | Colorful, mobile-friendly layout; office ≈ top half of phone (`min(46dvh, 280px)`) |
| `app.js` | Renders desks, robots, speech bubbles, project list from JSON |
| `office.json` | **Single data file bots update** |
| `mission-control-standalone.html` | One-file backup with data inlined |
| `vercel.json` | Cache headers for `office.json` |

**Seeded data (America/Chicago):**

- Product at Desk 1 on **Agent World** — “Speed up the slow first load” since **9:40 AM CT**
- Chatter: Chief → Product (code decision / first-load); The Contrarian → everyone (Darren silent partner; code is ours)
- Empty desks 2–4 still drawn
- Projects listed: Agent World (with product link `https://ce2-h7w3n9x5kq2m.vercel.app/`), Show Buddies, Mission Control

---

## Part 3 — Ready-to-paste project instructions

### Mission Control — project instructions

```
This project is Mission Control for Daniel Freed.

Purpose: Coordinate the office view, the shared rules for how we work on grok.com, and updates to the live office page. Do not do Agent World or Show Buddies product work in this project’s chats — open those projects instead.

Office (live): https://rawcdn.githack.com/freeddan-lgtm/mission-control-office/main/index.html
Source: https://github.com/freeddan-lgtm/mission-control-office
Data file bots update: office.json (desks, chatter, projects).

Rules:
1. One project per chat topic — keep Mission Control chats only about the office, process, and cross-project status.
2. Read the notes / files in this project before working.
3. After you work, update the notes (and office.json when bots start/finish or talk).
4. Message Daniel only when you are blocked or he needs to decide.
5. Chatter lines: who → whom, one or two plain sentences, never full transcripts.
```

### Agent World — project instructions

```
This project is Agent World for Daniel Freed (main product: Agent World · Claude Edition).

Purpose: All product work for the 3D agent world. Keep context, decisions, and files here.

Product: https://ce2-h7w3n9x5kq2m.vercel.app/
Office (watch who’s working): https://rawcdn.githack.com/freeddan-lgtm/mission-control-office/main/index.html

Rules:
1. One project per chat — only Agent World work in this project. Use a new conversation for a distinct task.
2. Read the notes / files in this project before working.
3. After you work, update the notes. If a bot is working here, update office.json (desk + task + since; add a short chatter line when bots talk).
4. Message Daniel only when you are blocked or he needs to decide.
5. Darren is a silent partner; the code is ours — do not treat outside forks as source of truth unless Daniel says so.
```

### Show Buddies — project instructions

```
This project is Show Buddies for Daniel Freed.

Purpose: Jam-band buddy matching / tour social layer and related work that is not the Agent World product build itself. Keep Show Buddies context here.

Office (watch who’s working): https://rawcdn.githack.com/freeddan-lgtm/mission-control-office/main/index.html
Related product (Agent World merge): https://ce2-h7w3n9x5kq2m.vercel.app/  (belongs under Agent World; link only for reference)

Rules:
1. One project per chat — only Show Buddies work in this project. New conversation per distinct task.
2. Read the notes / files in this project before working.
3. After you work, update the notes; update office.json when a bot sits this desk or chats about this project.
4. Message Daniel only when you are blocked or he needs to decide.
```

---

## Simple setup steps on grok.com (from verified research only)

1. Open **https://grok.com** and sign in with the account that has Projects (sidebar). If Projects is missing, confirm you are on grok.com (not a host that lacks the feature).
2. In the left column, open **Projects** → **Create project**.
3. Create three projects named exactly: **Mission Control**, **Agent World**, **Show Buddies**.
4. For each project, open its settings / config and paste the matching **instructions** from Part 3 above.
5. Add files: upload `office.json` (and this README if useful). On Agent World, you can also save the product URL in a short notes file.
6. Start work with **New conversation** / a new chat **inside** the project that matches the work — not in the global chat list.
7. Open the office URL on your phone or a side tab:  
   https://rawcdn.githack.com/freeddan-lgtm/mission-control-office/main/index.html  
   You should see the office on the top half without scrolling, and the three projects underneath (product link only under Agent World).
8. Use the **Grok Bot** section (or the Grok Bot app) for the named bots. They do **not** automatically inherit Project files — attach or copy what they need. When they work, have them update `office.json`.
9. Optional: generate Imagine art inside a project, or try **Build Mode** later for an in-Grok live preview. Optional: after Vercel SSO is disabled, switch the office link in instructions to  
   https://mission-control-freeddan-6550s-projects.vercel.app/

---

## Updating the office (for bots)

Edit `office.json`:

- Put a bot object on a desk when working; set `bot` to `null` when done (desk stays visible).
- Add at most a couple of `chatter` items: `{ "from", "to", "text", "at" }` — one or two plain sentences.
- Set `updatedAt` to now in America/Chicago offset.
- Commit/push to `freeddan-lgtm/mission-control-office` (or redeploy Vercel once public).

---

## Curl verification (this run)

```
HTTP 200  https://rawcdn.githack.com/freeddan-lgtm/mission-control-office/main/index.html
HTTP 200  .../styles.css
HTTP 200  .../app.js
HTTP 200  .../office.json
HTTP 200  .../mission-control-standalone.html
HTTP 302→SSO  https://mission-control-freeddan-6550s-projects.vercel.app/
```

Checked Saturday Oct 31, 2026 (America/Chicago).
