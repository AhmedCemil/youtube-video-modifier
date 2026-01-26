// Wait for YouTube to load and inject our button
function addYoutTubeButton() {
  // Check if our button already exists
  if (document.getElementById('yout-ube-btn')) {
    return;
  }

  // Find the right controls container - try both old and new UI structures
  let targetContainer = null;

  // New UI: .ytp-right-controls > .ytp-right-controls-left
  const rightControlsLeft = document.querySelector('.ytp-right-controls .ytp-right-controls-left');
  if (rightControlsLeft) {
    targetContainer = rightControlsLeft;
  } else {
    // Old UI: Just .ytp-right-controls
    const rightControls = document.querySelector('.ytp-right-controls');
    if (rightControls) {
      targetContainer = rightControls;
    }
  }

  if (!targetContainer) {
    // If not found, try again after a short delay
    setTimeout(addYoutTubeButton, 1000);
    return;
  }

  // Create our custom button
  const button = document.createElement('button');
  button.id = 'yout-ube-btn';
  button.className = 'ytp-button yout-ube-button';
  button.title = 'Open in Yout-ube';
  button.setAttribute('aria-label', 'Open in Yout-ube');
  button.setAttribute('data-priority', '4');
  button.innerHTML = `
    <svg height="24" viewBox="0 0 24 24" width="24" fill="none">
      <path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z" fill="white"/>
    </svg>
  `;

  // Add click event listener
  button.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();

    // Get current URL and modify it
    const currentUrl = window.location.href;
    const newUrl = currentUrl.replace('youtube.com', 'yout-ube.com');

    // Open in new tab
    window.open(newUrl, '_blank');
  });

  // For new UI, insert before settings button in the left controls section
  // For old UI, insert before settings button or fullscreen button
  const settingsButton = targetContainer.querySelector('.ytp-settings-button');
  if (settingsButton) {
    targetContainer.insertBefore(button, settingsButton);
  } else {
    // Fallback: append to the end
    targetContainer.appendChild(button);
  }
}

// Initialize when page loads
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', addYoutTubeButton);
} else {
  addYoutTubeButton();
}

// Re-add button when navigating to new videos (YouTube uses AJAX navigation)
let lastUrl = location.href;
let retryCount = 0;
const maxRetries = 10;

new MutationObserver(() => {
  const url = location.href;
  if (url !== lastUrl) {
    lastUrl = url;
    retryCount = 0;

    // Try multiple times as the new UI loads asynchronously
    const tryAdd = () => {
      if (retryCount < maxRetries) {
        retryCount++;
        addYoutTubeButton();
        setTimeout(tryAdd, 500);
      }
    };
    tryAdd();
  }
}).observe(document, { subtree: true, childList: true });

// Listen for YouTube's navigation and player events
window.addEventListener('yt-navigate-finish', () => {
  retryCount = 0;
  setTimeout(addYoutTubeButton, 100);
  setTimeout(addYoutTubeButton, 500);
  setTimeout(addYoutTubeButton, 1000);
});

window.addEventListener('yt-page-data-updated', () => {
  setTimeout(addYoutTubeButton, 100);
});

// Listen for player state changes
window.addEventListener('loadstart', addYoutTubeButton, true);

// Periodic check as fallback (every 3 seconds)
setInterval(() => {
  if (window.location.pathname.includes('/watch') && !document.getElementById('yout-ube-btn')) {
    addYoutTubeButton();
  }
}, 3000);