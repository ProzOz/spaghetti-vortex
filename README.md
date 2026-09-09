# Spaghetti Vortex

**Phone-ready interactive explainer: How smooth fluids can develop singularities.**

Drag a cartoon spaghetti vortex through the Navier–Stokes singularity story. Four beats: rest → smooth force → spaghetti stretch → speed explodes (energy stays finite).

## What This Is

- **Teaching cartoon** for the [OpenAI Navier–Stokes solution](https://openai.com/index/navier-stokes-solution/)
- Interactive toy with drag/pinch/scrub controls
- Visualization of the four story beats from the proof
- Mobile-first, Gen-Z clean design
- English + Thai language toggle

## What This Is NOT

- ❌ **Not a numerical solver** (no real Navier-Stokes simulation)
- ❌ **Not claiming the Millennium Prize** (OpenAI already said they won't claim it)
- ❌ **Not solving statements A/B** (those are still open questions)
- ❌ **Not using OpenAI branding** (independent educational tool)

This is a cartoon explainer toy, not a physics engine.

## Tech Stack

- Pure HTML/CSS/JavaScript (no build tools, no React)
- Canvas-based vortex animation
- Touch-friendly mobile interactions
- Dark theme, serious whitespace

## Deployment

### Local Development

Open `index.html` in any modern browser. No build step required.

### Docker + Coolify

```bash
# Build
docker build -t spaghetti-vortex .

# Run (serves on port 80)
docker run -p 8080:80 spaghetti-vortex
```

**Coolify note:** Point at this repo, Dockerfile is included. Nginx serves on port 80.

## Design Credits

UI patterns borrowed from Mobbin screen references:

- **Brilliant** (iOS) — Lesson scaffolding, step indicators, interactive stage
- **Artifact** (iOS) — Reader typography hierarchy, hero media
- **Stripe** (Web) — Dashboard metric cards
- **Linear** (Web) — Property rails, sparse borders
- **Arc Search** (iOS) — Floating soft chrome, rounded cards
- **Mesh** (iOS) — 3D card hero treatment for vortex stage
- **Noom** (iOS) — Video scrubber with playhead
- **Polarsteps** (iOS) — Filmstrip timeline with marked beats

## Links

- [Lean Formalization](https://github.com/openai/NavierStokesAndEuler) — Formal proof in Lean
- [OpenAI Announcement](https://openai.com/index/navier-stokes-solution/) — Full story of the result

---

Built for [Cursor Cloud Agents demo](https://cursor.com). Teaching tool only. Not a solver. Not a prize claim.
