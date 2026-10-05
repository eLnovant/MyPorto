import { projects } from './data.js';

let scrollObserver = null;
let skillObserver = null;
let typingObserver = null;

document.addEventListener('DOMContentLoaded', function () {
    initTheme();
    initScrollAnimations();
    initHoverEffects();
    initResponsiveFeatures();
    initScrollProgress();
    initSkillRadar();
    renderProjects(projects);
    
    // Cleanup observers on page unload
    window.addEventListener('beforeunload', () => {
        if (scrollObserver) scrollObserver.disconnect();
        if (skillObserver) skillObserver.disconnect();
        if (typingObserver) typingObserver.disconnect();
    });
});

function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = savedTheme || (prefersDark ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', theme);
    
    const themeBtn = document.getElementById('theme-btn');
    if (themeBtn) {
        themeBtn.textContent = theme === 'dark' ? 'DARK_MODE' : 'LIGHT_MODE';
        themeBtn.dataset.themeText = theme;
    }
}

function initScrollAnimations() {
    const cards = document.querySelectorAll('.card');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                scrollObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    cards.forEach(card => {
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        scrollObserver.observe(card);
    });
}

function initHoverEffects() {
    const profilePhoto = document.querySelector('.profile-photo');
    if (profilePhoto) {
        profilePhoto.addEventListener('mouseenter', function () {
            this.style.transform = 'scale(1.05) translateY(-5px)';
        });
        profilePhoto.addEventListener('mouseleave', function () {
            this.style.transform = 'scale(1) translateY(0)';
        });
    }

    const tableRows = document.querySelectorAll('tbody tr');
    tableRows.forEach(row => {
        row.addEventListener('mouseenter', function () {
            this.style.transform = 'scale(1.02)';
        });
        row.addEventListener('mouseleave', function () {
            this.style.transform = 'scale(1)';
        });
    });
}

