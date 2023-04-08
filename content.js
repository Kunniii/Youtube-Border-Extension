console.log("Found Youtube Watch!");
window.onload = (event) => {
  const borderRadius = "15px";
  const videoContainer = document.querySelector(".html5-video-player");
  if (videoContainer) {
    videoContainer.style.borderRadius = borderRadius;
    console.log("Added border to your Youtube video");
  }
};
