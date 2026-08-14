/* =========================================================
   GLOBAL VARIABLES
========================================================= */
let player = null;
let playerReady = false;
let currentSongIndex = 0;
let isPlaying = false;
let progressTimer = null;

/* =========================================================
   DOM ELEMENTS
========================================================= */
const clock = document.getElementById("clock");
const onlineCount = document.getElementById("onlineCount");

/* ------------------------- SONG INFORMATION ------------------------- */
const songTitle = document.getElementById("songTitle");
const songArtist = document.getElementById("songArtist");
const currentSongNumber = document.getElementById("currentSongNumber");
const totalSongs = document.getElementById("totalSongs");

/* ------------------------- PLAYER CONTROLS ------------------------- */
const playButton = document.getElementById("playButton");
const previousButton = document.getElementById("previousButton");
const nextButton = document.getElementById("nextButton");

/* ------------------------- PROGRESS ------------------------- */
const progressBar = document.getElementById("progressBar");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");

/* ------------------------- VOLUME ------------------------- */
const volumeBar = document.getElementById("volumeBar");
const volumeIcon = document.getElementById("volumeIcon");
const volumeValue = document.getElementById("volumeValue");

/* ------------------------- PANELS ------------------------- */
const playlistButton = document.getElementById("playlistButton");
const songsButton = document.getElementById("songsButton");
const playlistPanel = document.getElementById("playlistPanel");
const songsPanel = document.getElementById("songsPanel");
const closePlaylist = document.getElementById("closePlaylist");
const closeSongs = document.getElementById("closeSongs");
const playlistContainer = document.getElementById("playlistContainer");
const songsContainer = document.getElementById("songsContainer");
const songsPanelTitle = document.getElementById("songsPanelTitle"); // New Element

/* ------------------------- EXPERIENCE CONTROLS ------------------------- */
const rainToggle = document.getElementById("rainToggle");
const lightsToggle = document.getElementById("lightsToggle");
const themeToggle = document.getElementById("themeToggle");
const driveToggle = document.getElementById("driveToggle");
const rainLayer = document.getElementById("rainLayer");
const highwayLights = document.getElementById("highwayLights");
const musicVisualizer = document.getElementById("musicVisualizer");

/* =========================================================
   CHECK SONGS.JS
========================================================= */
function getSongs() {
    if (typeof songs !== "undefined" && Array.isArray(songs)) {
        return songs;
    }
    console.error("❌ songs.js load nahi hui ya songs array nahi hai.");
    return [];
}

const songCollection = getSongs();

if (songCollection.length > 0) {
    console.log(`✅ ${songCollection.length} songs loaded.`);
} else {
    console.error("❌ songs.js mein koi song nahi mila.");
}

/* =========================================================
   LIVE CLOCK
========================================================= */
function updateClock() {
    if (!clock) return;
    const now = new Date();
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    const period = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    clock.textContent = `${hours}:${minutes}:${seconds} ${period}`;
}
updateClock();
setInterval(updateClock, 1000);

/* =========================================================
   REAL LISTENER COUNT
========================================================= */
if (onlineCount) {
    onlineCount.textContent = "—";
}

