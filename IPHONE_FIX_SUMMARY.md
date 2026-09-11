# iPhone Safari Canvas Blank Issue - Fix Summary

## Issue Report
User provided iPhone Safari screen recording frames showing:
- Canvas rendering as **blank dark rectangle** where vortex should appear
- Title, beat card, scrubber, metrics, sliders all visible
- Controls desynchronized: scrubber showed t=0.00 while Time slider showed 0.50
- Beat card showed "1/4 Quiescent State" but no vortex visible

## Root Cause Analysis

### Critical JS Error (Primary Cause)
Lines 580-668 in `app.js` contained duplicate vortex rendering code that referenced undefined variables:
```javascript
for (let strandIdx = 0; strandIdx < numStrands; strandIdx++) {  // numStrands undefined!
    const helixAngle = param * Math.PI * 8 * helixTightness + phaseOffset;  // helixTightness undefined!
    const spiralY = Math.sin(spinAngle) * baseRadius / verticalStretch;  // verticalStretch undefined!
```

This caused a **silent JavaScript error** in the draw loop, resulting in:
- Canvas background drawn (dark gradient)
- Main vortex loop never executing
- Blank rectangle visible to user

### iOS Layout Race Condition (Secondary Cause)
```javascript
const w = canvas.clientWidth;  // Read before layout settled on iOS
const h = canvas.clientHeight;
```

On iPhone Safari, `clientWidth`/`clientHeight` can be zero or incorrect during initial render due to:
- Viewport size calculations still in progress
- Font loading not complete
- Layout not finalized

This meant even if JS didn't error, canvas might have zero logical size.

### Low Base Opacity (Tertiary Cause)
Quiescent state (t=0) had very low filament opacity (~0.2-0.3), making vortex barely visible even when rendering correctly.

### Control Desynchronization
- Scrubber updates didn't sync to Time slider
- Time slider updates synced to scrubber
- Canvas drag synced to scrubber but not to Time slider
- Result: controls could show different values

## Solutions Implemented

### 1. Remove Broken Code (88 lines deleted)
Completely removed lines 580-668 containing undefined variable references. The main filament loop (lines 366-597) already provided full vortex rendering.

### 2. Fix Canvas Sizing for iOS
**Before:**
```javascript
const w = canvas.clientWidth;
const h = canvas.clientHeight;
```

**After:**
```javascript
const dpr = window.devicePixelRatio || 1;
ctx.setTransform(dpr, 0, 0, dpr, 0, 0);  // Always reset transform

const w = canvas.width / dpr;  // Use buffer size / DPR for stable logical size
const h = canvas.height / dpr;

if (w < 1 || h < 1) {
    requestAnimationFrame(drawVortex);  // Retry if still zero
    return;
}
```

Benefits:
- `canvas.width` is set explicitly in `resizeCanvas()` and stable
- DPR division gives correct logical coordinates
- Guard clause retries if buffer not ready

### 3. iOS-Safe Initialization
**Before:**
```javascript
function init() {
    resizeCanvas();
    drawVortex();  // Immediate draw
}
```

**After:**
```javascript
function init() {
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {  // Double rAF for iOS layout settle
            resizeCanvas();
            setTimeout(() => {
                drawVortex();  // 50ms delay for font/layout finalization
            }, 50);
        });
    });
}
```

Ensures:
- Layout complete
- Fonts loaded
- Viewport stable

### 4. Vortex Always Visible
Added `baseOpacityBoost = 0.15` to all filaments and tendrils:
```javascript
filament.opacity = opacityBase + baseOpacityBoost + (vortexState.isExploding ? 0.25 : 0);
```

Result: Vortex shows subtle structure even at t=0 (Quiescent State).

### 5. Bidirectional Control Sync
**Scrubber → Slider:**
```javascript
function updateScrubberPosition() {
    // ... update scrubber DOM ...
    if (sliders.time) {
        sliders.time.value = vortexState.time;
        valueDisplays.time.textContent = vortexState.time.toFixed(2);
    }
}
```

**Canvas Drag → All Controls:**
```javascript
// After canvas drag updates vortexState.time and vortexState.spin:
updateScrubberPosition();  // Syncs scrubber + time slider
if (sliders.spin) {
    sliders.spin.value = vortexState.spin;
    valueDisplays.spin.textContent = vortexState.spin.toFixed(2);
}
```

**iOS: Dual Event Listeners:**
```javascript
sliders[key].addEventListener('input', handler);   // Desktop + iOS drag
sliders[key].addEventListener('change', handler);  // iOS final value
```

### 6. Error Fallback (No Silent Blanks)
```javascript
try {
    // ... vortex drawing code ...
} catch (error) {
    console.error('Canvas draw error:', error);
    ctx.fillStyle = '#fb923c';
    ctx.font = '14px -apple-system, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Canvas error: ' + error.message, cx, cy);
}
```

If drawing fails, shows visible error message instead of blank canvas.

### 7. CSS Layout Stability
```css
#vortexCanvas {
    aspect-ratio: 4 / 3;
    contain: layout style paint;  /* Prevent layout thrashing */
}
```

## Testing Results

### Desktop Chrome (Verified ✓)
- Vortex visible at all time points
- Cyan outer + orange core filaments render correctly
- All controls synchronized
- 4 beat transitions smooth
- Explode animation works

### iPhone Safari (Target Platform)
Changes specifically designed for:
- **DPR = 3** (iPhone Retina)
- **Narrow viewport** (~375-428px width)
- **iOS Safari quirks** (layout timing, touch events)

## Files Changed
- `app.js`: 91 insertions, 110 deletions
- `styles.css`: 3 insertions, 1 deletion

## Debug Aid
Added optional `?debug=1` URL parameter that shows overlay:
```
DPR: 3.00
CSS: 343×257px
Buffer: 1029×771px
Filaments: 80
t=0.50 beat=2/4
```

Helpful for verifying canvas state on iPhone.

## Commit History
1. `a93f1bb` - Fix iPhone Safari blank canvas + sync controls
2. `4732537` - Add optional debug overlay (?debug=1)

## Deployment
Branch: `cursor/fix-iphone-canvas-blank-c82f`
PR: https://github.com/ProzOz/spaghetti-vortex/pull/7

Ready for iPhone Safari testing and merge.
