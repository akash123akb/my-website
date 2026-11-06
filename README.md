# 🚀 CSE Academic Command Center — Frontend Web Application

> **High-Performance Academic Command Engine for Undergraduates**  
> Built with modern JavaScript, Tailwind CSS, Web Audio API acoustic immersion synthesizer, and Vite.

---

## 📁 Project Structure

```text
my-website/
├── public/                 # Static assets, favicon, and PWA manifest
│   ├── favicon.svg         # Cybernetic shield icon
│   └── manifest.json       # Web app manifest
├── src/                    # Source code
│   ├── app.js              # Application state, controllers, and offline fallback logic
│   ├── main.js             # Vite application entry point
│   ├── mockData.js         # Pre-seeded MAKAUT Semester 3 CSE curriculum & telemetry
│   ├── sound.js            # Web Audio API synthesizer (Rain, Cyber Drone, White Noise)
│   └── style.css           # Tactile Cybernetic Dark Glass styling and animations
├── index.html              # Main application single page entry
├── package.json            # Node.js project manifest and scripts
├── vite.config.js          # Vite build and dev server configuration
└── README.md               # Documentation and deployment guide
```

---

## ⚡ Quick Start

### 1. Install Dependencies
```bash
cd my-website
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
The application will launch at `http://localhost:3000` with instant Hot Module Replacement (HMR).

### 3. Build for Production
```bash
npm run build
```
Creates an optimized, minified production build in the `dist/` directory ready for deployment.

### 4. Preview Production Build
```bash
npm run preview
```

---

## 🌟 Key Capabilities

1. **Mission Control Dashboard**:
   - Real-time CGPA velocity tracking (Current: 8.84, Target: 9.20).
   - Semester syllabus completion index (64.7%).
   - Impending examination and continuous assessment countdown.
   - Attendance risk mitigation and active study hours telemetry.

2. **Curriculum Matrix & Syllabus Tracker**:
   - Full MAKAUT Semester 3 CSE modules (DSA, Mathematics III, Computer Organisation, Analog & Digital Electronics, Python Lab, Economics for Engineers).
   - Module-by-module topic status toggles (`pending` ➔ `in-flight` ➔ `done`).
   - Revision checkboxes and interactive search filtering.
   - Authoring modal to add custom subjects and curriculum topics.

3. **Neural Deep Work Engine (Pomodoro)**:
   - 25m Focus, 5m Short Break, and 15m Long Break intervals with real-time circular SVG dial animation.
   - **Zero-Dependency Web Audio API Acoustic Immersion Synthesizer**:
     - *Falling Rain*: Pink noise mathematical simulation.
     - *Lo-Fi Cyber Drone*: Dual oscillator 55Hz/110Hz resonant drone.
     - *White Noise*: Gaussian random noise generator.
     - *Chime*: Completion bell.

4. **Academic Telemetry & Evaluation Ledger**:
   - Continuous Assessment (CA-1, CA-2, PCA-1) and Semester exam marks ledger.
   - Automatic MAKAUT 10-point letter grade assignment (`O`, `E`, `A`, `B`, `C`, `D`, `F`).
   - Quick marks calculator and diagnostic scoring.

5. **PYQ Vault**:
   - MAKAUT Past Year Questions (2021–2024) organized by subject, marks, and module.
   - Includes concise solution strategies and algorithmic notes.

6. **Offline & Standalone Resilience**:
   - Pre-seeded with complete data in `src/mockData.js`.
   - Persists user modifications to `localStorage`.
   - Automatically connects to `/api/*` endpoints if a backend server is active.

---

## 🌐 Deployment

### Deploy to Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run in `my-website/`:
   ```bash
   vercel
   ```
3. Framework preset: **Vite**
4. Build command: `npm run build`
5. Output directory: `dist`

### Deploy to Netlify
1. Drag and drop the `dist/` folder into Netlify Drop, or connect via Git.
2. Build command: `npm run build`
3. Publish directory: `dist`

### Deploy to GitHub Pages
1. Set `base: './'` in `vite.config.js`.
2. Run `npm run build` and deploy the `dist/` folder to your `gh-pages` branch.

