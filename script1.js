import * as test from './test.js';

let canvas = document.getElementById("area");
let paper = canvas.getContext("2d");


canvas.addEventListener("pointerdown", mouseOn);
canvas.addEventListener("pointermove", mouseMove);
canvas.addEventListener("pointerup", mouseUp);


let colSel = document.getElementById('colorBtn');
colSel.addEventListener("pointerdown", bgrChange);


function bgrChange() {
        let color = document.getElementById("color_select").value;
        canvas.style.backgroundColor = color;
        console.log("cambiar color de fondo")
}


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
        drawLine(test.randHexColor(), x, y, e.layerX, e.layerY, paper);
    } 
    x = e.layerX;
    y = e.layerY;
}

function mouseUp(e) {
    stage = 0;    
}

function drawLine(color, xini, yini, xfin, yfin, paper) {
    paper.beginPath();
    paper.strokeStyle = color;
    paper.lineWidth = 2;
    paper.moveTo(xini, yini);
    paper.lineTo(xfin, yfin);
    paper.stroke();
    paper.closePath();
}
