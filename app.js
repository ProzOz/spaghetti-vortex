/**
 * Spaghetti Vortex Interactive App
 * Cartoon vortex animation with drag/pinch/scrub controls
 */

// ============================================================================
// I18N TRANSLATIONS
// ============================================================================

const translations = {
    en: {
        "honesty": "Teaching cartoon. Not a numerical solver. Not claiming the Millennium Prize.",
        "title": "The Spaghetti Vortex",
        "subtitle": "How a smooth fluid can blow up",
        "beat-1": "Fluid at rest",
        "beat-2": "Smooth force applied",
        "beat-3": "Spaghetti stretch",
        "beat-4": "Speed explodes, energy stays finite",
        "beat-1-short": "Rest",
        "beat-2-short": "Force",
        "beat-3-short": "Stretch",
        "beat-4-short": "Singularity",
        "metric-speed": "Speed",
        "metric-energy": "Energy",
        "metric-force": "Force",
        "controls-title": "Parameters",
        "param-time": "Time",
        "param-viscosity": "Viscosity",
        "param-stretch": "Stretch",
        "param-spin": "Spin",
        "story-1-title": "Fluid at Rest",
        "story-1-body": "Our fluid begins perfectly still, with zero velocity everywhere. Think of a calm, motionless pool of water before anything disturbs it.",
        "story-2-title": "Smooth Force Applied",
        "story-2-body": "A smooth external force begins to act on the fluid, setting it into gentle motion. The force stays smooth — no sudden spikes, no infinities.",
        "story-3-title": "Spaghetti Stretch",
        "story-3-body": "The vortex spirals inward and elongates like spaghetti. It concentrates, speeding up as it shrinks, but the energy remains finite — the key constraint from physics.",
        "story-4-title": "Speed Explodes, Energy Stays Finite",
        "story-4-body": "In finite time, the fluid velocity grows without bound — a singularity. Yet kinetic energy remains finite, as the laws of physics demand. The continuum model breaks down.",
        "lean-title": "Formalized Proof",
        "lean-body": "This result was produced by AI agents and formalized in Lean, a proof assistant that verifies mathematical correctness. The proof shows that smooth solutions to the Navier–Stokes equations can develop singularities.",
        "link-lean": "Lean Formalization",
        "link-openai": "OpenAI Announcement",
        "footer": "Built with patterns from Mobbin screens: Brilliant lesson scaffolding, Artifact reader typography, Stripe metric cards, Linear property rails, Arc floating chrome, Mesh 3D hero stage, Noom video scrubber, Polarsteps filmstrip timeline."
    },
    th: {
        "honesty": "การ์ตูนสอน ไม่ใช่ตัวแก้สมการจริง ไม่ได้อ้างรางวัล Millennium Prize",
        "title": "กระแสน้ำวนสปาเก็ตตี้",
        "subtitle": "ของไหลเรียบสามารถระเบิดได้อย่างไร",
        "beat-1": "ของไหลหยุดนิ่ง",
        "beat-2": "แรงเรียบกระทำ",
        "beat-3": "ยืดเหมือนสปาเก็ตตี้",
        "beat-4": "ความเร็วระเบิด พลังงานจำกัด",
        "beat-1-short": "พัก",
        "beat-2-short": "แรง",
        "beat-3-short": "ยืด",
        "beat-4-short": "จุดเอกฐาน",
        "metric-speed": "ความเร็ว",
        "metric-energy": "พลังงาน",
        "metric-force": "แรง",
        "controls-title": "พารามิเตอร์",
        "param-time": "เวลา",
        "param-viscosity": "ความหนืด",
        "param-stretch": "การยืด",
        "param-spin": "การหมุน",
        "story-1-title": "ของไหลหยุดนิ่ง",
        "story-1-body": "ของไหลของเราเริ่มต้นด้วยความสงบนิ่งอย่างสมบูรณ์ ความเร็วเป็นศูนย์ทุกที่ คล้ายกับสระน้ำที่สงบก่อนที่สิ่งใดจะรบกวนมัน",
        "story-2-title": "แรงเรียบกระทำ",
        "story-2-body": "แรงภายนอกที่เรียบเริ่มกระทำต่อของไหล ทำให้เกิดการเคลื่อนไหวอย่างนุ่มนวล แรงยังคงเรียบ — ไม่มีการกระโดดทันที ไม่มีอนันต์",
        "story-3-title": "ยืดเหมือนสปาเก็ตตี้",
        "story-3-body": "กระแสน้ำวนหมุนเข้าสู่ภายในและยืดออกเหมือนสปาเก็ตตี้ มันหดตัว เร่งความเร็วขณะที่หดตัว แต่พลังงานยังคงจำกัด — ข้อจำกัดที่สำคัญจากฟิสิกส์",
        "story-4-title": "ความเร็วระเบิด พลังงานยังจำกัด",
        "story-4-body": "ในเวลาจำกัด ความเร็วของของไหลเติบโตโดยไม่มีขอบเขต — จุดเอกฐาน แต่พลังงานจลน์ยังคงจำกัด ตามที่กฎของฟิสิกส์กำหนด โมเดลคอนตินิวอัมพังลง",
        "lean-title": "การพิสูจน์อย่างเป็นทางการ",
        "lean-body": "ผลลัพธ์นี้ถูกสร้างโดยตัวแทน AI และทำให้เป็นทางการใน Lean ซึ่งเป็นผู้ช่วยพิสูจน์ที่ตรวจสอบความถูกต้องทางคณิตศาสตร์ การพิสูจน์แสดงว่าคำตอบที่เรียบของสมการ Navier–Stokes สามารถพัฒนาจุดเอกฐานได้",
        "link-lean": "Lean Formalization",
        "link-openai": "ประกาศ OpenAI",
        "footer": "สร้างด้วยรูปแบบจากหน้าจอ Mobbin: นั่งร้าน Brilliant, ตัวพิมพ์ Artifact, การ์ดตัวชี้วัด Stripe, ราง Linear, โครม Arc ลอยตัว, เวที Mesh 3D, สครับเบอร์วิดีโอ Noom, ไทม์ไลน์ Polarsteps"
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
    beatIndex: 0
};

// Draw cartoon vortex (spaghetti spiral)
// Matches OpenAI official visualization:
// - Cyan/bright teal outer strands (slow rotation)
// - Orange/amber inner strands (fast rotation)
// - Blue/purple mid-range transitions
// - 3D helical tubes wrapping vertical axis with axial stretching
function drawVortex() {
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    const cx = w / 2;
    const cy = h / 2;
    
    ctx.clearRect(0, 0, w, h);
    
    // Dark background matching OpenAI image
    const bgGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(w, h) / 2);
    bgGrad.addColorStop(0, '#0d0d12');
    bgGrad.addColorStop(1, '#050508');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, w, h);
    
    // Calculate vortex parameters based on state
    const t = vortexState.time;
    const progress = Math.min(t * 1.5, 1.0);
    const singularityFactor = Math.pow(progress, 3);
    
    // Strong axial stretching (vertical elongation like OpenAI image)
    const axialStretch = 1.2 + singularityFactor * 4.5 * vortexState.stretch;
    const radialShrink = 1 - singularityFactor * 0.75;
    
    // Multiple helical strands (tube-like ribbons)
    const numStrands = 8 + Math.floor(vortexState.beatIndex * 2);
    const maxRadius = Math.min(w, h) * 0.32;
    
    // Draw 3D helical tube strands
    for (let strandIdx = 0; strandIdx < numStrands; strandIdx++) {
        const strandPhase = (strandIdx / numStrands) * Math.PI * 2;
        const helixPhase = strandIdx * 0.3; // Offset for 3D helix effect
        
        const points = [];
        
        // Generate helical spiral points
        for (let i = 0; i <= 100; i++) {
            const t_param = i / 100;
            const radiusNorm = 1 - t_param; // 1 (outer) to 0 (center)
            
            // Inward spiral with multiple turns
            const spiralTurns = 4 + singularityFactor * 5;
            const theta = radiusNorm * Math.PI * 2 * spiralTurns + strandPhase;
            
            // Angular velocity (faster rotation near center)
            const angularSpeed = 0.4 + (1 - radiusNorm) * 3.0 * vortexState.spin;
            const spinAngle = theta + t * Math.PI * 2 * angularSpeed + helixPhase;
            
            // Radius shrinks inward
            const radius = maxRadius * radiusNorm * radialShrink;
            
            // Vertical position (axial stretching)
            const verticalOffset = (t_param - 0.5) * h * 0.6 / axialStretch;
            
            // 3D helical position
            const x = cx + Math.cos(spinAngle) * radius;
            const y = cy + verticalOffset;
            
            // Color transition: outer cyan → mid blue/purple → inner orange
            // Based on radius (distance from center)
            let color;
            if (radiusNorm > 0.65) {
                // Outer region: bright cyan/teal (slow rotation)
                color = { r: 34, g: 211, b: 238 }; // #22d3ee bright cyan
            } else if (radiusNorm > 0.35) {
                // Mid region: blue/purple transition
                const midFactor = (radiusNorm - 0.35) / 0.3;
                const cyan = { r: 34, g: 211, b: 238 };
                const purple = { r: 96, g: 165, b: 250 }; // #60a5fa blue
                color = {
                    r: purple.r + (cyan.r - purple.r) * midFactor,
                    g: purple.g + (cyan.g - purple.g) * midFactor,
                    b: purple.b + (cyan.b - purple.b) * midFactor
                };
            } else {
                // Inner region: orange/amber (fast rotation)
                const innerFactor = radiusNorm / 0.35;
                const orange = { r: 251, g: 146, b: 60 }; // #fb923c
                const amber = { r: 217, g: 119, b: 6 }; // #d97706
                color = {
                    r: amber.r + (orange.r - amber.r) * innerFactor,
                    g: amber.g + (orange.g - amber.g) * innerFactor,
                    b: amber.b + (orange.b - amber.b) * innerFactor
                };
            }
            
            points.push({ x, y, radiusNorm, color });
        }
        
        // Draw strand as connected tube segments
        for (let i = 0; i < points.length - 1; i++) {
            const p = points[i];
            const pNext = points[i + 1];
            
            // Line width: thicker in outer regions, thinner near center
            const lineWidth = 1.0 + p.radiusNorm * 2.5 + singularityFactor * 1.5;
            
            // Opacity: more visible outer strands
            const opacity = 0.5 + p.radiusNorm * 0.35 + singularityFactor * 0.15;
            
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(pNext.x, pNext.y);
            ctx.strokeStyle = `rgba(${Math.round(p.color.r)}, ${Math.round(p.color.g)}, ${Math.round(p.color.b)}, ${opacity})`;
            ctx.lineWidth = lineWidth;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            ctx.stroke();
        }
    }
    
    // Central concentration glow (orange singularity)
    if (singularityFactor > 0.35) {
        const glowRadius = 10 * (1 - singularityFactor * 0.4) + 5;
        const glowGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, glowRadius);
        glowGrad.addColorStop(0, `rgba(251, 146, 60, ${singularityFactor * 0.9})`);
        glowGrad.addColorStop(0.6, `rgba(217, 119, 6, ${singularityFactor * 0.4})`);
        glowGrad.addColorStop(1, 'rgba(217, 119, 6, 0)');
        ctx.fillStyle = glowGrad;
        ctx.fillRect(cx - glowRadius, cy - glowRadius, glowRadius * 2, glowRadius * 2);
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
    
    vortexState.beatIndex = beatIndex;
    
    const beatNumber = document.querySelector('.beat-number');
    const beatLabel = document.querySelector('.beat-label');
    
    beatNumber.textContent = `${beatIndex + 1}/4`;
    beatLabel.setAttribute('data-i18n', beats[beatIndex].label);
    beatLabel.textContent = translations[currentLang][beats[beatIndex].label];
    
    // Highlight active story card
    document.querySelectorAll('.story-card').forEach((card, idx) => {
        card.classList.toggle('active', idx === beatIndex);
    });
}

// ============================================================================
// METRICS UPDATE
// ============================================================================

function updateMetrics() {
    const t = vortexState.time;
    const progress = Math.min(t * 1.5, 1.0);
    const singularityFactor = Math.pow(progress, 3);
    
    // Speed grows unbounded towards singularity
    const speed = 0.1 + singularityFactor * 50 * (1 + Math.pow(progress, 5) * 200);
    
    // Energy stays finite (key constraint!)
    const energy = 1.0 + Math.log(1 + singularityFactor * 5) * 0.5;
    
    // Force is smooth throughout
    const force = Math.sin(t * Math.PI) * 5 * (1 + vortexState.viscosity);
    
    document.getElementById('metricSpeed').textContent = speed.toFixed(1);
    document.getElementById('metricEnergy').textContent = energy.toFixed(1);
    document.getElementById('metricForce').textContent = Math.abs(force).toFixed(1);
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
