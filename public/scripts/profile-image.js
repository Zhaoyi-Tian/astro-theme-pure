!(function () {
  const images = [
    { src: "/profile/1.png", width: 250, height: 250 },
    { src: "/profile/2.png", width: 250, height: 250 },
    { src: "/profile/3.png", width: 250, height: 250 }
  ];
  const defaultImage = "/profile/1.png";
  const profileImage = document.getElementById("profile-image");
  const imageSources = images.map((img) => img.src);
  let currentIndex = images.findIndex((img) => img.src === defaultImage);

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
        if (imageSources.length > 1) {
          const oldIndex = currentIndex;
          do {
            currentIndex = Math.floor(Math.random() * imageSources.length);
          } while (currentIndex === oldIndex);
        }
        profileImage.src = imageSources[currentIndex];
        profileImage.style.opacity = "1";
      }, 300);
    });
  }
})();