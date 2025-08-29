!(function () {
  const images = [
    { src: "/profile/1.png", width: 250, height: 250 },
    { src: "/profile/2.png", width: 250, height: 250 },
    { src: "/profile/3.png", width: 250, height: 250 },
    // { src: "/profile/4.png", width: 250, height: 250 },
    { src: "/profile/5.jpg", width: 250, height: 250 }
  ];
  const defaultImage = "/profile/1.png";
  const profileImage = document.getElementById("profile-image");
  let imageSources = images.map((img) => img.src);
  let currentIndex = images.findIndex((img) => img.src === defaultImage);
  let hasBeenClicked = false;

  window.addEventListener("load", () => {
    images.forEach((img, index) => {
      if (index !== currentIndex) {
        const preloadImg = new Image();
        preloadImg.src = img.src;
      }
    });
  });

  if (profileImage) {
    profileImage.addEventListener("click", () => {
      profileImage.style.opacity = "0";
      setTimeout(() => {
        if (!hasBeenClicked) {
          imageSources = imageSources.filter(src => src !== defaultImage);
          hasBeenClicked = true;
        }
        
        if (imageSources.length > 1) {
          const oldSrc = profileImage.src;
          const currentSrc = new URL(oldSrc).pathname;
          do {
            currentIndex = Math.floor(Math.random() * imageSources.length);
          } while (imageSources[currentIndex] === currentSrc);
        } else if (imageSources.length === 1) {
          currentIndex = 0;
        }
        
        profileImage.src = imageSources[currentIndex];
        profileImage.style.opacity = "1";
      }, 300);
    });
  }
})();