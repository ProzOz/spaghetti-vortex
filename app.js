/**
 * Spaghetti Vortex Interactive App
 * Cartoon vortex animation with drag/pinch/scrub controls
 */

// ============================================================================
// I18N TRANSLATIONS
// ============================================================================

const translations = {
    en: {
        "honesty": "Interactive visualization of OpenAI's Navier–Stokes singularity construction. Not a numerical solver.",
        "title": "Singularity in a Glass of Water",
        "subtitle": "Exploring OpenAI's construction of finite-time blow-up",
        "beat-1": "Quiescent State",
        "beat-1-desc": "Zero velocity field. Perfectly still.",
        "beat-2": "Smooth Forcing",
        "beat-2-desc": "External force applied. No discontinuities.",
        "beat-3": "Vortex Concentration",
        "beat-3-desc": "Inward spiral. Velocity climbing. Energy finite.",
        "beat-4": "Finite-Time Singularity",
        "beat-4-desc": "Speed → ∞. Kinetic energy remains bounded.",
        "beat-1-short": "Rest",
        "beat-2-short": "Force",
        "beat-3-short": "Spiral",
        "beat-4-short": "Blow-up",
        "metric-speed": "Velocity",
        "metric-energy": "Energy",
        "metric-force": "Force",
        "controls-title": "Parameters",
        "param-time": "Time",
        "param-viscosity": "Viscosity",
        "param-stretch": "Stretch",
        "param-spin": "Rotation",
        "consequence-viscosity-low": "Low viscosity → sharper gradients",
        "consequence-viscosity-high": "High viscosity → diffused flow",
        "consequence-stretch-low": "Low stretch → compact vortex",
        "consequence-stretch-high": "High stretch → elongated spiral",
        "consequence-spin-low": "Slow rotation → loose spiral",
        "consequence-spin-high": "Fast rotation → tight wind-up",
        "why-title": "The Breakthrough",
        "why-body": "OpenAI and collaborators constructed explicit smooth solutions to Navier–Stokes that develop singularities in finite time, formalized in Lean. The Clay Millennium Prize question remains open.",
        "link-lean": "Lean Formalization",
        "link-openai": "OpenAI Announcement"
    },
    th: {
        "honesty": "การแสดงภาพเชิงโต้ตอบของ singularity Navier–Stokes จาก OpenAI ไม่ใช่ตัวแก้สมการเชิงตัวเลข",
        "title": "Singularity ในแก้วน้ำ",
        "subtitle": "สำรวจการสร้าง blow-up จาก OpenAI",
        "beat-1": "สถานะนิ่ง",
        "beat-1-desc": "สนามความเร็วเป็นศูนย์ นิ่งสนิท",
        "beat-2": "แรงเรียบ",
        "beat-2-desc": "แรงภายนอกกระทำ ไม่มีจุดไม่ต่อเนื่อง",
        "beat-3": "การรวมตัวของวอร์เท็กซ์",
        "beat-3-desc": "เกลียวเข้าด้านใน ความเร็วพุ่ง พลังงานจำกัด",
        "beat-4": "Singularity ในเวลาจำกัด",
        "beat-4-desc": "ความเร็ว → ∞ พลังงานจลน์ยังจำกัด",
        "beat-1-short": "พัก",
        "beat-2-short": "แรง",
        "beat-3-short": "เกลียว",
        "beat-4-short": "ระเบิด",
        "metric-speed": "ความเร็ว",
        "metric-energy": "พลังงาน",
        "metric-force": "แรง",
        "controls-title": "พารามิเตอร์",
        "param-time": "เวลา",
        "param-viscosity": "ความหนืด",
        "param-stretch": "การยืด",
        "param-spin": "การหมุน",
        "consequence-viscosity-low": "ความหนืดต่ำ → gradient คม",
        "consequence-viscosity-high": "ความหนืดสูง → การไหลกระจาย",
        "consequence-stretch-low": "ยืดน้อย → วอร์เท็กซ์กระชับ",
        "consequence-stretch-high": "ยืดมาก → เกลียวยาว",
        "consequence-spin-low": "หมุนช้า → เกลียวหลวม",
        "consequence-spin-high": "หมุนเร็ว → พันแน่น",
        "why-title": "ความก้าวหน้า",
        "why-body": "OpenAI และผู้ร่วมงานสร้างคำตอบที่เรียบชัดเจนของ Navier–Stokes ที่พัฒนา singularity ในเวลาจำกัด ทำเป็นทางการใน Lean คำถามรางวัล Clay Millennium ยังเปิดอยู่",
        "link-lean": "Lean Formalization",
        "link-openai": "ประกาศ OpenAI"
    }
};

