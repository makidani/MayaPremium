/* ==================== PRELOADER ==================== */
window.addEventListener('load', () => {
    setTimeout(() => {
        const preloader = document.getElementById('preloader');
        preloader.style.opacity = '0';
        setTimeout(() => preloader.style.visibility = 'hidden', 1000);
    }, 1500);
});

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
dateInput.min = todayStr;
dateInput.max = maxStr;
dateInput.value = todayStr;

/* ==================== PARTICLES ==================== */
const canvas = document.getElementById('particles-js');
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
        let color = Math.random() > 0.5 ? 'rgba(229, 193, 88, 0.6)' : 'rgba(138, 43, 226, 0.4)';
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

/* ==================== SERVICES TAB & DATA LOGIC ==================== */
const serviceData = {
    signature: {
        featured: {
            title: "Nuru Massage",
            tag: "✦ MOST POPULAR",
            desc: "A sensual, deeply immersive glide technique using specialized organic gels. Experience weightless sensory elevation and full-body renewal.",
            duration: "⏱ 60 / 90 / 120 MINS",
            img: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?q=80&w=1200&auto=format&fit=crop"
        },
        list: [
            { title: "Body-to-Body Massage", icon: "🌙", desc: "Sensory body alignment creating harmonious flow and complete muscle relaxation." },
            { title: "Four-Hands Massage", icon: "🤲", desc: "Two therapists working in synchronized harmony for absolute relaxation." },
            { title: "Couples Massage", icon: "💞", desc: "A side-by-side luxurious journey crafted for two." }
        ]
    },
    outcall: {
        featured: {
            title: "Outdoor Service",
            tag: "✦ HOTEL & HOME DIRECT",
            desc: "We bring the complete spa atmosphere to your residence or hotel room in Addis Ababa. Discreet, prompt, and effortless.",
            duration: "⏱ 60 / 90 / 120 MINS",
            img: "imgs/team-1.jpg"
        },
        list: [
            { title: "Hotel Outcall Special", icon: "🏨", desc: "Discreet high-end service straight to your hotel room." },
            { title: "Private Home Session", icon: "🏡", desc: "Transform your home space into a private sanctuary." },
            { title: "Late Night Delivery", icon: "🌌", desc: "Available for late-night relaxing sessions upon request." }
        ]
    },
    wellness: {
        featured: {
            title: "Hot Stone Massage",
            tag: "✦ DEEP THERAPEUTIC",
            desc: "Smooth heated volcanic stones melt away chronic muscle tension and restore energy balance throughout your body.",
            duration: "⏱ 60 / 90 MINS",
            img: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?q=80&w=1200&auto=format&fit=crop"
        },
        list: [
            { title: "Deep Tissue Massage", icon: "🔮", desc: "Targeted intense pressure to release deep muscle tension." },
            { title: "Swedish Massage", icon: "🌿", desc: "Classic soothing massage designed to boost circulation and ease stress." },
            { title: "Aromatherapy Massage", icon: "🌸", desc: "Infused with therapeutic essential oils for holistic mental peace." }
        ]
    }
};

function switchCategory(categoryKey, btnElement) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    if(btnElement) btnElement.classList.add('active');

    const category = serviceData[categoryKey];
    
    document.getElementById('featuredTitle').innerText = category.featured.title;
    document.getElementById('featuredTag').innerText = category.featured.tag;
    document.getElementById('featuredDesc').innerText = category.featured.desc;
    document.getElementById('featuredDuration').innerText = category.featured.duration;
    document.getElementById('featuredImg').src = category.featured.img;

    const grid = document.getElementById('servicesGrid');
    grid.innerHTML = category.list.map(item => `
        <div class="service-mini-card" onclick="selectService('${item.title}')">
            <div class="mini-card-head">
                <span class="mini-card-title">${item.title}</span>
                <span class="mini-card-icon">${item.icon}</span>
            </div>
            <p class="mini-card-desc">${item.desc}</p>
            <span class="mini-card-action">Book This &rarr;</span>
        </div>
    `).join('');
}

function selectServiceFromFeatured() {
    const title = document.getElementById('featuredTitle').innerText;
    selectService(title);
}

switchCategory('signature', document.querySelector('.tab-btn.active'));

/* ==================== REAL BOOKING LOGIC ==================== */
let contactMethod = 'whatsapp';

function selectService(serviceName) {
    const selectBox = document.getElementById('serviceSelect');
    selectBox.value = serviceName; 
    document.getElementById('booking').scrollIntoView({ behavior: 'smooth' });
}

function setContactMethod(method) {
    contactMethod = method;
    const btnWhatsApp = document.getElementById('btnWhatsApp');
    const btnSMS = document.getElementById('btnSMS');
    const btnEmail = document.getElementById('btnEmail');
    const submitBtn = document.getElementById('submitBtn');

    btnWhatsApp.classList.remove('active');
    btnSMS.classList.remove('active');
    btnEmail.classList.remove('active');

    if (method === 'whatsapp') {
        btnWhatsApp.classList.add('active');
        submitBtn.innerText = "Book Now via WhatsApp";
    } else if (method === 'sms') {
        btnSMS.classList.add('active');
        submitBtn.innerText = "Book Now via SMS";
    } else {
        btnEmail.classList.add('active');
        submitBtn.innerText = "Book Now via Email";
    }
}

document.getElementById('bookingForm').addEventListener('submit', function(e) {
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
        document.getElementById('bookingForm').reset();
        const freshToday = getLocalDateStr();
        dateInput.min = freshToday;
        dateInput.value = freshToday;
    }, 3000);
});

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
    navToggle.classList.remove('open');
    navLinks.classList.remove('menu-open');
    document.body.style.overflow = '';
}

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

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
});


/* ==================== FLOATING CONTACT HUB TOGGLE ==================== */
const contactHub = document.getElementById('contactHub');
const hubToggle  = document.getElementById('hubToggle');
const iconPath   = document.getElementById('iconPath');

// Define the SVG paths
const arrowPath = 'M2 12 L22 12 M15 6 L22 12 L15 18';
const xPath = 'M6 6 L18 18 M6 18 L18 6';

if (contactHub && hubToggle && iconPath) {
    // 1. Initialize correct icon on page load based on whether 'open' class is present
    if (contactHub.classList.contains('open')) {
        iconPath.setAttribute('d', xPath);
        hubToggle.setAttribute('aria-expanded', 'true');
    } else {
        iconPath.setAttribute('d', arrowPath);
        hubToggle.setAttribute('aria-expanded', 'false');
    }

    // 2. Toggle behavior on click
    hubToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = contactHub.classList.toggle('open');
        hubToggle.setAttribute('aria-expanded', isOpen);

        if (isOpen) {
            iconPath.setAttribute('d', xPath); // Change to X when opened
        } else {
            iconPath.setAttribute('d', arrowPath); // Change to arrow when closed
        }
    });

    // 3. Close when clicking outside
    document.addEventListener('click', (e) => {
        if (!contactHub.contains(e.target)) {
            contactHub.classList.remove('open');
            hubToggle.setAttribute('aria-expanded', 'false');
            iconPath.setAttribute('d', arrowPath);
        }
    });

    // 4. Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            contactHub.classList.remove('open');
            hubToggle.setAttribute('aria-expanded', 'false');
            iconPath.setAttribute('d', arrowPath);
        }
    });
}