function initResponsiveFeatures() {
    function setVH() {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }

    setVH();
    window.addEventListener('resize', setVH);

    if ('ontouchstart' in window) {
        document.body.classList.add('touch-device');

        if (window.DeviceOrientationEvent) {
            window.addEventListener('deviceorientation', (e) => {
                const tiltX = e.gamma;
                const tiltY = e.beta;

                const constrainedX = Math.max(-30, Math.min(30, tiltX));
                const constrainedY = Math.max(-30, Math.min(30, tiltY - 45));

                const rotationY = (constrainedX / 30) * 15;
                const rotationX = -(constrainedY / 30) * 15;

                document.querySelectorAll('.card').forEach(card => {
                    card.style.transform = `perspective(1000px) rotateX(${rotationX}deg) rotateY(${rotationY}deg) scale3d(1, 1, 1)`;
                    card.style.transition = 'transform 0.1s ease-out';
                });
            });
        }
    }

    const greetingElement = document.getElementById('greeting');
    if (greetingElement) {
        const hour = new Date().getHours();
        let greeting = '';
        if (hour >= 5 && hour < 12) {
            greeting = 'Good morning';
        } else if (hour >= 12 && hour < 17) {
            greeting = 'Good afternoon';
        } else if (hour >= 17 && hour < 21) {
            greeting = 'Good evening';
        } else {
            greeting = 'Good night';
        }
        greetingElement.textContent = greeting;
    }

    const roles = ['Saya dikenal sebagai pribadi yang disiplin, bertanggung jawab, dan selalu antusias untuk belajar hal baru terutama di bidang teknologi.', 'Saya memiliki pengalaman dalam berbagai proyek teknologi, mulai dari pengembangan web hingga pemrograman aplikasi.'];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingTextElement = document.getElementById('typing-text');
    function type() {
        const currentRole = roles[roleIndex];
        if (isDeleting) {
            charIndex--;
            typingTextElement.innerHTML = currentRole.slice(0, charIndex) + '<span class="cursor"></span>';
            if (charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                setTimeout(type, 500);
            } else {
                setTimeout(type, 100);
            }
        } else {
            charIndex++;
            typingTextElement.innerHTML = currentRole.slice(0, charIndex) + '<span class="cursor"></span>';
            if (charIndex === currentRole.length) {
                isDeleting = true;
                setTimeout(type, 1800);
            } else {
                setTimeout(type, 100);
            }
        }
    }

    const birthdate = "2006-02-07";
    const currentYear = new Date().getFullYear();
    const birthYear = new Date(birthdate).getFullYear();
    const age = currentYear - birthYear;
    const ageDisplayElement = document.getElementById('age-display');

    function playTypeSound() {
        if (!window.audioCtx) return;
        const osc = window.audioCtx.createOscillator();
        const gain = window.audioCtx.createGain();
        osc.connect(gain);
        gain.connect(window.audioCtx.destination);
        osc.type = 'square';
        osc.frequency.setValueAtTime(400 + Math.random() * 200, window.audioCtx.currentTime);
        gain.gain.setValueAtTime(0.01, window.audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, window.audioCtx.currentTime + 0.05);
        osc.start();
        osc.stop(window.audioCtx.currentTime + 0.05);
    }

    if (ageDisplayElement) {
        typingObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !ageDisplayElement.dataset.typed) {
                    ageDisplayElement.dataset.typed = 'true';
                    const baseText = `Saya berusia ${age} tahun dan berdomisili di Kesugihan Kidul, Desa Gligir, Kecamatan Kesugihan, Kabupaten Cilacap. Saat ini saya tengah menempuh pendidikan di Program Studi S1 Informatika di Universitas Nahdlatul Ulama Al-Ghazali (UNUGHA) Cilacap dan memiliki minat besar pada dunia teknologi serta programming.`;
                    ageDisplayElement.textContent = '';
                    let i = 0;
                    function typeAge() {
                        if (i < baseText.length) {
                            ageDisplayElement.textContent += baseText.charAt(i);
                            if (i % 2 === 0) playTypeSound();
                            i++;
                            setTimeout(typeAge, 35);
                        }
                    }
                    setTimeout(typeAge, 500);
                }
            });
        }, { threshold: 0.5 });

        typingObserver.observe(ageDisplayElement);
    }

    type();

    const themeBtn = document.getElementById('theme-btn');
    if (themeBtn) {
        themeBtn.addEventListener('click', function () {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            this.textContent = newTheme === 'dark' ? 'DARK_MODE' : 'LIGHT_MODE';
            this.dataset.themeText = newTheme;
        });
    }

    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');
    tabButtons.forEach(button => {
        button.addEventListener('click', function () {
            const target = this.getAttribute('data-tab');
            tabButtons.forEach(btn => {
                btn.classList.remove('active');
                btn.setAttribute('aria-selected', 'false');
            });
            tabPanels.forEach(panel => {
                panel.classList.remove('active');
                panel.hidden = true;
            });
            this.classList.add('active');
            this.setAttribute('aria-selected', 'true');
            const activePanel = document.getElementById(`tab-${target}`);
            activePanel.classList.add('active');
            activePanel.hidden = false;
            activePanel.focus();
        });
        
        // Keyboard navigation for tabs
        button.addEventListener('keydown', (e) => {
            const buttons = Array.from(tabButtons);
            const currentIndex = buttons.indexOf(button);
            let nextIndex = currentIndex;
            
            if (e.key === 'ArrowRight') {
                nextIndex = (currentIndex + 1) % buttons.length;
            } else if (e.key === 'ArrowLeft') {
                nextIndex = (currentIndex - 1 + buttons.length) % buttons.length;
            } else if (e.key === 'Home') {
                nextIndex = 0;
            } else if (e.key === 'End') {
                nextIndex = buttons.length - 1;
            } else {
                return;
            }
            
            e.preventDefault();
            buttons[nextIndex].click();
            buttons[nextIndex].focus();
        });
    });

    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const form = this;
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            // Client-side validation
            const name = form.querySelector('#full-name');
            const email = form.querySelector('#email-field');
            const phone = form.querySelector('#phone');
            const message = form.querySelector('#questions');
            let isValid = true;
            
            // Clear previous errors
            form.querySelectorAll('.error-text').forEach(el => el.textContent = '');
            form.querySelectorAll('input, textarea').forEach(el => el.style.borderColor = '');
            
            if (!name.value.trim()) {
                document.getElementById('err-name').textContent = 'Nama wajib diisi';
                name.style.borderColor = 'var(--error-color)';
                isValid = false;
            }
            
            if (!email.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
                document.getElementById('err-email').textContent = 'Email tidak valid';
                email.style.borderColor = 'var(--error-color)';
                isValid = false;
            }
            
            if (!phone.value.trim() || !/^[\d\s\-+]{8,}$/.test(phone.value)) {
                phone.style.borderColor = 'var(--error-color)';
                isValid = false;
            }
            
            if (!message.value.trim() || message.value.trim().length < 10) {
                document.getElementById('err-questions').textContent = 'Pesan minimal 10 karakter';
                message.style.borderColor = 'var(--error-color)';
                isValid = false;
            }
            
            if (!isValid) {
                window.showCyberToast('Validasi gagal, periksa form', 'error');
                return;
            }
            
            submitBtn.textContent = 'MENGIRIM...';
            submitBtn.disabled = true;

            fetch(form.action, {
                method: 'POST',
                body: new FormData(form),
                headers: { 'Accept': 'application/json' }
            }).then(res => {
                if (res.ok) {
                    window.showCyberToast("Pesan berhasil dikirim ke email!");
                    form.reset();
                } else {
                    window.showCyberToast("Gagal mengirim pesan", "error");
                }
            }).catch(() => {
                window.showCyberToast("Error jaringan", "error");
            }).finally(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            });
        });
    }

    const skillItems = document.querySelectorAll('.skill-item');
    const skillObserverOptions = {
        threshold: 0.3
    };
    skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillItem = entry.target;
                const level = skillItem.getAttribute('data-level');
                const fill = skillItem.querySelector('.skill-fill');
                setTimeout(() => {
                    fill.style.width = level + '%';
                }, 200);
                skillObserver.unobserve(skillItem);
            }
        });
    }, skillObserverOptions);

    skillItems.forEach(item => {
        const fill = item.querySelector('.skill-fill');
        fill.style.width = '0%';
        skillObserver.observe(item);
    });

    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectsContainer = document.querySelector('.projects');

    filterButtons.forEach(button => {
        button.addEventListener('click', function () {
            const filter = this.getAttribute('data-filter');
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            const currentCards = document.querySelectorAll('.project-card');
            currentCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });
}

// Scroll Progress Bar & Back to Top
function initScrollProgress() {
    const progressBar = document.getElementById('scroll-progress-bar');
    const backToTop = document.getElementById('back-to-top');
    
    if (!progressBar || !backToTop) return;

    let ticking = false;
    
    function updateScrollUI() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        progressBar.style.width = `${Math.min(100, Math.max(0, scrollPercent))}%`;
        
        if (scrollTop > 300) {
            backToTop.classList.remove('hidden');
        } else {
            backToTop.classList.add('hidden');
        }
        
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(updateScrollUI);
            ticking = true;
        }
    }, { passive: true });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Keyboard support
    backToTop.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });
}

