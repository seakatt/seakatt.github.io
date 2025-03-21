document.addEventListener("DOMContentLoaded", () => {
    const images = document.querySelectorAll(".lightbox");
    const overlay = document.getElementById("overlay");
    const overlayImg = document.getElementById("overlay-img");
    const overlayVideo = document.getElementById("overlay-vid");

    images.forEach(item => {
        item.addEventListener("click", () => {
            if (item.tagName.toLocaleLowerCase() === "img") {
                overlayImg.src = item.src;
                overlayImg.style.display = "block";
                overlayVideo.style.display = "none";
            }
            else if (item.tagName.toLocaleLowerCase() === "video") {
                overlayVideo.src = item.src;
                overlayVideo.style.display = "block";
                overlayImg.style.display = "none"
            }
            overlay.classList.add("active")
        });
    });

    overlay.addEventListener("click", () => {
        overlay.classList.remove("active");
    });
});





// ---------------------------------------------------------------------------------------------------


let currentIndex = 0;
const imgBox = document.querySelector('.img-box');
const pagesContainer = document.querySelector('.pages-container');
const pages = document.querySelectorAll('.img-box img');
const totalPages = pages.length;
const pageWidth = 1640;







// Get the actual displayed width of the images in the container (accounting for scaling)
const getScaledWidth = () => {
  const firstImage = imgBox.querySelector('img'); // Assuming all images have the same size
  return firstImage ? firstImage.clientWidth : pageWidth;
};

function goToPage(index) {
  if (index < 0 || index >= totalPages) return;
  currentIndex = index;

  // Calculate the scroll position using the actual displayed image width
  const scaledWidth = getScaledWidth();
  const scrollPosition = currentIndex * scaledWidth;

  // Jump to the correct page
  imgBox.scrollLeft = scrollPosition;
}





document.getElementById('prev-btn').addEventListener('click', () => {
  goToPage(currentIndex - 1);
});

document.getElementById('next-btn').addEventListener('click', () => {
  goToPage(currentIndex + 1);
});