📻 Highway Radio - Best Songs Vibe on Highway 🚚

![Project Status](https://img.shields.io/badge/Status-Completed-success)
![Tech Stack](https://img.shields.io/badge/Tech-HTML%20%7C%20CSS%20%7C%20JS-orange)

A highly interactive, responsive, and immersive web-based Lo-Fi music player. Designed to recreate the nostalgic feeling of long drives on Indian highways, stopping at a 90s Dhaba, and listening to classic hits. 

## ✨ Features

* **Dynamic Environments:** Toggle between Day/Night modes and turn Highway/Dhaba Lights On/Off. The background images seamlessly swap for both Desktop and Mobile views.
* **Immersive 3D Parallax Rain:** A realistic rain effect with depth (Foreground, Midground, Background) and ground-splash animations.
* **Categorized Playlists:** Side-panel navigation with dedicated sections for 90s Evergreen, 2000s Superhits, Punjabi Swag, Bhojpuri Tadka, and Haryanvi Hits.
* **Custom Audio Player:** Fully functional custom UI (Play/Pause, Next/Prev, Seek Bar, Volume Control) powered stealthily by the YouTube IFrame API.
* **App-like Experience:** Completely hidden browser scrollbars for a clean look, complete with a "Drive Mode" (Fullscreen API) for distraction-free listening.
* **Live Ambience:** Features a real-time local clock and a simulated live listener count that fluctuates dynamically.
* **Music Visualizer:** Bouncing animated EQ bars that sync with the play/pause state.

## 🛠️ Tech Stack

* **HTML5:** Semantic structure and layout.
* **CSS3:** Advanced styling, CSS Variables, Flexbox/Grid, Keyframe Animations, and Media Queries for full mobile responsiveness.
* **Vanilla JavaScript:** DOM manipulation, Event handling, and seamless integration with the YouTube IFrame API.

## 📂 Project Structure

text
📁 Highway-Radio
├── 📄 index.html      # Main HTML file
├── 📄 style.css       # All styles and responsive media queries
├── 📄 script.js       # Core logic, UI interactions, and YouTube API setup
├── 📄 songs.js        # Data file containing the array of song objects
└── 📁 images/         # (Add your .webp background images here)
🚀 How to Run Locally
Clone or download this repository.

Open the folder in your code editor (e.g., Visual Studio Code).

Open index.html using the Live Server extension to prevent any local CORS issues with the YouTube API.

Enjoy the drive! 🚗

🎵 How to Add Songs (songs.js)
To add new songs to the player, open the songs.js file and add a new object to the array. Ensure you include the correct category so it appears in the right playlist panel.

JavaScript
const songs = [
    { 
        title: "Tu Cheez Badi Hai", 
        artist: "Udit Narayan", 
        youtubeId: "YOUTUBE_VIDEO_ID", // 11-character ID
        category: "90s"                // Matches data-playlist attribute in HTML
    },
    { 
        title: "Brown Munde", 
        artist: "AP Dhillon", 
        youtubeId: "YOUTUBE_VIDEO_ID", 
        category: "punjabi" 
    }
];
Supported Categories: 90s, 2000s, latest, punjabi, bhojpuri, haryanvi.

👨‍💻 Author
Kumar Mayank

Front-End Web Developer based in Delhi.

Passionate about creating interactive user experiences and clean web designs.