let currentLang = 'en';

function switchLanguage(lang) {
    currentLang = lang;
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang][key]) {
            el.textContent = translations[lang][key];
        }
    });
    
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });
    
    document.documentElement.lang = lang;
}

// Language toggle event listeners
document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        switchLanguage(btn.dataset.lang);
    });
});

// ============================================================================
// VORTEX CANVAS ANIMATION
// ============================================================================

const canvas = document.getElementById('vortexCanvas');
const ctx = canvas.getContext('2d');

// Set canvas resolution
function resizeCanvas() {
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    canvas.style.width = rect.width + 'px';
    canvas.style.height = rect.height + 'px';
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Vortex state
let vortexState = {
    time: 0.5,
    viscosity: 0.1,
    stretch: 0.5,
    spin: 0.8,
    beatIndex: 0,
    isExploding: false,
    explodeProgress: 0,
    lastBeat: 0
};

// Consequence chip state
let consequenceChip = {
    visible: false,
    text: '',
    fadeTimeout: null
};

// Explode animation particles
let explodeParticles = [];

function triggerExplode() {
    vortexState.isExploding = true;
    vortexState.explodeProgress = 0;
    explodeParticles = [];
    
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    const cx = w / 2;
    const cy = h / 2;
    
    // Create burst particles
    const numParticles = 60;
    for (let i = 0; i < numParticles; i++) {
        const angle = (i / numParticles) * Math.PI * 2;
        const speed = 3 + Math.random() * 5;
        const size = 2 + Math.random() * 4;
        
        // Color: orange to cyan gradient
        const colorMix = i / numParticles;
        let color;
        if (colorMix < 0.5) {
            color = { r: 251, g: 146, b: 60 };
        } else {
            color = { r: 34, g: 211, b: 238 };
        }
        
        explodeParticles.push({
            x: cx,
            y: cy,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            size: size,
            life: 1.0,
            color: color
        });
    }
}

function updateExplode() {
    if (!vortexState.isExploding) return;
    
    vortexState.explodeProgress += 0.05;
    
    // Update particles
    explodeParticles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.15;
        p.life -= 0.025;
        p.size *= 0.97;
    });
    
    // End explode after ~1 second
    if (vortexState.explodeProgress >= 1.0) {
        vortexState.isExploding = false;
        explodeParticles = [];
    }
}

