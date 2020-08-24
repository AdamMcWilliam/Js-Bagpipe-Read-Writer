//Testing



function getCursorPosition(canvas, event) {
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    console.log("x: " + x + " y: " + y)
}

const canvas = document.querySelector('canvas');
canvas.addEventListener('mousedown', function (e) {
    getCursorPosition(canvas, e)
})

//Globals
var noteX = 0;
var yMod = 1;
var requestId;
var time = 0;
var testPixel = document.getElementById('testPixel');
var pixelPlay = 0;





// function getImages() {

//     var c = document.getElementById("sheetCanvas");
//     var ctx = c.getContext("2d");

//     var imgData = ctx.getImageData(59, 87, 1480, 140);
//     console.log(imgData);
//     ctx.putImageData(imgData, 28, 769);

// }


//Load image into canvas

var imageLoader = document.getElementById('imageLoader');
imageLoader.addEventListener('change', handleImage, false);

var ctx = canvas.getContext('2d');


function handleImage(e) {
    var reader = new FileReader();
    reader.onload = function (event) {
        var img = new Image();
        img.onload = function () {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
        }
        img.src = event.target.result;
    }
    reader.readAsDataURL(e.target.files[0]);
}



//Audio
function noteHit(ctx, x, y) {
    var noteNames = ['lowG', 'lowA', 'B', 'C', 'D', 'E', 'F', 'highG', 'highA'];
    var noteFrequencys = ['422', '475', '534', '594', '641', '713', '792', '855', '950'];
    var noteYOnHitDetector = [88, 78, 68, 58, 48, 38, 28, 18, 8];


    for (var n = 0; n <= 8; n++) {
        //get RGBA of every note pixel
        //console.log(x);
        //console.log(y);
        
        pixel = ctx.getImageData(x, y + noteYOnHitDetector[n], 1, 1);
        //visiualization
        ctx.drawImage(testPixel, x, y + noteYOnHitDetector[n]);

        R = pixel.data[0];
        G = pixel.data[1];
        B = pixel.data[2];
        A = pixel.data[3];

        //check for black
        if (R == 0 && G == 0 && B == 0 && A == 255) {
            console.log("note Name: "+noteNames[n]);
            console.log(pixel.data);

            //only play every 3rd pixel (how many times it hits the black of the note)
            pixelPlay +=1;
            if(pixelPlay == 1 ){
                playSound(noteFrequencys[n]);
            }
            if(pixelPlay == 3){
                pixelPlay = 0;
            }
            
            //playSound(noteFrequencys[n], 'square');
        }
    }
}

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
// function playSound(frequency, type) {
//     getOrCreateContext();
//     oscillator.frequency.setTargetAtTime(frequency, context.currentTime, 0);
//     if (!isStarted) {
//         oscillator.start(0);
//         isStarted = true;
//     } else {
//         context.resume();
//     }
// }

function playSound(frequency) {
    console.log("playSound");
    //getOrCreateContext();
    //oscillator.frequency.setTargetAtTime(frequency, context.currentTime, 0);
        synth.triggerAttackRelease(frequency, "10hz", now + time);
         //add time for every note hit
        console.log("now: " + time);
        time += 0.2;
    } 

function stopSound() {
    synth.triggerRelease(now);
    //context.suspend();
}




//Menus
function tabChange(clickedTab) {
    var selectedTab = document.getElementById(clickedTab);
    selectedTab.style.display = "block";

    var tabs = ["basicTabPanel", "structureTabPanel", "embelishmentsTabPanel"];
    var elm;

    for (i = 0; i <= tabs.length; i++) {
        if (tabs[i] != clickedTab) {
            //console.log(tabs[i]);
            elm = document.getElementById(tabs[i]);
            elm.style.display = "none";
        }
    }
}



//resetGlobals
function resetX() {
    noteX = 0
    console.log("noteX: " + noteX);
    return noteX;
}

function closeModal() {
    var modal = document.getElementById("setupModal");
    modal.style.display = "none";
}

