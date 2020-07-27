


var context = null;
var oscillator = null;
function getOrCreateContext() {
    if (!context) {
        context = new AudioContext();
        oscillator = context.createOscillator();
        oscillator.connect(context.destination);
    }
    return context;

}

var isStarted = false;
function playSound(frequency, type) {
    getOrCreateContext();
    oscillator.frequency.setTargetAtTime(frequency, context.currentTime, 0);
    if (!isStarted) {
        oscillator.start(0);
        isStarted = true;
    } else {
        context.resume();
    }
}

function stopSound() {
    context.suspend();
}



document.getElementById('lowG').addEventListener('click', playSound.bind(null, 422, 'square'));

document.getElementById('lowA').addEventListener('click', playSound.bind(null, 475, 'square'));

document.getElementById('B').addEventListener('click', playSound.bind(null, 534, 'square'));

document.getElementById('C').addEventListener('click', playSound.bind(null, 594, 'square'));

document.getElementById('D').addEventListener('click', playSound.bind(null, 641, 'square'));

document.getElementById('E').addEventListener('click', playSound.bind(null, 713, 'square'));

document.getElementById('F').addEventListener('click', playSound.bind(null, 792, 'square'));

document.getElementById('G').addEventListener('click', playSound.bind(null, 855, 'square'));

document.getElementById('A').addEventListener('click', playSound.bind(null, 950, 'square'));

document.getElementById('stop').addEventListener('click', stopSound);
