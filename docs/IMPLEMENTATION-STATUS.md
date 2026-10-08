# Current local implementation

Updated October 4, 2026. Project: `CODE/AUVIA`, master, baseline d9f4f39. Preview: http://localhost:3000.

The user requested restoration after reviewing the earlier redesign. Original content, original hero/page sections, footer, careers layout and mobile sidebar have been restored. The earlier copy rewrite and cream/forest redesign are archived locally in `.local-backup-before-restoration/` and are not imported by the application.

Current changes:
- Explicit Home navigation. Original desktop menu appearance retained, with click-operated dropdowns, Escape and outside dismissal. Original mobile sidebar with focus containment/restoration.
- Small targeted refinement stylesheet: consistent non-home heading typography and top spacing, focus indicators, reduced-motion handling. Original brand tokens, photos and page sections retained. About cards have smaller consistent outline icons and softer background colors.
- One Auvie character shared by the greeting and chat launcher. Downloaded CC0 Steve by Quaternius, with an actual finite Wave animation. Drag, keyboard rotation, reset, tap greeting. A rendered poster of this same model supplies reduced-motion/loading/failure fallback. No separate cartoon or second character, no audio.
- Five-second greeting once per browser session with dismiss, chat and care-team actions; avoids interrupting an active form or modal. It does not open a blocking modal automatically.
- Original chat content/routing retained, now in a native dialog with labeled controls and keyboard containment.
- Locations retains list/map views and the left pane. Center maps use Google map embeds and open the address in Google Maps when clicked. Managed data replaces the fallback when available. The Irving fallback address/phone comes from existing repo contact information; Blaine stays coming soon when managed details are unavailable.
- Careers layout retained. Jobs named exactly FAF (case insensitive) are hidden in the local frontend; database records are untouched. Job loading failures show an availability message.
- Insurance-by-state button color aligns with brand teal and Find a center routes to Locations. Broken remote provider logos show local text initials instead of a second external image request.

Validation evidence: `.browser-qa/report.json` and screenshots. Typecheck and production build are run after changes. Browser QA blocks production writes/chat sends/forms and tests route rendering, page width, menus, dialog keyboard behavior, character controls and reduced motion. This is not a full accessibility or clinical/legal audit. Google embed loading is checked separately from its outbound address link. Careers application submission and authenticated/admin flows are not tested.

Remaining limits: Firestore location/job read attempts returned 403; current managed records could not be verified. Existing GitHub invitation has not been accepted because no supported authenticated acceptance path was available; public clone succeeded. No token, new account, permissions grant, push or deployment was performed.

Source privacy/security findings remain separate in FOLLOW-UP-FINDINGS.md. Original copy and policy claims have been restored at the user's request; they are not independently verified.

## Completed verification

- `npm run lint`: passed TypeScript typecheck.
- `npm run build`: passed Vite build and prerender of all 18 routes. Existing main-bundle/Firebase chunk warnings remain.
- `git diff --check`: passed after whitespace cleanup.
- Browser: 57 route/viewport combinations across 1440, 1024 and 375 pixels, zero horizontal overflow and zero uncaught runtime exceptions. Click menu, Home link, original mobile sidebar focus containment/Escape, native chat dialog keyboard containment/Escape, timed greeting, drag/tap/keyboard rotation and reset, and reduced-motion poster passed.
- Google Maps embed visually loaded the Irving address; clicking its enclosing link opens the matching Google Maps search URL. Evidence: `.browser-qa/google-map.png`.
- Real Wave clip visually inspected: `.browser-qa/auvie-wave.png`.
- Original Footer.tsx matches baseline; Home content remains original, with its cycling-word presentation adjusted to avoid clipping. The original careers layout/content remains, apart from hiding FAF and reporting data load failure.
- Live form submission, chat send/provider request, job application submission, production writes, admin/authentication and invitation acceptance: not run.

Key files: src/components/WelcomeCharacter.tsx, public/scene/welcome-scene.js, src/components/MagicMascot.tsx, src/components/Navbar.tsx, src/components/GoogleCenterMap.tsx, src/styles/refinements.css, src/pages/Locations.tsx, src/pages/LocationDetail.tsx, src/pages/Careers.tsx, src/data/known-centers.ts. Other public page edits align motion imports and accent color tokens; they retain their original text and sections.

