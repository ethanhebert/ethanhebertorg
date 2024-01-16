// all music tracks and their associated data
let tracks = [
    {
        name: "battleship",
        audio: document.querySelector("#battleshipAudio"),
        text: document.querySelector("#battleshipText"),
        playText: `<span onclick="cueAudio('battleship')">Raspberry<br>Pi<br>Battleship<br>[<span class="material-icons">play_arrow</span>]</span>`,
        pauseText: `<span onclick="cueAudio('battleship')">Raspberry<br>Pi<br>Battleship<br>[<span class="material-icons">pause</span>]</span>`,
        playing: 0
    },
    {
        name: "rizz",
        audio: document.querySelector("#rizzAudio"),
        text: document.querySelector("#rizzText"),
        playText: `<span onclick="cueAudio('rizz')">Rizz<br>Chrenzema<br>[<span class="material-icons">play_arrow</span>]</span>`,
        pauseText: `<span onclick="cueAudio('rizz')">Rizz<br>Chrenzema<br>[<span class="material-icons">pause</span>]</span>`,
        playing: 0
    },
    {
        name: "blur",
        audio: document.querySelector("#blurAudio"),
        text: document.querySelector("#blurText"),
        playText: `<span onclick="cueAudio('blur')">A<br>Blur&ensp;&emsp;<br>[<span class="material-icons">play_arrow</span>]</span>`,
        pauseText: `<span onclick="cueAudio('blur')">A<br>Blur&ensp;&emsp;<br>[<span class="material-icons">pause</span>]</span>`,
        playing: 0
    },
    {
        name: "jungle",
        audio: document.querySelector("#jungleAudio"),
        text: document.querySelector("#jungleText"),
        playText: `<span onclick="cueAudio('jungle')">Jungle<br>Jive<br>[<span class="material-icons">play_arrow</span>]</span>`,
        pauseText: `<span onclick="cueAudio('jungle')">Jungle<br>Jive<br>[<span class="material-icons">pause</span>]</span>`,
        playing: 0
    }
];

// start/pause a song
function cueAudio(trackName) {
    let index = tracks.findIndex(obj => obj.name==trackName);
    let track = tracks[index];
    if (!track.playing) {
        track.audio.play();
        track.audio.loop = true;
        track.text.innerHTML = track.pauseText;
        track.playing = 1;
    }
    else {
        track.audio.pause();
        track.text.innerHTML = track.playText;
        track.playing = 0;
    }
}