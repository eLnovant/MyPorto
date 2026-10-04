window.showCyberToast = function(message, type = 'success') {
    const container = document.getElementById('cyber-toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `cyber-toast ${type === 'error' ? 'toast-error' : ''}`;
    
    const icon = type === 'error' ? '[!]' : '[+]';
    toast.innerHTML = `<strong>${icon} SYSTEM:</strong> ${message}`;
    
    container.appendChild(toast);
    
    // Trigger reflow to animate
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
};

const btnDownloadCv = document.getElementById('btn-download-cv');
if (btnDownloadCv) {
    btnDownloadCv.addEventListener('click', () => {
        window.showCyberToast('INITIALIZING PRINT PROTOCOL...', 'success');
        setTimeout(() => {
            window.print();
        }, 1000);
    });
}

// Red Alert Trigger - defined in terminal.js (more complete version with audio)

// Interactive 3D Card Tilt Effect for Desktop
document.addEventListener('DOMContentLoaded', () => {
    if (window.matchMedia('(pointer: fine)').matches) {
        const attachTilt = () => {
            document.querySelectorAll('.project-card, .skill-card, .cert-card, .timeline-item').forEach(card => {
                if (card._tiltAttached) return;
                card._tiltAttached = true;
                
                card.style.transition = 'transform 0.15s ease-out, box-shadow 0.2s ease';
                card.style.willChange = 'transform';
                
                card.addEventListener('mousemove', (e) => {
                    const rect = card.getBoundingClientRect();
                    const x = e.clientX - rect.left - rect.width / 2;
                    const y = e.clientY - rect.top - rect.height / 2;
                    const rotX = (-y / rect.height) * 10;
                    const rotY = (x / rect.width) * 10;
                    card.style.transform = `perspective(1000px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) translateY(-4px)`;
                });
                
                card.addEventListener('mouseleave', () => {
                    card.style.transform = '';
                });
            });
        };
        
        attachTilt();
        setTimeout(attachTilt, 1500);
    }
});