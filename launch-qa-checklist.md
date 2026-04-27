# Khinkali Timer Launch QA Checklist

Use this checklist for local and production release smoke testing.

## Test Targets

- Local: `http://127.0.0.1:4173/index.html`
- Production: `https://khinkali-dash.netlify.app/`

## Launch Blockers

- Timer starts from `25m`, plain `25`, `1h30m`, `90s`, and Georgian inputs such as `25წ`.
- Timer pause, resume, reset, and finish all update the display and status correctly.
- Running timer survives page reload and immediately shows the remaining time.
- Paused timer survives page reload and can resume from the saved remaining time.
- Finished or reset sessions update focus stats without double-counting after reload.
- Task board can add, delete, drag between columns, and save after refresh.
- Dragging a task onto the timer starts a focus session and does not leave the timer panel with a stale border/background.
- User name, task title, and RSS title render unsafe strings as text, not HTML.
- Custom RSS feed rejects non-HTTP(S) URLs.
- Default RSS feed either loads items or shows a clear error state.
- `privacy.html` returns 200 locally and in production.
- `terms.html` returns 200 locally and in production.
- Service worker installs without cache failures.
- Offline reload serves the app shell after the first online visit.
- Chrome extension loads unpacked without manifest/icon errors.
- Extension receives running, paused, and stopped timer state messages from local and production app URLs.
- Extension redirects a configured distracting site only while timer state is running.

## Nice-To-Have Polish

- Visual layout remains readable on desktop and mobile widths.
- Alarm audio plays after a user gesture and can be stopped.
- Story image export downloads a readable image.
- Language toggle updates dynamic labels without layout breakage.
- README instructions match the tested local and production flows.

## Release Notes

- Record browser and OS used for the smoke test.
- Record production URL tested.
- Record any skipped checks with a reason.