/* =========================================================
   GET YOUTUBE VIDEO ID
========================================================= */
function getYouTubeVideoId(value) {
    if (!value) return "";
    const text = String(value).trim();
    if (/^[a-zA-Z0-9_-]{11}$/.test(text)) return text;
    try {
        const url = new URL(text);
        const videoParameter = url.searchParams.get("v");
        if (videoParameter && /^[a-zA-Z0-9_-]{11}$/.test(videoParameter)) return videoParameter;
        const parts = url.pathname.split("/").filter(Boolean);
        const embedIndex = parts.indexOf("embed");
        if (embedIndex !== -1 && parts[embedIndex + 1]) return parts[embedIndex + 1];
        if (url.hostname.includes("youtu.be") && parts[0]) return parts[0];
    } catch (error) {
        console.warn("YouTube URL parse nahi hui:", text);
    }
    const match = text.match(/(?:embed\/|watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    if (match) return match[1];
    return "";
}

/* =========================================================
   FORMAT TIME
========================================================= */
function formatTime(seconds) {
    if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60).toString().padStart(2, "0");
    return `${minutes}:${secs}`;
}

/* =========================================================
   UPDATE SONG INFORMATION
========================================================= */
function updateSongInformation() {
    const list = getSongs();
    if (!list.length) return;
    const song = list[currentSongIndex];
    if (!song) return;
    if (songTitle) songTitle.textContent = song.title || song.name || "Unknown Song";
    if (songArtist) songArtist.textContent = song.artist || song.singer || "Unknown Artist";
    if (currentSongNumber) currentSongNumber.textContent = String(currentSongIndex + 1).padStart(2, "0");
    if (totalSongs) totalSongs.textContent = list.length;
}

/* =========================================================
   CREATE SONG LIST (WITH CATEGORY FILTERING)
========================================================= */
function renderSongs(categoryFilter = 'all', title = 'All Songs') {
    const list = getSongs();
    if (!songsContainer) return;
    
    // Update Panel Title
    if (songsPanelTitle) {
        songsPanelTitle.innerText = title;
    }

    songsContainer.innerHTML = "";

    // Filter songs and keep their original global index intact
    const displaySongs = list.map((song, index) => ({ ...song, originalIndex: index }))
                             .filter(song => {
                                 if (categoryFilter === 'all') return true;
                                 return song.category && song.category.toLowerCase() === categoryFilter.toLowerCase();
                             });

    // If no songs found in this category
    if (displaySongs.length === 0) {
        songsContainer.innerHTML = `
            <div style="text-align:center; padding:30px 10px; color:#888;">
                <i class="fas fa-music" style="font-size:24px; margin-bottom:10px; color:#555;"></i>
                <p style="font-size:12px;">No songs found in this playlist yet.</p>
                <p style="font-size:10px; margin-top:5px;">Add <code style="color:#cf8937;">category: "${categoryFilter}"</code> to your songs.js</p>
            </div>`;
        return;
    }

    displaySongs.forEach((song, i) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "song-item";
        button.dataset.index = song.originalIndex; // Keeping original index to play correct song
        button.innerHTML = `
            <span class="song-number">${String(i + 1).padStart(2, "0")}</span>
            <span class="song-details">
                <strong>${escapeHTML(song.title || song.name || `Song ${song.originalIndex + 1}`)}</strong>
                <small>${escapeHTML(song.artist || song.singer || "Unknown Artist")}</small>
            </span>
        `;
        button.addEventListener("click", () => {
            loadSong(song.originalIndex, true);
        });
        songsContainer.appendChild(button);
    });
    
    updateActiveSong();
}

/* =========================================================
   CREATE PLAYLIST CATEGORIES 
========================================================= */
function renderPlaylist() {
    const playlistCategories = document.querySelectorAll('.playlist-item[data-playlist]');
    
    playlistCategories.forEach(item => {
        item.addEventListener('click', () => {
            // Remove active class from all
            playlistCategories.forEach(el => el.classList.remove('active'));
            // Add active class to clicked item
            item.classList.add('active');
            
            // Get Category and Name
            const selectedCategory = item.getAttribute('data-playlist'); // e.g. '90s', 'bhojpuri'
            const playlistName = item.querySelector('h3').innerText;
            
            // Render songs based on category and open Songs Panel
            renderSongs(selectedCategory, playlistName);
            
            // Close Playlist Panel and Open Songs Panel
            if (playlistPanel) playlistPanel.classList.remove("open");
            if (songsPanel) songsPanel.classList.add("open");
        });
    });
}

/* =========================================================
   ACTIVE SONG UI
========================================================= */
function updateActiveSong() {
    document.querySelectorAll(".songs-panel .song-item").forEach((item) => {
        const index = Number(item.dataset.index);
        item.classList.toggle("active", index === currentSongIndex);
    });
}

/* =========================================================
   ESCAPE HTML
========================================================= */
function escapeHTML(value) {
    const element = document.createElement("div");
    element.textContent = value ?? "";
    return element.innerHTML;
}

/* =========================================================
   YOUTUBE IFRAME API
========================================================= */
function createYouTubePlayer() {
    const list = getSongs();
    if (!list.length) {
        console.error("❌ Player create nahi hua: songs empty hain.");
        return;
    }
    if (typeof YT === "undefined" || !YT.Player) {
        console.warn("⏳ YouTube API abhi ready nahi hai...");
        return;
    }
    const firstSong = list[0];
    const firstVideoId = getYouTubeVideoId(firstSong.youtubeId || firstSong.videoId || firstSong.url);
    if (!firstVideoId) {
        console.error("❌ First song ka YouTube ID invalid hai:", firstSong);
        return;
    }

    player = new YT.Player("youtube-player", {
        videoId: firstVideoId,
        playerVars: {
            autoplay: 0,
            controls: 0,
            disablekb: 1,
            modestbranding: 1,
            rel: 0,
            playsinline: 1,
            origin: window.location.origin
        },
        events: {
            onReady: onPlayerReady,
            onStateChange: onPlayerStateChange,
            onError: onPlayerError
        }
    });
}

