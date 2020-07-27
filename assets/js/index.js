//New Button
function newSheet() {
    var c = document.getElementById("sheetCanvas");

    c.width = c.height *
        (c.clientWidth / c.clientHeight);

    var ctx = c.getContext("2d");

    ctx.lineWidth = 0.8;

    //lines
    var x = 10;
    var y = 15;
    var lineLength = 340;

    for (var i = 0; i <= 4; i++) {

        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(lineLength, y);
        ctx.stroke();
        ctx.closePath();

        y += 10;
    }

    //bars
    var x = 80
    var y1 = 15;
    var y2 = 55;

    for (var i = 0; i <= 4; i++) {

        ctx.beginPath();
        ctx.moveTo(x, y1);
        ctx.lineTo(x, y2);
        ctx.stroke();
        ctx.closePath();

        x += 86.5;

    }

    drawing = new Image();
    drawing.src = "assets/images/Stave.png";
    drawing.onload = function() {
        ctx.drawImage(drawing, 10, 15, 15, 35);
    }


}