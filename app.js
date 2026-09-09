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
// PREVENT TEXT SELECTION DURING INTERACTIONS
// ============================================================================

// Prevent selectstart event globally on document
document.addEventListener('selectstart', (e) => {
    // Allow text selection only in specific non-interactive areas
    const target = e.target;
    const allowSelection = target.tagName === 'A' || 
                          target.closest('.lang-toggle') ||
                          target.closest('.why-section') ||
                          target.closest('.footer');
    
    if (!allowSelection) {
        e.preventDefault();
    }
});

// Clear any accidental selection on pointer events
function clearSelection() {
    if (window.getSelection) {
        const selection = window.getSelection();
        if (selection && selection.removeAllRanges) {
            selection.removeAllRanges();
        }
    }
}

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

// Draw cartoon vortex (3D spiral with cos/sin geometry)
// Multi-strand tube bundle: Teal/cyan outer (slow) → orange/amber inner (fast)
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
    
    // 3D tube bundle parameters: many distinct helical strands
    const numStrands = 18 + Math.floor(singularityFactor * 12); // More strands as it intensifies
    const maxRadius = Math.min(w, h) * 0.35;
    const helixTightness = 0.8 + singularityFactor * 2.5 * vortexState.stretch;
    const verticalStretch = 1.2 + singularityFactor * 3.8 * vortexState.stretch;
    
    // Explode effect: burst outward
    const explodeFactor = vortexState.isExploding ? Math.sin(vortexState.explodeProgress * Math.PI) * 2.5 : 0;
    
    // Draw multiple helical strands creating a tube bundle (spaghetti vortex)
    // Draw from outside-in for proper depth ordering
    const strandsData = [];
    
    for (let strandIdx = 0; strandIdx < numStrands; strandIdx++) {
        // Each strand has unique phase and radial offset creating tube bundle effect
        const phaseOffset = (strandIdx / numStrands) * Math.PI * 2;
        const tubeRadiusFraction = 0.15 + (strandIdx % 5) * 0.04; // Varies tube thickness
        
        // Path points for this strand
        const points = [];
        
        for (let i = 0; i <= 120; i++) {
            const param = i / 120;
            const spiralDepth = 1 - param; // 1=outer, 0=inner
            
            // Helical angle increases as we spiral inward
            const helixAngle = param * Math.PI * 8 * helixTightness + phaseOffset;
            
            // Base radius shrinks toward center
            const baseRadius = maxRadius * spiralDepth * (1 - singularityFactor * 0.5);
            
            // Add tube radius offset (perpendicular to spiral) creating bundle thickness
            const tubeOffsetAngle = helixAngle + Math.PI / 2;
            const tubeRadius = baseRadius * tubeRadiusFraction * (0.6 + spiralDepth * 0.4);
            
            // Rotation speed increases toward center
            const rotationSpeed = 0.4 + (1 - spiralDepth) * 1.8;
            const spinAngle = helixAngle * vortexState.spin + t * Math.PI * 2 * rotationSpeed;
            
            // 3D helical position: base spiral + tube bundle offset
            const spiralX = Math.cos(spinAngle) * baseRadius;
            const spiralY = Math.sin(spinAngle) * baseRadius / verticalStretch;
            
            const tubeOffsetX = Math.cos(tubeOffsetAngle) * tubeRadius;
            const tubeOffsetY = Math.sin(tubeOffsetAngle) * tubeRadius / verticalStretch;
            
            let x = cx + spiralX + tubeOffsetX + explodeFactor * param * (spiralX + tubeOffsetX) * 0.5;
            let y = cy + spiralY + tubeOffsetY + explodeFactor * param * (spiralY + tubeOffsetY) * 0.5;
            
            points.push({ x, y, depth: spiralDepth });
        }
        
        // Color varies across strands: outer strands = cyan, inner = orange
        const strandColorMix = strandIdx / numStrands;
        let color;
        
        if (strandColorMix < 0.35) {
            // Inner strands: pure orange/amber
            color = { r: 251, g: 146, b: 60 };
        } else if (strandColorMix < 0.75) {
            // Middle transition zone
            const mix = (strandColorMix - 0.35) / 0.4;
            color = {
                r: 251 - mix * (251 - 34),
                g: 146 + mix * (211 - 146),
                b: 60 + mix * (238 - 60)
            };
        } else {
            // Outer strands: cyan/teal
            color = { r: 34, g: 211, b: 238 };
        }
        
        // Vary opacity and line width per strand for depth and volume
        const depthOpacity = 0.25 + (strandIdx % 3) * 0.08;
        const opacity = depthOpacity + singularityFactor * 0.35 + (vortexState.isExploding ? 0.25 : 0);
        const lineWidth = 1.5 + (strandIdx % 4) * 0.4 + singularityFactor * 2.5 + (vortexState.isExploding ? 1.5 : 0);
        
        strandsData.push({ points, color, opacity, lineWidth });
    }
    
    // Render all strands
    strandsData.forEach(strand => {
        ctx.beginPath();
        strand.points.forEach((pt, idx) => {
            if (idx === 0) {
                ctx.moveTo(pt.x, pt.y);
            } else {
                ctx.lineTo(pt.x, pt.y);
            }
        });
        
        ctx.strokeStyle = `rgba(${Math.round(strand.color.r)}, ${Math.round(strand.color.g)}, ${Math.round(strand.color.b)}, ${strand.opacity})`;
        ctx.lineWidth = strand.lineWidth;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.stroke();
    });
    
    // Central singularity glow
    if (singularityFactor > 0.3) {
        const glowRadius = 15 * (1 - singularityFactor * 0.5) + 5 + (vortexState.isExploding ? 20 : 0);
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
    clearSelection();
    isDraggingScrubber = true;
    handleScrubberMove(e.clientX);
});

scrubberTrack.addEventListener('touchstart', (e) => {
    e.preventDefault();
    clearSelection();
    isDraggingScrubber = true;
    handleScrubberMove(e.touches[0].clientX);
}, { passive: false });

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
}, { passive: false });

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
    clearSelection();
    isDraggingCanvas = true;
    lastCanvasX = e.clientX;
    lastCanvasY = e.clientY;
});

canvas.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1) {
        e.preventDefault();
        clearSelection();
        isDraggingCanvas = true;
        lastCanvasX = e.touches[0].clientX;
        lastCanvasY = e.touches[0].clientY;
    }
}, { passive: false });

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
}, { passive: false });

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
