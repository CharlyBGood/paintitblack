import * as test from './test.js';

let canvas = document.getElementById("area");
let ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

canvas.addEventListener("pointerdown", mouseOn);
canvas.addEventListener("pointermove", mouseMove);
canvas.addEventListener("pointerup", mouseUp);

window.addEventListener("resize", function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})

let colorPckr = document.getElementById('color_select');

colorPckr.addEventListener("input", bgrChange);

function bgrChange() {
        canvas.style.backgroundColor = colorPckr.value;
        console.log("cambiar color de fondo")
}

// let colSel = document.getElementById('colorBtn');
// colSel.addEventListener("pointerdown", bgrChange);


// function bgrChange() {
//         let color = document.getElementById("color_select").value;
//         canvas.style.backgroundColor = color;
//         console.log("cambiar color de fondo");
// }


let stage;
let x;
let y;

function mouseOn(e) {
    stage = 1;
    x = e.layerX;
    y = e.layerY;
}

function mouseMove(e) {
    if (stage == 1) {        
        drawLine(test.randHexColor(), x, y, e.layerX, e.layerY, ctx);
    } 
    x = e.layerX;
    y = e.layerY;
}

function mouseUp(e) {
    stage = 0;    
}

function drawLine(color, xini, yini, xfin, yfin, ctx) {
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.moveTo(xini, yini);
    ctx.lineTo(xfin, yfin);
    ctx.stroke();
    ctx.closePath();
}
