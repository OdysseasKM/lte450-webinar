# LTE450 Webinar - Deployment & Demo Guide

## Quick Links

| Purpose | URL |
|---------|-----|
| **Local Demo** | `http://localhost:8080` (run `python -m http.server 8080` in webinar folder) |
| **Supervisor Preview** | Share the zipped folder or host on any web server |

---

## 1. How to Show This to Your Supervisor

### Option A: Live Demo (Recommended)
1. Open a terminal in the `webinar` folder
2. Run: `python -m http.server 8080`
3. Open browser: `http://localhost:8080`
4. Walk through the webinar together

### Option B: Share as ZIP
1. Zip the entire `webinar` folder
2. Send to supervisor
3. They extract and open `index.html` directly in browser
   - Note: Some features (audio) require a local server, but slides and navigation work fine

### Option C: Quick Cloud Hosting (Free)
Upload to any of these for instant shareable link:

| Service | Steps |
|---------|-------|
| **Netlify Drop** | Go to [app.netlify.com/drop](https://app.netlify.com/drop), drag the webinar folder |
| **Vercel** | `npx vercel` in the folder (requires Node.js) |
| **GitHub Pages** | Push to GitHub repo, enable Pages in settings |
| **Surge.sh** | `npx surge` in the folder |

Any of these gives you a public URL like `https://lte450-webinar.netlify.app` to share.

---

## 2. How to Integrate into Client's Website

### Option A: Subdirectory (Simplest)
Upload the entire `webinar` folder to the client's web server:

```
client-website.com/
├── index.html          (client's homepage)
├── about/
├── webinar/            ← Upload here
│   ├── index.html
│   ├── styles.css
│   ├── player.js
│   ├── webinar-data.js
│   ├── slides/
│   └── audio/
```

**Access URL:** `https://client-website.com/webinar/`

### Option B: Embed via iframe
Add this to any page on the client's site:

```html
<iframe 
    src="/webinar/index.html" 
    width="100%" 
    height="800" 
    frameborder="0" 
    allowfullscreen
    style="border-radius: 12px; box-shadow: 0 4px 24px rgba(0,0,0,0.2);">
</iframe>
```

Or with a responsive container:

```html
<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;">
    <iframe 
        src="/webinar/index.html" 
        style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" 
        frameborder="0" 
        allowfullscreen>
    </iframe>
</div>
```

### Option C: Subdomain
Set up a subdomain like `webinar.client-website.com` pointing to the webinar folder.

### Option D: Standalone Domain
Host on a dedicated domain like `lte450-webinar.com`.

---

## 3. Deployment Checklist

### Before Going Live

- [ ] Generate all 43 audio files (slide1.mp3 - slide43.mp3)
- [ ] Place audio files in `/audio` folder
- [ ] Test playback of all slides with audio
- [ ] Verify quizzes work correctly
- [ ] Test on mobile devices
- [ ] Test resume functionality (close and reopen)

### Files Required for Deployment

```
webinar/
├── index.html           ✓ Required
├── styles.css           ✓ Required
├── player.js            ✓ Required
├── webinar-data.js      ✓ Required
├── slides/              ✓ Required (43 PNG files)
│   ├── Slide1.PNG
│   ├── Slide2.PNG
│   └── ... Slide43.PNG
└── audio/               ✓ Required (43 MP3 files)
    ├── slide1.mp3
    ├── slide2.mp3
    └── ... slide43.mp3
```

**Not needed for deployment:**
- `voice_script.txt` (production reference only)
- `slide_timing.csv` (data already in webinar-data.js)
- `README.txt` (internal documentation)
- `DEPLOYMENT_GUIDE.md` (this file)
- `pp.pptx` (source file)

### File Sizes (Estimated)

| Content | Size |
|---------|------|
| HTML/CSS/JS | ~100 KB |
| Slide images (43 PNGs) | ~15-30 MB |
| Audio files (43 MP3s) | ~30-50 MB |
| **Total** | **~50-80 MB** |

---

## 4. Platform-Specific Instructions

### WordPress
1. Upload webinar folder to `/wp-content/webinar/`
2. Create a new page
3. Add Custom HTML block with iframe code
4. Publish

### Squarespace
1. Host webinar on Netlify/Vercel (free)
2. Add Code Block to page
3. Paste iframe with external URL

### Wix
1. Host webinar externally
2. Add HTML iframe element
3. Paste embed code

### Custom CMS / Static Site
1. Upload webinar folder to server
2. Link directly or embed via iframe

---

## 5. Optional Enhancements

### Add Analytics
Edit `player.js` and add tracking at these points:

```javascript
// In startWebinar() function
gtag('event', 'webinar_started', { 'event_category': 'engagement' });

// In loadSlide() function  
gtag('event', 'slide_viewed', { 'slide_number': num });

// In submitQuizAnswer() function
gtag('event', 'quiz_answered', { 'correct': isCorrect });

// In showCompletion() function
gtag('event', 'webinar_completed', { 'quiz_score': quizScoreCorrect });
```

### Custom Branding
Edit CSS variables in `styles.css`:

```css
:root {
    --accent: #f59e0b;        /* Change to client brand color */
    --bg-primary: #0a0e1a;    /* Background color */
}
```

### Add Client Logo
In `index.html`, add to the welcome card:

```html
<img src="client-logo.png" alt="Client Logo" style="height: 60px; margin-bottom: 20px;">
```

---

## 6. Browser Compatibility

| Browser | Support |
|---------|---------|
| Chrome 80+ | ✓ Full |
| Firefox 75+ | ✓ Full |
| Safari 13+ | ✓ Full |
| Edge 80+ | ✓ Full |
| Mobile Chrome | ✓ Full |
| Mobile Safari | ✓ Full |
| IE 11 | ✗ Not supported |

---

## 7. Troubleshooting

### Audio not playing
- Ensure files are named `slide1.mp3` (lowercase)
- Check browser console for 404 errors
- Verify MIME type is set correctly on server

### Slides not loading
- Check file names match exactly: `Slide1.PNG` (capital S, uppercase PNG)
- Verify files are in `/slides` subfolder

### Progress not saving
- localStorage must be enabled
- Won't work in private/incognito mode

### iframe not showing
- Check Content Security Policy headers
- Ensure `X-Frame-Options` allows embedding

---

## 8. Support Contacts

For technical issues with the webinar player, refer to:
- `README.txt` - Full production documentation
- `voice_script.txt` - Narration text for audio generation
- `slide_timing.csv` - Timing reference

---

*Generated for LTE450 Critical Communications Webinar*
