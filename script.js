/* =========================================================
   HIGHWAY DHABA RADIO
   FINAL SCRIPT.JS
   ========================================================= */


/* =========================================================
   GLOBAL VARIABLES
   ========================================================= */

let player = null;
let playerReady = false;
let currentSongIndex = 0;
let progressInterval = null;


/* =========================================================
   DOM ELEMENTS
   ========================================================= */

const clock = document.getElementById("clock");
const onlineCount = document.getElementById("onlineCount");

const songTitle = document.getElementById("songTitle");
const songArtist = document.getElementById("songArtist");

const playButton = document.getElementById("playButton");
const previousButton = document.getElementById("previousButton");
const nextButton = document.getElementById("nextButton");

const progressBar = document.getElementById("progressBar");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");

const volumeBar = document.getElementById("volumeBar");
const volumeIcon = document.getElementById("volumeIcon");
const volumeValue = document.getElementById("volumeValue");

const playlistButton =
    document.getElementById("playlistButton");

const songsButton =
    document.getElementById("songsButton");

const playlistPanel =
    document.getElementById("playlistPanel");

const songsPanel =
    document.getElementById("songsPanel");

const closePlaylist =
    document.getElementById("closePlaylist");

const closeSongs =
    document.getElementById("closeSongs");

const playlistContainer =
    document.getElementById("playlistContainer");

const songsContainer =
    document.getElementById("songsContainer");


/* =========================================================
   CHECK SONGS.JS
   ========================================================= */

if (typeof songs === "undefined") {

    console.error(
        "❌ songs.js load nahi hui."
    );

} else if (!Array.isArray(songs)) {

    console.error(
        "❌ songs variable array nahi hai."
    );

} else if (songs.length === 0) {

    console.error(
        "❌ songs.js mein koi song nahi hai."
    );

} else {

    console.log(
        `✅ ${songs.length} songs loaded.`
    );

}


/* =========================================================
   CLOCK
   ========================================================= */

function updateClock() {

    if (!clock) return;

    const now = new Date();

    let hours = now.getHours();

    const minutes =
        String(now.getMinutes()).padStart(2, "0");

    const seconds =
        String(now.getSeconds()).padStart(2, "0");

    const period =
        hours >= 12 ? "PM" : "AM";

    hours = hours % 12 || 12;

    clock.textContent =
        `${hours}:${minutes}:${seconds} ${period}`;
}


updateClock();

setInterval(
    updateClock,
    1000
);


/* =========================================================
   LIVE USERS
   ========================================================= */

let onlineUsers =
    Math.floor(Math.random() * 100) + 1000;


if (onlineCount) {

    onlineCount.textContent =
        onlineUsers;

}


setInterval(
    () => {

        const change =
            Math.random() > 0.5
                ? 1
                : -1;

        onlineUsers += change;

        if (onlineUsers < 1000) {

            onlineUsers = 1000;

        }

        if (onlineCount) {

            onlineCount.textContent =
                onlineUsers;

        }

    },
    5000
);


/* =========================================================
   GET YOUTUBE VIDEO ID
   ========================================================= */

function getYouTubeVideoId(value) {

    if (!value) {

        return null;

    }


    const text =
        String(value).trim();


    /*
       Direct ID

       Example:

       G-O-I-D-T-B-054
    */

    if (
        !text.includes("youtube.com") &&
        !text.includes("youtu.be")
    ) {

        return text;

    }


    try {

        const url =
            new URL(text);


        /*
           EMBED URL

           https://www.youtube.com/embed/VIDEO_ID
        */

        if (
            url.pathname.startsWith("/embed/")
        ) {

            return url.pathname
                .replace("/embed/", "")
                .split("/")[0];

        }


        /*
           NORMAL YOUTUBE URL

           https://www.youtube.com/watch?v=VIDEO_ID
        */

        const videoId =
            url.searchParams.get("v");


        if (videoId) {

            return videoId;

        }


        /*
           SHORT YOUTUBE URL

           https://youtu.be/VIDEO_ID
        */

        if (
            url.hostname === "youtu.be"
        ) {

            return url.pathname
                .replace("/", "")
                .split("/")[0];

        }

    } catch (error) {

        console.error(
            "❌ Invalid YouTube URL:",
            text
        );

    }


    return null;

}


