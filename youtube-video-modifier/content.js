let isPrivacyMode = false;

function getVideoId() {
  return new URL(window.location.href).searchParams.get('v');
}

function addPrivacyToggleButton() {
  if (document.getElementById('privacy-toggle-btn')) {
    return;
  }

  // Find controls container - new UI first, then old UI
  let targetContainer = document.querySelector('.ytp-right-controls .ytp-right-controls-left');
  if (!targetContainer) {
    targetContainer = document.querySelector('.ytp-right-controls');
  }

  if (!targetContainer) {
    setTimeout(addPrivacyToggleButton, 1000);
    return;
  }

  const button = document.createElement('button');
  button.id = 'privacy-toggle-btn';
  button.className = 'ytp-button privacy-toggle-button';
  button.title = 'Privacy Mode (No Ads)';
  button.setAttribute('aria-label', 'Toggle Privacy Mode');
  button.setAttribute('data-priority', '4');
  // Shield icon
  button.innerHTML = `
    <svg height="24" viewBox="0 0 24 24" width="24" fill="none">
      <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 2.18l7 3.12v4.7c0 4.83-3.23 9.36-7 10.57-3.77-1.21-7-5.74-7-10.57V6.3l7-3.12z" fill="white"/>
      <path d="M10 12l-2-2-1.41 1.41L10 14.82l6-6L14.59 7.4 10 12z" fill="white"/>
    </svg>
  `;

  button.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();

    if (e.ctrlKey) {
      // Ctrl+Click: open yout-ube.com in a new tab
      const currentUrl = window.location.href;
      const newUrl = currentUrl.replace('youtube.com', 'yout-ube.com');
      window.open(newUrl, '_blank');
    } else {
      // Normal click: toggle privacy mode inline
      togglePrivacyMode();
    }
  });

  const settingsButton = targetContainer.querySelector('.ytp-settings-button');
  if (settingsButton && settingsButton.parentNode === targetContainer) {
    targetContainer.insertBefore(button, settingsButton);
  } else {
    targetContainer.appendChild(button);
  }
}

function togglePrivacyMode() {
  if (isPrivacyMode) {
    // Restore normal player by reloading the page
    isPrivacyMode = false;
    window.location.reload();
    return;
  }

  const videoId = getVideoId();
  if (!videoId) return;

  const playerContainer = document.querySelector('#movie_player');
  if (!playerContainer) return;

  isPrivacyMode = true;

  // Get current time from YouTube player if possible
  let startTime = 0;
  const video = playerContainer.querySelector('video');
  if (video && video.currentTime > 0) {
    startTime = Math.floor(video.currentTime);
  }

  // Build yout-ube.com URL (redirects through their service to nocookie player)
  const currentUrl = window.location.href;
  let embedUrl = currentUrl.replace('youtube.com', 'yout-ube.com');
  if (startTime > 0 && !embedUrl.includes('&t=')) {
    embedUrl += `&t=${startTime}`;
  }
  // Enable JS API for keyboard command forwarding
  if (!embedUrl.includes('enablejsapi')) {
    embedUrl += (embedUrl.includes('?') ? '&' : '?') + 'enablejsapi=1';
  }

  // Get player dimensions
  const width = playerContainer.offsetWidth;
  const height = playerContainer.offsetHeight;

  // Replace player content with iframe
  playerContainer.innerHTML = '';
  playerContainer.style.position = 'relative';

  const iframe = document.createElement('iframe');
  iframe.id = 'privacy-player-iframe';
  iframe.src = embedUrl;
  iframe.width = width;
  iframe.height = height;
  iframe.frameBorder = '0';
  iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
  iframe.allowFullscreen = true;

  playerContainer.appendChild(iframe);

  // Update button appearance to show active state
  const btn = document.getElementById('privacy-toggle-btn');
  if (btn) {
    btn.classList.add('privacy-active');
    btn.title = 'Exit Privacy Mode';
  }
}

// Intercept YouTube shortcuts and forward them to the iframe player
document.addEventListener('keydown', function(e) {
  if (!isPrivacyMode) return;

  // Don't block when user is typing in an input field
  const tag = document.activeElement.tagName.toLowerCase();
  const isEditable = tag === 'input' || tag === 'textarea' || tag === 'select'
    || document.activeElement.isContentEditable
    || document.activeElement.getAttribute('contenteditable') === 'true';
  if (isEditable) return;

  const ytKeys = ['f', 't', 'k', 'j', 'l', 'm', 'c', ' '];
  if (ytKeys.includes(e.key.toLowerCase())) {
    // Block YouTube's own handler
    e.stopPropagation();
    e.preventDefault();

    // Forward the key to the iframe by focusing it
    // The embedded player will handle its own shortcuts once focused
    const iframe = document.getElementById('privacy-player-iframe');
    if (iframe) {
      iframe.focus();
      // postMessage to the iframe for key forwarding
      // YouTube's embed player listens for these commands
      const keyMap = {
        ' ': 'playPause', 'k': 'playPause',
        'f': 'fullscreen',
        'm': 'mute',
        'j': 'seekBackward',
        'l': 'seekForward'
      };
      const command = keyMap[e.key.toLowerCase()];
      if (command) {
        iframe.contentWindow.postMessage(JSON.stringify({
          event: 'command',
          func: command === 'playPause' ? 'playVideo' : command,
          args: []
        }), '*');
      }
    }
  }
}, true);

// Keep iframe focused when clicking on it so its own shortcuts work
document.addEventListener('click', function(e) {
  if (!isPrivacyMode) return;

  const iframe = document.getElementById('privacy-player-iframe');
  if (iframe) {
    iframe.focus();
  }
}, true);

// Initialize
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', addPrivacyToggleButton);
} else {
  addPrivacyToggleButton();
}

// Handle YouTube SPA navigation
let lastUrl = location.href;
new MutationObserver(() => {
  const url = location.href;
  if (url !== lastUrl) {
    lastUrl = url;
    isPrivacyMode = false;
    setTimeout(addPrivacyToggleButton, 500);
    setTimeout(addPrivacyToggleButton, 1000);
    setTimeout(addPrivacyToggleButton, 2000);
  }
}).observe(document, { subtree: true, childList: true });

window.addEventListener('yt-navigate-finish', () => {
  isPrivacyMode = false;
  setTimeout(addPrivacyToggleButton, 100);
  setTimeout(addPrivacyToggleButton, 500);
  setTimeout(addPrivacyToggleButton, 1000);
});

// Periodic fallback
setInterval(() => {
  if (window.location.pathname.includes('/watch') && !document.getElementById('privacy-toggle-btn')) {
    addPrivacyToggleButton();
  }
}, 3000);
