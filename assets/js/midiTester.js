var context = null;
var oscillator = null;

const synth = new Tone.Synth().toDestination();
const now = Tone.now();


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
    //context.suspend();
    synth.triggerRelease(now + 1)
}


function test(){
    //synth.triggerAttack("Bb", 0.5)
    // hertz = Tone.Frequency(38, "midi").toFrequency();
    // console.log(hertz)
    synth.triggerAttack("422", 0, 1);
}


function playSynth(freq){
    synth.triggerAttack(freq, 0, 1);
}


document.getElementById('testSound').addEventListener('click', test.bind());

// document.getElementById('lowG').addEventListener('click', playSound.bind(null, 422, 'square'));

// document.getElementById('lowA').addEventListener('click', playSound.bind(null, 475, 'square'));

// document.getElementById('B').addEventListener('click', playSound.bind(null, 534, 'square'));

// document.getElementById('C').addEventListener('click', playSound.bind(null, 594, 'square'));

// document.getElementById('D').addEventListener('click', playSound.bind(null, 641, 'square'));

// document.getElementById('E').addEventListener('click', playSound.bind(null, 713, 'square'));

// document.getElementById('F').addEventListener('click', playSound.bind(null, 792, 'square'));

// document.getElementById('G').addEventListener('click', playSound.bind(null, 855, 'square'));

// document.getElementById('A').addEventListener('click', playSound.bind(null, 950, 'square'));


//http://publish.uwo.ca/~emacphe3/pipes/acoustics/pipescale.html 

document.getElementById('lowG').addEventListener('click', playSynth.bind("422"));

document.getElementById('lowA').addEventListener('click', playSynth.bind("475"));

document.getElementById('B').addEventListener('click', playSynth.bind("534"));

document.getElementById('C').addEventListener('click', playSynth.bind("594"));

document.getElementById('D').addEventListener('click', playSynth.bind("641"));

document.getElementById('E').addEventListener('click', playSynth.bind("713"));

document.getElementById('F').addEventListener('click', playSynth.bind("792"));

document.getElementById('G').addEventListener('click', playSynth.bind("855"));

document.getElementById('A').addEventListener('click', playSynth.bind("950"));


document.getElementById('stop').addEventListener('click', stopSound);
