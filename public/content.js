window.onload = () => {
  const borderRadius = "12px"; //personally, this is perfect!! :D
  const videoContainer = document.querySelector(".html5-video-player");
  if (videoContainer) {
    chrome.storage.local.get("status").then((data) => {
      if (data.status) {
        videoContainer.style.borderRadius = borderRadius;
      }
    });
    chrome.storage.onChanged.addListener((changes, namespace) => {
      const borderRadius = "12px";
      if (changes.status.newValue) {
        document.querySelector(".html5-video-player").style.borderRadius = borderRadius;
      } else {
        document.querySelector(".html5-video-player").style.borderRadius = "0px";
      }
    });
  }
};
