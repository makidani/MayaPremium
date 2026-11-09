/* ==================== PRELOADER (WITH FAIL-SAFE) ==================== */
function hidePreloader() {
    const preloader = document.getElementById('preloader');
    if (preloader && preloader.style.visibility !== 'hidden') {
        preloader.style.opacity = '0';
        setTimeout(() => preloader.style.visibility = 'hidden', 1000);
    }
}

window.addEventListener('load', () => {
    setTimeout(hidePreloader, 1500);
});

// Absolute fail-safe: Force hide after 3.5 seconds if load event stalls
setTimeout(hidePreloader, 3500);

/* ==================== DATE RESTRICTION (TODAY + 1 MONTH) ==================== */
function getLocalDateStr(date = new Date()) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
}

const todayStr = getLocalDateStr();

const maxDate = new Date();
maxDate.setMonth(maxDate.getMonth() + 1);
const maxStr = getLocalDateStr(maxDate);

const dateInput = document.getElementById('bookingDate');
if (dateInput) {
    dateInput.min = todayStr;
    dateInput.max = maxStr;
    dateInput.value = todayStr;
}

/* ==================== PARTICLES ==================== */
const canvas = document.getElementById('particles-js');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let particlesArray;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        init();
    });

    class Particle {
        constructor(x, y, directionX, directionY, size, color) {
            this.x = x; this.y = y;
            this.directionX = directionX; this.directionY = directionY;
            this.size = size; this.color = color;
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
            ctx.fillStyle = this.color;
            ctx.shadowBlur = 10;
            ctx.shadowColor = this.color;
            ctx.fill();
        }
        update() {
            if (this.x > canvas.width || this.x < 0) this.directionX = -this.directionX;
            if (this.y > canvas.height || this.y < 0) this.directionY = -this.directionY;
            this.x += this.directionX;
            this.y += this.directionY;
            this.draw();
        }
    }

    function init() {
        particlesArray = [];
        let numberOfParticles = (canvas.height * canvas.width) / 10000;
        for (let i = 0; i < numberOfParticles; i++) {
            let size = (Math.random() * 2.5) + 0.5;
            let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
            let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
            let directionX = (Math.random() * 0.5) - 0.25;
            let directionY = (Math.random() * 0.5) - 0.25;
            let color = Math.random() > 0.5 ? 'rgba(245, 208, 97, 0.75)' : 'rgba(181, 101, 255, 0.55)';
            particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
        }
    }

    function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, innerWidth, innerHeight);
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
        }
    }

    init();
    animate();
}

/* ==================== SERVICES DATA (LOCAL IMAGES & UNIFORM DURATIONS) ==================== */
const serviceData = {
    signature: {
        featured: {
            title: "Nuru Massage",
            tag: "✦ MOST POPULAR",
            desc: "A sensual, deeply immersive glide technique using specialized organic gels. Experience weightless sensory elevation and full-body renewal.",
            duration: "⏱ 60 / 90 / 120 MINS",
            img: "imgs/service-1.jpg"
        },
        list: [
            { 
                title: "Body-to-Body Massage", 
                icon: "🌙", 
                desc: "Sensory body alignment creating harmonious flow and complete muscle relaxation.",
                duration: "⏱ 60 / 90 / 120 MINS",
                img: "imgs/service-2.jpg"
            },
            { 
                title: "Four-Hands Massage", 
                icon: "🤲", 
                desc: "Two therapists working in synchronized harmony for absolute relaxation.",
                duration: "⏱ 60 / 90 / 120 MINS",
                img: "imgs/service-3.jpg"
            },
            { 
                title: "Couples Massage", 
                icon: "💞", 
                desc: "A side-by-side luxurious journey crafted for two.",
                duration: "⏱ 60 / 90 / 120 MINS",
                img: "imgs/service-4.jpg"
            }
        ]
    },
    outcall: {
        featured: {
            title: "Outdoor Service",
            tag: "✦ HOTEL & HOME DIRECT",
            desc: "We bring the complete spa atmosphere to your residence or hotel room in Addis Ababa. Discreet, prompt, and effortless.",
            duration: "⏱ 60 / 90 / 120 MINS",
            img: "imgs/service-5.jpg"
        },
        list: [
            { 
                title: "Hotel Outcall Special", 
                icon: "🏨", 
                desc: "Discreet high-end service straight to your hotel room.",
                duration: "⏱ 60 / 90 / 120 MINS",
                img: "imgs/service-6.jpg"
            },
            { 
                title: "Private Home Session", 
                icon: "🏡", 
                desc: "Transform your home space into a private sanctuary.",
                duration: "⏱ 60 / 90 / 120 MINS",
                img: "imgs/service-7.jpg"
            },
            { 
                title: "Late Night Delivery", 
                icon: "🌌", 
                desc: "Available for late-night relaxing sessions upon request.",
                duration: "⏱ 60 / 90 / 120 MINS",
                img: "imgs/service-8.jpg"
            }
        ]
    },
    wellness: {
        featured: {
            title: "Hot Stone Massage",
            tag: "✦ DEEP THERAPEUTIC",
            desc: "Smooth heated volcanic stones melt away chronic muscle tension and restore energy balance throughout your body.",
            duration: "⏱ 60 / 90 / 120 MINS",
            img: "imgs/service-9.jpg"
        },
        list: [
            { 
                title: "Deep Tissue Massage", 
                icon: "🔮", 
                desc: "Targeted intense pressure to release deep muscle tension.",
                duration: "⏱ 60 / 90 / 120 MINS",
                img: "imgs/service-10.jpg"
            },
            { 
                title: "Swedish Massage", 
                icon: "🌿", 
                desc: "Classic soothing massage designed to boost circulation and ease stress.",
                duration: "⏱ 60 / 90 / 120 MINS",
                img: "imgs/service-11.jpg"
            },
            { 
                title: "Aromatherapy Massage", 
                icon: "🌸", 
                desc: "Infused with therapeutic essential oils for holistic mental peace.",
                duration: "⏱ 60 / 90 / 120 MINS",
                img: "imgs/service-12.jpg"
            }
        ]
    }
};

