//playlist
const SONGS = [
  {
    name: "We used To Dance",
    src: "./music/HoliznaCC0 - We used To Dance.mp3",
  },
  {
    name: "Waves",
    src: "./music/HoliznaCC0 - Waves.mp3",
  },
  {
    name: "Tunez",
    src: "./music/HoliznaCC0 - Tunez.mp3",
  },
  {
    name: "There Ain't Nothin",
    src: "./music/HoliznaCC0 - There Ain't Nothin.mp3",
  },
  {
    name: "Night Life",
    src: "./music/HoliznaCC0 - Night Life.mp3",
  },
  {
    name: "Morning Coffee",
    src: "./music/HoliznaCC0 - Morning Coffee.mp3",
  },
  {
    name: "Machines With Feelings",
    src: "./music/HoliznaCC0 - Machines With Feelings.mp3",
  },
  {
    name: "Lost In Space",
    src: "./music/HoliznaCC0 - Lost In Space.mp3",
  },
  {
    name: "Exploring Tomorrow Part 1",
    src: "./music/HoliznaCC0 - Exploring Tomorrow Part 1.mp3",
  },
  {
    name: "Everything You Ever Dreamed.",
    src: "./music/HoliznaCC0 - Everything You Ever Dreamed..mp3",
  },
];

const playlist = new DoublyLinkedList();
SONGS.forEach((song) => playlist.append(song.name, song.src));

//state
let isPlaying = false;

//needed elements
const nowPlayingEl = document.getElementById("nowPlaying");
const playlistEl = document.getElementById("playlist");
const prevBtn = document.getElementById("prevBtn");
const playBtn = document.getElementById("playBtn");
const nextBtn = document.getElementById("nextBtn");
const music = document.getElementById("music");
const repeat = document.getElementById("reBtn");
const reSpin = document.getElementById("reSpin");

// redraws everything from the current state
function render() {
  if (playlist.size === 0) {
    playlistEl.innerHTML = /*html*/ `<div>No Songs</div>`;
    return null;
  }
  const title = playlist.getCurrent();
  if (title === null) {
    nowPlayingEl.text = "Playlist is Empty";
    playBtn.disabled = true;
    return;
  }
  nowPlayingEl.textContent = `${isPlaying ? "Playing" : "Paused"}: ${title}`;

  playBtn.textContent = isPlaying ? "⏸" : "▶";
  if (isPlaying === true) {
    music.play();
  } else {
    music.pause();
  }
  renderPlaylist();
}

/* Bonus: draw the whole list as pills and highlight the cursor.
   Walk node by node from playlist.head and compare each node to
   playlist.current (compare the NODES, not the titles). */
function renderPlaylist() {
  playlistEl.innerHTML = "";
  playlist.toArray().forEach((song) => {
    let btns;
    if (song.node == playlist.head) {
      btns = /*html*/ `<div> <button type='button' class="down" data-action='move-down'>▼</button></div>`;
    } else if (song.node == playlist.tail) {
      btns = /*html*/ `<div> <button type='button' class='up' data-action='move-up'>▲</button></div>`;
    } else {
      bts = btns = /*html*/ `
      <div>
        <button type='button' class='up' data-action='move-up'>
          ▲
        </button>
        <button type='button' class="down" data-action='move-down'>
          ▼
        </button>
      </div>`;
    }
    let li = document.createElement("li");
    li.innerHTML = /*html*/ `
      <p>${song.title}</p>
      <div>
        ${btns}
        <button class='delBtn' data-action="delete">✖</button>
      </div>
    `;
    li.data = song.title;
    if (song.isCurrent === true) {
      li.classList.add("now-playing");
    }
    playlistEl.append(li);
  });
}

//Buttons change state, then call render()
prevBtn.addEventListener("click", () => {
  if (music.currentTime >= 2) {
    music.currentTime = 0;
    return;
  }
  playlist.movePrev();
  music.src = playlist.current.src;
  isPlaying = true;
  render();
});

nextBtn.addEventListener("click", () => {
  playlist.moveNext();
  music.src = playlist.current.src;
  isPlaying = true;
  render();
});

playBtn.addEventListener("click", () => {
  isPlaying = isPlaying ? false : true;
  render();
});

document.addEventListener("keydown", (event) => {
  if (event.key === " " && document.activeElement.tagName !== "BUTTON") {
    event.preventDefault();
    playBtn.click();
  }
});

let rotated = 0;
repeat.addEventListener("click", () => {
  music.loop = music.loop ? false : true;
  rotated -= 180;
  reSpin.style.transform = `rotate(${rotated}deg)`;
  repeat.classList.toggle("repeatBtn");
  render();
});

playlistEl.addEventListener("click", (event) => {
  const li = event.target.closest("li");
  if (!li || !playlistEl.contains(li)) return;

  const foundSong = playlist
    .toArray()
    .find((song) => song.title === li.data)?.node;
  console.log(foundSong);
  if (!foundSong) return;

  const btn = event.target.closest("button")?.dataset.action;
  if (btn) console.log(btn);

  if (btn === "move-up") {
    playlist.moveUp(foundSong);
    render();
    return;
  }
  if (btn === "move-down") {
    playlist.moveDown(foundSong);
    render();
    return;
  }
  if (btn === "delete") {
    playlist.delete(foundSong);
    music.src = playlist.current.src;
    render();
    return;
  }

  playlist.current = foundSong;
  music.src = foundSong.src;
  isPlaying = true;
  render();
});

music.addEventListener("ended", () => {
  if (!music.loop) {
    playlist.moveNext();
    music.src = playlist.current.src;
    isPlaying = true;
    render();
  }
});

window.playlist = playlist;
music.src = playlist.current.src;
render();
renderPlaylist();