/* =========================================================
   YOUTUBE API READY
   ========================================================= */

function onYouTubeIframeAPIReady() {

    console.log(
        "✅ YouTube API loaded."
    );


    if (
        typeof songs === "undefined" ||
        !songs.length
    ) {

        console.error(
            "❌ Songs available nahi hain."
        );

        return;

    }


    const firstVideoId =
        getYouTubeVideoId(
            songs[0].youtubeId
        );


    if (!firstVideoId) {

        console.error(
            "❌ First song ki YouTube ID invalid hai."
        );

        return;

    }


    console.log(
        "🎵 First Video ID:",
        firstVideoId
    );


    /*
       CREATE YOUTUBE PLAYER
    */

    player =
        new YT.Player(
            "youtube-player",
            {

                width: "1",

                height: "1",

                videoId: firstVideoId,

                playerVars: {

                    autoplay: 0,

                    controls: 0,

                    disablekb: 1,

                    fs: 0,

                    iv_load_policy: 3,

                    modestbranding: 1,

                    playsinline: 1,

                    rel: 0

                },

                events: {

                    onReady:
                        onPlayerReady,

                    onStateChange:
                        onPlayerStateChange,

                    onError:
                        onPlayerError

                }

            }
        );

}


/* =========================================================
   PLAYER READY
   ========================================================= */

function onPlayerReady() {

    console.log(
        "✅ YouTube Player READY."
    );


    playerReady = true;


    /*
       DEFAULT VOLUME
    */

    player.setVolume(10);


    if (volumeBar) {

        volumeBar.value = 10;

    }


    if (volumeValue) {

        volumeValue.textContent =
            "10%";

    }


    if (volumeIcon) {

        volumeIcon.textContent =
            "🔊";

    }


    /*
       UPDATE FIRST SONG
    */

    updateSongInformation(
        currentSongIndex
    );


    /*
       RENDER PLAYLIST
    */

    renderSongs();


    /*
       START PROGRESS
    */

    startProgressTimer();

}


/* =========================================================
   LOAD SONG
   ========================================================= */

function loadSong(index) {

    /*
       PLAYER CHECK
    */

    if (
        !playerReady ||
        !player
    ) {

        console.warn(
            "⚠️ Player ready nahi hai."
        );

        return;

    }


    /*
       SONG CHECK
    */

    if (
        typeof songs === "undefined" ||
        !songs[index]
    ) {

        console.error(
            "❌ Song nahi mila:",
            index
        );

        return;

    }


    /*
       IMPORTANT:

       Current song ko properly define kar rahe hain.
    */

    const selectedSong =
        songs[index];


    /*
       YOUTUBE ID
    */

    const videoId =
        getYouTubeVideoId(
            selectedSong.youtubeId
        );


    if (!videoId) {

        console.error(
            "❌ Invalid YouTube ID:",
            selectedSong.youtubeId
        );

        return;

    }


    console.log(
        "▶ Loading:",
        selectedSong.title
    );


    console.log(
        "YouTube ID:",
        videoId
    );


    /*
       UPDATE INDEX
    */

    currentSongIndex =
        index;


    /*
       UPDATE UI
    */

    updateSongInformation(
        currentSongIndex
    );


    /*
       LOAD VIDEO
    */

    player.loadVideoById(
        videoId
    );


    /*
       UPDATE ACTIVE SONG
    */

    updateActiveSong();

}


/* =========================================================
   UPDATE SONG INFORMATION
   ========================================================= */

