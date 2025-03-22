document.addEventListener("DOMContentLoaded", () => {
    // Lightbox elements
    const overlay = document.getElementById("overlay");
    const overlayImg = document.getElementById("overlay-img");
    const overlayVideo = document.getElementById("overlay-vid");
    const navButtons = document.querySelectorAll('#overlay-prev-btn, #overlay-next-btn');

    // Flipbook elements
    const flipbook = document.querySelector('.flipbook-module');
    const imgBox = flipbook.querySelector('.img-box');
    const pages = flipbook.querySelectorAll('.lightbox');
    let currentIndex = 0;

    // Regular images (non-flipbook)
    document.querySelectorAll('.lightbox:not(.flipbook-module .lightbox)').forEach(img => {
        img.addEventListener('click', () => {
            navButtons.forEach(btn => btn.style.display = 'none');
            overlayImg.src = img.src;
            overlayImg.style.display = 'block';
            overlayVideo.style.display = 'none';
            overlay.classList.add('active');
        });
    });

    // Flipbook images
    pages.forEach((img, index) => {
        img.addEventListener('click', () => {
            currentIndex = index;
            navButtons.forEach(btn => btn.style.display = 'block');
            overlayImg.src = img.src;
            overlayImg.style.display = 'block';
            overlayVideo.style.display = 'none';
            overlay.classList.add('active');
            scrollToCurrentImage();
        });
    });

    // Precise scroll handling
    function scrollToCurrentImage() {
        const img = pages[currentIndex];
        const container = img.parentElement.parentElement;
        const padding = parseInt(window.getComputedStyle(img.parentElement).paddingLeft);
        imgBox.scrollLeft = img.offsetLeft - padding - container.offsetLeft;
    }

    // Navigation control
    function navigate(direction) {
        currentIndex = Math.max(0, Math.min(pages.length - 1, currentIndex + direction));
        overlayImg.src = pages[currentIndex].src;
        scrollToCurrentImage();
    }

    // Button controls
    document.getElementById('prev-btn').addEventListener('click', () => navigate(-1));
    document.getElementById('next-btn').addEventListener('click', () => navigate(1));
    document.getElementById('overlay-prev-btn').addEventListener('click', e => {
        e.stopPropagation();
        navigate(-1);
    });
    document.getElementById('overlay-next-btn').addEventListener('click', e => {
        e.stopPropagation();
        navigate(1);
    });

    // Close lightbox
    overlay.addEventListener('click', e => {
        if (e.target === overlay) {
            overlay.classList.remove('active');
            navButtons.forEach(btn => btn.style.display = 'block');
        }
    });
});