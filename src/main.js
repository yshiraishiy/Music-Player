const musicContainer = document.getElementById("music-container");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

const audio = document.getElementById("audio");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const title = document.getElementById("title");
const cover = document.getElementById("cover");

// 曲のタイトル
const songs = ["Aoge-ba-Totoshi", "Kintaro", "Usagi-to-Kame"];

// 曲を追跡
let songIndex = 2;

// 曲の詳細をDOMに初期化
loadSong(songs[songIndex]);

// 曲の詳細を更新
function loadSong(song) {
  title.innerHTML = song;
  audio.src = `music/${song}.wav`;
  cover.src = `images/${song}.${song === "Aoge-ba-Totoshi" ? "jpg" : "png"}`;
}

// 曲を再生
function playSong() {
  musicContainer.classList.add("play");
  playBtn.querySelector("i.fa-solid").classList.remove("fa-play");
  playBtn.querySelector("i.fa-solid").classList.add("fa-pause");

  audio.play();
}

// 曲を停止
function pauseSong() {
  musicContainer.classList.remove("play");
  playBtn.querySelector("i.fa-solid").classList.add("fa-play");
  playBtn.querySelector("i.fa-solid").classList.remove("fa-pause");

  audio.pause();
}

// イベントリスナー
playBtn.addEventListener("click", () => {
  const isPlaying = musicContainer.classList.contains("play");

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});
