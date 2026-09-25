import { projects } from './data.js';

let scrollObserver = null;
let skillObserver = null;
let typingObserver = null;

document.addEventListener('DOMContentLoaded', function () {
    initTheme();
    initScrollAnimations();
    initHoverEffects();
    initResponsiveFeatures();
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
        themeBtn.textContent = theme === 'dark' ? 'SWAP_THEME' : 'SWAP_THEME';
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
                    const baseText = `Saya berusia ${age} tahun dan tinggal di Jambi Timur, Kota Jambi, Jambi. Saat ini saya tengah menempuh pendidikan di Program Studi S1 Informatika di Universitas Nahdlatul Ulama Al-Ghazali (UNUGHA) Cilacap dan memiliki minat besar pada dunia teknologi serta programming.`;
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
            this.textContent = newTheme === 'dark' ? 'SWAP_THEME' : 'SWAP_THEME';
        });
    }

    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');
    tabButtons.forEach(button => {
        button.addEventListener('click', function () {
            const target = this.getAttribute('data-tab');
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanels.forEach(panel => panel.classList.remove('active'));
            this.classList.add('active');
            document.getElementById(`tab-${target}`).classList.add('active');
        });
    });

    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const form = this;
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
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

let loadedProjects = [];

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
            modalWrapper.classList.remove('hidden');
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

if (modalClose && modalWrapper) {
    modalClose.addEventListener('click', () => modalWrapper.classList.add('hidden'));
}

modalWrapper.addEventListener('click', (e) => {
    if (e.target === modalWrapper) {
        modalWrapper.classList.add('hidden');
    }
});