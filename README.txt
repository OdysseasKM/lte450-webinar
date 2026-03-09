LTE450 WEBINAR PRODUCTION PACKAGE
===================================

A professional 30-minute asynchronous webinar with 43 slides,
AI voiceover, interactive quizzes, and a modern web-based player.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FOLDER STRUCTURE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

webinar/
  index.html           - Main webinar player page
  styles.css           - Player styling (dark theme)
  player.js            - Player engine (controls, quizzes, progress)
  webinar-data.js      - Slide data, transcripts, quiz questions
  voice_script.txt     - Full narration script (43 slides)
  slide_timing.csv     - Timing data per slide (totals ~30 min)
  pp.pptx              - Source PowerPoint presentation
  README.txt           - This file
  /slides              - Slide images (Slide1.PNG ... Slide43.PNG)
  /audio               - AI voiceover files (slide1.mp3 ... slide43.mp3)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STEP 1: SLIDE IMAGES (DONE)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Slides are already exported as PNG images in the /slides folder.
Files are named Slide1.PNG through Slide43.PNG.

If you need to re-export:
  PowerPoint → File → Export → Change File Type → PNG
  Save each slide individually, named Slide1.PNG to Slide43.PNG.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STEP 2: GENERATE AI VOICEOVER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. Create a folder called /audio in the webinar directory.

2. Use a Text-to-Speech service to generate narration:

   RECOMMENDED: ElevenLabs (elevenlabs.io)
   - Voice: "Daniel" or "James" (professional British English)
   - Model: Eleven Multilingual v2 or Turbo v2.5
   - Stability: 0.50  |  Similarity: 0.75  |  Style: 0.30
   - Output format: MP3 (128kbps or higher)

   ALTERNATIVES:
   - Google Cloud TTS (Wavenet voices, en-GB)
   - Amazon Polly (Neural, "Matthew" or "Amy")
   - Microsoft Azure Speech (en-GB-RyanNeural)
   - OpenAI TTS (voice: "onyx" or "nova")

3. For each slide, copy the narration text from voice_script.txt.
   Generate one MP3 per slide. Name them:
     slide1.mp3, slide2.mp3, slide3.mp3 ... slide43.mp3

4. Place all 43 MP3 files in the /audio folder.

   NOTE: The player has a built-in timer fallback. If audio files
   are not present, slides will auto-advance based on the timing
   in slide_timing.csv. This lets you preview the player before
   generating audio.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STEP 3: TEST LOCALLY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Open index.html in a browser. For full functionality (audio loading),
serve the folder via a local web server:

  Option A: Python
    python -m http.server 8000

  Option B: Node.js
    npx serve .

  Option C: VS Code Live Server extension

Then open http://localhost:8000 in your browser.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STEP 4: DEPLOY TO CLIENT WEBSITE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Upload the entire webinar folder to the client's web server.
Required files:
  - index.html, styles.css, player.js, webinar-data.js
  - /slides (all 43 PNG files)
  - /audio (all 43 MP3 files)

Can be embedded in an existing page via iframe:
  <iframe src="/webinar/index.html" width="100%" height="800"
          frameborder="0" allowfullscreen></iframe>

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PLAYER FEATURES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Interactive Features:
  - 5 knowledge-check quizzes (9 total questions)
  - Quizzes appear between key sections
  - Immediate feedback with explanations
  - Skip option for each quiz
  - Quiz score tracked and shown at completion

Navigation:
  - Sidebar with 16 collapsible chapter sections
  - Click any slide to jump directly to it
  - Previous / Next slide buttons
  - Rewind 10s / Forward 10s
  - Global timeline slider (scrub to any point)

Playback Controls:
  - Play / Pause
  - Speed: 0.75x, 1x, 1.25x, 1.5x, 2x
  - Volume slider + mute toggle
  - Fullscreen mode

Accessibility:
  - Transcript (CC) overlay synced to current slide
  - Keyboard shortcuts for all major actions
  - Progress saved to localStorage (resume support)

Completion:
  - Welcome screen with "Begin" / "Resume" options
  - Completion screen with stats (slides, quiz score, time)
  - Downloadable summary document

Keyboard Shortcuts:
  Space     - Play / Pause
  ← →       - Previous / Next slide
  J / L     - Rewind / Forward 10 seconds
  M         - Mute toggle
  < / >     - Speed down / up
  T         - Toggle transcript
  S         - Toggle sidebar
  F         - Fullscreen

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CUSTOMIZATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Branding:
  Edit styles.css CSS variables at the top:
    --accent: #f59e0b        (change accent colour)
    --bg-primary: #0a0e1a   (change background)

Quiz Questions:
  Edit the quizzes array in webinar-data.js.
  Each quiz has: afterSlide, title, and questions array.

Timing:
  Edit slide_timing.csv or the slides array in webinar-data.js.

Analytics:
  Add tracking calls in player.js at these events:
    - startWebinar() / resumeWebinar()
    - loadSlide() - track slide views
    - submitQuizAnswer() - track quiz responses
    - showCompletion() - track completions
