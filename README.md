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
  demo.mp4      Demo recording (web version)
downloads/
  Onyx-Captions-Setup.exe   ← the free trial installer (add before launch)
```

## Before launch

- **Free trial installer:** put the installer at `downloads/Onyx-Captions-Setup.exe`. Every *Download free trial* link points there. Keep the file name the same for each release so the links never change.
- **Checkout link:** in `index.html`, the *Get Lifetime License* button needs the product's checkout link from Lemon Squeezy (publish the product, then *Share*). Use the live-mode product's link at launch.
- **Lemon Squeezy product:** turn on license keys with an activation limit of **2** (the site promises two computers), and attach the same installer as the product's file.
- **Code signing:** while the installer isn't code-signed, keep the "Windows protected your PC" FAQ answer. Remove it once it is signed.
- Check that the feature bullets, the compatibility table and the FAQ still match the extension after each release, and that `privacy.html` section 4 matches what the extension sends over the network.

### Demo video

`assets/demo.mp4` is the web version of the demo recording (H.264 MP4, 1080p, about 10 MB). Keep it well under 100 MB — GitHub rejects larger files. To make a web version from a full-size recording:

```bash
ffmpeg -i recording.mp4 -map 0:v:0 -map 0:a:0? -vf "scale=1920:-2" -c:v libx264 -preset slow -crf 24 -pix_fmt yuv420p -c:a aac -b:a 128k -movflags +faststart assets/demo.mp4
```

Until `assets/demo.mp4` exists, the page shows an animated caption preview instead.

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
