const romData = [
    {
        "id": 1461,
        "title": "Reborn UI Extended",
        "url": "https://t.me/mt6833unified_updates/1461",
        "meta": ["HyperOS", "Android 14", "Hybrid Rom"],
        "desc": "The ultimate HyperOS experience for POCO M4 Pro 5G. Extended edition by dronxtu.",
        "images": [
            "screenshot/photo_6242043333727424517_y.jpg",
            "screenshot/photo_6242043333727424518_y.jpg",
            "screenshot/photo_6242043333727424519_y.jpg",
            "screenshot/photo_6242043333727424520_y.jpg",
            "screenshot/photo_6242043333727424521_y.jpg",
            "screenshot/photo_6242043333727424522_y.jpg",
            "screenshot/photo_6242043333727424523_y.jpg",
            "screenshot/photo_6242043333727424524_y.jpg",
            "screenshot/photo_6242043333727424525_y.jpg",
            "screenshot/photo_6242043333727424526_y.jpg",
            "screenshot/photo_6242043333727424527_y.jpg",
            "screenshot/photo_6242043333727424528_y.jpg",
            "screenshot/photo_6242043333727424529_y.jpg"
        ]
    },
    {
        "id": 1472,
        "title": "Xiaomi HyperOS 3.1",
        "url": "https://t.me/mt6833unified_updates/1472",
        "meta": ["HyperOS 3.1", "Android 16", "Hybrid Rom"],
        "desc": "Ported from Device: Redmi note 14 5g(beryl)\nVersion: OS3.0.301.0.WOQINXM Indian Global Hybrid Rom",
        "images": ["screenshot/post_1472_0.jpg"]
    },
    {
        "id": 1445,
        "title": "MemeOS | Evergo",
        "url": "https://t.me/mt6833unified_updates/1445",
        "meta": ["MIUI 14", "Android 13", "MemeOS"],
        "desc": "Release Date : 02/07/2026\nBase Rom : MIUI 14.0.8.0.TKTCNXM\nRom Credit: @Rolex040623\nMaintainer: @dronxtu",
        "images": ["screenshot/post_1445_0.jpg"]
    },
    {
        "id": 1433,
        "title": "Reborn UI 2.0 A16",
        "url": "https://t.me/mt6833unified_updates/1433",
        "meta": ["HyperOS", "Android 16", "Hybrid Rom"],
        "desc": "Next generation Reborn UI on Android 16. Hybrid Rom for Evergo, Evergreen, Opal.",
        "images": ["screenshot/post_1433_0.jpg"]
    },
    {
        "id": 1400,
        "title": "Reborn UI",
        "url": "https://t.me/mt6833unified_updates/1400",
        "meta": ["OS 3.0.7", "Android 15", "CN Base"],
        "desc": "Released: 08/06/2026\nBase: OS3.0.7.0 VLNCNXM | A15 | CN ROM\nFlashing Type: Hybrid Rom",
        "images": ["screenshot/post_1400_0.jpg"]
    }
];

document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS
    AOS.init({
        once: true,
        offset: 50,
        duration: 800,
        easing: 'ease-out-cubic',
    });

    document.getElementById('year').textContent = new Date().getFullYear();

    const romContainer = document.getElementById('rom-container');
    const gallerySection = document.getElementById('gallery');
    const galleryContainer = document.getElementById('gallery-container');
    const galleryTitle = document.getElementById('gallery-title');

    // Render ROM Cards
    romData.forEach((rom, index) => {
        const card = document.createElement('div');
        card.className = 'rom-card';
        card.setAttribute('data-aos', 'fade-up');
        card.setAttribute('data-aos-delay', (index * 100).toString());

        const metaTags = rom.meta.map(tag => `<span>${tag}</span>`).join('');

        card.innerHTML = `
            <div class="rom-header">
                <h3 class="rom-title">${rom.title}</h3>
                <div class="rom-meta">
                    ${metaTags}
                </div>
                <div class="rom-desc">${rom.desc}</div>
            </div>
            <div class="rom-actions">
                <a href="${rom.url}" target="_blank" class="btn-small btn-download">Download</a>
                <button class="btn-small btn-gallery" data-id="${rom.id}">View Screenshots</button>
            </div>
        `;
        romContainer.appendChild(card);
    });

    // Handle Gallery Clicks
    document.querySelectorAll('.btn-gallery').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const romId = parseInt(e.target.getAttribute('data-id'));
            const rom = romData.find(r => r.id === romId);
            
            if (rom) {
                // Populate Gallery
                galleryContainer.innerHTML = '';
                galleryTitle.textContent = rom.title;
                
                rom.images.forEach((imgSrc, i) => {
                    const item = document.createElement('div');
                    item.className = 'gallery-item';
                    const img = document.createElement('img');
                    img.src = imgSrc;
                    img.alt = `${rom.title} Screenshot ${i + 1}`;
                    img.loading = 'lazy';
                    item.appendChild(img);
                    galleryContainer.appendChild(item);
                });

                // Show Gallery Section
                gallerySection.style.display = 'block';
                
                // Scroll to Gallery
                gallerySection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Modal Logic
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImg');
    const closeBtn = document.querySelector('.close-modal');

    galleryContainer.addEventListener('click', (e) => {
        if (e.target.tagName === 'IMG') {
            modal.style.display = 'block';
            setTimeout(() => {
                modal.classList.add('show');
            }, 10);
            modalImg.src = e.target.src;
            document.body.style.overflow = 'hidden';
        }
    });

    const closeModal = () => {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
        document.body.style.overflow = 'auto';
    };

    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'block') closeModal();
    });

    // Smooth scroll for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});
