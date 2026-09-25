const canvas = document.getElementById('matrix-rain');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();

const letters = "@#$%^&*()_+{}|:<>?-=[];',./";
const fontSize = 16;
let columns = canvas.width / fontSize;
let drops = [];
window.matrixSpeedMultiplier = 1;

function initDrops() {
    columns = canvas.width / fontSize;
    drops = [];
    for (let x = 0; x < columns; x++) {
        drops[x] = Math.random() * -100;
    }
}

initDrops();

let animationId = null;
let lastTime = 0;
const targetFPS = 30;
const frameInterval = 1000 / targetFPS;

function draw(currentTime) {
    if (!document.hidden) {
        const delta = currentTime - lastTime;
        
        if (delta >= frameInterval) {
            ctx.shadowBlur = 0;
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const themeColor = window.matrixColorOverride || getComputedStyle(document.documentElement).getPropertyValue('--text-primary').trim() || '#00ff00';

            ctx.shadowBlur = 3;
            ctx.shadowColor = themeColor;
            ctx.fillStyle = themeColor;
            ctx.font = "bold " + fontSize + 'px "Fira Code", monospace';

            for (let i = 0; i < drops.length; i++) {
                const text = letters.charAt(Math.floor(Math.random() * letters.length));

                ctx.fillText(text, i * fontSize, Math.floor(drops[i]) * fontSize);

                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i] += window.matrixSpeedMultiplier;
            }
            
            lastTime = currentTime - (delta % frameInterval);
        }
    }
    
    animationId = requestAnimationFrame(draw);
}

animationId = requestAnimationFrame(draw);

document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        cancelAnimationFrame(animationId);
        animationId = null;
    } else if (!animationId) {
        lastTime = performance.now();
        animationId = requestAnimationFrame(draw);
    }
});

window.addEventListener('resize', () => {
    resizeCanvas();
    initDrops();
});

window.addEventListener('beforeunload', () => {
    cancelAnimationFrame(animationId);
});
