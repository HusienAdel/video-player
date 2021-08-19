const video = document.querySelector('video');
const progressRange = document.querySelector('.progress-range');
const progressbar = document.querySelector('.progress-bar');
const playBtn = document.querySelector('#play-btn');
const volumeIcon = document.querySelector('#volume-icon');
const volumeRange = document.querySelector('.volume-range');
const volumebar = document.querySelector('.volume-bar');
const currentTime = document.querySelector('.time-elapsed');
const duration = document.querySelector('.time-duration');
const fullscreenBtn = document.querySelector('.fullscreen');
const playerSpeed = document.querySelector('.player-speed');




function showPlayIcon() {
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'play');
}

// Play & Pause ----------------------------------- //
function togglePlay() {
    if (video.paused) {
        video.play();
        playBtn.classList.replace('fa-play', 'fa-pause');
        playBtn.setAttribute('title', 'pause');

    } else {
        video.pause();
        showPlayIcon();



    }
}









// Progress Bar ---------------------------------- //

// calculate display format
function displayTime(time) {

    let minutes = Math.floor(time / 60);

    let seconds = Math.floor(time % 60);

    if (seconds < 10) {
        seconds = `${seconds}`
    }

    seconds < 10 ? seconds = `0${seconds}` : false;
    minutes < 10 ? minutes = `0${minutes}` : false;

    return `${minutes}:${seconds}`;

}


function updateProgress() {

    const durationT = video.duration;
    const currentTimeT = video.currentTime;


    progressbar.style.width = `${(currentTimeT / durationT)*100}%`;

    currentTime.textContent = `${displayTime(currentTimeT)} /`;
    duration.textContent = `${displayTime(durationT)}`;







}


function setProgress(e) {
    const curr = e.offsetX;
    const width = progressRange.offsetWidth;
    const currPositionParcent = curr / width;
    progressbar.style.width = `${currPositionParcent*100}%`;


    video.currentTime = currPositionParcent * video.duration;

}





// Volume Controls --------------------------- //
function changeVolume(e) {
    const cur = e.offsetX;

    volumebar.style.width = `${(cur/volumeRange.offsetWidth)*100}%`;



    // change colume icons when muted
    video.volume = `${cur/volumeRange.offsetWidth}`
    if (video.volume < 0.1) {
        volumeIcon.classList.replace('fa-volume-up', 'fa-volume-mute');
        video.muted = true;

    }
    if (video.volume > 0.1) {
        volumeIcon.classList.replace('fa-volume-mute', 'fa-volume-up');
        video.muted = false;

    }



}

function muteVolume(e) {
    if (video.muted) {
        video.muted = false;
        e.target.classList.replace('fa-volume-mute', 'fa-volume-up')


    } else {
        video.muted = true;

        e.target.classList.replace('fa-volume-up', 'fa-volume-mute')

    }

}


// Change Playback Speed -------------------- //



// Fullscreen ------------------------------- //













playBtn.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);

video.addEventListener('ended', showPlayIcon);


video.addEventListener('timeupdate', updateProgress);
video.addEventListener('canplay', updateProgress)

progressRange.addEventListener('click', setProgress);
volumeRange.addEventListener('click', changeVolume);

volumeIcon.addEventListener('click', muteVolume)


playerSpeed.addEventListener('change', () => {
    const choseSpeed = playerSpeed.value;

    video.playbackRate = choseSpeed;
})