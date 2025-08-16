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
  hideElements('a[href$="/reels/"]');
  hideElements('a[href*="/reel/"]');
  hideElements('article a[href*="/reel/"]');
  hideElements('div a[href*="/reel/"]');
  hideElements('._aagw, ._aagu, ._aagv');
}

const observer = new MutationObserver(() => {
  removeShortsAndReels();
});

// Start observing DOM
observer.observe(document.body, {
  childList: true,
  subtree: true,
});

// Initial run
removeShortsAndReels();