function switchCategory(categoryKey, btnElement) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    if(btnElement) btnElement.classList.add('active');

    const category = serviceData[categoryKey];
    if (!category) return;
    
    const fTitle = document.getElementById('featuredTitle');
    const fTag = document.getElementById('featuredTag');
    const fDesc = document.getElementById('featuredDesc');
    const fDuration = document.getElementById('featuredDuration');
    const fImg = document.getElementById('featuredImg');

    if (fTitle) fTitle.innerText = category.featured.title;
    if (fTag) fTag.innerText = category.featured.tag;
    if (fDesc) fDesc.innerText = category.featured.desc;
    if (fDuration) fDuration.innerText = category.featured.duration;
    if (fImg) fImg.src = category.featured.img;

    const grid = document.getElementById('servicesGrid');
    if (grid) {
        grid.innerHTML = category.list.map(item => `
            <div class="service-mini-card" onclick="selectService('${item.title}')">
                <div class="mini-card-img-container">
                    <img src="${item.img}" loading="lazy" alt="${item.title}">
                </div>
                <div class="mini-card-body">
                    <div>
                        <div class="mini-card-head">
                            <span class="mini-card-title">${item.title}</span>
                            <span class="mini-card-icon">${item.icon}</span>
                        </div>
                        <p class="mini-card-desc">${item.desc}</p>
                    </div>
                    <div class="mini-card-actions">
                        <span class="mini-card-duration">${item.duration}</span>
                        <span class="mini-card-action">Book This &rarr;</span>
                    </div>
                </div>
            </div>
        `).join('');
    }
}

function selectServiceFromFeatured() {
    const fTitle = document.getElementById('featuredTitle');
    if (fTitle) selectService(fTitle.innerText);
}

const defaultActiveTab = document.querySelector('.tab-btn.active');
switchCategory('signature', defaultActiveTab);

/* ==================== REAL BOOKING LOGIC ==================== */
let contactMethod = 'whatsapp';

function selectService(serviceName) {
    const selectBox = document.getElementById('serviceSelect');
    if (selectBox) selectBox.value = serviceName; 
    const bookingSection = document.getElementById('booking');
    if (bookingSection) bookingSection.scrollIntoView({ behavior: 'smooth' });
}

function setContactMethod(method) {
    contactMethod = method;
    const btnWhatsApp = document.getElementById('btnWhatsApp');
    const btnSMS = document.getElementById('btnSMS');
    const btnEmail = document.getElementById('btnEmail');
    const submitBtn = document.getElementById('submitBtn');

    if (btnWhatsApp) btnWhatsApp.classList.remove('active');
    if (btnSMS) btnSMS.classList.remove('active');
    if (btnEmail) btnEmail.classList.remove('active');

    if (method === 'whatsapp') {
        if (btnWhatsApp) btnWhatsApp.classList.add('active');
        if (submitBtn) submitBtn.innerText = "Book Now via WhatsApp";
    } else if (method === 'sms') {
        if (btnSMS) btnSMS.classList.add('active');
        if (submitBtn) submitBtn.innerText = "Book Now via SMS";
    } else {
        if (btnEmail) btnEmail.classList.add('active');
        if (submitBtn) submitBtn.innerText = "Book Now via Email";
    }
}

