// DOM Elements
const songInfo = document.querySelector(".song-info");
const songTitle = document.querySelector(".song-title");
const artistName = document.querySelector(".artist");
const playPauseBtn = document.querySelector(".play-pause");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const shuffleBtn = document.querySelector(".shuffle");
const playlist = document.querySelector(".song-list");
const deleteBtn = document.querySelector(".delete");
const resetBtn = document.querySelector(".reset");

// Initial variables
let currentSongIndex = 0;
let isPlaying = false;

// Store original playlist
const originalPlaylist = Array.from(playlist.children).map(
  (song) => song.textContent
);

// Function to update song info
function updateSongInfo() {
  const song = playlist.children[currentSongIndex];
  songTitle.textContent = song.textContent;
  artistName.textContent = "Artist for " + song.textContent;
}

// Function to play the song
function playSong() {
  isPlaying = true;
  playPauseBtn.textContent = "Pause";
  playPauseBtn.setAttribute("aria-pressed", "true");
}

// Function to pause the song
function pauseSong() {
  isPlaying = false;
  playPauseBtn.textContent = "Play";
  playPauseBtn.setAttribute("aria-pressed", "false");
}

// Event Listeners for buttons
playPauseBtn.addEventListener("click", () => {
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

prevBtn.addEventListener("click", () => {
  currentSongIndex =
    (currentSongIndex + playlist.children.length - 1) %
    playlist.children.length;
  updateSongInfo();
});

nextBtn.addEventListener("click", () => {
  currentSongIndex = (currentSongIndex + 1) % playlist.children.length;
  updateSongInfo();
});

shuffleBtn.addEventListener("click", () => {
  shufflePlaylist();
});

// Shuffle function
function shufflePlaylist() {
  const shuffledSongs = Array.from(playlist.children);
  for (let i = shuffledSongs.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    playlist.appendChild(shuffledSongs[j]);
  }
  currentSongIndex = 0;
  updateSongInfo();
}

// Delete song functionality
deleteBtn.addEventListener("click", () => {
  if (playlist.children.length > 1) {
    playlist.children[currentSongIndex].remove();
    currentSongIndex =
      (currentSongIndex + playlist.children.length - 1) %
      playlist.children.length;
    updateSongInfo();
  }
});

// Reset playlist functionality
resetBtn.addEventListener("click", () => {
  // Clear the current playlist
  playlist.innerHTML = "";

  // Add back all the original songs
  originalPlaylist.forEach((songTitle) => {
    const li = document.createElement("li");
    li.textContent = songTitle;
    li.classList.add("song");
    playlist.appendChild(li);
  });

  // Reset current song index and update song info
  currentSongIndex = 0;
  updateSongInfo();
});

// Initialize song info on load
updateSongInfo();
