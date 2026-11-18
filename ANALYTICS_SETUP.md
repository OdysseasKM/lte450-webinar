# NetTech webinar analytics — PostHog integration

## Status
The integration is **disabled by default**. The code does not send data until
NetTech's PostHog account is created, its privacy settings have been reviewed,
and `analytics-config.js` is explicitly enabled. Do not merge and deploy with
`enabled: true` until the responsible team approves the data collection.

## Set up the NetTech account
1. Create an organization-owned project at [PostHog EU Cloud](https://eu.posthog.com).
2. Invite relevant NetTech managers (avoid using an individual developer's account).
3. In project settings, copy the **public project token** beginning with `phc_`.
   This is NOT a personal API key or secret. Never commit administrative API keys.
4. Review privacy notices, data-processing arrangements, retention and consent
   requirements, including applicable GDPR/ePrivacy rules. Cookieless analytics
   do not remove all privacy obligations.
5. In `analytics-config.js`, set `projectToken`, keep
   `apiHost: 'https://eu.i.posthog.com'`, and then change `enabled` to `true`
   only after approval.

No PostHog script is loaded when disabled or when the token is missing/invalid.

## Measurement definitions
Events automatically carry `webinar_id: 'lte450_part1'`. The module is
framework-independent and can be copied to future webinars.

| Event | Meaning |
| --- | --- |
| `$pageview` | Webinar web page loaded. URL stripped of query parameters |
| `webinar_started` | Someone pressed Begin Webinar (or Watch Again) |
| `webinar_resumed` | Someone pressed Resume |
| `webinar_progress` | 25%, 50%, or 75% **core playback coverage**, once per run |
| `webinar_completed` | >=90% playback coverage on slides 1–37 **and** slide 37 narration reached its end |
| `webinar_full_completed` | >=90% playback coverage on slides 1–45 **and** last slide narration ended |
| `webinar_end_reached` | Final slide ended, whether or not earlier content was watched |
| `webinar_quiz_answered` | Quiz section and correct/incorrect flag (no free text) |
| `webinar_quiz_skipped` | Skipped quiz section |

**Note:** “Playback coverage” does not prove attention or learning. The player
also has a timer fallback if audio is unavailable, so playback coverage may
represent timed progression rather than verified narration audio in that case.
Milestones use a 100-bin per-slide approximation and only credit continuous
forward progression, not jumps, seeking, or opening slides. Replayed segments
are not counted twice. The local browser saves only the coverage bins and
deduplication flags so resuming can continue from the previous position.

PostHog is configured for `cookieless_mode: 'always'`, anonymous events
(`person_profiles: 'never'`), no automatic interaction capture, no session
recordings, no surveys, and no extra feature-flag requests. The webinar's
existing resume feature already uses localStorage; the analytics module uses
a separate key to store progress locally. Neither adds named participant data.

## Dashboard setup
In PostHog, create a dashboard named **NetTech Webinars** with these insights:
1. Trends: `$pageview` counts, filtered by `webinar_id`.
2. Trends: `webinar_started` and `webinar_resumed` counts.
3. Funnels: `webinar_started` → `webinar_progress` with milestone_percent=25
   → 50 → 75 → `webinar_completed`. Define funnel conversion windows
   carefully; with cookieless events, **cross-page/session stitching may be
   limited**, so use aggregate trends where funnels are unreliable.
4. Trends: `webinar_completed` / `webinar_started` as a directional
   aggregate completion ratio. Event totals count starts and replays,
   **not deduplicated unique people**.
5. Trends split by `webinar_id` to compare webinars.
6. Trends: quiz answered/skipped events, split by quiz_after_slide.

No custom NetTech dashboard or analytics backend is necessary.

## Part 2 reuse
Copy `analytics-config.js` and `webinar-analytics.js` into the Part 2 site.
Set a distinct `webinarId: 'lte450_part2'` and update `coreSlides` to the
last slide of the *core* material. Integrate with that player's start, pause,
seek, slide-change, playback-tick, and completion functions. If Part 2 uses
the same player, the existing `player.js` hooks can be reused.
Keep the same NetTech PostHog project token to report to the same dashboard.

## Deployment / verification
1. Test the PR locally using `python -m http.server 8000`.
2. After approval, configure `analytics-config.js` with the project token and
   enable the integration; deploy a **preview** first.
3. Inspect PostHog's real-time Events view for exactly one pageview,
   start/resume events, 25/50/75 milestones and completion events.
4. Check jumping to the last slide doesn't produce a completion, and replay,
   refresh, pause, seek, restart, quiz skip and resume work as before.
5. Confirm console/network requests contain no names, emails, or full query
   strings, and confirm analytics stays disabled if config is disabled.
6. Deploy the verified commit to Netlify, then share the dashboard.

Historical events before this integration cannot be reconstructed.
Netlify traffic analytics, if available, may provide limited past pageview
information but cannot reconstruct completion events.
