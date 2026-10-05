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