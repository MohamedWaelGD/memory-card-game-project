const CROWD_CHEER = "/assets/audio/crowd-cheer.mp3";
const FIREWORKS = "/assets/audio/fireworks.mp3";
const SUCCESS = "/assets/audio/success.mp3";
const ERROR = "/assets/audio/error.mp3";
const CLICK = "/assets/audio/click.mp3";

function playCrowdCheerAudio() {
    new Audio(CROWD_CHEER).play();
}

function playFireworksAudio() {
    new Audio(FIREWORKS).play();
}

function playSuccessAudio() {
    new Audio(SUCCESS).play();
}

function playErrorAudio() {
    new Audio(ERROR).play();
}

function playClickAudio() {
    new Audio(CLICK).play();
}