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
  audio.src = `/music/${song}.wav`;
  cover.src = `/images/${song}.${song === "Aoge-ba-Totoshi" ? "jpg" : "png"}`;
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

// 曲を前に再生
function prevSong() {
  songIndex--;

  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }

  loadSong(songs[songIndex]);

  audio.addEventListener("canplay", playSong, { once: true });
}

// 曲を次に再生
function nextSong() {
  songIndex++;

  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }

  loadSong(songs[songIndex]);

  audio.addEventListener("canplay", playSong, { once: true });
}

// 進行状況を更新
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

// 進行状況をクリックでセット
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
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

// 曲を変更
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);

// 曲の時間を更新
audio.addEventListener("timeupdate", updateProgress);

// プログレスバーをクリック
progressContainer.addEventListener("click", setProgress);

// 曲の終わり
audio.addEventListener("ended", nextSong);
