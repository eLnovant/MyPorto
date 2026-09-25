document.addEventListener('DOMContentLoaded', () => {
    initCyberMap();

    initServiceWorkerUI();

    setupAppEventNotifications();
});

let cyberMap = null;

function showMapError(container, code, message) {
    container.innerHTML = `
        <div class="map-error-fallback">
            <div class="map-error-code">[!] ERROR: ${code}</div>
            <div class="map-error-message">${message}</div>
        </div>
    `;
}

function initCyberMap() {
    const mapElement = document.getElementById('map');
    if (!mapElement) return;

    if (typeof L === 'undefined') {
        console.warn('[Map] Leaflet library is not loaded. Displaying offline fallback.');
        showMapError(mapElement, 'MAP_UPLINK_OFFLINE', 'Gagal menghubungi modul satelit peta (Leaflet CDN tidak terjangkau). Pastikan perangkat terhubung ke internet.');
        return;
    }

    const targetCoords = [-7.62306, 109.11417];
    
    try {
        cyberMap = L.map('map', {
            zoomControl: false,
            scrollWheelZoom: false,
            attributionControl: false
        }).setView(targetCoords, 16);
    } catch (e) {
        console.error('[Map] Failed to initialize map:', e);
        showMapError(mapElement, 'MAP_INIT_FAILED', 'Gagal menginisialisasi peta: ' + e.message);
        return;
    }

    // Base layers
    const darkLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" style="color:var(--text-secondary)">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions" style="color:var(--text-secondary)">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 20
    });

    const satelliteLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
        maxZoom: 20
    });

    const hybridLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 20,
        pane: 'labels'
    });

    // Add tile error handling
    [darkLayer, satelliteLayer, hybridLayer].forEach(layer => {
        layer.on('tileerror', (e) => {
            console.warn('[Map] Tile load failed:', e.tile.src);
            // Optionally fallback to dark layer if satellite fails
            if (layer === satelliteLayer && cyberMap.hasLayer(darkLayer) === false) {
                darkLayer.addTo(cyberMap);
                if (window.showCyberToast) {
                    window.showCyberToast('[MAP] Satellite layer failed, falling back to dark mode', 'error');
                }
            }
        });
    });

    // Add base layers - start with satellite
    satelliteLayer.addTo(cyberMap);

    // Create labels pane for hybrid view
    cyberMap.createPane('labels');
    cyberMap.getPane('labels').style.zIndex = 650;
    cyberMap.getPane('labels').style.pointerEvents = 'none';

    // Custom cyberpunk layer control
    const baseLayers = {
        "SATELLITE": satelliteLayer,
        "HYBRID": L.layerGroup([satelliteLayer, hybridLayer]),
        "DARK_MODE": darkLayer
    };

    const layerControl = L.control.layers(baseLayers, null, {
        collapsed: false,
        position: 'topright'
    }).addTo(cyberMap);

    // Style the layer control
    setTimeout(() => {
        const controlContainer = document.querySelector('.leaflet-control-layers');
        if (controlContainer) {
            controlContainer.style.background = 'rgba(0, 10, 0, 0.95)';
            controlContainer.style.border = '1px solid var(--accent-color)';
            controlContainer.style.borderRadius = '0';
            controlContainer.style.boxShadow = '0 0 15px var(--glow-secondary)';
            controlContainer.style.fontFamily = "'Fira Code', monospace";
            controlContainer.style.fontSize = '0.7rem';
            controlContainer.style.padding = '8px';
            
            const labels = controlContainer.querySelectorAll('label');
            labels.forEach(label => {
                label.style.color = 'var(--text-primary)';
                label.style.textTransform = 'uppercase';
                label.style.letterSpacing = '1px';
                const input = label.querySelector('input');
                if (input) {
                    input.style.accentColor = 'var(--accent-color)';
                    input.style.marginRight = '8px';
                    input.style.transform = 'scale(1.2)';
                }
            });
        }
    }, 100);

    const cyberIcon = L.divIcon({
        className: 'cyber-map-marker',
        html: '<div class="marker-pulse"></div><div class="marker-core"></div>',
        iconSize: [40, 40],
        iconAnchor: [20, 20]
    });
    const marker = L.marker(targetCoords, { icon: cyberIcon }).addTo(cyberMap);
    const popupContent = `
        <div class="map-popup-cyber">
            <h4 style="color: var(--accent-color); border-bottom: 1px dashed var(--text-primary); padding-bottom: 5px; margin-bottom: 5px; font-family: 'Fira Code', monospace; text-transform: uppercase;">SYS_TARGET: HOME_BASE</h4>
            <p style="color: var(--text-primary); margin: 0; font-size: 0.85rem; font-family: 'Fira Code', monospace;">Muhammad Farid Donovant</p>
            <p style="color: var(--text-secondary); margin: 0; font-size: 0.8rem; font-family: 'Fira Code', monospace;">Kesugihan Kidul, Desa Gligir, Cilacap</p>
            <p style="color: var(--warning-color); margin: 5px 0 0; font-size: 0.7rem; font-family: 'Fira Code', monospace;">COORDS: -7.6231, 109.1142</p>
        </div>
    `;

    marker.bindPopup(popupContent).openPopup();

    // Custom zoom control with cyberpunk style
    const zoomControl = L.control.zoom({
        position: 'bottomright',
        zoomInTitle: 'ZOOM_IN [+]',
        zoomOutTitle: 'ZOOM_OUT [-]'
    }).addTo(cyberMap);

    setTimeout(() => {
        const zoomContainer = document.querySelector('.leaflet-control-zoom');
        if (zoomContainer) {
            zoomContainer.style.border = '1px solid var(--accent-color)';
            zoomContainer.style.borderRadius = '0';
            zoomContainer.style.overflow = 'hidden';
            const buttons = zoomContainer.querySelectorAll('a');
            buttons.forEach(btn => {
                btn.style.background = 'rgba(0, 10, 0, 0.9)';
                btn.style.color = 'var(--accent-color)';
                btn.style.border = 'none';
                btn.style.borderBottom = '1px solid var(--accent-color)';
                btn.style.width = '36px';
                btn.style.height = '36px';
                btn.style.lineHeight = '36px';
                btn.style.fontSize = '1rem';
                btn.style.fontFamily = "'Fira Code', monospace";
                btn.style.fontWeight = 'bold';
            });
            buttons[0].style.borderBottom = '1px solid var(--accent-color)';
            buttons[1].style.borderBottom = 'none';
        }
    }, 100);

    // Add scale control
    L.control.scale({
        position: 'bottomleft',
        metric: true,
        imperial: false,
        maxWidth: 150
    }).addTo(cyberMap);

    setTimeout(() => {
        const scaleContainer = document.querySelector('.leaflet-control-scale');
        if (scaleContainer) {
            scaleContainer.style.background = 'rgba(0, 10, 0, 0.8)';
            scaleContainer.style.border = '1px solid var(--accent-color)';
            scaleContainer.style.borderRadius = '0';
            scaleContainer.style.color = 'var(--text-primary)';
            scaleContainer.style.fontFamily = "'Fira Code', monospace";
            scaleContainer.style.fontSize = '0.65rem';
            scaleContainer.style.padding = '4px 8px';
            scaleContainer.style.boxShadow = '0 0 10px var(--glow-secondary)';
            scaleContainer.innerHTML = scaleContainer.innerHTML.replace('SCALE', 'SCALE:');
        }
    }, 100);

    cyberMap.on('click', () => {
        cyberMap.scrollWheelZoom.enable();
        setTimeout(() => cyberMap.scrollWheelZoom.disable(), 5000);
    });

    window.addEventListener('app-ready', () => {
        setTimeout(() => {
            if (cyberMap) {
                cyberMap.invalidateSize();
                console.log('[Map] Size invalidated - App Ready');
            }
        }, 300);
    });

    window.addEventListener('access-granted', () => {
        setTimeout(() => {
            if (cyberMap) {
                cyberMap.invalidateSize();
                console.log('[Map] Size invalidated - Access Granted');
            }
        }, 800);
    });
}

