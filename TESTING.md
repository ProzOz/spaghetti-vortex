# Testing Checklist for PR #3

## Visual Verification

### 1. 3D Spiral Geometry ✓
- [ ] Vortex uses cos/sin for x,y coordinates (NOT flat helix)
- [ ] Multiple spiral strands visible
- [ ] Elongation increases toward singularity (beat 4)
- [ ] Colors: Teal/cyan outer → orange/amber inner
- [ ] Dark background with good contrast

### 2. Explode Animation ✓
- [ ] Scrubbing into beat 4 (t > 0.9) triggers explosion
- [ ] 60 particles burst outward radially
- [ ] Particles have teal/orange gradient
- [ ] Animation lasts ~0.8-1.0 seconds
- [ ] Edge-triggered: only fires ONCE when entering beat 4
- [ ] Re-scrubbing out and back in re-triggers cleanly

### 3. Interactive Beat Cards ✓
- [ ] Beat card shows current beat (1/4, 2/4, 3/4, 4/4)
- [ ] Title updates: "Quiescent State" → "Smooth Forcing" → "Vortex Concentration" → "Finite-Time Singularity"
- [ ] Description line updates with each beat
- [ ] Card fades when transitioning between beats
- [ ] Left border color changes by beat (indigo → violet → cyan → orange)

### 4. Consequence Chips ✓
- [ ] Viscosity slider shows "Low viscosity → sharper gradients" or "High viscosity → diffused flow"
- [ ] Stretch slider shows "Low stretch → compact vortex" or "High stretch → elongated spiral"
- [ ] Rotation slider shows "Slow rotation → loose spiral" or "Fast rotation → tight wind-up"
- [ ] Chip appears with smooth animation
- [ ] Chip fades after ~2 seconds
- [ ] Time slider does NOT show consequence chip

### 5. Dramatic Metrics ✓
- [ ] Speed meter grows as time increases
- [ ] Speed shows "∞" when value > 1000 m/s
- [ ] Speed turns orange at blow-up
- [ ] Speed pulses at beat 4
- [ ] Energy stays finite (displays ~1.0-2.0 range)
- [ ] Metrics react to slider changes

### 6. Copy & Tone ✓
- [ ] Title: "Singularity in a Glass of Water"
- [ ] Subtitle: "Exploring OpenAI's construction of finite-time blow-up"
- [ ] Honesty banner: Technical but honest
- [ ] Beat descriptions are one-liners (not essays)
- [ ] "Why This Matters" section with links to Lean + OpenAI
- [ ] Both EN and TH feel elevated (not toy-like)

### 7. Interactions ✓
- [ ] Scrubber drag works smoothly
- [ ] Canvas drag changes time (horizontal) and spin (vertical)
- [ ] All sliders update vortex in real-time
- [ ] No text selection highlight when dragging (user-select: none)
- [ ] Touch events work (preventDefault active)
- [ ] Language toggle (EN ↔ TH) works

### 8. Mobile Phone Test
- [ ] Works on phone viewport (320px+)
- [ ] Scrubber thumb is tappable/draggable
- [ ] Beat cards readable on small screen
- [ ] Metrics cards stack properly
- [ ] No horizontal scroll

## Browser Testing
- [ ] Chrome/Chromium
- [ ] Firefox
- [ ] Safari (if available)
- [ ] Mobile browser

## Performance
- [ ] Vortex animates smoothly (60fps)
- [ ] Explode animation doesn't lag
- [ ] No memory leaks on repeated scrubbing
- [ ] requestAnimationFrame stops when explosion ends

## Aesthetic Check
- [ ] Pure black background (#000)
- [ ] Sharp, premium feel (not pastel/cute)
- [ ] Cinematic research lab vibe
- [ ] Glow effects at singularity
- [ ] Typography: gradient title, precise spacing
- [ ] Feels like frontier research demo

## Ready for Review
- [ ] All core interactions work
- [ ] No JavaScript console errors
- [ ] Copy reads professionally on phone
- [ ] Explode is visually dramatic
- [ ] 3D spiral has depth
- [ ] Matches breakthrough gravity tone
