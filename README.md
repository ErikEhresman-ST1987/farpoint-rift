# Farpoint Rift

Personal offline-first, noncombat space-frontier adventure. Technical Foundation approved; implementation is incremental.

## Increment 1 — scene integration (in progress)

Plain JavaScript + Vite + PixiJS v8. The included scene is a **synthetic fixture following the Workshop game-placement v1 contract**, with deliberately simple placeholder SVG artwork. It is **not** an actual export from the Scene Editor and **not** the final cockpit.

Local commands:

```sh
npm install
npm run dev
npm test
npm run build
```

The adapter accepts `game-graphics-placement` version 1: background, ordered sprites, absolute sprite touch rectangles, and background hotspots. Game asset references are resolved separately. The editor's editable project JSON is not runtime placement data.

## Next verification gate

1. Replace the fixture with an **actual exported** `game-placement.json` and its image files; verify appearance and touch on iPhone/iPad.
2. Verify the Vite build and GitHub Pages deployment; offline installation is not yet implemented.
3. Add cockpit viewscreen behavior and persistence in later increments.

No Ink, IndexedDB, PWA service worker, or save data is implemented yet. This initial scene is a technical demonstration, not gameplay.
