function extractVideoId(input) {
  input = input.trim();

  // Direct video ID (11 chars)
  if (/^[a-zA-Z0-9_-]{11}$/.test(input)) {
    return input;
  }

  try {
    // Add protocol if missing
    let urlStr = input;
    if (!urlStr.startsWith('http://') && !urlStr.startsWith('https://')) {
      urlStr = 'https://' + urlStr;
    }
    const url = new URL(urlStr);
    const host = url.hostname.replace('www.', '');

    // youtube.com/watch?v=ID
    if (host.includes('youtube.com') && url.searchParams.get('v')) {
      return url.searchParams.get('v');
    }

    // youtu.be/ID
    if (host === 'youtu.be' && url.pathname.length > 1) {
      return url.pathname.slice(1).split('/')[0];
    }

    // youtube.com/embed/ID or youtube.com/shorts/ID
    const pathMatch = url.pathname.match(/\/(embed|shorts|v)\/([a-zA-Z0-9_-]{11})/);
    if (pathMatch) {
      return pathMatch[2];
    }
  } catch (e) {
    // Not a URL
  }

  return null;
}

document.getElementById('openBtn').addEventListener('click', function() {
  const input = document.getElementById('videoUrl').value;
  const videoId = extractVideoId(input);
  const errorEl = document.getElementById('error');

  if (videoId) {
    errorEl.style.display = 'none';
    const url = `https://www.yout-ube.com/watch?v=${videoId}`;
    chrome.tabs.create({ url: url });
    window.close();
  } else {
    errorEl.style.display = 'block';
  }
});

// Allow Enter key to submit
document.getElementById('videoUrl').addEventListener('keydown', function(e) {
  if (e.key === 'Enter') {
    document.getElementById('openBtn').click();
  }
});

// Auto-focus the input
document.getElementById('videoUrl').focus();
