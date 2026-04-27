# Khinkali Timer / Focus Dashboard

Khinkali Timer is a Georgian khinkali-themed focus dashboard for timed work sessions, lightweight task tracking, focus stats, and distraction blocking.

## Features

- Countdown focus timer with pause, resume, reset, reload restore, alarm sounds, and Georgian/English UI
- Natural time input parsing, including `25m`, `1h30m`, `90s`, `10:30`, and plain numbers as minutes
- Georgian time inputs such as `25წ`, `1სთ30წ`, and `90წმ`
- Daily task board with To-Do, In Progress, and Done columns
- Drag a task onto the timer to start a 25-minute focus session for that task
- Focus stats, khinkali count, streak display, and shareable story image export
- RSS news panel with a default Georgian feed and optional custom HTTP(S) feed URL
- PWA manifest and service worker for installable/offline app-shell behavior
- Optional Chrome extension that receives timer state and redirects distracting sites while the timer is running

## Live Demo

[Try Khinkali Timer on GitHub Pages](https://tutashkhia-pixel.github.io/Khinkali-Timer)

## Run Locally

Serve the repository root with a local static server:

```bash
python3 -m http.server 4173
```

Then open:

```text
http://127.0.0.1:4173/index.html
```

Opening `index.html` directly can show the basic page, but a local HTTP server is recommended because service workers, workers, PWA behavior, and browser-extension integration expect an HTTP origin.

## Timer Inputs

Supported examples:

- `25m`
- `1h30m`
- `90s`
- `10:30`
- `25` meaning 25 minutes
- `25წ`
- `1სთ30წ`
- `90წმ`

## Chrome Extension

The extension lives in `extension/`.

To test it:

1. Open Chrome Extensions.
2. Enable Developer Mode.
3. Choose "Load unpacked".
4. Select the `extension/` folder.
5. Open the local app or production URL and start, pause, and stop the timer.

The extension listens for timer state messages from the dashboard and redirects configured distracting sites while focus mode is running.

## Deploy with GitHub Pages

1. Go to repository Settings -> Pages.
2. Set the source to the `main` branch and root folder.
3. The site will be available at `https://tutashkhia-pixel.github.io/Khinkali-Timer`.

## Launch QA

Use `launch-qa-checklist.md` for release smoke testing across timer behavior, task flows, feeds, PWA behavior, extension behavior, legal links, and documentation.