function initServiceWorkerUI() {
    const swStatusVal = document.getElementById('sw-status-val');
    const notifyStatusVal = document.getElementById('notify-status-val');
    const btnRegisterSw = document.getElementById('btn-register-sw');
    const btnUnregisterSw = document.getElementById('btn-unregister-sw');
    const btnRequestNotify = document.getElementById('btn-request-notify');
    const btnTestNotify = document.getElementById('btn-test-notify');

    if (!swStatusVal) return;

    if (!('serviceWorker' in navigator)) {
        swStatusVal.textContent = 'UNSUPPORTED_BROWSER';
        swStatusVal.style.color = 'var(--error-color)';
        if (btnRegisterSw) btnRegisterSw.disabled = true;
        if (btnUnregisterSw) btnUnregisterSw.disabled = true;
        return;
    }

    function updateSWStatus() {
        navigator.serviceWorker.getRegistrations().then(registrations => {
            const hasActiveSW = registrations.some(reg => reg.active);
            if (hasActiveSW) {
                swStatusVal.textContent = 'ACTIVE_SECURE';
                swStatusVal.style.color = 'var(--text-primary)';
                if (btnRegisterSw) btnRegisterSw.style.display = 'none';
                if (btnUnregisterSw) btnUnregisterSw.style.display = 'inline-block';
            } else {
                swStatusVal.textContent = 'INACTIVE_DISCONNECTED';
                swStatusVal.style.color = 'var(--error-color)';
                if (btnRegisterSw) btnRegisterSw.style.display = 'inline-block';
                if (btnUnregisterSw) btnUnregisterSw.style.display = 'none';
            }
        });
    }

    function updateNotificationStatus() {
        if (!('Notification' in window)) {
            notifyStatusVal.textContent = 'UNSUPPORTED';
            notifyStatusVal.style.color = 'var(--error-color)';
            if (btnRequestNotify) btnRequestNotify.disabled = true;
            if (btnTestNotify) btnTestNotify.disabled = true;
            return;
        }

        const permission = Notification.permission;
        if (permission === 'granted') {
            notifyStatusVal.textContent = 'GRANTED_AUTHORIZED';
            notifyStatusVal.style.color = 'var(--text-primary)';
            if (btnRequestNotify) btnRequestNotify.style.display = 'none';
            if (btnTestNotify) btnTestNotify.style.display = 'inline-block';
        } else if (permission === 'denied') {
            notifyStatusVal.textContent = 'DENIED_BLOCKED';
            notifyStatusVal.style.color = 'var(--error-color)';
            if (btnRequestNotify) {
                btnRequestNotify.style.display = 'inline-block';
                btnRequestNotify.textContent = 'RESET_IN_BROWSER_SETTINGS';
                btnRequestNotify.disabled = true;
            }
            if (btnTestNotify) btnTestNotify.style.display = 'none';
        } else {
            notifyStatusVal.textContent = 'DEFAULT_AWAITING';
            notifyStatusVal.style.color = 'var(--warning-color)';
            if (btnRequestNotify) btnRequestNotify.style.display = 'inline-block';
            if (btnTestNotify) btnTestNotify.style.display = 'none';
        }
    }

    updateSWStatus();
    updateNotificationStatus();
    navigator.serviceWorker.register('/sw.js')
        .then(reg => {
            console.log('[Service Worker] Auto-registered successfully:', reg.scope);
            updateSWStatus();
        })
        .catch(err => {
            console.error('[Service Worker] Auto-registration failed:', err);
            updateSWStatus();
        });

    if (btnRegisterSw) {
        btnRegisterSw.addEventListener('click', () => {
            navigator.serviceWorker.register('/sw.js')
                .then(reg => {
                    console.log('[Service Worker] Registered:', reg);
                    if (window.showCyberToast) window.showCyberToast("SERVICE_WORKER REGISTERED");
                    updateSWStatus();
                })
                .catch(err => {
                    console.error('[Service Worker] Registration failed:', err);
                    if (window.showCyberToast) window.showCyberToast("REGISTRATION FAILED", "error");
                    updateSWStatus();
                });
        });
    }
    if (btnUnregisterSw) {
        btnUnregisterSw.addEventListener('click', () => {
            navigator.serviceWorker.getRegistrations().then(registrations => {
                for (let reg of registrations) {
                    reg.unregister().then(success => {
                        if (success) {
                            console.log('[Service Worker] Unregistered successfully');
                            if (window.showCyberToast) window.showCyberToast("SERVICE_WORKER UNREGISTERED", "error");
                            updateSWStatus();
                        }
                    });
                }
            });
        });
    }

    // Request Notification Permission Button Click
    if (btnRequestNotify) {
        btnRequestNotify.addEventListener('click', () => {
            Notification.requestPermission().then(permission => {
                console.log('[Notification] Permission state:', permission);
                if (window.showCyberToast) {
                    if (permission === 'granted') {
                        window.showCyberToast("NOTIFICATIONS PERMITTED");
                    } else {
                        window.showCyberToast("NOTIFICATIONS BLOCKED", "error");
                    }
                }
                updateNotificationStatus();
            });
        });
    }

    // Test Notification Button Click
    if (btnTestNotify) {
        btnTestNotify.addEventListener('click', () => {
            triggerNotification(
                'CYBERNEXUS SECURE UPLINK',
                'Secure telemetry connection verified. Push notifications active.'
            );
        });
    }
}

