document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS Animation Library
    AOS.init({
        once: true,
        offset: 50,
        duration: 800,
        easing: 'ease-out-cubic',
    });

    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // Dynamically load gallery images
    const galleryContainer = document.querySelector('.js-gallery');
    
    // We have 13 screenshots from photo_6242043333727424517_y.jpg to photo_6242043333727424529_y.jpg
    const startIdx = 6242043333727424517n;
    const count = 13;
    
    for (let i = 0; i < count; i++) {
        const id = startIdx + BigInt(i);
        const imgPath = `screenshot/photo_${id}_y.jpg`;
        
        const item = document.createElement('div');
        item.className = 'gallery-item';
        
        const img = document.createElement('img');
        img.src = imgPath;
        img.alt = `Reborn UI Screenshot ${i + 1}`;
        img.loading = 'lazy';
        
        item.appendChild(img);
        galleryContainer.appendChild(item);
    }

    // Modal Logic
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImg');
    const closeBtn = document.querySelector('.close-modal');

    // Event delegation for gallery clicks
    galleryContainer.addEventListener('click', (e) => {
        if (e.target.tagName === 'IMG') {
            modal.style.display = 'block';
            // slight delay to allow display:block to apply before changing opacity
            setTimeout(() => {
                modal.classList.add('show');
            }, 10);
            modalImg.src = e.target.src;
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        }
    });

    // Close modal functions
    const closeModal = () => {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300); // match transition duration
        document.body.style.overflow = 'auto'; // Restore scrolling
    };

    closeBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if(targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