## Earlier welcome revision (superseded controls)
The user requested a larger launch greeting. Auvie now appears centered and large immediately for three seconds, with a wave and finite playful bounce, then moves to a larger bottom-right widget. Skip hello dismisses the introduction. The introduction runs once per document load; route navigation and chat closing do not restart it. The Play button repeats a finite playful sway/wave (a custom presentation effect, not a downloaded dance clip). Steve's asset contains 18 animation clips, including Wave, Jump, Yes and No, and remains the current lightweight CC0 choice.
Greeting placement is above the entire widget, so the character does not cover Let's chat. Desktop chat places the character beside the panel; mobile chat hides the corner widget while the full dialog is open to keep controls visible. Reduced motion disables travel/bounce and uses the same-model poster until requested. Original content, footer and page layouts remain untouched by this revision.

## Latest consistency revision
The user asked to remove Skip hello, Play and reset/replay buttons; only Chat remains in the corner. Drag and arrow/Home keyboard controls remain. Greeting text is plain UTF-8/ASCII with no replacement character. Character travel now animates transforms between measured positions rather than repeatedly resizing the renderer.
Top-level Services, Parent Resources and Insurance labels navigate directly; separate chevrons and hover expose submenus. Chat shortcuts now link directly to Locations, Insurance & Financial Assistance, Services and Careers rather than sending canned chat queries.
Public page headers share a title layout and type scale. Removed viewport-height hero centering, the Parent Help inline 50px offset and the location breadcrumb's extra header padding. Existing labels/breadcrumbs remain beneath the heading. Base backgrounds are shared cream; original photos, sections and footer remain. Mobile spacing/cards/headings are smaller, and sticky full-screen autism panels become ordinary sections. Homepage cycling word has a taller line box and shorter transition to avoid clipping.

Measured final heading positions: all 17 inner public routes start at 112px for desktop/tablet and 104px for mobile. No heading clipping across all 57 route/viewport observations. Homepage keeps its original landing hero, and the not-found page keeps its centered error layout. Final browser assertions cover character controls, direct navigation, submenu interaction, chat focus/visibility and reduced motion.

## October 5 narrow-screen verification

Removed title-block translation so Careers, Locations and What Is Autism do not briefly start lower during entrance animations. Auvie's travel animations now cancel before a new transition, and the character is hidden while the mobile sidebar is open to avoid covering navigation.

Browser verification passed 76 route/viewport observations across 1440, 1024, 375 and 320 pixels: no horizontal overflow, clipped headings or uncaught runtime exceptions. All inner public headings start at 112px desktop/tablet and 104px mobile, with the homepage and error layout intentionally separate. Direct menu links, insurance chat shortcut, Back/Forward, 320px sidebar character visibility, greeting, drag/keyboard controls, chat focus and reduced-motion fallback passed. Evidence is in docs/archive/BROWSER-QA-RESULTS.json and .browser-qa/navigation-narrow-mobile.png. TypeScript passed. Production writes, real forms, chat provider and managed job applications were not exercised; existing backend access and bundle-size findings remain.

## October 8 brief pass (ULTIMATE_BRAIN / ULTIMATE_UI_UX)

The user lifted the "keep original content" limit for this pass. Footer and inner-page copy are unchanged.

- Home hero rebuilt: headline on the page background, two actions (Start interest form, Find a center), phone link, photo beside it. Fits one 1280x800 screen. "Welcome" pill and "Sanctuary Network" badge line removed.
- Home order is now hero, insurers, why families, next steps, interest form, milestones, evidence, FAQ, newsletter. The green "Begin your journey" block was removed because it repeated the evidence heading and the diagnosis chooser.
- Milestones are one row of five on desktop and a swipe row on phones. `DevelopmentalTimeline.tsx` no longer uses scroll-linked motion.
- Interest form: "what happens next" steps beside the form (existing copy), "has a diagnosis" card scrolls to the form instead of leaving for /contact.
- FAQ section renders only when FAQs load.
- Newsletter no longer shows success from a timer. It writes `{email, source: 'home_newsletter'}` to `leads` with blank name and phone, and shows success only after that write. NOT verified against production; owner should confirm this is wanted in the leads list.
- Home, Contact, Careers and Insurance assistance forms show an inline error (`.form-error`) instead of `alert()`.
- Contact: insurance provider is optional. Services and Locations: "Sanctuary Network" eyebrow removed. Services hero photo hidden below 1024px because the text sat on top of it.
- Auvie docks at 68px on phones. `.text-label-custom` is 12px.

