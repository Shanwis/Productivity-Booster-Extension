function hideElements(selector) {
  document.querySelectorAll(selector).forEach(el => {
    el.style.display = "none";
    el.style.visibility = "hidden";
    el.style.pointerEvents = "none";
  });
}

function removeShortsAndReels() {
  // YouTube Shorts
  hideElements('a[href^="/shorts"]');
  hideElements('ytd-rich-section-renderer[is-shorts]');
  hideElements('ytd-rich-shelf-renderer[is-shorts]');
  hideElements('ytd-reel-shelf-renderer');
  hideElements('ytd-reel-item-renderer');
  hideElements('ytd-video-renderer a[href*="/shorts"]');
  hideElements('ytd-grid-video-renderer a[href*="/shorts"]');
  hideElements('ytd-mini-guide-entry-renderer[title="Shorts"]');
  hideElements('a[title="Shorts"]');

  // Instagram Reels
  hideElements('a[href="/reels/"]');
  hideElements('a[href="/explore/"]');
}

// Observe on if enabled
chrome.storage.local.get("enabled",({enabled}) =>{
  if(enabled) {
    const observer = new MutationObserver(removeShortsAndReels);
    observer.observe(document.body, {childList:true, subtree: true});
    removeShortsAndReels();
  }
});

//Listen for toggle changes live

chrome.storage.onChanged.addListener((changes, area) => {
  if(area === "local" && "enabled" in changes){
    if(changes.enabled.newValue){
      if(changes.enabled.newValue){
        const observer = new MutationObserver(removeShortsAndReels);
        observer.observe(document.body, {childList: true, subtree: true});
        removeShortsAndReels();
      }
      
    }else{
      location.reload();//reset page when disabled
    }
  }
})
