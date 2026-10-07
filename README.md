# RoundLink
A local-only one-to-one meetup rotation board. Landing: index.html; app: app.html.

## Behavior
2-60 unique people. Circle-method pairing, with a dummy participant for odd counts. Each unordered pair appears exactly once in the full rotation; each odd-count participant gets one bye. Numbered tables are positions only, not movement optimization. Clock arithmetic labels midnight crossings. CSV cells beginning with spreadsheet formula markers are prefixed with an apostrophe. Names are HTML-escaped. Nothing is stored or sent.

## Limits
No preferences, exclusions, prior-meeting tracking, capacity optimization, invitations, dates, timezones, daylight-saving calculations or sports rest/home-away balancing. Rebuilding after arrivals/departures can repeat prior meetings. Print and local CSV download only.

## Verification
Run `node tests/run_tests.js`. Tests independently enumerate every required unordered pair for all group sizes 2 through 60, check no repeats or simultaneous double bookings, byes, midnight and invalid input.

## Method source
Established circle design: https://ar5iv.labs.arxiv.org/html/1804.04504 section 3. This app schedules concurrent rounds, not the paper's asynchronous fairness optimization. No claim of worldwide product novelty.