Checked: `tsc --noEmit`, `vite build --mode review` into a scratch folder, headless Chrome at 1280x800 and 375x812 on /, /services, /locations, /contact (no horizontal overflow). Mobile home went from 15.9 to 12.1 screens; the form moved from about screen 11 to about screen 6. Not run: `npm run build` with prerender, any real form submission, the other 15 routes.

## October 8 deploy and leftovers

- Deployed to a new Vercel project `auvia` (scope `229x1a3250-gprecacins-projects`): https://auvia-pi.vercel.app. This is a separate copy, not auviatherapy.com. It is a normal production build, so the Meta Pixel and live forms are active on it. GitHub auto-deploy is not connected (no write access to smfaraz/Auvia); redeploy with `vercel deploy --prod --scope 229x1a3250-gprecacins-projects`.
- Chat: the Gemini call moved to `api/chat.js`; the key is no longer injected into the browser bundle (`vite.config.ts`). Set `GEMINI_API_KEY` in the Vercel project to enable it. Until then the endpoint returns 503 and Auvie uses the built-in answers. No rate limit yet.
- Inner-page heading pills are plain labels (one rule in `refinements.css`). Contact name placeholders removed.
- Superseded notes and QA JSON moved to `docs/archive/`. This file and `FOLLOW-UP-FINDINGS.md` are the current docs.
- Checked on the live URL: /, /services, /locations, /contact, /what-is-aba return 200; home, parent help center and privacy rendered in headless Chrome with no horizontal overflow; `npm run build` passed with all routes prerendered.

## October 8 vibrant theme (client said the site looked bland)

- `src/styles/vibrant.css` is the shared theme, scoped to `<main>`: brighter palette tokens (sun, coral, sky, grape, mint), Outfit headings, pill buttons with a solid drop, outlined cards, one form field style, a per-route colour band with a wave under the navbar. Navbar, mobile sidebar, Auvie, logo and all wording are unchanged.
- Home: yellow hero with the photo masked into a heart, photo collage in the evidence section (`home.css`, bottom block).
- Route styles live in `src/styles/routes/` (brand-pages, learn-pages, insurance-contact, locations-legal). Contact and Insurance assistance forms follow the home form pattern (`.vform*`).
- What Is Autism: domain cards are solid colour blocks; the sticky full-screen panels are ordinary bands.
- Footer now includes the Irving Google map (`LocationMap`).
- Locations: the search panel is no longer sticky (it slid under the navbar); the map pane is sticky on desktop.
- Checked: `tsc --noEmit`, `npm run build`, every public route at 1280 and 375 in headless Chrome with no horizontal overflow. Redeployed to https://auvia-pi.vercel.app. Not exercised: form submission, success panels, careers job cards and apply modal (no jobs in dev), FAQ accordions fed from the database.

## October 8 second design pass, Auvie prompts, SEO audit

- Second "non-boring" pass on every route by five agents (bento grids, sticker photos, speech bubbles, insurer marquee on home, dotted trails, swipe rows on phones). Route CSS is in `src/styles/routes/` and `home.css` ("Playful pass" block). Legal pages have in-page jump links (section ids added). Wording and behaviour unchanged.
- Auvie suggestion bubble (`WelcomeCharacter.tsx`, `ROUTE_PROMPTS`): five seconds after a page loads it offers three shortcuts for that route. Once per page, not over forms/menu/chat, closing it mutes it for the session (`sessionStorage auvie-prompts-off`), and it closes after 360px of scroll.
- Titles no longer get the brand appended twice (`prerender.js`, `SEO.tsx`).
- `.vercelignore` added so local QA folders are not uploaded.
- Dev server: run `npx vite --mode review --port=3000 --strictPort` in its own terminal for long agent runs.
- SEO audit findings still open: apex domain 307-redirects to www while canonicals/sitemap use the apex; prerender and runtime titles/descriptions differ; about 12 titles over 60 characters; 5 descriptions over 160; thin, unlinked Blaine page in the sitemap; three overlapping insurance pages; stale sitemap dates; images without dimensions.
- Checked: `tsc --noEmit`, `npm run build`, lead review of every route at 1280 and of key routes at 375, redeployed to https://auvia-pi.vercel.app. Not exercised: form submissions and success panels, hover/focus states, reduced-motion, mobile map toggle on Locations, FAQ accordions that load from the database.
