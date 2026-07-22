# telos-ds — design-sync notes

Repo-specific gotchas for future syncs of this package.

## How to run a sync (from packages/telos-ds)

```sh
# 1. build the library
npm install && npm run build

# 2. stage the converter (once per clone)
SKILL=<design-sync skill base dir>
mkdir -p .ds-sync && cp -r "$SKILL"/package-build.mjs "$SKILL"/package-validate.mjs \
  "$SKILL"/package-capture.mjs "$SKILL"/resync.mjs "$SKILL"/lib "$SKILL"/storybook .ds-sync/
echo '{"name":"ds-sync-deps","private":true}' > .ds-sync/package.json
(cd .ds-sync && npm i esbuild ts-morph @types/react playwright@1.56.0)

# 3. convert + validate
node .ds-sync/package-build.mjs --config .design-sync/config.json \
  --node-modules ./node_modules --entry ./dist/index.js --out ./ds-bundle
PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers node .ds-sync/package-validate.mjs ./ds-bundle
```

## Gotchas

- **Playwright/chromium version pin.** This environment ships chromium build
  **1194** at `/opt/pw-browsers` (no headless-shell for other builds). Only
  **playwright@1.56.0** pins revision 1194 — 1.61 (latest) wants 1228 and fails
  `Executable doesn't exist`. Install 1.56.0 for the render check and always
  pass `PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`.
- **cssEntry must be self-contained.** The converter treats an `@import`-only
  stylesheet as a placeholder (`[CSS_PLACEHOLDER]`). `styles/index.css` is the
  human-facing entry (two `@import`s); `styles/telos-ds.css` is the flattened
  stylesheet the converter actually reads (`cfg.cssEntry`). **It is a
  concatenation of `tokens.css` + `components.css`** — if you edit either,
  regenerate it:
  `{ cat styles/tokens.css; echo; cat styles/components.css; } > styles/telos-ds.css`
- **Inter ships via `extraFonts`.** `cfg.extraFonts` points at
  `node_modules/@fontsource/inter/{400,500,600,700,800}.css`; the converter
  copies the woff2s and emits ~35 `@font-face` rules. Run `npm install` before
  the converter so `@fontsource/inter` is present.
- **StepIndicator is wide** → `cfg.overrides.StepIndicator.cardMode = "column"`
  (one story per row). Known-good, do not remove.

## Known render warns

None outstanding — render check is 14/14 clean.

## Re-sync risks

- The build assumes chromium 1194 / playwright 1.56 in this environment; a
  different image will need the matching playwright version re-derived.
- `styles/telos-ds.css` is a committed concatenation, not generated at build
  time. It can silently drift from `tokens.css`/`components.css`. Consider a
  prebuild script if this becomes a maintenance burden.
- **Upload status: not yet uploaded.** No Claude Design project has been
  created for this package (the operator declined project creation on the first
  run, so there is no `projectId` in config.json and no `_ds_sync.json` anchor
  exists remotely). The first real sync is therefore a first-time upload, not a
  re-sync: it creates/points at a project, then uploads the verified bundle.