window.onYouTubeIframeAPIReady = function () {
    createYouTubePlayer();
};

/* =========================================================
   PLAYER READY
========================================================= */
function onPlayerReady(event) {
    playerReady = true;
    const savedVolume = getSavedVolume();
    event.target.setVolume(savedVolume);
    if (volumeBar) volumeBar.value = savedVolume;
    updateVolumeUI(savedVolume);
    loadSong(currentSongIndex, false);
    updatePlayButton();
}

function onPlayerError(event) {
    console.error("❌ YouTube Player Error Code:", event.data);
    isPlaying = false;
    updatePlayButton();
}

/* =========================================================
   LOAD SONG
========================================================= */
function loadSong(index, autoplay = false) {
    const list = getSongs();
    if (!list.length) return;
    if (index < 0 || index >= list.length) index = 0;
    currentSongIndex = index;
    const song = list[currentSongIndex];
    const value = song.youtubeId || song.videoId || song.url;
    const videoId = getYouTubeVideoId(value);
    if (!videoId) return;

    updateSongInformation();
    updateActiveSong();

    if (!playerReady || !player) return;

    if (progressBar) progressBar.value = 0;
    if (currentTime) currentTime.textContent = "0:00";
    if (totalTime) totalTime.textContent = "0:00";

    if (autoplay) {
        player.loadVideoById(videoId);
    } else {
        player.cueVideoById(videoId);
    }
}

/* =========================================================
   PLAY / PAUSE
========================================================= */
function togglePlayPause() {
    if (!playerReady || !player) return;
    const state = player.getPlayerState();
    if (state === YT.PlayerState.PLAYING) {
        player.pauseVideo();
    } else {
        player.playVideo();
    }
}

function updatePlayButton() {
    if (!playButton) return;
    if (isPlaying) {
        playButton.textContent = "❚❚";
    } else {
        playButton.textContent = "▶";
    }
}

/* =========================================================
   PREVIOUS / NEXT SONG
========================================================= */
function playPreviousSong() {
    const list = getSongs();
    if (!list.length) return;
    currentSongIndex = (currentSongIndex - 1 + list.length) % list.length;
    loadSong(currentSongIndex, true);
}

function playNextSong() {
    const list = getSongs();
    if (!list.length) return;
    currentSongIndex = (currentSongIndex + 1) % list.length;
    loadSong(currentSongIndex, true);
}

/* =========================================================
   YOUTUBE STATE CHANGE
========================================================= */
function onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.PLAYING) {
        isPlaying = true;
        updatePlayButton();
        setVisualizer(true);
        startProgressUpdater();
    } else if (event.data === YT.PlayerState.PAUSED) {
        isPlaying = false;
        updatePlayButton();
        setVisualizer(false);
        stopProgressUpdater();
    } else if (event.data === YT.PlayerState.ENDED) {
        isPlaying = false;
        updatePlayButton();
        setVisualizer(false);
        stopProgressUpdater();
        playNextSong();
    } else if (event.data === YT.PlayerState.CUED) {
        updateProgressOnce();
    }
}

/* =========================================================
   PROGRESS UPDATER
========================================================= */
function startProgressUpdater() {
    stopProgressUpdater();
    updateProgressOnce();
    progressTimer = setInterval(updateProgressOnce, 500);
}

function stopProgressUpdater() {
    if (progressTimer) {
        clearInterval(progressTimer);
        progressTimer = null;
    }
}

function updateProgressOnce() {
    if (!playerReady || !player) return;
    let duration = 0;
    let current = 0;
    try {
        duration = player.getDuration();
        current = player.getCurrentTime();
    } catch (error) { return; }
    
    if (!Number.isFinite(duration) || duration <= 0) return;
    const percent = Math.max(0, Math.min(100, (current / duration) * 100));

    if (currentTime) currentTime.textContent = formatTime(current);
    if (totalTime) totalTime.textContent = formatTime(duration);
    if (progressBar) progressBar.value = percent;
}

function seekSong(event) {
    if (!playerReady || !player) return;
    const duration = player.getDuration();
    if (!Number.isFinite(duration) || duration <= 0) return;
    const percent = Number(event.target.value);
    const time = duration * (percent / 100);
    player.seekTo(time, true);
}

/* =========================================================
   VOLUME
========================================================= */
function getSavedVolume() {
    const saved = localStorage.getItem("highwayRadioVolume");
    if (saved === null) return 80;
    const volume = Number(saved);
    if (!Number.isFinite(volume)) return 80;
    return Math.max(0, Math.min(100, volume));
}

