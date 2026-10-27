# Onyx Captions website

Static landing page for the Onyx Captions DaVinci Resolve extension, hosted on GitHub Pages and used as the store website for Lemon Squeezy.

No build step — plain HTML, CSS and a little JavaScript.

```
index.html      Landing page (headline, demo video, features, price, FAQ, support, refund line)
terms.html      Terms of Service
privacy.html    Privacy Policy
refund.html     Refund Policy
assets/
  style.css     All styles
  main.js       Demo-video fallback animation + footer year
  favicon.svg   Logo / favicon
  demo.mp4      ← add your demo recording here
```

## Before launch

Search and replace these placeholders in **all four HTML files**:

| Placeholder | Replace with |
| --- | --- |
| `Onyx Captions` | Your product name |
| `$20` / `20 USD` | Your price |
| `https://videoextensions.lemonsqueezy.com/buy/YOUR-PRODUCT-ID` | Your Lemon Squeezy checkout link (Products → Share) |
| `vj.novak9@gmail.com` | Your support email |
| `YOUR NAME, YOUR COUNTRY` | Your legal / business name and country |

Also check in `index.html`:

- The **compatibility table** (Resolve version, OS) and the feature bullets match what the extension really does.
- The FAQ answers (free vs Studio support, number of computers per license).

And in `privacy.html`, section 4 — make sure the statement about network requests matches the extension.

### Demo video

Put the recording at `assets/demo.mp4` (H.264 MP4, ideally under ~50 MB — GitHub rejects files over 100 MB). Until that file exists, the page shows an animated caption preview instead.

To use YouTube or Vimeo instead, replace the `<video>` element in `index.html` with the `<iframe>` shown in the comment above it.

## Preview locally

```bash
python -m http.server 8000
```

Then open http://localhost:8000.

## Publish on GitHub Pages

1. Create a GitHub repository and push this folder to its `main` branch.
2. In the repository: **Settings → Pages → Build and deployment → Source: Deploy from a branch**, branch `main`, folder `/ (root)`.
3. After a minute the site is live at `https://<username>.github.io/<repo>/`.
4. Optional custom domain: add it under **Settings → Pages → Custom domain** and enable **Enforce HTTPS**.

Use the resulting URL as your store website when activating your Lemon Squeezy store.
