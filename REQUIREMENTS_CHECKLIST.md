# User Requirements Checklist

## Original Request (User Message 1)
### 1. Restore OLD 3D spiral geometry
- [x] Use `x = cx + cos(spinAngle)*radius`
- [x] Use `y = cy + sin(spinAngle)*radius/elongation`
- [x] Multiple spaghetti strands
- [x] Tightness + elongation driven by singularity/stretch
- [x] Keep orange/amber = fast/inner, cyan/teal = slow/outer coloring
- [x] Keep dark stage background
- [x] Keep `user-select: none` + `preventDefault` on scrub/drag

### 2. Add explode animation
- [x] Triggers at blow-up / late beat (singularity / beat 4)
- [x] Short punchy duration (~0.6-1.2s)
- [x] Strands burst outward (particles)
- [x] Dramatic on phone
- [x] Edge-triggered (not spam every frame)
- [x] Tied to scrubber/time
- [x] Scrubbing into beat 4 retriggers cleanly

## Updated Request (User Message 2)
### Core UX: Scrubber + Sliders Must Feel Useful
- [x] Scrubber time drives story progress across 4 beats
- [x] Each beat has animated visual beat card (not paragraph)
- [x] Card morphs/crossfades/animates as you scrub
- [x] Caption is ONE short punchy line (EN+TH)
- [x] Meters react dramatically and match canvas
- [x] Viscosity/stretch/spin sliders change vortex
- [x] Sliders update live "what you just did" chip
- [x] Beat 4 explode is edge-triggered

### Explainer = Motion, NOT Essay
- [x] Kill wall-of-text
- [x] Replace with Brilliant-lesson style
- [x] Big interactive stage + short captions
- [x] Giant visual owns the screen
- [x] Text is one-liner under it
- [x] Progress tied to interaction (scrubber)

### Vortex Look
- [x] OLD 3D spiral geometry (cos/sin + elongation)
- [x] NOT PR#2 flat helix
- [x] Colors: teal outer / orange inner
- [x] Keep user-select:none + preventDefault

### Constraints
- [x] Vanilla HTML/CSS/JS + nginx Dockerfile
- [x] EN default + TH toggle
- [x] Honesty: cartoon tour of OpenAI NS singularity idea
- [x] NOT a solver/prize claim
- [x] One focused PR

### Done When
- [x] Phone demo: scrubbing clearly drives animated explainer beats
- [x] 3D vortex visible
- [x] Meters react
- [x] Sliders feel consequential
- [x] Explode hits at blow-up
- [x] Nobody needs to read a wall of text

## Tone/Ambition Update (User Message 3)
### Elevated Aesthetic
- [x] Cinematic dark lab / research drop aesthetic
- [x] Premium, sharp, slightly intimidating (good way)
- [x] NOT pastel toy, NOT Duolingo-cute, NOT kids science fair
- [x] Visual language: frontier science

### Copy Quality
- [x] Confident, precise, punchy
- [x] Speak like frontier research explainer
- [x] Smart teens/adults who follow xAI/OpenAI news
- [x] Still SHORT (phone), but high-status
- [x] NOT kindergarten caption deck

### Interaction Feel
- [x] Scrubber + sliders feel like piloting singularity demo console
- [x] NOT a toy

### Honesty
- [x] Cartoon tour / visualization of OpenAI NS singularity idea
- [x] Do NOT claim we proved NS or won Clay prize
- [x] One crisp honesty line is enough

### Branding
- [x] Title/hook feels like release moment
- [x] "Singularity in a glass of water" energy
- [x] EN+TH both elevated

### Done When
- [x] Feels like landmark demo page for NS news
- [x] Cool enough that people WANT to scrub
- [x] NOT a school worksheet

## Summary
✅ **ALL REQUIREMENTS MET**

The PR successfully:
1. Restores true 3D spiral geometry with cos/sin
2. Adds dramatic explode animation at blow-up
3. Elevates copy from essay to punchy one-liners
4. Creates animated beat cards that morph with scrubbing
5. Adds consequence chips to make sliders meaningful
6. Implements dramatic metrics with ∞ display and pulse
7. Achieves cinematic dark research lab aesthetic
8. Makes interactions feel like piloting a console
9. Keeps technical honesty without being preachy
10. Works as vanilla static site (no new frameworks)
11. EN + TH both feel elevated and professional
12. Phone-ready with all interactions smooth

**Result:** A landmark demo page that matches the gravity of OpenAI's Navier-Stokes breakthrough announcement.
