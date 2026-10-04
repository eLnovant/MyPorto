import { terminalCommands } from './terminalCommands.js';
import { profile, skills, projects, faq } from './data.js';

// Global error handler for terminal
window.FOS = window.FOS || {};
const FOS = window.FOS;
FOS.TerminalError = null;

// Catch module loading errors
window.addEventListener('unhandledrejection', (e) => {
    if (e.reason && e.reason.message && e.reason.message.includes('terminal')) {
        console.error('[Terminal] Module load error:', e.reason);
    }
});

// Expose terminal functions to FOS namespace
FOS.terminal = {};

document.addEventListener('DOMContentLoaded', () => {
    try {
        console.log('[Terminal] DOMContentLoaded, initializing...');
        const isMobile = window.innerWidth <= 768;
        const cheatHud = document.createElement('div');
    cheatHud.id = 'cheat-hud';
    cheatHud.innerHTML = `
        <div style="margin-bottom: 3px; border-bottom: 1px dashed var(--warning-color); padding-bottom: 2px;">[SYSTEM_MANUAL]</div>
        <div>> ${isMobile ? 'TAP >_ BTN' : "PRESS '~' OR '\`'"} FOR TERMINAL</div>
        <div>> TAP PHOTO 3X QUICKLY</div>
        <div style="margin-top: 5px;">> RADAR <span class="blink">@#$%</span> ONLINE</div>
        <div style="margin-top: 3px; color: var(--text-primary);">> TRY 'play snake' IN TERM</div>
    `;
    document.body.appendChild(cheatHud);

    window.addEventListener('scroll', () => {
        if (isMobile) return;
        if (window.scrollY > 100) {
            cheatHud.style.opacity = '0';
        } else {
            cheatHud.style.opacity = '1';
        }
    });

    const termBtn = document.createElement('button');
    termBtn.id = 'mobile-term-btn';
    termBtn.innerHTML = '>_';
    document.body.appendChild(termBtn);

    const toggleLogsBtn = document.createElement('button');
    toggleLogsBtn.className = 'mobile-toggle-btn';
    toggleLogsBtn.id = 'mobile-logs-btn';
    toggleLogsBtn.innerHTML = 'LOG';
    document.body.appendChild(toggleLogsBtn);

    const toggleManualBtn = document.createElement('button');
    toggleManualBtn.className = 'mobile-toggle-btn';
    toggleManualBtn.id = 'mobile-manual-btn';
    toggleManualBtn.innerHTML = 'MAN';
    document.body.appendChild(toggleManualBtn);

    toggleLogsBtn.addEventListener('click', () => {
        const logsContainer = document.getElementById('live-logs-container');
        if (logsContainer) {
            const isShowing = logsContainer.classList.contains('show-mobile');

            cheatHud.classList.remove('show-mobile');
            toggleManualBtn.classList.remove('active');

            if (isShowing) {
                logsContainer.classList.remove('show-mobile');
                toggleLogsBtn.classList.remove('active');
            } else {
                logsContainer.classList.add('show-mobile');
                toggleLogsBtn.classList.add('active');
            }
        }
    });

    toggleManualBtn.addEventListener('click', () => {
        const isShowing = cheatHud.classList.contains('show-mobile');

        const logsContainer = document.getElementById('live-logs-container');
        if (logsContainer) {
            logsContainer.classList.remove('show-mobile');
            toggleLogsBtn.classList.remove('active');
        }

        if (isShowing) {
            cheatHud.classList.remove('show-mobile');
            toggleManualBtn.classList.remove('active');
        } else {
            cheatHud.classList.add('show-mobile');
            toggleManualBtn.classList.add('active');
        }
    });

    const radar = document.createElement('div');
    radar.id = 'radar-scanner';
    document.body.appendChild(radar);

    document.addEventListener('mousemove', (e) => {
        if (Math.random() > 0.9) {
            const blip = document.createElement('div');
            blip.className = 'radar-blip';
            blip.style.left = e.clientX + 'px';
            blip.style.top = e.clientY + 'px';
            document.body.appendChild(blip);
            setTimeout(() => blip.remove(), 2000);
        }
    });

    const termHtml = `
        <div id="cmd-terminal" class="terminal-scanlines">
            <div class="terminal-bg-layers" aria-hidden="true">
                <canvas class="terminal-cube-canvas"></canvas>
            </div>
            <div class="cmd-header" id="terminal-header">
                <span id="cmd-title-path">FARID@SYSTEM:~</span>
                <button id="cmd-close">[X]</button>
            </div>
            <div id="cmd-output"></div>
            <div class="cmd-input-line">
                <span id="cmd-prompt">FARID $</span>
                <input type="text" id="cmd-input" autocomplete="off" spellcheck="false" inputmode="text" aria-label="Terminal command input">
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', termHtml);

    const term = document.getElementById('cmd-terminal');
    const output = document.getElementById('cmd-output');
    const input = document.getElementById('cmd-input');
    const closeBtn = document.getElementById('cmd-close');

    // Initialize terminal background animations
    initTerminalBackground(term);

    let isOpen = false;
    let hasBooted = false;
    let currentPathString = "/home/farid/portfolio";

    function initTerminalBackground(term) {
        const cubeCanvas = term.querySelector('.terminal-cube-canvas');
        if (!cubeCanvas) return;

        const ctx = cubeCanvas.getContext('2d');
        let animationId = null;
        let time = 0;
        let width = 0;
        let height = 0;
        const centerX = 0;
        const centerY = 0;

        // 3D Cube vertices
        const cubeSize = 80;
        const vertices = [
            [-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1],  // back face
            [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]        // front face
        ].map(v => v.map(c => c * cubeSize));

        // Cube edges
        const edges = [
            [0,1], [1,2], [2,3], [3,0],  // back
            [4,5], [5,6], [6,7], [7,4],  // front
            [0,4], [1,5], [2,6], [3,7]   // connecting
        ];

        // Light beams from vertices
        const beams = [];
        const particles = [];
        const orbitingRings = [];

        function resizeCanvas() {
            const rect = term.getBoundingClientRect();
            width = cubeCanvas.width = rect.width;
            height = cubeCanvas.height = rect.height;
        }

        function rotateX(point, angle) {
            const y = point[1] * Math.cos(angle) - point[2] * Math.sin(angle);
            const z = point[1] * Math.sin(angle) + point[2] * Math.cos(angle);
            return [point[0], y, z];
        }

        function rotateY(point, angle) {
            const x = point[0] * Math.cos(angle) + point[2] * Math.sin(angle);
            const z = -point[0] * Math.sin(angle) + point[2] * Math.cos(angle);
            return [x, point[1], z];
        }

        function rotateZ(point, angle) {
            const x = point[0] * Math.cos(angle) - point[1] * Math.sin(angle);
            const y = point[0] * Math.sin(angle) + point[1] * Math.cos(angle);
            return [x, y, point[2]];
        }

        function project(point) {
            const distance = 400;
            const z = point[2] + distance;
            const scale = distance / z;
            return {
                x: centerX + point[0] * scale,
                y: centerY + point[1] * scale,
                z: point[2],
                scale: scale
            };
        }

        function initOrbitingRings() {
            orbitingRings.length = 0;
            for (let i = 0; i < 3; i++) {
                orbitingRings.push({
                    radius: cubeSize * (1.5 + i * 0.6),
                    angle: i * Math.PI / 3,
                    speed: 0.003 + i * 0.0015,
                    axis: ['x', 'y', 'z'][i],
                    vertices: 12,
                    pulse: 0
                });
            }
        }

        function spawnBeams(projectedVertices) {
            if (Math.random() < 0.08) {
                const v = projectedVertices[Math.floor(Math.random() * projectedVertices.length)];
                const beamCount = 3 + Math.floor(Math.random() * 4);
                for (let i = 0; i < beamCount; i++) {
                    const angle = (Math.PI * 2 / beamCount) * i + Math.random() * 0.5;
                    const length = 150 + Math.random() * 200;
                    beams.push({
                        x: v.x,
                        y: v.y,
                        angle: angle,
                        length: 0,
                        maxLength: length,
                        speed: 8 + Math.random() * 6,
                        color: Math.random() > 0.5 ? '#00ff88' : '#00ccff',
                        width: 1 + Math.random() * 2,
                        life: 1,
                        decay: 0.015 + Math.random() * 0.01
                    });
                }
            }
        }

        function spawnParticles(projectedVertices) {
            if (Math.random() < 0.15) {
                const v = projectedVertices[Math.floor(Math.random() * projectedVertices.length)];
                for (let i = 0; i < 2; i++) {
                    const angle = Math.random() * Math.PI * 2;
                    const speed = 1 + Math.random() * 3;
                    particles.push({
                        x: v.x,
                        y: v.y,
                        vx: Math.cos(angle) * speed,
                        vy: Math.sin(angle) * speed,
                        size: 1 + Math.random() * 2,
                        opacity: 0.6 + Math.random() * 0.4,
                        color: Math.random() > 0.5 ? '#00ff88' : '#00ccff',
                        life: 1,
                        decay: 0.01 + Math.random() * 0.015,
                        trail: []
                    });
                }
            }
        }

        function updateOrbitingRings(dt) {
            orbitingRings.forEach(ring => {
                ring.angle += ring.speed * dt;
                ring.pulse = 0.5 + Math.sin(time * 0.002 + ring.angle) * 0.3;
            });
        }

        function updateBeams(dt) {
            for (let i = beams.length - 1; i >= 0; i--) {
                const b = beams[i];
                b.length += b.speed * dt * 0.016;
                b.life -= b.decay * dt * 0.016;
                if (b.length >= b.maxLength || b.life <= 0) {
                    beams.splice(i, 1);
                }
            }
        }

        function updateParticles(dt) {
            for (let i = particles.length - 1; i >= 0; i--) {
                const p = particles[i];
                p.trail.unshift({ x: p.x, y: p.y });
                if (p.trail.length > 8) p.trail.pop();
                
                p.x += p.vx * dt * 0.016;
                p.y += p.vy * dt * 0.016;
                p.life -= p.decay * dt * 0.016;
                p.size *= 0.995;
                
                if (p.life <= 0 || p.size < 0.3) {
                    particles.splice(i, 1);
                }
            }
        }

        function drawCube(projectedVertices) {
            // Draw cube edges with glow
            const pulseIntensity = 0.3 + Math.sin(time * 0.003) * 0.15;
            
            edges.forEach((edge, i) => {
                const v1 = projectedVertices[edge[0]];
                const v2 = projectedVertices[edge[1]];
                
                // Depth-based color
                const avgZ = (v1.z + v2.z) / 2;
                const depthFactor = Math.max(0.2, 1 + avgZ / 200);
                
                ctx.beginPath();
                ctx.moveTo(v1.x, v1.y);
                ctx.lineTo(v2.x, v2.y);
                
                // Main edge
                const edgeAlpha = 0.4 * depthFactor * pulseIntensity;
                ctx.strokeStyle = `rgba(0, 255, 136, ${edgeAlpha})`;
                ctx.lineWidth = 1.5 * depthFactor;
                ctx.shadowColor = '#00ff88';
                ctx.shadowBlur = 8 * depthFactor * pulseIntensity;
                ctx.stroke();
                
                // Inner bright line
                ctx.strokeStyle = `rgba(0, 204, 255, ${0.6 * depthFactor * pulseIntensity})`;
                ctx.lineWidth = 0.5 * depthFactor;
                ctx.shadowBlur = 12 * depthFactor * pulseIntensity;
                ctx.stroke();
                ctx.shadowBlur = 0;
            });

            // Draw vertices as glowing points
            projectedVertices.forEach((v, i) => {
                const depthFactor = Math.max(0.3, 1 + v.z / 200);
                const pulse = 0.5 + Math.sin(time * 0.005 + i) * 0.4;
                
                // Outer glow
                const gradient = ctx.createRadialGradient(v.x, v.y, 0, v.x, v.y, 12 * depthFactor);
                gradient.addColorStop(0, `rgba(0, 255, 136, ${0.8 * depthFactor * pulse})`);
                gradient.addColorStop(0.5, `rgba(0, 204, 255, ${0.4 * depthFactor * pulse})`);
                gradient.addColorStop(1, 'rgba(0, 255, 136, 0)');
                
                ctx.beginPath();
                ctx.arc(v.x, v.y, 12 * depthFactor, 0, Math.PI * 2);
                ctx.fillStyle = gradient;
                ctx.fill();
                
                // Core
                ctx.beginPath();
                ctx.arc(v.x, v.y, 3 * depthFactor, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${0.9 * pulse})`;
                ctx.fill();
            });
        }

        function drawOrbitingRings(projectedVertices) {
            const cubeCenter = { x: centerX, y: centerY };
            
            orbitingRings.forEach((ring, ringIdx) => {
                ctx.save();
                ctx.translate(cubeCenter.x, cubeCenter.y);
                
                if (ring.axis === 'x') {
                    ctx.scale(1, 0.3);
                } else if (ring.axis === 'y') {
                    ctx.scale(0.3, 1);
                }
                ctx.rotate(ring.angle);
                
                const vertices = [];
                for (let i = 0; i < ring.vertices; i++) {
                    const angle = (Math.PI * 2 / ring.vertices) * i;
                    const r = ring.radius + Math.sin(time * 0.002 + i) * 5;
                    vertices.push({ x: Math.cos(angle) * r, y: Math.sin(angle) * r });
                }
                
                // Draw ring segments
                vertices.forEach((v, i) => {
                    const next = vertices[(i + 1) % ring.vertices];
                    const pulse = ring.pulse;
                    
                    ctx.beginPath();
                    ctx.moveTo(v.x, v.y);
                    ctx.lineTo(next.x, next.y);
                    
                    const alpha = 0.15 * pulse * (0.5 + 0.5 * Math.sin(time * 0.003 + i));
                    ctx.strokeStyle = ringIdx % 2 === 0 ? 
                        `rgba(0, 255, 136, ${alpha})` : 
                        `rgba(0, 204, 255, ${alpha})`;
                    ctx.lineWidth = 1;
                    ctx.shadowColor = ringIdx % 2 === 0 ? '#00ff88' : '#00ccff';
                    ctx.shadowBlur = 6 * pulse;
                    ctx.stroke();
                    ctx.shadowBlur = 0;
                });
                
                ctx.restore();
            });
        }

        function drawBeams() {
            beams.forEach(b => {
                const progress = b.length / b.maxLength;
                const endX = b.x + Math.cos(b.angle) * b.length;
                const endY = b.y + Math.sin(b.angle) * b.length;
                
                // Beam core
                const gradient = ctx.createLinearGradient(b.x, b.y, endX, endY);
                gradient.addColorStop(0, `rgba(255, 255, 255, ${0.9 * b.life})`);
                gradient.addColorStop(0.3, b.color.replace(')', `, ${0.6 * b.life})`).replace('rgb', 'rgba').replace('#', ''));
                gradient.addColorStop(1, b.color.replace(')', `, 0)`).replace('rgb', 'rgba').replace('#', ''));
                
                // Convert hex to rgba for gradient
                const hex = b.color.replace('#', '');
                const r = parseInt(hex.substr(0, 2), 16);
                const g = parseInt(hex.substr(2, 2), 16);
                const bl = parseInt(hex.substr(4, 2), 16);
                
                gradient = ctx.createLinearGradient(b.x, b.y, endX, endY);
                gradient.addColorStop(0, `rgba(255, 255, 255, ${0.9 * b.life})`);
                gradient.addColorStop(0.3, `rgba(${r}, ${g}, ${bl}, ${0.6 * b.life})`);
                gradient.addColorStop(1, `rgba(${r}, ${g}, ${bl}, 0)`);
                
                ctx.beginPath();
                ctx.moveTo(b.x, b.y);
                ctx.lineTo(endX, endY);
                ctx.strokeStyle = gradient;
                ctx.lineWidth = b.width * (1 + Math.sin(time * 0.02) * 0.3);
                ctx.shadowColor = b.color;
                ctx.shadowBlur = 15 * b.life;
                ctx.stroke();
                ctx.shadowBlur = 0;
                
                // Beam head glow
                ctx.beginPath();
                ctx.arc(endX, endY, 4 * b.life, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${r}, ${g}, ${bl}, ${0.8 * b.life})`;
                ctx.fill();
            });
        }

        function drawParticles() {
            particles.forEach(p => {
                // Draw trail
                if (p.trail.length > 1) {
                    ctx.beginPath();
                    ctx.moveTo(p.trail[0].x, p.trail[0].y);
                    for (let i = 1; i < p.trail.length; i++) {
                        ctx.lineTo(p.trail[i].x, p.trail[i].y);
                    }
                    ctx.strokeStyle = p.color.replace(')', `, ${p.opacity * p.life * 0.3})`).replace('rgb', 'rgba').replace('#', '');
                    const hex = p.color.replace('#', '');
                    const r = parseInt(hex.substr(0, 2), 16);
                    const g = parseInt(hex.substr(2, 2), 16);
                    const bl = parseInt(hex.substr(4, 2), 16);
                    ctx.strokeStyle = `rgba(${r}, ${g}, ${bl}, ${p.opacity * p.life * 0.3})`;
                    ctx.lineWidth = p.size * 0.5;
                    ctx.stroke();
                }
                
                // Draw particle
                const hex = p.color.replace('#', '');
                const r = parseInt(hex.substr(0, 2), 16);
                const g = parseInt(hex.substr(2, 2), 16);
                const bl = parseInt(hex.substr(4, 2), 16);
                
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${r}, ${g}, ${bl}, ${p.opacity * p.life})`;
                ctx.shadowColor = p.color;
                ctx.shadowBlur = 6 * p.life;
                ctx.fill();
                ctx.shadowBlur = 0;
            });
        }

        function drawScanlines() {
            ctx.save();
            ctx.globalAlpha = 0.03;
            ctx.strokeStyle = '#00ff88';
            ctx.lineWidth = 1;
            
            for (let y = -height; y < height * 2; y += 4) {
                const offset = (time * 0.5) % 4;
                const lineY = y + offset;
                ctx.beginPath();
                ctx.moveTo(0, lineY);
                ctx.lineTo(width, lineY);
                ctx.stroke();
            }
            ctx.restore();
        }

        function animate() {
            ctx.clearRect(0, 0, width, height);
            
            const dt = 16;
            time += dt;
            
            // Rotation angles
            const rotX = time * 0.0003;
            const rotY = time * 0.0005;
            const rotZ = time * 0.0002;
            
            // Rotate and project vertices
            const projectedVertices = vertices.map(v => {
                let rotated = rotateX(v, rotX);
                rotated = rotateY(rotated, rotY);
                rotated = rotateZ(rotated, rotZ);
                return project(rotated);
            });
            
            // Spawn effects
            spawnBeams(projectedVertices);
            spawnParticles(projectedVertices);
            updateOrbitingRings(dt);
            updateBeams(dt);
            updateParticles(dt);
            
            // Draw layers (back to front)
            drawOrbitingRings(projectedVertices);
            drawBeams();
            drawCube(projectedVertices);
            drawParticles();
            drawScanlines();
            
            animationId = requestAnimationFrame(animate);
        }

        function start() {
            resizeCanvas();
            initOrbitingRings();
            centerX = width / 2;
            centerY = height / 2;
            animate();
            
            const resizeObserver = new ResizeObserver(() => {
                const oldWidth = width;
                const oldHeight = height;
                resizeCanvas();
                centerX = width / 2;
                centerY = height / 2;
            });
            resizeObserver.observe(term);
            
            term._bgCleanup = () => {
                cancelAnimationFrame(animationId);
                resizeObserver.disconnect();
            };
        }

        function stop() {
            if (term._bgCleanup) term._bgCleanup();
        }

        if (!term._bgStarted) {
            term._bgStarted = true;
            // Start immediately - terminal is off-screen initially (translateY(-100%))
            // Animation runs in background with low opacity, no performance issue
            start();
            
            // Optional: pause when closed, resume when opened
            const observer = new MutationObserver(() => {
                const style = window.getComputedStyle(term);
                const isOpen = style.transform !== 'none' && 
                               style.transform !== 'matrix(1, 0, 0, 1, 0, 0)' &&
                               !style.transform.includes('translateY(-100%)');
                if (isOpen) {
                    if (!animationId) animate();
                } else {
                    // Could cancelAnimationFrame here but keeping it running is fine
                }
            });
            observer.observe(term, { attributes: true, attributeFilter: ['style'] });
        }
    }

    function updatePromptPath() {
        const promptEl = document.getElementById('cmd-prompt');
        const titlePathEl = document.getElementById('cmd-title-path');

        if (promptEl) {
            promptEl.innerHTML = `<span style="color:var(--accent-color)">FARID@SYSTEM</span>:<span style="color:var(--text-secondary)">${currentPathString}</span> $`;
        }
        if (titlePathEl) {
            titlePathEl.textContent = `FARID@SYSTEM:${currentPathString}`;
        }
    }

    function bootTerminal() {
        if (hasBooted) return;
        hasBooted = true;
        input.disabled = true;

        const asciiArt = `
  ______ ____   _____   __      _____   ___  
 |  ____/ __ \\ / ____|  \\ \\    / /__ \\ / _ \\ 
 | |__ | |  | | (___     \\ \\  / /   ) | | | |
 |  __|| |  | |\\___ \\     \\ \\/ /   / /| | | |
 | |   | |__| |____) |     \\  /   / /_| |_| |
 |_|    \\____/|_____/       \\/   |____|\\___/ 
        `;

        const bootLines = [
            "CONNECTING TO SECURE MAINFRAME...",
            "ESTABLISHING ENCRYPTED SHELL...",
            asciiArt,
            "FOS V2.0 (Farid Operating System)",
            "WELCOME, ADMINISTRATOR.",
            "KETIK 'help' UNTUK MELIHAT DAFTAR PERINTAH."
        ];

        let i = 0;
        function printNext() {
            if (!isOpen) return;
            if (i < bootLines.length) {
                if (i === 2) {
                    printOutput(`<pre style="color:var(--text-primary); margin:0;">${asciiArt}</pre>`, true);
                } else {
                    printOutput(bootLines[i]);
                }
                i++;
                setTimeout(printNext, i === 3 ? 100 : 300);
            } else {
                input.disabled = false;
                updatePromptPath();
                if (isOpen) input.focus();
            }
        }
        printNext();
    }

    FOS.currentTerminalGame = null;
    FOS.currentTerminalKeydown = null;
    FOS.currentTerminalKeyup = null;
    FOS.currentTerminalStream = null;

    function cleanupTerminalProcesses() {
        if (FOS.currentTerminalGame) {
            clearInterval(FOS.currentTerminalGame);
            FOS.currentTerminalGame = null;
        }
        if (FOS.currentTerminalKeydown) {
            document.removeEventListener('keydown', FOS.currentTerminalKeydown);
            FOS.currentTerminalKeydown = null;
        }
        if (FOS.currentTerminalKeyup) {
            document.removeEventListener('keyup', FOS.currentTerminalKeyup);
            FOS.currentTerminalKeyup = null;
        }
        if (FOS.currentTerminalStream) {
            FOS.currentTerminalStream.getTracks().forEach(t => t.stop());
            FOS.currentTerminalStream = null;
        }
        const typer = document.getElementById('hacker-typer');
        if (typer) typer.classList.add('hidden');
        input.disabled = false;
    }

    function toggleTerminal() {
        isOpen = !isOpen;
        if (isOpen) {
            term.style.transform = 'translateY(0)';
            updatePromptPath();
            if (!hasBooted) {
                bootTerminal();
            } else {
                setTimeout(() => input.focus(), 300);
            }
            document.body.classList.add('terminal-open');
        } else {
            term.style.transform = 'translateY(-100%)';
            input.blur();
            cleanupTerminalProcesses();
            document.body.classList.remove('terminal-open');
        }
    }

    termBtn.addEventListener('click', toggleTerminal);

    const rootAccessBtn = document.getElementById('root-access-btn');
    if (rootAccessBtn) {
        rootAccessBtn.addEventListener('click', toggleTerminal);
    }

    // Debug: log when terminal.js loads
    console.log('[Terminal] Module loaded, backtick handler registered');

    window.addEventListener('keydown', (e) => {
        // Don't trigger if typing in input/textarea
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
            console.log('[Terminal] Keydown ignored - typing in input/textarea');
            return;
        }
        
        console.log('[Terminal] Keydown:', e.key, 'code:', e.code);
        
        // Multiple shortcuts for different keyboard layouts
        const isBacktick = e.key === '`' || e.key === '~' || e.code === 'Backquote';
        const isF2 = e.key === 'F2' || e.code === 'F2';
        const isCtrlShiftT = e.ctrlKey && e.shiftKey && (e.key === 't' || e.key === 'T');
        
        if (isBacktick || isF2 || isCtrlShiftT) {
            console.log('[Terminal] Shortcut detected:', { isBacktick, isF2, isCtrlShiftT });
            e.preventDefault();
            toggleTerminal();
        }
        
        // Esc key to close terminal when open
        if (e.key === 'Escape' && isOpen) {
            e.preventDefault();
            toggleTerminal();
        }
    });

    closeBtn.addEventListener('click', () => {
        if (isOpen) toggleTerminal();
    });

    let commandHistory = [];
    let historyIndex = -1;

    // Load command history from localStorage
    try {
        const savedHistory = localStorage.getItem('terminalHistory');
        if (savedHistory) {
            commandHistory = JSON.parse(savedHistory).slice(-50); // Keep last 50 commands
        }
    } catch (e) {
        console.warn('Failed to load terminal history:', e);
    }

    function saveHistory() {
        try {
            localStorage.setItem('terminalHistory', JSON.stringify(commandHistory.slice(-50)));
        } catch (e) {
            console.warn('Failed to save terminal history:', e);
        }
    }

    // Available commands for autocomplete
    const availableCommands = [
        'help', 'clear', 'date', 'whoami', 'hire farid', 'sudo hack',
        'play snake', 'play pong', 'hack target', 'analyze network',
        'enable voice_uplink', 'initiate self-destruct', '7355608',
        'rave', 'play music', 'stop music', 'color', 'theme', 'about', 'skills',
        'projects', 'contact', 'education', 'experience', 'chat',
        'ls', 'cls', 'dir', 'pwd', 'echo', 'history', 'exit',
        'matrix', 'coffee', 'hack', 'sudo make me a sandwich', 'scan', 'decrypt'
    ];

    // Command aliases
    const commandAliases = {
        'ls': 'help',
        'dir': 'help',
        'cls': 'clear',
        'pwd': () => printOutput('/home/farid/portfolio'),
        'echo': (args) => printOutput(args.join(' ')),
        'history': () => {
            commandHistory.forEach((cmd, i) => printOutput(`${i + 1}  ${cmd}`));
        },
        'exit': () => { if (isOpen) toggleTerminal(); }
    };

    let tabPressCount = 0;
    let lastTabTime = 0;
    let currentCompletions = [];
    let completionIndex = 0;

    input.addEventListener('keydown', (e) => {
        // Tab autocomplete
        if (e.key === 'Tab') {
            e.preventDefault();
            const now = Date.now();
            const val = input.value.trim().toLowerCase();
            
            if (now - lastTabTime < 300 && val === currentCompletions[0]?.startsWith(val)) {
                // Double tab - cycle through completions
                completionIndex = (completionIndex + 1) % currentCompletions.length;
            } else {
                // First tab - find completions
                currentCompletions = availableCommands.filter(cmd => cmd.startsWith(val));
                completionIndex = 0;
                tabPressCount = 1;
            }
            lastTabTime = now;

            if (currentCompletions.length === 1) {
                input.value = currentCompletions[0] + ' ';
            } else if (currentCompletions.length > 1) {
                if (completionIndex < currentCompletions.length) {
                    input.value = currentCompletions[completionIndex];
                }
                // Show all completions on double tab
                if (tabPressCount >= 2) {
                    printOutput(currentCompletions.join('  '));
                    tabPressCount = 0;
                }
                tabPressCount++;
            }
            return;
        }

        // Ctrl+R history search
        if (e.ctrlKey && e.key === 'r') {
            e.preventDefault();
            if (commandHistory.length === 0) return;
            
            const searchTerm = prompt('History search (regex supported):');
            if (searchTerm === null) return;
            
            try {
                const regex = new RegExp(searchTerm, 'i');
                const matches = commandHistory.filter(cmd => regex.test(cmd));
                if (matches.length > 0) {
                    printOutput('History matches:');
                    matches.forEach((cmd, i) => printOutput(`${commandHistory.indexOf(cmd) + 1}: ${cmd}`));
                } else {
                    printOutput('No matches found.');
                }
            } catch (err) {
                printOutput('Invalid regex.');
            }
            return;
        }

        if (e.key === 'Enter') {
            tabPressCount = 0;
            currentCompletions = [];
            const val = input.value.trim();
            if (val) {
                printOutput(`$ ${val}`, false, { typewriter: true });
                commandHistory.push(val);
                saveHistory();
                historyIndex = commandHistory.length;
                processCmd(val.toLowerCase());
            }
            input.value = '';
        } else if (e.key === 'ArrowUp') {
            tabPressCount = 0;
            currentCompletions = [];
            e.preventDefault();
            if (historyIndex > 0) {
                historyIndex--;
                input.value = commandHistory[historyIndex];
            }
        } else if (e.key === 'ArrowDown') {
            tabPressCount = 0;
            currentCompletions = [];
            e.preventDefault();
            if (historyIndex < commandHistory.length - 1) {
                historyIndex++;
                input.value = commandHistory[historyIndex];
            } else {
                historyIndex = commandHistory.length;
                input.value = '';
            }
        } else {
            tabPressCount = 0;
            currentCompletions = [];
        }
    });

    function printOutput(text, isHtml = false, options = {}) {
        const { typewriter = false, className = '' } = options;
        const p = document.createElement('div');
        p.style.marginBottom = '5px';
        if (className) p.className = className;
        
        if (typewriter && !isHtml) {
            p.classList.add('terminal-line', 'typewriter');
            p.textContent = '';
            output.appendChild(p);
            output.scrollTop = output.scrollHeight;
            
            let i = 0;
            const speed = 15; // ms per character
            function typeChar() {
                if (i < text.length) {
                    p.textContent += text[i];
                    i++;
                    output.scrollTop = output.scrollHeight;
                    setTimeout(typeChar, speed + Math.random() * 10);
                } else {
                    p.classList.remove('typewriter');
                    p.style.borderRight = 'none';
                }
            }
            typeChar();
        } else {
            if (isHtml) p.innerHTML = text;
            else p.textContent = text;
            output.appendChild(p);
            output.scrollTop = output.scrollHeight;
        }
    }

    function shakeTerminal() {
        const term = document.getElementById('cmd-terminal');
        if (term) {
            term.classList.add('shake');
            setTimeout(() => term.classList.remove('shake'), 400);
        }
    }

    function showLoadingBar(label, duration, steps, onComplete) {
        const container = document.createElement('div');
        container.className = 'terminal-loading';
        
        const labelEl = document.createElement('div');
        labelEl.className = 'loading-text';
        labelEl.innerHTML = `${label} <span class="loading-percent">0%</span>`;
        container.appendChild(labelEl);
        
        const barContainer = document.createElement('div');
        barContainer.className = 'loading-bar-container';
        const barFill = document.createElement('div');
        barFill.className = 'loading-bar-fill';
        barContainer.appendChild(barFill);
        container.appendChild(barContainer);
        
        output.appendChild(container);
        output.scrollTop = output.scrollHeight;
        
        let progress = 0;
        const stepTime = duration / steps;
        const increment = 100 / steps;
        
        function animateStep() {
            progress += increment;
            if (progress > 100) progress = 100;
            barFill.style.width = progress + '%';
            labelEl.querySelector('.loading-percent').textContent = Math.round(progress) + '%';
            
            if (progress < 100) {
                setTimeout(animateStep, stepTime + Math.random() * 50);
            } else {
                setTimeout(() => {
                    container.remove();
                    if (onComplete) onComplete();
                }, 300);
            }
        }
        animateStep();
    }

    function processCmd(cmd) {
        // Handle aliases
        const parts = cmd.trim().split(/\s+/);
        const baseCmd = parts[0];
        const args = parts.slice(1);
        
        if (commandAliases[baseCmd]) {
            const aliasTarget = commandAliases[baseCmd];
            if (typeof aliasTarget === 'function') {
                aliasTarget(args);
                return;
            } else if (typeof aliasTarget === 'string') {
                cmd = aliasTarget;
            }
        }
        
        if (cmd === 'help') {
            printOutput(`<pre style="color:var(--text-primary); margin:0; font-size: 0.85rem;">${terminalCommands.help}</pre>`, true);
        } else if (cmd === 'clear') {
            output.innerHTML = '';
        } else if (cmd === 'date') {
            printOutput(new Date().toString(), false, { typewriter: true });
        } else if (cmd === 'whoami') {
            printOutput('FARID@SYSTEM — Mahasiswa Informatika | Cyberpunk Enthusiast', false, { typewriter: true });
        } else if (cmd === 'hire farid') {
            const handshakeAscii = `
     _.-._
    | | | |_
    | | | | |
  _ |  '-._ |
  \\\\\`-.-'    ;
   \\\\    _  |
    \\   _  |
     \\_  _ |
       \\   |
            `;
            printOutput(`<pre style="color: var(--accent-color); margin:0; font-size: 0.8rem">${handshakeAscii}</pre>`, true);
            printOutput('<span style="color:#00ffff">EXCELLENT CHOICE. ESTABLISHING SECURE CONNECTION TO FARID\'S INBOX...</span>', true);
            setTimeout(() => {
                window.open('mailto:ridt2all.done@gmail.com?subject=Job%20Opportunity&body=Hello%20Farid,%20I%20saw%20your%20amazing%20cyberpunk%20portfolio!', '_blank');
            }, 1500);
        } else if (cmd === 'sudo hack') {
            printOutput('ACCESSING MAINFRAME...', false);
            setTimeout(() => printOutput('<span style="color:#ff0000">ERROR: UNAUTHORIZED. INITIATING COUNTERMEASURES.</span>', true), 1000);
            setTimeout(() => window.triggerRedAlert(), 2500);
        } else if (cmd === 'play snake') {
            startSnakeGame();
        } else if (cmd === 'play pong') {
            startPongGame();
        } else if (cmd === 'hack target') {
            startHackerTyper();
        } else if (cmd === 'analyze network') {
            analyzeNetwork();
        } else if (cmd === 'enable voice_uplink') {
            enableVoiceUplink();
        } else if (cmd === 'initiate self-destruct') {
            startSelfDestruct();
        } else if (cmd === '7355608') {
            defuseSelfDestruct();
        } else if (cmd === 'rave') {
            toggleRaveMode();
        } else if (cmd === 'play music') {
            playSynthMusic();
        } else if (cmd === 'stop music') {
            stopSynthMusic();
        } else if (cmd.startsWith('color ')) {
            const col = cmd.substring(6).trim();
            if (col === 'reset') {
                FOS.matrixColorOverride = null;
                printOutput('MATRIX COLOR RESET TO DEFAULT.', false, { typewriter: true });
            } else {
                FOS.matrixColorOverride = col;
                printOutput('MATRIX COLOR OVERRIDDEN TO: <span style="color:' + col + '">' + col + '</span>', true);
            }
        } else if (cmd.startsWith('theme ')) {
            const themeName = cmd.substring(6).trim();
            const validThemes = ['matrix', 'amber', 'mono', 'hacker'];
            if (validThemes.includes(themeName)) {
                if (window.FOS && window.FOS.setTerminalTheme) {
                    window.FOS.setTerminalTheme(themeName);
                } else {
                    printOutput('THEME SYSTEM NOT INITIALIZED.', false, { typewriter: true });
                }
            } else {
                printOutput(`INVALID THEME. AVAILABLE: ${validThemes.join(', ')}`, false, { typewriter: true });
            }
        } else if (cmd === 'about') {
            printOutput(terminalCommands.about(profile));
        } else if (cmd === 'skills') {
            printOutput(terminalCommands.skills(skills));
        } else if (cmd === 'projects') {
            printOutput(terminalCommands.projects(projects));
        } else if (cmd === 'contact') {
            printOutput(terminalCommands.contact(profile));
        } else if (cmd === 'education') {
            printOutput(terminalCommands.education(profile));
        } else if (cmd === 'experience') {
            printOutput(terminalCommands.experience(profile));
        } else if (cmd === 'chat') {
            startChatMode();
        } else if (cmd === 'matrix') {
            const matrixAscii = `
     ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
    █░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░█
    █  WAKE UP, NEO...                  █
    █  THE MATRIX HAS YOU               █
    █  FOLLOW THE WHITE RABBIT          █
    █░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░█
     ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
            `;
            printOutput(`<pre style="color:#00ff00; margin:0; font-size: 0.75rem">${matrixAscii}</pre>`, true);
            printOutput('<span style="color:#00ff00">KNOCK KNOCK, NEO.</span>', true);
            setTimeout(() => {
                if (window.FOS && window.FOS.setTerminalTheme) {
                    window.FOS.setTerminalTheme('matrix');
                }
            }, 500);
        } else if (cmd === 'coffee') {
            const coffeeAscii = `
      (  )   (   )  )
       ) (   )  (  (
      ( )  ( )  )  )
      .------------------.
     |  ☕  COFFEE.EXE  |
     |  [████████░░] 80%|
     '------------------'
            `;
            printOutput(`<pre style="color:#8b4513; margin:0; font-size: 0.75rem">${coffeeAscii}</pre>`, true);
            printOutput('<span style="color:#8b4513">SYSTEM CAFFEINE LEVEL: CRITICAL</span>', true);
            printOutput('<span style="color:#00ffff">INITIATING COFFEE BREAK PROTOCOL...</span>', true);
            setTimeout(() => {
                printOutput('<span style="color:#00ff00">COFFEE INJECTED. PRODUCTIVITY +200%</span>', true);
            }, 1500);
        } else if (cmd === 'hack') {
            printOutput('<span style="color:#ff0000">INITIATING HACK SEQUENCE...</span>', true);
            showLoadingBar('BREACHING FIREWALL', 2000, 20, () => {
                printOutput('<span style="color:#00ff00">FIREWALL BREACHED</span>', true);
                showLoadingBar('EXTRACTING PAYLOAD', 1500, 15, () => {
                    printOutput('<span style="color:#00ff00">PAYLOAD SECURED</span>', true);
                    showLoadingBar('COVERING TRACKS', 1000, 10, () => {
                        printOutput('<span style="color:#00ffff">HACK COMPLETE. LOG: /var/log/hack_' + Date.now() + '.log</span>', true);
                        printOutput('<span class="terminal-easter-egg">REMEMBER: WITH GREAT POWER COMES GREAT RESPONSIBILITY</span>');
                    });
                });
            });
        } else if (cmd === 'sudo make me a sandwich') {
            printOutput('<span style="color:#ff6b6b">WHAT? MAKE IT YOURSELF.</span>', true);
            setTimeout(() => {
                printOutput('<span style="color:#00ffff">OKAY. *MAKES SANDWICH* HERE: 🥪</span>', true);
            }, 1000);
        } else if (cmd === 'scan') {
            printOutput('<span style="color:#00ffff">INITIATING DEEP SYSTEM SCAN...</span>', true);
            showLoadingBar('SCANNING PORTS', 2500, 25, () => {
                printOutput('<span style="color:#00ff00">OPEN PORTS: 22, 80, 443, 8080</span>', true);
                showLoadingBar('ANALYZING SERVICES', 2000, 20, () => {
                    printOutput('<span style="color:#00ff00">SSH, HTTP, HTTPS, PROXY DETECTED</span>', true);
                    showLoadingBar('VULNERABILITY CHECK', 3000, 30, () => {
                        printOutput('<span style="color:#ffaa00">WARNING: 3 LOW SEVERITY ISSUES FOUND</span>', true);
                        printOutput('<span style="color:#00ffff">SCAN COMPLETE. REPORT SAVED TO /tmp/scan_report.txt</span>', true);
                    });
                });
            });
        } else if (cmd === 'decrypt') {
            printOutput('<span style="color:#00ffff">INITIATING DECRYPTION SEQUENCE...</span>', true);
            showLoadingBar('ANALYZING ENCRYPTION', 1500, 15, () => {
                printOutput('<span style="color:#ffaa00">DETECTED: AES-256-GCM</span>', true);
                showLoadingBar('BRUTE FORCING KEY', 4000, 40, () => {
                    printOutput('<span style="color:#00ff00">KEY RECOVERED: 0x' + Array.from({length: 32}, () => Math.floor(Math.random() * 16).toString(16)).join('') + '</span>', true);
                    showLoadingBar('DECRYPTING DATA', 2000, 20, () => {
                        printOutput('<span style="color:#00ffff">DECRYPTION SUCCESSFUL</span>', true);
                        printOutput('<span style="color:#00ff00">PLAINTEXT: "THE CAKE IS A LIE"</span>', true);
                    });
                });
            });
        } else {
            shakeTerminal();
            printOutput(`COMMAND NOT FOUND: ${cmd}`, { className: 'terminal-easter-egg' });
        }
    }

    function getBotReply(text) {
        const lower = text.toLowerCase();
        for (const item of faq) {
            if (item.keywords.some(k => lower.includes(k))) {
                return item.answer;
            }
        }
        const defaultReplies = [
            "Menarik. Sistem sedang memproses input Anda...",
            "Pertanyaan yang bagus. Namun data tersebut terenkripsi.",
            "Silakan cek langsung ke author sistem ini.",
            "Saya mendeteksi anomali pada query tersebut. Coba pertanyaan lain terkait 'skill' atau 'lokasi'."
        ];
        return defaultReplies[Math.floor(Math.random() * defaultReplies.length)];
    }

    function startChatMode() {
        printOutput('<span style="color:var(--accent-color)">CHAT MODE AKTIF. Ketik "exit" untuk keluar.</span>', true);
        printOutput('<span style="color:var(--accent-color)">FOS_AI:</span> Halo! Ada yang bisa saya bantu? (ketik "exit" untuk keluar)', true);
        
        FOS.chatMode = true;
        const originalProcessCmd = processCmd;
        
        processCmd = (input) => {
            if (input === 'exit') {
                FOS.chatMode = false;
                processCmd = originalProcessCmd;
                printOutput('<span style="color:var(--accent-color)">FOS_AI:</span> Sampai jumpa! Chat mode dinonaktifkan.', true);
                return;
            }
            
            printOutput(`<span style="color:var(--text-primary)">YOU:</span> ${input}`, true);
            
            // Typing indicator
            const typingDiv = document.createElement('div');
            typingDiv.style.marginBottom = '5px';
            typingDiv.innerHTML = `<span style="color:var(--accent-color)">FOS_AI:</span> <span class="typing-indicator">mengetik<span>.</span><span>.</span><span>.</span></span>`;
            output.appendChild(typingDiv);
            output.scrollTop = output.scrollHeight;
            
            const reply = getBotReply(input);
            setTimeout(() => {
                typingDiv.remove();
                printOutput(`<span style="color:var(--accent-color)">FOS_AI:</span> ${reply}`, true);
            }, 800 + Math.random() * 1200);
        };

    function startSnakeGame() {
        printOutput('<div style="text-align:center; color: var(--accent-color); margin: 10px 0; font-size: 1.2rem;">--- FOS SNAKE PROTOCOL ---<br>USE CONTROLS. ESC TO EXIT.</div>', true);
        const canvas = document.createElement('canvas');
        canvas.width = 600; canvas.height = 300;
        canvas.style.border = '2px solid var(--accent-color)';
        canvas.style.boxShadow = '0 0 15px var(--accent-color)';
        canvas.style.display = 'block'; canvas.style.margin = '0 auto 10px';
        canvas.style.maxWidth = '100%'; canvas.style.height = 'auto';
        output.appendChild(canvas);
        output.scrollTop = output.scrollHeight;

        let dpad = null;
        if (isMobile) {
            dpad = document.createElement('div');
            dpad.id = 'snake-dpad';
            dpad.innerHTML = `
            <div class="dpad-row"><button id="dpad-up" style="width:70px;height:70px;font-size:2rem">▲</button></div>
            <div class="dpad-row"><button id="dpad-left" style="width:70px;height:70px;font-size:2rem">◀</button><button id="dpad-down" style="width:70px;height:70px;font-size:2rem">▼</button><button id="dpad-right" style="width:70px;height:70px;font-size:2rem">▶</button></div>
            <div class="dpad-row"><button id="dpad-esc" style="width:220px;height:50px;background:rgba(255,0,0,0.3);font-size:1rem">QUIT</button></div>
            `;
            output.appendChild(dpad);
            output.scrollTop = output.scrollHeight;

            const addControl = (id, newDir, notDir) => {
                const btn = document.getElementById(id);
                if (!btn) return;
                btn.addEventListener('touchstart', (e) => { e.preventDefault(); if (d != notDir) d = newDir; });
                btn.addEventListener('mousedown', (e) => { e.preventDefault(); if (d != notDir) d = newDir; });
            };
            addControl('dpad-up', 'UP', 'DOWN');
            addControl('dpad-down', 'DOWN', 'UP');
            addControl('dpad-left', 'LEFT', 'RIGHT');
            addControl('dpad-right', 'RIGHT', 'LEFT');

            const escBtn = document.getElementById('dpad-esc');
            const quitFn = (e) => {
                e.preventDefault();
                cleanupTerminalProcesses();
                if (dpad) dpad.remove();
                input.focus();
                printOutput('SNAKE TERMINATED. SCORE: ' + score);
            };
            escBtn.addEventListener('touchstart', quitFn);
            escBtn.addEventListener('mousedown', quitFn);
        }

        input.disabled = true;
        input.blur();

        const ctx = canvas.getContext('2d');
        const box = 15;
        let snake = [{ x: 10 * box, y: 10 * box }];
        let food = { x: Math.floor(Math.random() * 40) * box, y: Math.floor(Math.random() * 20) * box };
        let d = "RIGHT";
        let score = 0;

        const themeColor = getComputedStyle(document.documentElement).getPropertyValue('--text-primary').trim() || '#00ff00';
        const accentColor = getComputedStyle(document.documentElement).getPropertyValue('--accent-color').trim() || '#008800';

        const keyHandler = (e) => {
            if ([37, 38, 39, 40, 27].includes(e.keyCode)) e.preventDefault();
            if (e.keyCode == 37 && d != "RIGHT") d = "LEFT";
            else if (e.keyCode == 38 && d != "DOWN") d = "UP";
            else if (e.keyCode == 39 && d != "LEFT") d = "RIGHT";
            else if (e.keyCode == 40 && d != "UP") d = "DOWN";
            else if (e.keyCode == 27) {
                cleanupTerminalProcesses();
                if (dpad) dpad.remove();
                input.focus();
                printOutput('SNAKE TERMINATED. SCORE: ' + score);
            }
        };
        FOS.currentTerminalKeydown = keyHandler;
        document.addEventListener('keydown', keyHandler);

        function draw() {
            ctx.fillStyle = "rgba(0,5,0,0.9)";
            ctx.fillRect(0, 0, 600, 300);
            for (let i = 0; i < snake.length; i++) {
                ctx.fillStyle = (i == 0) ? themeColor : accentColor;
                ctx.fillRect(snake[i].x, snake[i].y, box, box);
                ctx.strokeStyle = "#000";
                ctx.strokeRect(snake[i].x, snake[i].y, box, box);
            }
            ctx.fillStyle = "red"; ctx.fillRect(food.x, food.y, box, box);

            let snakeX = snake[0].x; let snakeY = snake[0].y;
            if (d == "LEFT") snakeX -= box;
            if (d == "UP") snakeY -= box;
            if (d == "RIGHT") snakeX += box;
            if (d == "DOWN") snakeY += box;

            if (snakeX == food.x && snakeY == food.y) {
                score++;
                food = { x: Math.floor(Math.random() * 40) * box, y: Math.floor(Math.random() * 20) * box };
            } else {
                snake.pop();
            }

            let newHead = { x: snakeX, y: snakeY };
            if (snakeX < 0 || snakeX >= 600 || snakeY < 0 || snakeY >= 300 || collision(newHead, snake)) {
                cleanupTerminalProcesses();
                if (dpad) dpad.remove();
                input.disabled = false;
                setTimeout(() => { if (!isMobile && isOpen) input.focus(); printOutput('<span style="color:red">GAME OVER</span>. SCORE: ' + score, true); }, 500);
            }
            snake.unshift(newHead);
            ctx.fillStyle = themeColor; ctx.font = "12px 'Fira Code', monospace";
            ctx.fillText("SCORE: " + score, box, 2 * box);
        }

        function collision(head, array) {
            for (let i = 0; i < array.length; i++) {
                if (head.x == array[i].x && head.y == array[i].y) return true;
            }
            return false;
        }
        gameLoop = setInterval(draw, 100);
        FOS.currentTerminalGame = gameLoop;
    }

    function startPongGame() {
        printOutput('<div style="text-align:center; color: var(--accent-color); margin: 10px 0; font-size: 1.2rem;">--- FOS PONG PROTOCOL ---<br>USE UP/DOWN OR W/S. ESC TO EXIT.</div>', true);
        const canvas = document.createElement('canvas');
        canvas.width = 600; canvas.height = 300;
        canvas.style.border = '2px solid var(--accent-color)';
        canvas.style.boxShadow = '0 0 15px var(--accent-color)';
        canvas.style.display = 'block'; canvas.style.margin = '0 auto 10px';
        canvas.style.maxWidth = '100%'; canvas.style.height = 'auto';
        output.appendChild(canvas);
        output.scrollTop = output.scrollHeight;

        let dpad = null;
        let pDir = 0;

        if (isMobile) {
            dpad = document.createElement('div');
            dpad.id = 'pong-dpad';
            dpad.innerHTML = `
                <div class="dpad-row"><button id="dpad-up" style="width:70px;height:70px;font-size:2rem">▲</button></div>
                <div class="dpad-row"><button id="dpad-down" style="width:70px;height:70px;font-size:2rem">▼</button></div>
                <div class="dpad-row"><button id="dpad-esc" style="width:220px;height:50px;background:rgba(255,0,0,0.3);font-size:1rem">QUIT</button></div>
            `;
            output.appendChild(dpad);
            output.scrollTop = output.scrollHeight;

            const addControl = (id, dir) => {
                const btn = document.getElementById(id);
                if (!btn) return;
                btn.addEventListener('touchstart', (e) => { e.preventDefault(); pDir = dir; });
                btn.addEventListener('touchend', (e) => { e.preventDefault(); pDir = 0; });
                btn.addEventListener('mousedown', (e) => { e.preventDefault(); pDir = dir; });
                btn.addEventListener('mouseup', (e) => { e.preventDefault(); pDir = 0; });
                btn.addEventListener('mouseleave', (e) => { e.preventDefault(); pDir = 0; });
            };
            addControl('dpad-up', -1);
            addControl('dpad-down', 1);

            const escBtn = document.getElementById('dpad-esc');
            const quitFn = (e) => {
                e.preventDefault();
                clearInterval(gameLoop);
                document.removeEventListener('keydown', keyHandler);
                document.removeEventListener('keyup', keyUpHandler);
                if (dpad) dpad.remove();
                input.disabled = false;
                printOutput('PONG TERMINATED.');
            };
            escBtn.addEventListener('touchstart', quitFn);
            escBtn.addEventListener('mousedown', quitFn);
        }

        input.disabled = true;
        input.blur();

        const ctx = canvas.getContext('2d');
        const themeColor = getComputedStyle(document.documentElement).getPropertyValue('--text-primary').trim() || '#00ff00';

        let ball = { x: 300, y: 150, r: 8, dx: 4, dy: 4 };
        let player = { x: 20, y: 110, w: 10, h: 80, score: 0 };
        let ai = { x: 570, y: 110, w: 10, h: 80, score: 0 };

        const keyHandler = (e) => {
            if ([38, 40, 87, 83, 27].includes(e.keyCode)) e.preventDefault();
            if (e.keyCode === 38 || e.keyCode === 87) pDir = -1;
            else if (e.keyCode === 40 || e.keyCode === 83) pDir = 1;
            else if (e.keyCode === 27) {
                cleanupTerminalProcesses();
                if (dpad) dpad.remove();
                input.disabled = false; input.focus();
                printOutput('PONG TERMINATED.');
            }
        };
        const keyUpHandler = (e) => {
            if (e.keyCode === 38 || e.keyCode === 87 || e.keyCode === 40 || e.keyCode === 83) pDir = 0;
        };

        FOS.currentTerminalKeydown = keyHandler;
        FOS.currentTerminalKeyup = keyUpHandler;
        document.addEventListener('keydown', keyHandler);
        document.addEventListener('keyup', keyUpHandler);

        function draw() {
            ctx.fillStyle = "rgba(0,5,0,0.9)";
            ctx.fillRect(0, 0, 600, 300);

            ctx.fillStyle = "rgba(0,255,0,0.2)";
            for (let i = 0; i < 300; i += 20) ctx.fillRect(298, i, 4, 10);

            ctx.fillStyle = "red";
            ctx.beginPath();
            ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = themeColor;
            ctx.fillRect(player.x, player.y, player.w, player.h);
            ctx.fillRect(ai.x, ai.y, ai.w, ai.h);

            player.y += pDir * 6;
            if (player.y < 0) player.y = 0;
            if (player.y + player.h > 300) player.y = 300 - player.h;

            const aiSpeed = 3.5;
            if (ai.y + ai.h / 2 < ball.y - 10) ai.y += aiSpeed;
            else if (ai.y + ai.h / 2 > ball.y + 10) ai.y -= aiSpeed;

            ball.x += ball.dx;
            ball.y += ball.dy;

            if (ball.y - ball.r < 0 || ball.y + ball.r > 300) ball.dy *= -1;

            let paddle = (ball.x < 300) ? player : ai;
            if (ball.x + ball.r > paddle.x && ball.x - ball.r < paddle.x + paddle.w &&
                ball.y + ball.r > paddle.y && ball.y - ball.r < paddle.y + paddle.h) {
                ball.dx *= -1.05;
                ball.dy = (ball.y - (paddle.y + paddle.h / 2)) * 0.15;
            }

            if (ball.x < 0) { ai.score++; resetBall(); }
            else if (ball.x > 600) { player.score++; resetBall(); }

            ctx.fillStyle = themeColor; ctx.font = "24px 'Fira Code', monospace";
            ctx.fillText(player.score, 150, 40);
            ctx.fillText(ai.score, 450, 40);
        }

        function resetBall() {
            ball.x = 300; ball.y = 150;
            ball.dx = (Math.random() > 0.5 ? 4 : -4);
            ball.dy = (Math.random() > 0.5 ? 4 : -4);
        }

        let gameLoop = setInterval(draw, 1000 / 60);
        FOS.currentTerminalGame = gameLoop;
    }

    function startHackerTyper() {
        printOutput('INITIATING HACKER UPLINK...', false);
        const typer = document.getElementById('hacker-typer');
        const codeBlock = document.getElementById('typer-code');
        const progressSpan = document.getElementById('typer-progress');
        const grantedMsg = document.getElementById('typer-granted');

        if (!typer || !codeBlock) {
            printOutput('<span style="color:red">ERROR: HACKER MODULE NOT FOUND.</span>', true);
            return;
        }

        input.disabled = true;
        input.blur();
        typer.classList.remove('hidden');
        codeBlock.innerHTML = '';
        grantedMsg.classList.add('hidden');
        progressSpan.innerText = '0';

        const snippet = `
#include <stdio.h>
#include <stdlib.h>
#include <sys/socket.h>

int main(int argc, char *argv[]) {
    printf("Establishing connection to %s...\\n", argv[1]);
    int sock = socket(AF_INET, SOCK_STREAM, 0);
    if(sock < 0) {
        perror("Socket creation failed");
        return 1;
    }
    // Bypassing firewall...
    // Decrypting handshake keys...
    // Access granted!
    return 0;
}
`;
        let i = 0;
        let progress = 0;
        const typeInterval = setInterval(() => {
            if (i < snippet.length) {
                codeBlock.innerHTML += snippet[i] === '\n' ? '<br>' : snippet[i];
                i++;
                if (Math.random() > 0.5) {
                    progress += Math.floor(Math.random() * 3);
                    if (progress > 99) progress = 99;
                    progressSpan.innerText = progress;
                }
            } else {
                clearInterval(typeInterval);
                progressSpan.innerText = '100';
                setTimeout(() => {
                    grantedMsg.classList.remove('hidden');
                    setTimeout(() => {
                        typer.classList.add('hidden');
                        input.disabled = false;
                        setTimeout(() => { if (isOpen) input.focus(); }, 100);
                        printOutput('<span style="color:#0f0">UPLINK SUCCESSFUL. MAINFRAME ACCESSED.</span>', true);
                    }, 2000);
                }, 500);
            }
        }, 15);
        FOS.currentTerminalGame = typeInterval;
    }

    function analyzeNetwork() {
        printOutput('ANALYZING NETWORK TOPOLOGY...');
        fetch('https://ipapi.co/json/')
            .then(res => res.json())
            .then(data => {
                setTimeout(() => printOutput(`TRACING IP ROUTE: ${data.ip}`), 1000);
                setTimeout(() => printOutput(`RESOLVING ISP: ${data.org || 'Unknown'}`), 2000);
                setTimeout(() => printOutput(`GEO-LOCATION PING: ${data.latitude}, ${data.longitude} (${data.city}, ${data.country_name})`), 3000);
                setTimeout(() => printOutput('<span style="color:#0f0">NETWORK ANALYSIS COMPLETE.</span>', true), 4000);
            })
            .catch(err => {
                setTimeout(() => printOutput('TRACING IP ROUTE: 192.168.1.1 -> 10.0.0.5 -> 172.16.254.1'), 1000);
                setTimeout(() => printOutput('RESOLVING HOST: target.mainframe.local'), 2000);
                setTimeout(() => printOutput('GEO-LOCATION PING: -6.2088, 106.8456 (JAKARTA, ID)'), 3000);
                setTimeout(() => printOutput('<span style="color:#0f0">NETWORK ANALYSIS COMPLETE.</span>', true), 4000);
            });
    }

    function enableVoiceUplink() {
        printOutput('INITIALIZING VOICE RECOGNITION MODULE...');
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
            setTimeout(() => printOutput('<span style="color:#0f0">VOICE UPLINK ESTABLISHED. SPEAK YOUR COMMAND (ID/EN)...</span>', true), 1000);
            const recognition = new SpeechRecognition();
            recognition.lang = 'id-ID';
            recognition.interimResults = false;
            recognition.maxAlternatives = 1;

            recognition.onresult = function (event) {
                const speechResult = event.results[0][0].transcript.toLowerCase();
                printOutput(`> [VOICE RECOGNIZED]: ${speechResult}`);

                let cmd = speechResult;
                if (speechResult.includes('bersihkan') || speechResult.includes('clear')) cmd = 'clear';
                else if (speechResult.includes('bantuan') || speechResult.includes('help')) cmd = 'help';
                else if (speechResult.includes('ular') || speechResult.includes('snake')) cmd = 'play snake';
                else if (speechResult.includes('berhenti') || speechResult.includes('stop')) cmd = 'stop music';
                else if (speechResult.includes('musik') || speechResult.includes('lagu') || speechResult.includes('play')) cmd = 'play music';
                else if (speechResult.includes('jaringan') || speechResult.includes('network')) cmd = 'analyze network';
                else if (speechResult.includes('hacker') || speechResult.includes('heker')) cmd = 'hack target';
                else if (speechResult.includes('kamera') || speechResult.includes('camera')) cmd = 'open camera';

                setTimeout(() => {
                    printOutput(`$ ${cmd}`);
                    processCmd(cmd);
                }, 500);
            };

            recognition.onspeechend = function () {
                recognition.stop();
            };

            recognition.onerror = function (event) {
                printOutput(`<span style="color:red">VOICE ERROR: ${event.error}</span>`, true);
            };

            setTimeout(() => recognition.start(), 1500);
        } else {
            setTimeout(() => printOutput('<span style="color:red">ERROR: VOICE MODULE UNSUPPORTED BY CURRENT BROWSER.</span>', true), 1000);
        }
    }

    FOS.sdInterval = null;
    function startSelfDestruct() {
        const sdOverlay = document.getElementById('self-destruct-overlay');
        const timerEl = document.getElementById('sd-timer');
        if (!sdOverlay || !timerEl) {
            printOutput('<span style="color:red">ERROR: CORE MELTDOWN OVERRIDE NOT FOUND.</span>', true);
            return;
        }

        if (FOS.sdInterval) return;

        printOutput('<span style="color:red; font-size:1.5em; font-weight:bold;">WARNING: SELF DESTRUCT INITIATED</span>', true);
        window.triggerRedAlert();
        sdOverlay.classList.remove('hidden');

        let timeLeft = 60.00;
        FOS.sdInterval = setInterval(() => {
            timeLeft -= 0.01;
            if (timeLeft <= 0) {
                timeLeft = 0.00;
                clearInterval(FOS.sdInterval);
                FOS.sdInterval = null;
                document.body.innerHTML = '<div style="background:black; width:100vw; height:100vh; display:flex; justify-content:center; align-items:center; color:red; font-family:sans-serif; font-size:3rem; font-weight:bold;">SYSTEM PURGED.</div>';
            }
            timerEl.innerText = timeLeft.toFixed(2);
        }, 10);
    }

    function defuseSelfDestruct() {
        if (!FOS.sdInterval) {
            printOutput('NO ACTIVE SELF DESTRUCT SEQUENCE FOUND.');
            return;
        }
        clearInterval(FOS.sdInterval);
        FOS.sdInterval = null;
        const sdOverlay = document.getElementById('self-destruct-overlay');
        if (sdOverlay) sdOverlay.classList.add('hidden');
        document.body.classList.remove('red-alert');
        printOutput('<span style="color:#0f0; font-size:1.2em;">DEFUSE CODE ACCEPTED. SELF DESTRUCT ABORTED.</span>', true);
    }

    FOS.raveInterval = null;
    function toggleRaveMode() {
        if (FOS.raveInterval) {
            clearInterval(FOS.raveInterval);
            FOS.raveInterval = null;
            document.body.style.filter = '';
            printOutput('RAVE MODE DEACTIVATED.');
        } else {
            printOutput('RAVE MODE ACTIVATED. <span class="blink">UNCE UNCE UNCE</span>', true);
            let hue = 0;
            FOS.raveInterval = setInterval(() => {
                hue = (hue + 25) % 360;
                document.body.style.filter = `hue-rotate(${hue}deg) saturate(200%)`;
            }, 50);
        }
    }

    FOS.synthInterval = null;
    function playSynthMusic() {
        if (FOS.synthInterval) {
            printOutput('SYNTHWAVE ALREADY PLAYING.');
            return;
        }
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) {
            printOutput('<span style="color:red">ERROR: AUDIO HARDWARE MISSING.</span>', true);
            return;
        }
        printOutput('<span style="color:#ff00ff">STARTING SYNTHWAVE PROTOCOL...</span>', true);
        const ctx = new AudioContext();

        const playNote = (freq, duration, type = 'square') => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = type;
            osc.frequency.setValueAtTime(freq, ctx.currentTime);

            gain.gain.setValueAtTime(0, ctx.currentTime);
            gain.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 0.05);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start();
            osc.stop(ctx.currentTime + duration);
        };

        const bassPattern = [55, 55, 65, 55, 73, 55, 65, 55];
        let step = 0;

        FOS.synthInterval = setInterval(() => {
            playNote(bassPattern[step % bassPattern.length], 0.2, 'sawtooth');
            if (step % 4 === 0) playNote(220, 0.1, 'square');
            step++;
        }, 200);
    }

    function stopSynthMusic() {
        if (FOS.synthInterval) {
            clearInterval(FOS.synthInterval);
            FOS.synthInterval = null;
            printOutput('SYNTHWAVE STOPPED.');
        } else {
            printOutput('NO MUSIC PLAYING.');
        }
    }

    window.triggerRedAlert = function () {
        if (isRedAlert) return;
        isRedAlert = true;

        const AudioContext = window.AudioContext || window.webkitAudioContext;
        const ctx = new AudioContext();
        const gain = ctx.createGain();
        gain.gain.value = 0.1;
        gain.connect(ctx.destination);

        FOS.redAlertInterval = setInterval(() => {
            const osc = ctx.createOscillator();
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(400, ctx.currentTime);
            osc.frequency.linearRampToValueAtTime(800, ctx.currentTime + 0.5);
            osc.frequency.linearRampToValueAtTime(400, ctx.currentTime + 1);
            osc.connect(gain);
            osc.start();
            osc.stop(ctx.currentTime + 1);
        }, 1000);

        document.body.classList.add('red-alert');
        FOS.matrixSpeedMultiplier = 8;

        const banner = document.createElement('div');
        banner.className = 'breach-banner';
        banner.innerText = 'WARNING: UNAUTHORIZED SYSTEM BREACH';
        document.body.appendChild(banner);
    };

    let clickCount = 0;
    let clickTimer;

    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('profile-photo')) {
            clickCount++;
            clearTimeout(clickTimer);
            if (clickCount >= 3) {
                window.triggerRedAlert();
                clickCount = 0;
            } else {
                clickTimer = setTimeout(() => { clickCount = 0; }, 600);
            }
        }
    });
    // Cleanup on page unload
    window.addEventListener('beforeunload', () => {
        cleanupTerminalProcesses();
        if (FOS.redAlertInterval) clearInterval(FOS.redAlertInterval);
        if (FOS.raveInterval) clearInterval(FOS.raveInterval);
        if (FOS.synthInterval) clearInterval(FOS.synthInterval);
        if (FOS.sdInterval) clearInterval(FOS.sdInterval);
        document.body.style.overflow = '';
    });
}
} catch (err) {
    console.error('[Terminal] Initialization failed:', err);
    window.TerminalError = err;
    // Show error to user
    const errorDiv = document.createElement('div');
    errorDiv.style.cssText = 'position:fixed;bottom:20px;right:20px;background:#ff0000;color:#fff;padding:15px;border-radius:8px;z-index:999999;font-family:monospace;font-size:0.8rem;max-width:300px;';
    errorDiv.innerHTML = `<strong>Terminal Error:</strong><br>${err.message}<br><small>Check console (F12) for details</small>`;
    document.body.appendChild(errorDiv);
}
});