// Skill Radar Chart
function initSkillRadar() {
    const canvas = document.getElementById('skill-radar');
    const legendContainer = document.getElementById('radar-legend');
    if (!canvas || !legendContainer) return;

    const ctx = canvas.getContext('2d');
    
    // Skill categories with their skills and levels
    const categories = [
        { name: 'Web Dev', color: '#00ffff', skills: [
            { name: 'JavaScript', level: 85 },
            { name: 'HTML & CSS', level: 90 },
            { name: 'React', level: 75 },
            { name: 'TypeScript', level: 70 },
            { name: 'Tailwind CSS', level: 80 },
            { name: 'Python', level: 70 },
            { name: 'SQL/DB', level: 65 },
            { name: 'Git', level: 75 }
        ]},
        { name: 'MS Office & Tools', color: '#ffaa00', skills: [
            { name: 'MS Office', level: 85 },
            { name: 'Google Workspace', level: 80 },
            { name: 'Data Entry', level: 80 }
        ]},
        { name: 'Soft Skills', color: '#00ff00', skills: [
            { name: 'Public Speaking', level: 85 },
            { name: 'Leadership', level: 80 },
            { name: 'Team Work', level: 85 },
            { name: 'Problem Solving', level: 80 },
            { name: 'Time Management', level: 80 }
        ]}
    ];

    // Calculate average per category
    const categoryData = categories.map(cat => ({
        name: cat.name,
        color: cat.color,
        value: cat.skills.reduce((sum, s) => sum + s.level, 0) / cat.skills.length
    }));

    const numCategories = categoryData.length;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const maxRadius = Math.min(centerX, centerY) - 40;

    function drawRadar() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        const accentColor = getComputedStyle(document.documentElement).getPropertyValue('--accent-color').trim() || '#00ffff';
        const textColor = getComputedStyle(document.documentElement).getPropertyValue('--text-primary').trim() || '#00ff00';
        const secondaryColor = getComputedStyle(document.documentElement).getPropertyValue('--text-secondary').trim() || '#00cc00';
        const borderColor = getComputedStyle(document.documentElement).getPropertyValue('--card-border').trim() || '#00ff00';
        const bgColor = getComputedStyle(document.documentElement).getPropertyValue('--bg-surface').trim() || '#001400';

        // Draw background circles
        for (let i = 1; i <= 5; i++) {
            const radius = (maxRadius / 5) * i;
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
            ctx.strokeStyle = i === 5 ? borderColor : 'rgba(0, 255, 255, 0.1)';
            ctx.lineWidth = i === 5 ? 2 : 1;
            ctx.stroke();
        }

        // Draw axis lines
        for (let i = 0; i < numCategories; i++) {
            const angle = (Math.PI * 2 * i) / numCategories - Math.PI / 2;
            const x = centerX + Math.cos(angle) * maxRadius;
            const y = centerY + Math.sin(angle) * maxRadius;
            
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.lineTo(x, y);
            ctx.strokeStyle = 'rgba(0, 255, 255, 0.2)';
            ctx.lineWidth = 1;
            ctx.stroke();

            // Category labels
            const labelRadius = maxRadius + 30;
            const labelX = centerX + Math.cos(angle) * labelRadius;
            const labelY = centerY + Math.sin(angle) * labelRadius;
            
            ctx.fillStyle = textColor;
            ctx.font = 'bold 12px "Fira Code", monospace';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(categoryData[i].name, labelX, labelY);
        }

        // Draw skill area
        ctx.beginPath();
        for (let i = 0; i < numCategories; i++) {
            const angle = (Math.PI * 2 * i) / numCategories - Math.PI / 2;
            const value = categoryData[i].value / 100;
            const radius = maxRadius * value;
            const x = centerX + Math.cos(angle) * radius;
            const y = centerY + Math.sin(angle) * radius;
            
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
        ctx.closePath();

        // Gradient fill
        const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, maxRadius);
        gradient.addColorStop(0, 'rgba(0, 255, 255, 0.3)');
        gradient.addColorStop(1, 'rgba(0, 255, 255, 0.05)');
        ctx.fillStyle = gradient;
        ctx.fill();

        // Draw outline
        ctx.strokeStyle = accentColor;
        ctx.lineWidth = 2;
        ctx.stroke();

        // Draw data points
        for (let i = 0; i < numCategories; i++) {
            const angle = (Math.PI * 2 * i) / numCategories - Math.PI / 2;
            const value = categoryData[i].value / 100;
            const radius = maxRadius * value;
            const x = centerX + Math.cos(angle) * radius;
            const y = centerY + Math.sin(angle) * radius;
            
            ctx.beginPath();
            ctx.arc(x, y, 6, 0, Math.PI * 2);
            ctx.fillStyle = categoryData[i].color;
            ctx.fill();
            ctx.strokeStyle = '#000';
            ctx.lineWidth = 2;
            ctx.stroke();
        }

        // Draw center label
        ctx.fillStyle = textColor;
        ctx.font = 'bold 14px "Fira Code", monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('SKILL RADAR', centerX, centerY - 10);
        
        const avg = categoryData.reduce((sum, c) => sum + c.value, 0) / numCategories;
        ctx.font = '24px "Fira Code", monospace';
        ctx.fillStyle = accentColor;
        ctx.fillText(`${Math.round(avg)}%`, centerX, centerY + 20);
    }

    // Build legend
    function buildLegend() {
        legendContainer.innerHTML = '';
        categories.forEach(cat => {
            const item = document.createElement('div');
            item.className = 'radar-legend-item';
            item.innerHTML = `
                <span class="radar-legend-color" style="background: ${cat.color}"></span>
                <span>${cat.name}: ${cat.skills.reduce((s, sk) => s + sk.level, 0) / cat.skills.length | 0}%</span>
            `;
            legendContainer.appendChild(item);
        });
    }

    // Initial draw
    drawRadar();
    buildLegend();

    // Redraw on theme change
    const observer = new MutationObserver(() => {
        drawRadar();
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    
    // Cleanup
    window.addEventListener('beforeunload', () => observer.disconnect());
}

function renderProjects(projects) {
    const projectsContainer = document.querySelector('.projects');
    if (!projectsContainer) return;

    projectsContainer.innerHTML = '';

    if (!projects || projects.length === 0) {
        projectsContainer.innerHTML = '<p>No projects found.</p>';
        return;
    }

    projects.forEach(p => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.setAttribute('data-category', p.category || 'web');
        card.style.position = 'relative';

        const titleEl = document.createElement('h3');
        titleEl.textContent = p.title;
        titleEl.style.padding = '20px';
        titleEl.style.margin = '0';
        card.appendChild(titleEl);

        card.addEventListener('click', (e) => {
            if (e.target.tagName === 'BUTTON') return;
            const modalWrapper = document.getElementById('project-modal');
            const modalTitle = document.getElementById('modal-title');
            const modalDesc = document.getElementById('modal-desc');
            const modalTechList = document.getElementById('modal-tech-list');
            const modalLinkDemo = document.getElementById('modal-link-demo');
            const modalLinkGit = document.getElementById('modal-link-git');
            const modalImagePlaceholder = document.querySelector('.modal-image-placeholder');

            modalTitle.innerText = p.title;
            modalDesc.innerText = p.description || '';
            modalTechList.innerText = p.tech || '';

            if (p.thumbnail) {
                modalImagePlaceholder.innerHTML = `<img src="${p.thumbnail}" alt="${p.title}" style="max-width:100%; border-radius: 8px;">`;
            } else {
                modalImagePlaceholder.innerHTML = 'IMG_NOT_FOUND';
            }

            if (modalLinkDemo) {
                if (p.link_demo) {
                    modalLinkDemo.href = p.link_demo;
                    modalLinkDemo.style.display = 'inline-block';
                } else {
                    modalLinkDemo.style.display = 'none';
                }
            }
            if (modalLinkGit) {
                if (p.link_git) {
                    modalLinkGit.href = p.link_git;
                    modalLinkGit.style.display = 'inline-block';
                } else {
                    modalLinkGit.style.display = 'none';
                }
            }
            openModal(modalWrapper);
        });

        projectsContainer.appendChild(card);
    });

    const activeFilterBtn = document.querySelector('.filter-btn.active');
    if (activeFilterBtn) {
        activeFilterBtn.click();
    }
}