const bookingForm = document.getElementById('bookingForm');
if (bookingForm) {
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault(); 

        const name = document.getElementById('clientName').value;
        const service = document.getElementById('serviceSelect').value;
        const date = document.getElementById('bookingDate').value;

        const formattedDate = new Date(date + 'T00:00:00').toLocaleDateString('en-US', { 
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
        });

        const message = `✨ *NEW BOOKING REQUEST* ✨\n\n` +
                        `👤 *Name:* ${name}\n` +
                        `🔮 *Service:* ${service}\n` +
                        `📅 *Date:* ${formattedDate}\n\n` +
                        `Please confirm my booking. Thank you!`;

        const businessPhone = "251901529662";
        const businessEmail = "bookings@mayamassage.com";
        const encodedMessage = encodeURIComponent(message);

        let opened = true;

        if (contactMethod === 'whatsapp') {
            const win = window.open(`https://wa.me/${businessPhone}?text=${encodedMessage}`, '_blank');
            opened = win !== null;
        } 
        else if (contactMethod === 'sms') {
            window.location.href = `sms:+${businessPhone}?body=${encodedMessage}`;
        } 
        else if (contactMethod === 'email') {
            const subject = encodeURIComponent(`Booking Request - ${service}`);
            window.location.href = `mailto:${businessEmail}?subject=${subject}&body=${encodedMessage}`;
        }

        const submitBtn = document.getElementById('submitBtn');
        if (submitBtn) {
            const originalText = submitBtn.innerText;

            if (opened) {
                submitBtn.innerText = "✓ Request Sent!";
                submitBtn.style.background = "linear-gradient(135deg, #4caf50, #2e7d32)";
            } else {
                submitBtn.innerText = "⚠ Allow pop-ups or tap WhatsApp";
                submitBtn.style.background = "linear-gradient(135deg, #c0392b, #8e1f14)";
            }
            
            setTimeout(() => {
                submitBtn.innerText = originalText;
                submitBtn.style.background = "";
                bookingForm.reset();
                if (dateInput) {
                    const freshToday = getLocalDateStr();
                    dateInput.min = freshToday;
                    dateInput.value = freshToday;
                }
            }, 3000);
        }
    });
}

/* ==================== NAV SMOOTH SCROLL ==================== */
document.querySelectorAll('.nav-links a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

/* ==================== MOBILE HAMBURGER MENU ==================== */
const navToggle = document.getElementById('navToggle');
const navLinks  = document.querySelector('.nav-links');

function closeMenu() {
    if (navToggle) navToggle.classList.remove('open');
    if (navLinks) navLinks.classList.remove('menu-open');
    document.body.style.overflow = '';
}

if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
        const isOpen = navToggle.classList.toggle('open');
        navLinks.classList.toggle('menu-open', isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            closeMenu();
        });
    });
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
});

/* ==================== FLOATING CONTACT HUB TOGGLE ==================== */
const contactHub = document.getElementById('contactHub');
const hubToggle  = document.getElementById('hubToggle');
const iconPath   = document.getElementById('iconPath');

const arrowPath = 'M2 12 L22 12 M15 6 L22 12 L15 18';
const xPath = 'M6 6 L18 18 M6 18 L18 6';

if (contactHub && hubToggle && iconPath) {
    if (contactHub.classList.contains('open')) {
        iconPath.setAttribute('d', xPath);
        hubToggle.setAttribute('aria-expanded', 'true');
    } else {
        iconPath.setAttribute('d', arrowPath);
        hubToggle.setAttribute('aria-expanded', 'false');
    }

    hubToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = contactHub.classList.toggle('open');
        hubToggle.setAttribute('aria-expanded', isOpen);

        if (isOpen) {
            iconPath.setAttribute('d', xPath);
        } else {
            iconPath.setAttribute('d', arrowPath);
        }
    });

    document.addEventListener('click', (e) => {
        if (!contactHub.contains(e.target)) {
            contactHub.classList.remove('open');
            hubToggle.setAttribute('aria-expanded', 'false');
            iconPath.setAttribute('d', arrowPath);
        }
    });
}
