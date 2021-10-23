import * as test from './test.js';

// crear canvas 2d
let canvas = document.getElementById("area");
let ctx = canvas.getContext("2d");

// inicializar tamaño de canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// añadir eventos de mouse / touch
canvas.addEventListener("pointerdown", mouseOn);
canvas.addEventListener("pointermove", mouseMove);
canvas.addEventListener("pointerup", mouseUp);

// redimensionar vanvas según viewport
window.addEventListener("resize", function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})

// cambiar color de fondo al canvas
let colorPckr = document.getElementById('color_select');
colorPckr.addEventListener("input", bgrChange);

function bgrChange() {
        canvas.style.backgroundColor = colorPckr.value;
        console.log("cambiar color de fondo")
}

// crear variables de posición de pincel y estado de dibujo
let stage;
let x;
let y;

// funciones para dibujar según se mueve el puntero
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