function drawExplodeParticles() {
    if (explodeParticles.length === 0) return;
    
    explodeParticles.forEach(p => {
        if (p.life <= 0) return;
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${p.life * 0.8})`;
        ctx.fill();
        
        // Glow
        const glowGrad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3);
        glowGrad.addColorStop(0, `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${p.life * 0.3})`);
        glowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = glowGrad;
        ctx.fillRect(p.x - p.size * 3, p.y - p.size * 3, p.size * 6, p.size * 6);
    });
}

// Draw dense 3D filament vortex matching OpenAI Navier-Stokes visualization
// Key features: inward spiral + axial stretching, depth-sorted thin tubes
function drawVortex() {
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    const cx = w / 2;
    const cy = h / 2;
    
    ctx.clearRect(0, 0, w, h);
    
    // Dark background
    const bgGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(w, h) / 2);
    bgGrad.addColorStop(0, '#0d0d12');
    bgGrad.addColorStop(1, '#050508');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, w, h);
    
    // Check for explode trigger (beat 4 = singularity zone)
    const t = vortexState.time;
    const currentBeat = t >= 0.9 ? 3 : (t >= 0.66 ? 2 : (t >= 0.33 ? 1 : 0));
    if (currentBeat === 3 && vortexState.lastBeat !== 3 && !vortexState.isExploding) {
        triggerExplode();
    }
    vortexState.lastBeat = currentBeat;
    
    // Calculate vortex parameters
    const progress = Math.min(t * 1.5, 1.0);
    const singularityFactor = Math.pow(progress, 3);
    
    // Dense filament pack: many thin tubes
    const numFilaments = 80 + Math.floor(singularityFactor * 100);
    const maxRadius = Math.min(w, h) * 0.4;
    
    // Axial stretching: vertical elongation that increases with singularity
    const axialStretch = 1.2 + singularityFactor * 2.5 * vortexState.stretch;
    
    // Inward spiral tightness
    const spiralTightness = 3.0 + singularityFactor * 6.0 * vortexState.spin;
    
    // Explode effect: burst outward
    const explodeFactor = vortexState.isExploding ? Math.sin(vortexState.explodeProgress * Math.PI) * 2.5 : 0;
    
    // Build filaments with 3D depth data
    const filaments = [];
    
    for (let fIdx = 0; fIdx < numFilaments; fIdx++) {
        const filament = {
            points: [],
            depth: 0,
            color: { r: 0, g: 0, b: 0 },
            opacity: 0,
            width: 0
        };
        
        // Each filament starts at a different angular position
        const baseAngle = (fIdx / numFilaments) * Math.PI * 2;
        
        // Random radial offset for volume density
        const radialStart = 0.7 + Math.random() * 0.3;
        
        // Random phase offset for helix variation
        const phaseOffset = Math.random() * Math.PI * 2;
        
        // Sample points along the filament (outer → center)
        const numPoints = 40;
        for (let i = 0; i < numPoints; i++) {
            const param = i / (numPoints - 1);
            
            // Radius decreases inward (inward spiral)
            const radiusNorm = (1 - param) * radialStart;
            const radius = maxRadius * radiusNorm * (1 - singularityFactor * 0.5);
            
            // Helical angle: spirals inward with multiple turns
            const helixAngle = baseAngle + param * Math.PI * spiralTightness;
            
            // 3D position using cylindrical coords with axial stretching
            // x,z = radial plane (horizontal circle)
            // y = axial (vertical stretch)
            const x3d = Math.cos(helixAngle) * radius;
            const z3d = Math.sin(helixAngle) * radius;
            
            // Axial coordinate: stretched vertically, concentrated at center
            const yBase = (param - 0.5) * maxRadius * axialStretch;
            
            // Add small sinusoidal wobble for filament character
            const wobble = Math.sin(param * Math.PI * 4 + phaseOffset) * radius * 0.08;
            const y3d = yBase + wobble;
            
            // Project to 2D with perspective depth
            // Camera at z = -maxRadius*2, looking at origin
            const camZ = maxRadius * 2;
            const perspectiveFactor = camZ / (camZ + z3d);
            
            const x2d = cx + x3d * perspectiveFactor * (1 + explodeFactor * param);
            const y2d = cy + y3d * perspectiveFactor * (1 + explodeFactor * param);
            
            filament.points.push({ x: x2d, y: y2d });
            
            // Track average depth (z) for sorting
            if (i === Math.floor(numPoints / 2)) {
                filament.depth = z3d;
            }
        }
        
        // Color based on radial position (core = orange, outer = cyan)
        const coreDistance = radiusNorm;
        if (coreDistance < 0.3) {
            // Inner core: orange/copper
            const coreMix = coreDistance / 0.3;
            filament.color = {
                r: 251,
                g: 146 + coreMix * (180 - 146),
                b: 60
            };
        } else if (coreDistance < 0.6) {
            // Mid transition: orange → blue
            const midMix = (coreDistance - 0.3) / 0.3;
            filament.color = {
                r: 251 - midMix * (251 - 70),
                g: 180 + midMix * (130 - 180),
                b: 60 + midMix * (220 - 60)
            };
        } else {
            // Outer: cyan/bright blue
            const outerMix = (coreDistance - 0.6) / 0.4;
            filament.color = {
                r: 70 - outerMix * 36,
                g: 130 + outerMix * 81,
                b: 220 + outerMix * 18
            };
        }
        
        // Thin filaments, slight thickness variation
        filament.width = 0.8 + Math.random() * 0.6 + singularityFactor * 0.4;
        
        // Opacity increases with singularity
        filament.opacity = 0.25 + singularityFactor * 0.35 + (vortexState.isExploding ? 0.25 : 0);
        
        filaments.push(filament);
    }
    
    // Depth sort: back-to-front (painter's algorithm)
    filaments.sort((a, b) => a.depth - b.depth);
    
    // Draw all filaments
    for (const fil of filaments) {
        if (fil.points.length < 2) continue;
        
        ctx.beginPath();
        ctx.moveTo(fil.points[0].x, fil.points[0].y);
        
        for (let i = 1; i < fil.points.length; i++) {
            ctx.lineTo(fil.points[i].x, fil.points[i].y);
        }
        
        ctx.strokeStyle = `rgba(${Math.round(fil.color.r)}, ${Math.round(fil.color.g)}, ${Math.round(fil.color.b)}, ${fil.opacity})`;
        ctx.lineWidth = fil.width;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.stroke();
    }
    
    // Central singularity glow
    if (singularityFactor > 0.3) {
        const glowRadius = 20 * (1 - singularityFactor * 0.4) + 8 + (vortexState.isExploding ? 25 : 0);
        const glowGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, glowRadius);
        glowGrad.addColorStop(0, `rgba(251, 146, 60, ${singularityFactor * 0.9})`);
        glowGrad.addColorStop(1, 'rgba(251, 146, 60, 0)');
        ctx.fillStyle = glowGrad;
        ctx.fillRect(cx - glowRadius, cy - glowRadius, glowRadius * 2, glowRadius * 2);
    }
    
    // Draw explode particles on top
    drawExplodeParticles();
    updateExplode();
    
    // Keep animating during explode
    if (vortexState.isExploding) {
        requestAnimationFrame(drawVortex);
    }
}

// ============================================================================
// BEAT SYSTEM (4 story stops)
// ============================================================================

const beats = [
    { time: 0.0, label: 'beat-1' },
    { time: 0.33, label: 'beat-2' },
    { time: 0.66, label: 'beat-3' },
    { time: 1.0, label: 'beat-4' }
];

function updateBeatIndicator() {
    const t = vortexState.time;
    let beatIndex = 0;
    
    for (let i = 0; i < beats.length; i++) {
        if (t >= beats[i].time) {
            beatIndex = i;
        }
    }
    
    const previousBeat = vortexState.beatIndex;
    vortexState.beatIndex = beatIndex;
    
    // Update beat card with animation
    const beatCard = document.querySelector('.beat-card');
    const beatNumber = document.querySelector('.beat-card-number');
    const beatTitle = document.querySelector('.beat-card-title');
    const beatDesc = document.querySelector('.beat-card-desc');
    
    if (beatNumber && beatTitle && beatDesc) {
        // Trigger fade animation on beat change
        if (previousBeat !== beatIndex && beatCard) {
            beatCard.classList.add('beat-transition');
            setTimeout(() => beatCard.classList.remove('beat-transition'), 400);
        }
        
        beatNumber.textContent = `${beatIndex + 1}/4`;
        
        const titleKey = `beat-${beatIndex + 1}`;
        const descKey = `beat-${beatIndex + 1}-desc`;
        
        beatTitle.setAttribute('data-i18n', titleKey);
        beatTitle.textContent = translations[currentLang][titleKey];
        
        beatDesc.setAttribute('data-i18n', descKey);
        beatDesc.textContent = translations[currentLang][descKey];
        
        // Color coding by beat
        const colors = ['#6366f1', '#8b5cf6', '#22d3ee', '#fb923c'];
        beatCard.style.borderLeftColor = colors[beatIndex];
    }
}

// ============================================================================
// METRICS UPDATE
// ============================================================================

function updateMetrics() {
    const t = vortexState.time;
    const progress = Math.min(t * 1.5, 1.0);
    const singularityFactor = Math.pow(progress, 3);
    
    // Speed grows unbounded towards singularity (dramatic scaling)
    const baseSpeed = 0.1 + singularityFactor * 50 * (1 + Math.pow(progress, 5) * 200);
    const speed = baseSpeed * (1 + vortexState.spin * 0.5) * (1 - vortexState.viscosity * 0.3);
    
    // Energy stays finite (key constraint!)
    const energy = 1.0 + Math.log(1 + singularityFactor * 5) * 0.5;
    
    // Force is smooth throughout
    const force = Math.sin(t * Math.PI) * 5 * (1 + vortexState.viscosity);
    
    // Format with dramatic highlighting at singularity
    const speedEl = document.getElementById('metricSpeed');
    const energyEl = document.getElementById('metricEnergy');
    const forceEl = document.getElementById('metricForce');
    
    if (speed > 100) {
        speedEl.textContent = speed > 1000 ? '∞' : speed.toFixed(0);
        speedEl.style.color = '#fb923c';
    } else {
        speedEl.textContent = speed.toFixed(1);
        speedEl.style.color = '';
    }
    
    energyEl.textContent = energy.toFixed(2);
    forceEl.textContent = Math.abs(force).toFixed(1);
    
    // Pulse animation at blow-up
    if (vortexState.beatIndex === 3) {
        speedEl.style.animation = 'pulse 1s ease-in-out infinite';
    } else {
        speedEl.style.animation = '';
    }
}

function showConsequence(key) {
    const chipEl = document.getElementById('consequenceChip');
    if (!chipEl) return;
    
    let textKey = '';
    const value = vortexState[key];
    
    if (key === 'viscosity') {
        textKey = value < 0.5 ? 'consequence-viscosity-low' : 'consequence-viscosity-high';
    } else if (key === 'stretch') {
        textKey = value < 0.5 ? 'consequence-stretch-low' : 'consequence-stretch-high';
    } else if (key === 'spin') {
        textKey = value < 0.5 ? 'consequence-spin-low' : 'consequence-spin-high';
    }
    
    if (textKey) {
        chipEl.textContent = translations[currentLang][textKey];
        chipEl.classList.add('visible');
        
        clearTimeout(consequenceChip.fadeTimeout);
        consequenceChip.fadeTimeout = setTimeout(() => {
            chipEl.classList.remove('visible');
        }, 2000);
    }
}

// ============================================================================
// SCRUBBER INTERACTION
// ============================================================================

const scrubberTrack = document.querySelector('.scrubber-track');
const scrubberThumb = document.getElementById('scrubberThumb');
const scrubberProgress = document.getElementById('scrubberProgress');
const currentTimeDisplay = document.getElementById('currentTime');
const maxTimeDisplay = document.getElementById('maxTime');

let isDraggingScrubber = false;

function updateScrubberPosition() {
    const percent = vortexState.time * 100;
    scrubberThumb.style.left = `${percent}%`;
    scrubberProgress.style.width = `${percent}%`;
    currentTimeDisplay.textContent = vortexState.time.toFixed(2);
}

function handleScrubberMove(clientX) {
    const rect = scrubberTrack.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = x / rect.width;
    
    vortexState.time = Math.max(0, Math.min(percent, 1));
    updateScrubberPosition();
    updateBeatIndicator();
    updateMetrics();
    drawVortex();
}

scrubberTrack.addEventListener('mousedown', (e) => {
    e.preventDefault();
    isDraggingScrubber = true;
    handleScrubberMove(e.clientX);
});

scrubberTrack.addEventListener('touchstart', (e) => {
    e.preventDefault();
    isDraggingScrubber = true;
    handleScrubberMove(e.touches[0].clientX);
});

document.addEventListener('mousemove', (e) => {
    if (isDraggingScrubber) {
        e.preventDefault();
        handleScrubberMove(e.clientX);
    }
});

document.addEventListener('touchmove', (e) => {
    if (isDraggingScrubber) {
        e.preventDefault();
        handleScrubberMove(e.touches[0].clientX);
    }
});

document.addEventListener('mouseup', () => {
    isDraggingScrubber = false;
});

document.addEventListener('touchend', () => {
    isDraggingScrubber = false;
});

// ============================================================================
// CANVAS DRAG/PINCH INTERACTION
// ============================================================================

let isDraggingCanvas = false;
let lastCanvasX = 0;
let lastCanvasY = 0;

canvas.addEventListener('mousedown', (e) => {
    e.preventDefault();
    isDraggingCanvas = true;
    lastCanvasX = e.clientX;
    lastCanvasY = e.clientY;
});

canvas.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1) {
        e.preventDefault();
        isDraggingCanvas = true;
        lastCanvasX = e.touches[0].clientX;
        lastCanvasY = e.touches[0].clientY;
    }
});

document.addEventListener('mousemove', (e) => {
    if (isDraggingCanvas) {
        e.preventDefault();
        const deltaX = e.clientX - lastCanvasX;
        const deltaY = e.clientY - lastCanvasY;
        
        // Horizontal drag = time scrubbing
        vortexState.time = Math.max(0, Math.min(1, vortexState.time + deltaX / 300));
        
        // Vertical drag = spin adjustment
        vortexState.spin = Math.max(0, Math.min(1, vortexState.spin + deltaY / 500));
        
        updateScrubberPosition();
        updateBeatIndicator();
        updateMetrics();
        drawVortex();
        
        lastCanvasX = e.clientX;
        lastCanvasY = e.clientY;
    }
});

document.addEventListener('touchmove', (e) => {
    if (isDraggingCanvas && e.touches.length === 1) {
        e.preventDefault();
        const deltaX = e.touches[0].clientX - lastCanvasX;
        const deltaY = e.touches[0].clientY - lastCanvasY;
        
        vortexState.time = Math.max(0, Math.min(1, vortexState.time + deltaX / 300));
        vortexState.spin = Math.max(0, Math.min(1, vortexState.spin + deltaY / 500));
        
        updateScrubberPosition();
        updateBeatIndicator();
        updateMetrics();
        drawVortex();
        
        lastCanvasX = e.touches[0].clientX;
        lastCanvasY = e.touches[0].clientY;
    }
});

document.addEventListener('mouseup', () => {
    isDraggingCanvas = false;
});

document.addEventListener('touchend', () => {
    isDraggingCanvas = false;
});

// ============================================================================
// PARAMETER SLIDERS
// ============================================================================

const sliders = {
    time: document.getElementById('sliderTime'),
    viscosity: document.getElementById('sliderViscosity'),
    stretch: document.getElementById('sliderStretch'),
    spin: document.getElementById('sliderSpin')
};

const valueDisplays = {
    time: document.getElementById('valueTime'),
    viscosity: document.getElementById('valueViscosity'),
    stretch: document.getElementById('valueStretch'),
    spin: document.getElementById('valueSpin')
};

Object.keys(sliders).forEach(key => {
    sliders[key].addEventListener('input', (e) => {
        const value = parseFloat(e.target.value);
        vortexState[key] = value;
        valueDisplays[key].textContent = value.toFixed(2);
        
        if (key === 'time') {
            updateScrubberPosition();
            updateBeatIndicator();
        } else {
            showConsequence(key);
        }
        
        updateMetrics();
        drawVortex();
    });
});

// ============================================================================
// INITIALIZATION
// ============================================================================

function init() {
    updateScrubberPosition();
    updateBeatIndicator();
    updateMetrics();
    drawVortex();
    
    // Sync sliders with initial state
    Object.keys(sliders).forEach(key => {
        sliders[key].value = vortexState[key];
        valueDisplays[key].textContent = vortexState[key].toFixed(2);
    });
}

init();

// Redraw on window resize
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        drawVortex();
    }, 100);
});
