# Deployment Guide

This app uses a **daily fetch** strategy where puzzle JSON files are stored statically and fetched based on the current date.

## How It Works

1. **Puzzle files** are stored in `/public/puzzles/YYYY-MM-DD.json`
2. On page load, the app fetches today's puzzle: `/puzzles/2025-11-09.json`
3. **Solutions are included** in the JSON (visible in DevTools, but that's okay!)
4. Users cannot see future puzzles unless they manually guess the date URL

## Deployment Options

### Option 1: Cloudflare Pages (Recommended - Free)

**Why Cloudflare Pages?**
- ✅ Completely free
- ✅ Global CDN (fast worldwide)
- ✅ Automatic deployments from Git
- ✅ No credit card required

**Steps:**
1. Push your code to GitHub
2. Go to [Cloudflare Pages](https://pages.cloudflare.com/)
3. Click "Create a project"
4. Connect your GitHub repository
5. Build settings:
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
6. Click "Save and Deploy"

**Your site will be live at:** `https://your-project.pages.dev`

---

### Option 2: Vercel (Also Free)

**Steps:**
1. Push code to GitHub
2. Go to [Vercel](https://vercel.com/)
3. Click "Import Project"
4. Select your repository
5. Vercel auto-detects Vite settings
6. Click "Deploy"

---

### Option 3: Netlify (Also Free)

**Steps:**
1. Push code to GitHub
2. Go to [Netlify](https://www.netlify.com/)
3. Click "Add new site" → "Import an existing project"
4. Connect GitHub and select repository
5. Build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
6. Click "Deploy"

---

## Adding New Puzzles After Deployment

### Method 1: Git Push (Recommended)
1. Create new puzzle file: `public/puzzles/2025-11-12.json`
2. Commit and push to GitHub:
   ```bash
   git add public/puzzles/2025-11-12.json
   git commit -m "Add puzzle for Nov 12"
   git push
   ```
3. Your hosting provider auto-deploys the new file

### Method 2: Manual Upload
- **Cloudflare Pages:** Use the dashboard to upload files
- **Vercel/Netlify:** Re-deploy or use CLI

---

## Security Considerations

### ✅ What's Protected
- Future puzzles are not in the initial page load
- Users must manually guess future dates to see upcoming puzzles

### ⚠️ What's NOT Protected
- Users CAN open DevTools and see today's solution in the Network tab
- Users CAN type `/puzzles/2025-12-25.json` to see future puzzles
- This is acceptable for a casual game (like Wordle, whose source code is also visible)

**Note:** Most users won't look for solutions, and those who do would find them elsewhere anyway. The game is about the experience, not preventing cheating.

---

## Testing Locally

```bash
npm run dev
```

Visit: `http://localhost:5173`

---

## Building for Production

```bash
npm run build
npm run preview  # Test production build locally
```

---

## Recommended: Cloudflare Pages

For your use case (daily puzzle game), **Cloudflare Pages** is the best choice:
- Free forever (no tiers)
- 100K requests/day (way more than needed)
- Global CDN for fast loading worldwide
- Easy to add new puzzles via Git