const modalWrapper = document.getElementById('project-modal');
const modalClose = document.getElementById('modal-close');
let lastFocusedElement = null;

function trapFocus(element) {
    const focusableElements = element.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    element.addEventListener('keydown', function handleTab(e) {
        if (e.key !== 'Tab') return;
        
        if (e.shiftKey) {
            if (document.activeElement === firstElement) {
                e.preventDefault();
                lastElement.focus();
            }
        } else {
            if (document.activeElement === lastElement) {
                e.preventDefault();
                firstElement.focus();
            }
        }
    });
}

function openModal(modal) {
    lastFocusedElement = document.activeElement;
    modal.classList.remove('hidden');
    modal.setAttribute('aria-modal', 'true');
    modal.removeAttribute('aria-hidden');
    trapFocus(modal);
    
    const firstFocusable = modal.querySelector(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (firstFocusable) firstFocusable.focus();
    
    document.body.style.overflow = 'hidden';
}

function closeModal(modal) {
    modal.classList.add('hidden');
    modal.setAttribute('aria-hidden', 'true');
    modal.removeAttribute('aria-modal');
    document.body.style.overflow = '';
    
    if (lastFocusedElement) {
        lastFocusedElement.focus();
        lastFocusedElement = null;
    }
}

if (modalClose && modalWrapper) {
    modalClose.addEventListener('click', () => closeModal(modalWrapper));
}

modalWrapper.addEventListener('click', (e) => {
    if (e.target === modalWrapper) {
        closeModal(modalWrapper);
    }
});

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalWrapper && !modalWrapper.classList.contains('hidden')) {
        closeModal(modalWrapper);
    }
});