function updateSongInformation(index) {

    if (
        typeof songs === "undefined" ||
        !songs[index]
    ) {

        return;

    }


    const selectedSong =
        songs[index];


    if (songTitle) {

        songTitle.textContent =
            selectedSong.title;

    }


    if (songArtist) {

        songArtist.textContent =
            selectedSong.artist;

    }


    if (progressBar) {

        progressBar.value = 0;

    }


    if (currentTime) {

        currentTime.textContent =
            "0:00";

    }


    if (totalTime) {

        totalTime.textContent =
            "0:00";

    }

}


/* =========================================================
   PLAY / PAUSE
   ========================================================= */

if (playButton) {

    playButton.addEventListener(
        "click",
        () => {

            if (
                !playerReady ||
                !player
            ) {

                console.warn(
                    "⚠️ Player ready nahi hai."
                );

                return;

            }


            const state =
                player.getPlayerState();


            if (
                state ===
                YT.PlayerState.PLAYING
            ) {

                player.pauseVideo();

            } else {

                player.playVideo();

            }

        }
    );

}


/* =========================================================
   NEXT SONG
   ========================================================= */

if (nextButton) {

    nextButton.addEventListener(
        "click",
        () => {

            if (
                typeof songs === "undefined" ||
                songs.length === 0
            ) {

                return;

            }


            let nextIndex =
                currentSongIndex + 1;


            if (
                nextIndex >= songs.length
            ) {

                nextIndex = 0;

            }


            loadSong(nextIndex);

        }
    );

}


/* =========================================================
   PREVIOUS SONG
   ========================================================= */

if (previousButton) {

    previousButton.addEventListener(
        "click",
        () => {

            if (
                typeof songs === "undefined" ||
                songs.length === 0
            ) {

                return;

            }


            let previousIndex =
                currentSongIndex - 1;


            if (previousIndex < 0) {

                previousIndex =
                    songs.length - 1;

            }


            loadSong(previousIndex);

        }
    );

}


/* =========================================================
   PLAYER STATE
   ========================================================= */

function onPlayerStateChange(event) {

    /*
       PLAYING
    */

    if (
        event.data ===
        YT.PlayerState.PLAYING
    ) {

        if (playButton) {

            playButton.textContent =
                "⏸";

        }

    }


    /*
       PAUSED
    */

    else if (
        event.data ===
        YT.PlayerState.PAUSED
    ) {

        if (playButton) {

            playButton.textContent =
                "▶";

        }

    }


    /*
       ENDED
    */

    else if (
        event.data ===
        YT.PlayerState.ENDED
    ) {

        if (playButton) {

            playButton.textContent =
                "▶";

        }


        playNextSong();

    }

}


/* =========================================================
   AUTO NEXT
   ========================================================= */

function playNextSong() {

    if (
        typeof songs === "undefined" ||
        songs.length === 0
    ) {

        return;

    }


    let nextIndex =
        currentSongIndex + 1;


    if (
        nextIndex >= songs.length
    ) {

        nextIndex = 0;

    }


    loadSong(nextIndex);

}


/* =========================================================
   YOUTUBE ERROR
   ========================================================= */

function onPlayerError(event) {

    console.error(
        "❌ YouTube Player Error:",
        event.data
    );


    /*
       2 = Invalid parameter
       5 = HTML5 player error
       100 = Video unavailable
       101 = Embedding disabled
       150 = Embedding disabled
    */

    if (
        event.data === 101 ||
        event.data === 150
    ) {

        if (songArtist) {

            songArtist.textContent =
                "This video cannot be embedded.";

        }

        console.warn(
            "⚠️ Is video ki embedding disabled hai."
        );

        return;

    }


    if (
        event.data === 100
    ) {

        if (songArtist) {

            songArtist.textContent =
                "This video is unavailable.";

        }

        return;

    }

}


/* =========================================================
   PROGRESS TIMER
   ========================================================= */

function startProgressTimer() {

    if (progressInterval) {

        clearInterval(
            progressInterval
        );

    }


    progressInterval =
        setInterval(
            updateProgress,
            500
        );

}


