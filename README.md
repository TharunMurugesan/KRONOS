# AI Tech News App

A single-page React + Tailwind app with three features:

1. **User Authentication** — Register (name, email + OTP verification, password) and log in. Passwords are hashed with PBKDF2-SHA256 (200,000 iterations + per-user random salt) using the browser's Web Crypto API. Nothing leaves the device except the OTP email.
2. **News Page** — Live tech news pulled from TechCrunch, The Verge, Ars Technica, Wired, and MIT Tech Review. Each card shows a 2-line headline and a short sub-heading. Click "Read full article" to open the original story. Articles about AI tools (Claude, ChatGPT, Cursor, Midjourney, etc.) get **two extra buttons**: one for the tool's homepage and one for its official documentation.
3. **Ask About AI Tools** — Type any question about an AI tool ("How do I connect Claude with Gmail?") and get a clear, step-by-step answer. Pick your provider — Gemini (free), Claude, or OpenAI — and supply your own API key.

## Files

| File | Purpose |
|------|---------|
| `index.html` | Entry point. Loads React, Tailwind, Babel from CDNs, then `data.js` and `app.jsx`. |
| `app.jsx` | The whole React app (News Page + Search Page). |
| `data.js` | AI tool → homepage/docs URL mappings, RSS source list, and AI keyword detection list. |

## How to run

There is no build step. Just open `index.html` in any modern browser (Chrome, Safari, Firefox, Edge):

```
double-click index.html
```

The first thing you'll see is the **Sign in / Register** screen. Set up EmailJS (one-time, see below), then register an account. After login the News + Search tabs appear.

> If you see a CORS error in the console for the news feeds, your browser is blocking the public RSS proxy. Try a different browser or a Chromium-based one.

## Setting up EmailJS (one-time, required for OTP)

The Register flow sends a 6-digit OTP to the user's email. The app uses [EmailJS](https://www.emailjs.com) (free tier — 200 emails/month) which lets a static browser app send mail without a backend.

1. Sign up at <https://www.emailjs.com> and verify your email.
2. **Email Services** → Add a new service (Gmail / Outlook / etc.) → connect your account → copy the **Service ID** (e.g. `service_xxxx`).
3. **Email Templates** → Create a new template:
   - **To Email**: `{{to_email}}`
   - **Subject**: `Your AI Tech News verification code`
   - **Body** (example):
     ```
     Hi {{name}},

     Your one-time verification code is: {{otp}}

     If you did not request this, you can safely ignore this email.
     ```
   - Save and copy the **Template ID** (e.g. `template_xxxx`).
4. **Account → API Keys** → copy your **Public Key** (e.g. `user_xxxxxxxxxxxx` — newer keys may look different).
5. Open the app, click **"Configure email service"** under the Sign in card, paste all three IDs, and click **Save configuration**. You only do this once per device.

After that, click **Register**, fill in your name + email, click **Send OTP**, check your inbox, type the code, set a password, and you're in.

## Privacy / data flow

| Data | Where it lives | Sent over the network? |
|------|---------------|------------------------|
| Your name, email | This browser's `localStorage` | Only the email is sent to EmailJS during OTP send |
| Your password | Stored as a PBKDF2-SHA256 hash + random salt | **Never** |
| Your AI API keys (Gemini/Claude/OpenAI) | This browser's `localStorage`, scoped per-user | Only sent directly to the matching provider's API |
| Your Q&A history | This browser's `localStorage`, scoped per-user | Never |
| EmailJS config (3 IDs) | This browser's `localStorage` | Sent to api.emailjs.com when sending OTP |

There is no app server. Closing the browser does not log you out (your session is persisted in localStorage); click **Log out** in the header to clear the session.

## Moving accounts between browsers (Export / Import)

Each browser keeps its own isolated `localStorage`, so an account you register in Chrome won't appear in Safari. To move accounts between browsers (or to back them up):

1. In the source browser, on the Sign in screen, click **↓ Export accounts**. A file like `ai-tech-news-accounts-2026-05-14.json` is downloaded — it contains every registered account's name, email, salt, and password hash (no plaintext passwords; we never had them).
2. Open the app in the other browser. On the Sign in screen, click **↑ Import accounts** and pick that JSON file.
3. The other browser will now have those accounts and you can sign in with the same email + password.

Import uses **merge** mode — if an email already exists locally, the local copy is kept (skipped, never overwritten). To replace a local account, log in to it and delete it first, or register fresh.

## Setting up the AI Q&A

The Search page supports **three AI providers** — pick whichever you have an API key for:

| Provider | Where to get a key | Cost |
|----------|-------------------|------|
| **Gemini** (Google) | <https://aistudio.google.com/apikey> | **Free tier** (no billing required) |
| **Claude** (Anthropic) | <https://console.anthropic.com/settings/keys> | Requires Anthropic credits |
| **ChatGPT** (OpenAI) | <https://platform.openai.com/api-keys> | Requires OpenAI billing (separate from ChatGPT Plus) |

> **Note:** A *Gemini Pro* or *ChatGPT Plus* subscription is **not** an API key. The chat apps and the API are separate products. The links above give you actual API keys.

Steps:

1. Open the app and click the **Ask About AI Tools** tab.
2. At the top of the page, pick your provider (Gemini / Claude / ChatGPT).
3. Paste your API key and click **Save key**. Each provider's key is stored separately in your browser's `localStorage`.
4. Ask any question. Use **⌘/Ctrl + Enter** to submit, or just click **Ask**.

You can switch providers anytime — the app remembers each provider's key independently.

## How AI articles are detected on the News Page

`data.js` contains a `window.AI_TOOLS` map of known AI tools. When a news article is fetched, the title + description are scanned (case-insensitive) for any of these tool names. If matched, the card gets the extra **Homepage** and **Docs** buttons pointing to that tool. As a fallback, generic AI keywords (`artificial intelligence`, `LLM`, `neural network`, etc.) get the article tagged with an "AI" badge so you can filter to AI-only stories.

To add a new AI tool, add an entry to `window.AI_TOOLS` in `data.js`:

```js
"my-new-tool": { homepage: "https://example.com", docs: "https://docs.example.com" },
```

## How news sources work

`data.js` lists RSS feeds in `window.NEWS_SOURCES`. The app fetches them through the free `api.rss2json.com` proxy (which handles CORS). To add a feed, add another entry:

```js
{ name: "Hacker News", url: "https://news.ycombinator.com/rss" }
```

## Tech stack

- React 18 (UMD build via unpkg)
- Tailwind CSS (Play CDN — no build)
- Babel Standalone (compiles JSX in the browser)
- `api.rss2json.com` for CORS-friendly RSS fetching
- `api.anthropic.com/v1/messages` (with `anthropic-dangerous-direct-browser-access: true`) for the Q&A