function setVolume(value) {
    const volume = Math.max(0, Math.min(100, Number(value)));
    if (playerReady && player) player.setVolume(volume);
    localStorage.setItem("highwayRadioVolume", String(volume));
    updateVolumeUI(volume);
}

function updateVolumeUI(volume) {
    if (volumeBar) volumeBar.value = volume;
    if (volumeValue) volumeValue.textContent = `${Math.round(volume)}%`;
    if (volumeIcon) {
        if (volume === 0) volumeIcon.textContent = "🔇";
        else if (volume < 50) volumeIcon.textContent = "🔉";
        else volumeIcon.textContent = "🔊";
    }
}

function toggleMute() {
    if (!playerReady || !player) return;
    if (player.isMuted()) {
        player.unMute();
        const volume = getSavedVolume();
        player.setVolume(volume);
        updateVolumeUI(volume);
    } else {
        player.mute();
        if (volumeIcon) volumeIcon.textContent = "🔇";
    }
}

/* =========================================================
   PANELS NAVIGATION LOGIC
========================================================= */
function closeAllPanels() {
    if (playlistPanel) playlistPanel.classList.remove("open");
    if (songsPanel) songsPanel.classList.remove("open");
}

// "Playlists" Nav Button Click
if (playlistButton) {
    playlistButton.addEventListener("click", () => {
        if (songsPanel) songsPanel.classList.remove("open");
        if (playlistPanel) playlistPanel.classList.toggle("open");
    });
}

// "Songs" Nav Button Click (Resets to ALL songs)
if (songsButton) {
    songsButton.addEventListener("click", () => {
        renderSongs('all', 'All Songs'); // Load everything back
        if (playlistPanel) playlistPanel.classList.remove("open");
        if (songsPanel) songsPanel.classList.toggle("open");
    });
}

if (closePlaylist) {
    closePlaylist.addEventListener("click", () => playlistPanel?.classList.remove("open"));
}

if (closeSongs) {
    closeSongs.addEventListener("click", () => songsPanel?.classList.remove("open"));
}

/* =========================================================
   PLAYER BUTTON EVENTS
========================================================= */
if (playButton) playButton.addEventListener("click", togglePlayPause);
if (previousButton) previousButton.addEventListener("click", playPreviousSong);
if (nextButton) nextButton.addEventListener("click", playNextSong);
if (progressBar) progressBar.addEventListener("input", seekSong);
if (volumeBar) volumeBar.addEventListener("input", (event) => setVolume(event.target.value));

/* =========================================================
   KEYBOARD
========================================================= */
document.addEventListener("keydown", (event) => {
    const activeElement = document.activeElement;
    const tag = activeElement?.tagName;
    if (tag === "INPUT" || tag === "BUTTON" || tag === "TEXTAREA") return;
    if (event.code === "Space") {
        event.preventDefault();
        togglePlayPause();
    }
    if (event.code === "ArrowRight") playNextSong();
    if (event.code === "ArrowLeft") playPreviousSong();
});

/* =========================================================
   EXPERIENCE SETTINGS
========================================================= */
const EXPERIENCE_KEY = "highwayRadioExperience";
const defaultExperience = { rain: false, lights: true, night: true, drive: false };
let experienceSettings = { ...defaultExperience };

function loadExperienceSettings() {
    try {
        const saved = JSON.parse(localStorage.getItem(EXPERIENCE_KEY));
        if (saved && typeof saved === "object") experienceSettings = { ...defaultExperience, ...saved };
    } catch (error) { console.warn("Experience settings load nahi hui.", error); }
}

function saveExperienceSettings() {
    try { localStorage.setItem(EXPERIENCE_KEY, JSON.stringify(experienceSettings)); }
    catch (error) { console.warn("Experience settings save nahi hui.", error); }
}

function updateExperienceButton(button, enabled) {
    if (!button) return;
    button.classList.toggle("active", Boolean(enabled));
    button.setAttribute("aria-pressed", String(Boolean(enabled)));
}

/* =========================================================
   RAIN & LIGHTS & THEME
========================================================= */
function createRain() {
    if (!rainLayer) return;
    rainLayer.innerHTML = "";
    const count = window.innerWidth <= 700 ? 65 : 100;
    for (let i = 0; i < count; i++) {
        const drop = document.createElement("span");
        drop.className = "rain-drop";
        drop.style.left = `${Math.random() * 110 - 5}%`;
        drop.style.animationDuration = `${0.45 + Math.random() * 0.65}s`;
        drop.style.animationDelay = `${Math.random() * 1.5}s`;
        drop.style.opacity = `${0.18 + Math.random() * 0.45}`;
        drop.style.height = `${10 + Math.random() * 18}px`;
        rainLayer.appendChild(drop);
    }
}