/* =========================================================
   UPDATE PROGRESS
   ========================================================= */

function updateProgress() {

    if (
        !playerReady ||
        !player
    ) {

        return;

    }


    if (
        typeof player.getDuration !==
        "function"
    ) {

        return;

    }


    const duration =
        player.getDuration();


    const current =
        player.getCurrentTime();


    if (
        !duration ||
        duration <= 0
    ) {

        return;

    }


    const percentage =
        (
            current /
            duration
        ) * 100;


    if (progressBar) {

        progressBar.value =
            percentage;

    }


    if (currentTime) {

        currentTime.textContent =
            formatTime(current);

    }


    if (totalTime) {

        totalTime.textContent =
            formatTime(duration);

    }

}


/* =========================================================
   PROGRESS BAR SEEK
   ========================================================= */

if (progressBar) {

    progressBar.addEventListener(
        "input",
        () => {

            if (
                !playerReady ||
                !player
            ) {

                return;

            }


            const duration =
                player.getDuration();


            if (
                !duration ||
                duration <= 0
            ) {

                return;

            }


            const percentage =
                Number(
                    progressBar.value
                );


            const newTime =
                (
                    percentage /
                    100
                ) * duration;


            player.seekTo(
                newTime,
                true
            );

        }
    );

}


/* =========================================================
   VOLUME CONTROL
   ========================================================= */

if (volumeBar) {

    volumeBar.addEventListener(
        "input",
        () => {

            const volume =
                Number(
                    volumeBar.value
                );


            /*
               Set YouTube volume
            */

            if (
                playerReady &&
                player
            ) {

                player.setVolume(
                    volume
                );

            }


            /*
               Percentage
            */

            if (volumeValue) {

                volumeValue.textContent =
                    `${volume}%`;

            }


            /*
               Volume Icon
            */

            if (volumeIcon) {

                if (volume === 0) {

                    volumeIcon.textContent =
                        "🔇";

                } else if (volume < 50) {

                    volumeIcon.textContent =
                        "🔉";

                } else {

                    volumeIcon.textContent =
                        "🔊";

                }

            }

        }
    );

}


/* =========================================================
   MUTE / UNMUTE
   ========================================================= */

if (volumeIcon) {

    volumeIcon.addEventListener(
        "click",
        () => {

            if (
                !playerReady ||
                !player
            ) {

                return;

            }


            const currentVolume =
                player.getVolume();


            if (currentVolume > 0) {

                /*
                   Save current volume
                */

                volumeIcon.dataset.previousVolume =
                    currentVolume;


                player.setVolume(0);


                if (volumeBar) {

                    volumeBar.value = 0;

                }


                if (volumeValue) {

                    volumeValue.textContent =
                        "0%";

                }


                volumeIcon.textContent =
                    "🔇";

            } else {

                /*
                   Restore volume
                */

                let previousVolume =
                    Number(
                        volumeIcon.dataset.previousVolume
                    );


                if (
                    !previousVolume ||
                    previousVolume <= 0
                ) {

                    previousVolume = 10;

                }


                player.setVolume(
                    previousVolume
                );


                if (volumeBar) {

                    volumeBar.value =
                        previousVolume;

                }


                if (volumeValue) {

                    volumeValue.textContent =
                        `${previousVolume}%`;

                }


                volumeIcon.textContent =
                    previousVolume < 50
                        ? "🔉"
                        : "🔊";

            }

        }
    );

}


/* =========================================================
   FORMAT TIME
   ========================================================= */

function formatTime(seconds) {

    if (
        !seconds ||
        isNaN(seconds)
    ) {

        return "0:00";

    }


    seconds =
        Math.floor(seconds);


    const minutes =
        Math.floor(
            seconds / 60
        );


    const remainingSeconds =
        seconds % 60;


    return (
        `${minutes}:${String(
            remainingSeconds
        ).padStart(2, "0")}`
    );

}


/* =========================================================
   RENDER SONGS
   ========================================================= */

