# Stock Primers

Plain-English, interactive one-page primers on individual stocks. Built as
educational explainers — what the company does, the bull/bear case, the
valuation, the risks, and a "should I buy?" decision tool.

**Not financial advice. Educational use only.**

## Pages

- [`bloom-energy-live-primer.html`](bloom-energy-live-primer.html) — Bloom Energy (NYSE: BE) deep dive
- [`NBIS_interactive_one_pager.html`](NBIS_interactive_one_pager.html) — Nebius Group (NBIS)
- [`FAC_one_pager.html`](FAC_one_pager.html) — FAC one-pager

Open any file in a browser, or enable GitHub Pages (Settings → Pages → deploy
from `main`) to view them on the web.

## Note on "live" data

The Bloom primer fetches a live quote (price, daily move, market cap, 52-week
range) two ways and uses whichever is available:

- **Inside Claude Cowork** — via the FMP data connector.
- **On the open web / GitHub Pages** — via Yahoo Finance's public chart
  endpoint, tunneled through a public CORS proxy (no API key, nothing secret in
  this repo). Market cap is derived from a fixed share count, so it's
  approximate. If the proxy is unavailable the page shows the last baked-in
  snapshot instead of failing.

The written analysis (revenue, margins, deals) reflects Q1 2026 reporting.
