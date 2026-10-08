# Local UI consistency pass — October 7, 2026

This pass preserves the existing content, footer, navigation destinations, Auvie model, and earlier local edits. No production build, typecheck/compile pipeline, deployment, repository push, account change, or form submission was performed.

## Changes

- `src/styles/pages.css`: consistent panel radii and section heading/body scales, readable wrapping, matching control typography, quieter background decoration, and restrained icon hover treatment. Mobile title groups share left alignment. Interior full-screen sections no longer impose unnecessary empty height. Inline reading links have persistent underlines.
- `src/styles/locations.css`: safer long-address wrapping, matching card-control typography, and consistent clinic introduction text.
- The insurance payer list becomes one column below 400px so long provider names fit comfortably.
- `src/pages/Home.tsx`: the photograph enters with a small 16px movement and brief fade instead of a 600px slide/rotation; the badge no longer springs from zero scale. Continuously rotating/floating background decorations are static. The original cycling headline and Auvie interactions remain.
- `src/pages/Services.tsx`: shortened the hero photograph fade/zoom and reduced its scale change.

## Verification

An isolated headless browser inspected all 19 public routes at 320, 768, and 1280 CSS pixels: 57 route/viewport checks passed for horizontal overflow, heading clipping, desktop navigation/logo overlap, and browser runtime exceptions. Five representative routes were additionally captured after the three-second greeting finished. The final insurance-list adjustment passed separate 320/375px checks.

The browser served **existing review JavaScript with current plain source CSS**, using `scripts/serve-local-review.mjs`. This does not rebuild or compile the application. Therefore these results verify the new CSS against the existing markup, not the newly edited React animation transitions. Those transitions received syntax parsing only; typechecking and runtime verification remain deferred under the no-build instruction.

CSS parsing, JavaScript syntax checks for the local tools, TSX syntax parsing for Home/Services, and `git diff --check` passed. Parsing is not typechecking. Existing production integration/content concerns remain outside this UI pass.

## Local deliverables

- Preview: http://127.0.0.1:3010 — existing review artifact plus current CSS; forms and live provider chat are disabled by review mode.
- `.browser-qa/local-design-report.json`: 57 route/viewport results.
- `.browser-qa/local-visual-report.json`: representative screenshot pass.
- `.browser-qa/local-insurance-report.json`: final narrow insurance checks.
- `.browser-qa/design-1280-home.png`, `design-320-about.png`, `design-320-insurance.png`, `design-320-locations.png`, and `design-320-parent-help-center.png`: visual evidence.

The local server is read-only, bound to localhost, and does not change the shared browser or login state. Restart it with `node scripts/serve-local-review.mjs` if needed. It requires the existing `review-dist` artifact. Source animation changes will appear after a future authorized compilation; no updated public preview is claimed.

## Continued control polish

The subsequent local pass changed `refinements.css`, `navigation.css`, and `auvie.css`: custom select indicators/text clearance, form caret/scroll clearance, stationary touch hover states, consistent 17px mobile menu labels, 44px chat send controls, readable message metadata, safe long-message wrapping, and one-column chat shortcuts on narrow phones. Footer markup/content and production data paths remain unchanged.

The isolated browser passed targeted 320/1280px checks for chat button geometry, dialog focus containment, mobile menu focus/Escape behavior, select indicators, and dialog overflow. Phone chat/menu screenshots were visually inspected. Evidence: `.browser-qa/local-controls-report.json`, `controls-chat-320.png`, `controls-chat-1280.png`, and `controls-menu-320.png`. Current source CSS was served directly alongside existing review JavaScript. CSS parsing and browser-tool JavaScript syntax checks passed. No compilation, typecheck, deployment, push, or live submission was performed.