function renderSongs() {

    if (
        typeof songs === "undefined"
    ) {

        return;

    }


    if (songsContainer) {

        songsContainer.innerHTML = "";

    }


    if (playlistContainer) {

        playlistContainer.innerHTML = "";

    }


    songs.forEach(
        (selectedSong, index) => {

            /*
               SONGS PANEL
            */

            if (songsContainer) {

                const songItem =
                    createSongItem(
                        selectedSong,
                        index
                    );


                songsContainer.appendChild(
                    songItem
                );

            }


            /*
               PLAYLIST PANEL
            */

            if (playlistContainer) {

                const playlistItem =
                    createSongItem(
                        selectedSong,
                        index
                    );


                playlistContainer.appendChild(
                    playlistItem
                );

            }

        }
    );


    updateActiveSong();

}


/* =========================================================
   CREATE SONG ITEM
   ========================================================= */

function createSongItem(
    selectedSong,
    index
) {

    const item =
        document.createElement(
            "div"
        );


    item.className =
        "song-item";


    item.dataset.index =
        index;


    item.innerHTML = `

        <div class="song-number">
            ${String(index + 1).padStart(2, "0")}
        </div>

        <div class="song-details">

            <h3>
                ${escapeHTML(
                    selectedSong.title
                )}
            </h3>

            <p>
                ${escapeHTML(
                    selectedSong.artist
                )}
            </p>

        </div>

    `;


    /*
       CLICK
    */

    item.addEventListener(
        "click",
        () => {

            loadSong(index);

            closeAllPanels();

        }
    );


    return item;

}


/* =========================================================
   ACTIVE SONG
   ========================================================= */

function updateActiveSong() {

    const allItems =
        document.querySelectorAll(
            ".song-item"
        );


    allItems.forEach(
        item => {

            const index =
                Number(
                    item.dataset.index
                );


            if (
                index ===
                currentSongIndex
            ) {

                item.classList.add(
                    "active"
                );

            } else {

                item.classList.remove(
                    "active"
                );

            }

        }
    );

}


/* =========================================================
   PLAYLIST PANEL
   ========================================================= */

if (playlistButton) {

    playlistButton.addEventListener(
        "click",
        () => {

            if (songsPanel) {

                songsPanel.classList.remove(
                    "open"
                );

            }


            if (playlistPanel) {

                playlistPanel.classList.toggle(
                    "open"
                );

            }

        }
    );

}


/* =========================================================
   SONGS PANEL
   ========================================================= */

if (songsButton) {

    songsButton.addEventListener(
        "click",
        () => {

            if (playlistPanel) {

                playlistPanel.classList.remove(
                    "open"
                );

            }


            if (songsPanel) {

                songsPanel.classList.toggle(
                    "open"
                );

            }

        }
    );

}


/* =========================================================
   CLOSE PLAYLIST
   ========================================================= */

if (closePlaylist) {

    closePlaylist.addEventListener(
        "click",
        () => {

            if (playlistPanel) {

                playlistPanel.classList.remove(
                    "open"
                );

            }

        }
    );

}


/* =========================================================
   CLOSE SONGS
   ========================================================= */

if (closeSongs) {

    closeSongs.addEventListener(
        "click",
        () => {

            if (songsPanel) {

                songsPanel.classList.remove(
                    "open"
                );

            }

        }
    );

}


/* =========================================================
   CLOSE ALL PANELS
   ========================================================= */

function closeAllPanels() {

    if (playlistPanel) {

        playlistPanel.classList.remove(
            "open"
        );

    }


    if (songsPanel) {

        songsPanel.classList.remove(
            "open"
        );

    }

}


/* =========================================================
   ESCAPE HTML
   ========================================================= */

function escapeHTML(text) {

    const element =
        document.createElement(
            "div"
        );


    element.textContent =
        text;


    return element.innerHTML;

}


/* =========================================================
   FINAL LOG
   ========================================================= */

console.log(
    "🚚 HIGHWAY RADIO loaded successfully."
);