function setRain(enabled) {
    experienceSettings.rain = Boolean(enabled);
    document.body.classList.toggle("rain-active", experienceSettings.rain);
    if (experienceSettings.rain) createRain();
    else if (rainLayer) rainLayer.innerHTML = "";
    updateExperienceButton(rainToggle, experienceSettings.rain);
    saveExperienceSettings();
}

function createHighwayLights() {
    if (!highwayLights) return;
    highwayLights.innerHTML = "";
    const count = window.innerWidth <= 700 ? 12 : 20;
    for (let i = 0; i < count; i++) {
        const light = document.createElement("span");
        light.className = "road-light";
        light.style.left = `${(i / (count - 1)) * 100}%`;
        light.style.animationDelay = `${i * 0.11}s`;
        highwayLights.appendChild(light);
    }
}

function setLights(enabled) {
    experienceSettings.lights = Boolean(enabled);
    document.body.classList.toggle("lights-off", !experienceSettings.lights);
    updateExperienceButton(lightsToggle, experienceSettings.lights);
    saveExperienceSettings();
}

function setNightMode(enabled) {
    experienceSettings.night = Boolean(enabled);
    document.body.classList.toggle("night-mode", experienceSettings.night);
    document.body.classList.toggle("day-mode", !experienceSettings.night);
    if (themeToggle) {
        themeToggle.innerHTML = experienceSettings.night ? "🌙 <span>Night</span>" : "☀️ <span>Day</span>";
        themeToggle.title = experienceSettings.night ? "Switch to Day Mode" : "Switch to Night Mode";
        themeToggle.setAttribute("aria-pressed", String(experienceSettings.night));
    }
    saveExperienceSettings();
}

/* =========================================================
   DRIVE MODE
========================================================= */
async function setDriveMode(enabled) {
    experienceSettings.drive = Boolean(enabled);
    document.body.classList.toggle("drive-mode", experienceSettings.drive);
    updateExperienceButton(driveToggle, experienceSettings.drive);
    saveExperienceSettings();
    try {
        if (experienceSettings.drive && !document.fullscreenElement && document.documentElement.requestFullscreen) {
            await document.documentElement.requestFullscreen();
        }
        if (!experienceSettings.drive && document.fullscreenElement && document.exitFullscreen) {
            await document.exitFullscreen();
        }
    } catch (error) { console.warn("Fullscreen activate nahi hua.", error); }
}

/* =========================================================
   VISUALIZER
========================================================= */
function setVisualizer(active) {
    if (!musicVisualizer) return;
    musicVisualizer.classList.toggle("playing", Boolean(active));
}

/* =========================================================
   EXPERIENCE EVENTS
========================================================= */
if (rainToggle) rainToggle.addEventListener("click", () => setRain(!experienceSettings.rain));
if (lightsToggle) lightsToggle.addEventListener("click", () => setLights(!experienceSettings.lights));
if (themeToggle) themeToggle.addEventListener("click", () => setNightMode(!experienceSettings.night));
if (driveToggle) driveToggle.addEventListener("click", () => setDriveMode(!experienceSettings.drive));

/* =========================================================
   RESIZE & FULLSCREEN
========================================================= */
window.addEventListener("resize", () => {
    if (experienceSettings.rain) createRain();
    createHighwayLights();
});

document.addEventListener("fullscreenchange", () => {
    if (!document.fullscreenElement && experienceSettings.drive) {
        experienceSettings.drive = false;
        document.body.classList.remove("drive-mode");
        updateExperienceButton(driveToggle, false);
        saveExperienceSettings();
    }
});

/* =========================================================
   APPLY SAVED EXPERIENCE & INITIALIZE
========================================================= */
function applyExperienceSettings() {
    setRain(experienceSettings.rain);
    setLights(experienceSettings.lights);
    setNightMode(experienceSettings.night);
    document.body.classList.toggle("drive-mode", experienceSettings.drive);
    updateExperienceButton(driveToggle, experienceSettings.drive);
}

function initializeHighwayRadio() {
    renderSongs();     // Initial load with all songs
    renderPlaylist();  // Category setup
    loadExperienceSettings();
    createHighwayLights();
    applyExperienceSettings();
    updateVolumeUI(getSavedVolume());
    updateSongInformation();
    console.log("🚚 HIGHWAY RADIO loaded successfully.");
}

initializeHighwayRadio();

if (window.YT && typeof YT.Player === "function" && !player) {
    createYouTubePlayer();
}