// Global helper to trigger notifications via Service Worker
function triggerNotification(title, body) {
    if (!('Notification' in window) || Notification.permission !== 'granted') {
        console.warn('Notifications not permitted or unsupported.');
        return;
    }

    // Send postMessage to Service Worker to trigger notification showNotification
    if (navigator.serviceWorker.controller) {
        navigator.serviceWorker.controller.postMessage({
            type: 'SHOW_NOTIFICATION',
            title: title,
            body: body
        });
    } else {
        // Fallback if Service Worker is not fully controlling page yet
        navigator.serviceWorker.ready.then(reg => {
            if (reg.active) {
                reg.active.postMessage({
                    type: 'SHOW_NOTIFICATION',
                    title: title,
                    body: body
                });
            } else {
                new Notification(title, { body: body, icon: '/Farid.jpg' });
            }
        });
    }
}

// Helper to hook into existing application events and trigger notifications
function setupAppEventNotifications() {

    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', () => {
            // Wait a brief moment to check if success text or toast appeared
            setTimeout(() => {
                const successMsg = document.getElementById('form-success');
                if (successMsg && successMsg.textContent.includes('berhasil')) {
                    triggerNotification(
                        'SECURE DATA PACKET SENT',
                        'Your communication packet has been logged in the server mainframe database.'
                    );
                }
            }, 1200);
        });
    }

    // Article Form success handler hook
    const articleForm = document.getElementById('articleForm');
    if (articleForm) {
        articleForm.addEventListener('submit', () => {
            setTimeout(() => {

                triggerNotification(
                    'BROADCAST PROTOCOL ACTIVE',
                    'A new database record has been written to system articles.'
                );
            }, 1000);
        });
    }

    // Login Form Success Notification Hook
    const authForm = document.getElementById('auth-form');
    if (authForm) {
        authForm.addEventListener('submit', () => {
            setTimeout(() => {
                const token = sessionStorage.getItem('porto_token');
                if (token) {
                    triggerNotification(
                        'ACCESS GRANTED (SYS_ADMIN)',
                        `Session initialized for operator: ${sessionStorage.getItem('username') || 'Unknown'}`
                    );
                }
            }, 1500);
        });
    }

    // Logout Notification Hook
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            triggerNotification(
                'SESSION TERMINATED',
                'Decryption keys cleared. Connection locked.'
            );
        });
    }
}
