# Playwright Test Automation

End-to-end browser tests written with Playwright Test and TypeScript. The suite
covers customer registration and login flows on the nopCommerce demo store, as
well as basic page title, URL, and locator checks.

## Setup

```bash
npm install
npx playwright install
```

## Run tests

```bash
npx playwright test
```

The Playwright configuration runs tests in Chromium, Firefox, and WebKit and
generates an HTML report. Open the report with:

```bash
npx playwright show-report
```
