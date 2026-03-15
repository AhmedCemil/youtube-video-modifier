# YouTube Video Modifier

[English](README.md) | [Türkçe](README_TR.md)

Chrome extension that replaces YouTube's video player with a privacy-enhanced embed - no ads, no tracking cookies.

**Compatible with YouTube's new UI (2026)**

## Features

- **Privacy Mode** - Replace YouTube's player with a privacy-enhanced embed (via yout-ube.com)
- **Inline Swap** - Video swaps inside the page; comments, description and sidebar stay visible
- **Popup UI** - Paste any YouTube link from the toolbar icon to open it in privacy mode
- **Keyboard Shortcut Protection** - YouTube's shortcuts are blocked when privacy mode is active so they don't break the player
- **Ctrl+Click** - Open the video in a new tab on yout-ube.com
- **Resume Playback** - Continues from your current timestamp when switching to privacy mode

## Installation

### Method 1: Download from Releases

1. Go to the [Releases page](../../releases)
2. Download the `youtube-video-modifier-v1.0.zip` file
3. Extract the ZIP file to a folder on your computer
4. Open `chrome://extensions/` in Chrome
5. Enable **Developer mode** (top right toggle)
6. Click **Load unpacked**
7. Select the `youtube-video-modifier` folder

### Method 2: Clone Repository

1. Clone this repository or download as ZIP
2. Open `chrome://extensions/` in Chrome
3. Enable **Developer mode**
4. Click **Load unpacked**
5. Select the `youtube-video-modifier` folder

## Usage

### Shield Button (In-Player)
1. Go to any YouTube video
2. Click the **shield icon** in the player controls
3. The video player swaps to privacy mode
4. Click again to restore the normal player (page reload)

### Ctrl+Click
- **Ctrl+Click** the shield button to open the video on yout-ube.com in a **new tab**

### Popup (Toolbar Icon)
1. Click the extension icon in Chrome's toolbar
2. Paste any YouTube link (or just a video ID)
3. Press **Open** or **Enter**
4. The video opens on yout-ube.com in a new tab

## Files

- `youtube-video-modifier/manifest.json` - Extension configuration
- `youtube-video-modifier/content.js` - Player swap and keyboard handling
- `youtube-video-modifier/styles.css` - Button and iframe styling
- `youtube-video-modifier/popup.html` - Popup UI
- `youtube-video-modifier/popup.js` - Popup link parser

## Permissions

- `activeTab` - Access to the currently active YouTube tab

## Support

If you encounter any issues, please open an issue in this repository.
