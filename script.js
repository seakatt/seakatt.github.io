document.addEventListener("DOMContentLoaded", () => {
    // Lightbox elements
    const overlay = document.getElementById("overlay");
    const overlayImg = document.getElementById("overlay-img");
    const overlayVideo = document.getElementById("overlay-vid");
    const overlayPrevBtn = document.getElementById("overlay-prev-btn");
    const overlayNextBtn = document.getElementById("overlay-next-btn");

    // Flipbook elements
    const flipbook = document.querySelector('.flipbook-module');
    let currentIndex = 0;
    let pages = [];

    // Check if flipbook exists
    if (flipbook) {
        const imgBox = flipbook.querySelector('.img-box');
        pages = flipbook.querySelectorAll('.lightbox');
        const prevBtn = flipbook.querySelector("#prev-btn");
        const nextBtn = flipbook.querySelector("#next-btn");

        // Flipbook navigation
        function updateFlipbook() {
            imgBox.scrollLeft = pages[currentIndex].offsetLeft - imgBox.offsetLeft;
        }

        prevBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            if (currentIndex > 0) {
                currentIndex--;
                updateFlipbook();
            }
        });

        nextBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            if (currentIndex < pages.length - 1) {
                currentIndex++;
                updateFlipbook();
            }
        });

        // Flipbook image lightbox activation
        pages.forEach((img, index) => {
            img.addEventListener("click", () => {
                currentIndex = index;
                showLightbox(img);
                overlayPrevBtn.style.display = "block";
                overlayNextBtn.style.display = "block";
            });
        });
    }

    // Regular (non-flipbook) lightbox images
    document.querySelectorAll('.lightbox:not(.flipbook-module .lightbox)').forEach(img => {
        img.addEventListener("click", () => {
            showLightbox(img);
            overlayPrevBtn.style.display = "none";
            overlayNextBtn.style.display = "none";
        });
    });

    // Show lightbox (handles images and videos)
    function showLightbox(element) {
        if (element.tagName === "IMG") {
            overlayImg.src = element.src;
            overlayImg.style.display = "block";
            overlayVideo.style.display = "none";
        } else if (element.tagName === "VIDEO") {
            overlayVideo.src = element.src;
            overlayVideo.style.display = "block";
            overlayImg.style.display = "none";
        }
        overlay.classList.add("active");
    }

    // Lightbox navigation (if flipbook exists)
    function navigate(direction) {
        if (pages.length === 0) return;
        currentIndex = Math.max(0, Math.min(pages.length - 1, currentIndex + direction));
        showLightbox(pages[currentIndex]);
        updateFlipbook(); // Sync flipbook with lightbox navigation
    }

    overlayPrevBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        navigate(-1);
    });

    overlayNextBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        navigate(1);
    });

    // Close lightbox
    overlay.addEventListener("click", () => {
        overlay.classList.remove("active");
        overlayImg.src = "";
        overlayVideo.src = "";
    });
});