//New Button
function newSetup() {
    var beatingsArray = ['2/2', '2/4', '3/2', '3/4', '3/8', '4/2', '4/4', '4/8', '6/4', '6/8', '9/4', '9/8', '12/4', '12/8'];
    var typesArray = ['March', 'Slow March', 'Slow Air', 'Jig', 'Strathspey', 'Reel', 'Retreat', 'Hornpipe', 'Ceol Mor', 'Misc'];

    //pop modal and fill in data
    var modal = document.getElementById("setupModal");

    modal.style.display = "block";

    var closeSpan = document.getElementsByClassName("close")[0];

    closeSpan.addEventListener("click", closeModal.bind());

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    //add beatings and types to selects
    var beatingsSelect = document.getElementById("beatings");

    for (var b = 0; b < beatingsArray.length; b++) {
        var option = document.createElement("option");
        option.value = "" + b;
        option.text = "" + beatingsArray[b];
        beatingsSelect.add(option, null);
    }

    var typesSelect = document.getElementById("types");

    for (var t = 0; t < typesArray.length; t++) {
        var option = document.createElement("option");
        option.value = "" + t;
        option.text = "" + typesArray[t];
        typesSelect.add(option, null);
    }

    //buttons
    var acceptBtn = document.getElementById("acceptBtn");
    var cancelBtn = document.getElementById("cancelBtn");

    acceptBtn.addEventListener("click", newSheet.bind());
    cancelBtn.addEventListener("click", closeModal.bind());
}

function newSheet() {

    //close setup Modal
    var modal = document.getElementById("setupModal");
    modal.style.display = "none";

    var c = document.getElementById("sheetCanvas");

    c.width = 1500;
    c.height = 900;

    var ctx = c.getContext("2d");

    //clear first
    ctx.clearRect(0, 0, c.width, c.height);
    //rest notesX
    resetX()


    ctx.lineWidth = 2;

    //lines
    //Starting X
    var x = 25;
    //Starting Y
    var y = 120;
    var lineLength = 1480;

    for (var j = 0; j <= 3; j++) {

        for (var i = 0; i <= 4; i++) {

            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(lineLength, y);
            ctx.stroke();
            ctx.closePath();

            //line spacing
            y += 20;
        }
        //spacing between line sections
        y += 80;
    }

    //bars
    //start at end of line X and work backwards
    var x = lineLength;
    var y1 = 120;
    var y2 = 200;

    for (var j = 0; j <= 3; j++) {

        for (var i = 0; i <= 3; i++) {

            ctx.beginPath();
            ctx.moveTo(x, y1);
            ctx.lineTo(x, y2);
            ctx.strokeStyle = "#FF0000";
            ctx.stroke();
            ctx.closePath();

            //space between bars
            x -= 400;

        }
        x = lineLength;
        y1 += 180;
        y2 += 180;
    }

    drawing = new Image();
    drawing.src = "assets/images/Stave.png";
    drawing.onload = function () {
        ctx.drawImage(drawing, 30, 120, 30, 72);
    }


}


function getNoteX() {
    console.log("noteX: " + noteX);
    return noteX += 80;
}

function placeNote(note) {

    var c = document.getElementById("sheetCanvas");
    var ctx = c.getContext("2d");

    var noteX = getNoteX();

    var noteY;

    if (noteX >= 1500) {
        //reset X
        resetX();
        yMod += 180;
    }

    switch (note) {
        case "lowG":
            noteY = 172;
            break;
        case "lowA":
            noteY = 162;
            break;
        case "b":
            noteY = 152;
            break;
        case "c":
            noteY = 142;
            break;
        case "d":
            noteY = 132;
            break;
        case "e":
            noteY = 122;
            break;
        case "f":
            noteY = 112;
            break;
        case "highG":
            noteY = 102;
            break;
        case "highA":
            noteY = 92;
            break;
    }

    note = new Image();
    note.src = "assets/images/note.png";
    ctx.drawImage(note, noteX, (noteY + yMod), 35, 40);
}


function play() {

    hitDetector = new Image();
    hitDetector.src = "assets/images/hitdetector.png";
    startingX = 60;
    startingY = 95;
    lines = 4;

    c = document.getElementById("sheetCanvas");
    ctx = c.getContext("2d");

    sheetData = ctx.getImageData(0, 0, 1500, 900);

    animate();

}

function stop() {
    if (requestId) {
        cancelAnimationFrame(requestId);
        requestId = undefined;
        stopSound();
    }
}


function animate() {


    //y axis of low g = 180


    ctx.putImageData(sheetData, 0, 0);
    ctx.drawImage(hitDetector, startingX, startingY, 10, 135);


    if (startingY <= 700) {

        startingX += 4;
        if (startingX < (c.width + hitDetector.width + 3)) {

            noteHit(ctx, startingX + hitDetector.width, startingY);
            requestId = requestAnimationFrame(animate);
        }

        if (startingX >= (c.width + hitDetector.width + 3)) {
            startingY += 180;
            startingX = 60;
            lines -= 1;

            noteHit(ctx, startingX + hitDetector.width, startingY);
            requestAnimationFrame(animate);
        }

    }

}

