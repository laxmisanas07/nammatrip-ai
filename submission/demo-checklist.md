# NammaTrip AI — Video Recording & Demo Checklist
## Kannada Digital Innovation Hackathon 2026 • Problem Statement 06

This checklist guides you through recording the official 3-to-5 minute video submission required for Unstop evaluation.

---

## 1. Technical Setup & Recording Environment
- [ ] **Recording Tool:** OBS Studio, Windows Game Bar (`Win + G`), Loom, or ShareX.
- [ ] **Resolution:** 1080p (1920x1080) at 16:9 aspect ratio, 30 fps or 60 fps.
- [ ] **Audio Setup:** Clear USB microphone or headset. Test input levels before starting; avoid background noise.
- [ ] **Browser Window:** Chrome, Edge, or Brave in clean full screen (Press `F11` or hide bookmarks bar).
- [ ] **Local Application Running:** Execute `npm run dev` in the project root and verify `http://localhost:3000` is active.

---

## 2. Pre-Recording Preparation
- [ ] Open `http://localhost:3000` in your browser.
- [ ] Open `submission/demo/voiceover-script.md` on a secondary screen or printed sheet.
- [ ] Clear browser cache / local storage once so the application starts with a clean slate (`localStorage.clear()` in console or delete existing saved trips).
- [ ] Ensure terminal is hidden or placed in background so the focus remains entirely on the web application.

---

## 3. Step-by-Step Recording Sequence (Matches Voiceover Script)

### Segment 1: Introduction & Problem Statement [0:00 – 0:45]
- [ ] Start recording on **Home Page** (`/`).
- [ ] Highlight the hero banner: *"Your Karnataka. Your Journey. Intelligently Planned."*
- [ ] Mention **Kannada Digital Innovation Hackathon 2026** and **Problem Statement 06: Travel & Tourism**.
- [ ] Speak clearly according to the voiceover script.

### Segment 2: Existing System Gaps [0:45 – 1:30]
- [ ] Smoothly scroll down the Home page past *"How NammaTrip AI Plans Your Trip"*.
- [ ] Pause momentarily on the *"Real Budget Accounting"* section to show the difference between fragmented tabs and integrated planning.

### Segment 3: Explore Karnataka Discovery [1:30 – 2:05]
- [ ] Click navigation link **"Explore Karnataka"** (`/explore`).
- [ ] Type "Heritage" in search, or click the **"🏛️ Heritage & History"** chip to show live filtering.
- [ ] Click **"View Guide"** on Mysuru to show the detailed modal (description, coordinates, cost bands, activities, travel advice).
- [ ] Close modal and click **"Plan Trip"** on Mysuru.

### Segment 4: Trip Planner Form [2:05 – 2:40]
- [ ] On the **Plan a Trip** page (`/plan`), demonstrate the inputs:
  - Starting location: Bengaluru
  - Destination: Mysuru
  - Travellers: 2
  - Duration: 3 Days
  - Budget: ₹20,000 INR
  - Travel style: Balanced
  - Interests: Heritage, Food, Wildlife
- [ ] Show the acknowledge estimates checkbox.
- [ ] Click **"Generate My Itinerary"** and let the loading message display.

### Segment 5: Generated Itinerary & Budget Audit [2:40 – 3:30]
- [ ] Arrive on `/itinerary/[id]`.
- [ ] Point out the **Overview** (combines Mysuru and Kabini).
- [ ] Point out the **Feasibility Badge**: *"Within Allocated Budget (98%)"*.
- [ ] Walk through the **Budget Breakdown**:
  - Transport (₹4,500)
  - Accommodation (₹5,600 for 1 double room, 2 nights)
  - Food (₹5,400 for 2 travellers, 3 days)
  - Activities (₹3,000)
  - Buffer (₹1,110)
  - Total: ₹19,610 vs Target: ₹20,000.
- [ ] Scroll down through the **Day-by-Day Schedule** (Day 1, Day 2, Day 3 with morning, afternoon, evening activities).
- [ ] Show the **Interactive OpenStreetMap** route and verified coordinates.
- [ ] Click **"Save Itinerary"** — point out the confirmation toast notification.
- [ ] Click **"Print / PDF"** to briefly show the clean print preview dialog, then cancel.
- [ ] Click **"Copy Summary"** to demonstrate clipboard export.

### Segment 6: Saved Trips & Architecture [3:30 – 4:15]
- [ ] Click **"Saved Trips"** in the navbar (`/saved`).
- [ ] Show the newly saved trip card with total budget and duration.
- [ ] Mention the technical stack: Next.js 16, TypeScript, Zod, Google Gemini 2.5 Flash, OpenStreetMap Leaflet, deterministic offline fallback, and Vitest testing suite.

### Segment 7: Conclusion [4:15 – 4:30]
- [ ] Return to Home Page or display final slide of presentation.
- [ ] Conclude with the impact on Karnataka tourism and future roadmap (KSRTC integration, Kannada voice assistant).
- [ ] End with *"Dhanyavadagalu!"* and stop recording.

---

## 4. Post-Recording Quality Verification
- [ ] **Duration Check:** Total duration must be between **3:00 and 5:00 minutes** (target is ~4:30).
- [ ] **Audio Check:** Voice is distinct, balanced, and synchronized with video actions.
- [ ] **No Secrets Exposed:** Ensure no private `.env` keys or sensitive credentials appeared on screen.
- [ ] **Export Format:** Export as standard MP4 (H.264 video, AAC audio).
- [ ] **Upload:** Upload to YouTube as **Unlisted** (or Google Drive with "Anyone with link can view" permission) for submission.