// Global Error Boundary
window.addEventListener('error', (event) => {
    console.error('Global error:', event.error);
    
    // Don't show toast for network errors (handled elsewhere)
    if (event.error && event.error.message && event.error.message.includes('Network')) return;
    
    if (window.showCyberToast) {
        window.showCyberToast(`ERROR: ${event.message}`, 'error');
    }
});

window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled rejection:', event.reason);
    
    if (window.showCyberToast) {
        window.showCyberToast(`PROMISE REJECTION: ${event.reason}`, 'error');
    }
});

// Visitor Counter (simple localStorage based)
function initVisitorCounter() {
    const counter = document.getElementById('visitor-counter');
    if (!counter) return;
    
    let count = parseInt(localStorage.getItem('visitorCount') || '0', 10);
    const lastVisit = localStorage.getItem('lastVisit');
    const today = new Date().toDateString();
    
    if (lastVisit !== today) {
        count++;
        localStorage.setItem('visitorCount', count.toString());
        localStorage.setItem('lastVisit', today);
    }
    
    counter.textContent = count.toLocaleString();
}

// Initialize visitor counter if element exists
if (document.getElementById('visitor-counter')) {
    initVisitorCounter();
}

// Terminal Themes
const terminalThemes = {
    matrix: { primary: '#00ff00', accent: '#00ffff', bg: '#000a00' },
    amber: { primary: '#ffb000', accent: '#ff8800', bg: '#0a0500' },
    mono: { primary: '#ffffff', accent: '#888888', bg: '#000000' },
    hacker: { primary: '#00ff00', accent: '#ff0000', bg: '#000000' }
};

let currentTerminalTheme = 'matrix';

function setTerminalTheme(themeName) {
    const theme = terminalThemes[themeName];
    if (!theme) return;
    
    currentTerminalTheme = themeName;
    document.documentElement.style.setProperty('--text-primary', theme.primary);
    document.documentElement.style.setProperty('--accent-color', theme.accent);
    document.documentElement.style.setProperty('--bg-color', theme.bg);
    document.documentElement.style.setProperty('--bg-surface', theme.bg.replace('00', '14'));
    
    localStorage.setItem('terminalTheme', themeName);
    
    if (window.showCyberToast) {
        window.showCyberToast(`TERMINAL THEME: ${themeName.toUpperCase()}`, 'success');
    }
}

// Load saved terminal theme
const savedTerminalTheme = localStorage.getItem('terminalTheme');
if (savedTerminalTheme && terminalThemes[savedTerminalTheme]) {
    setTerminalTheme(savedTerminalTheme);
}

// Export for terminal commands
window.FOS = window.FOS || {};
window.FOS.setTerminalTheme = setTerminalTheme;
window.FOS.terminalThemes = terminalThemes;