let canvas = document.getElementById("area");
let paper = canvas.getContext("2d");

canvas.addEventListener("pointerdown", pulsarMouse);
canvas.addEventListener("pointerup", levantarMouse);
canvas.addEventListener("pointermove", moverMouse);
let color = document.getElementById("color_select");
let stage;
let x;
let y;

function pulsarMouse(e) {
    // console.log("clickeaste el mouse dentro del canvas");
    stage = 1;
    x = e.layerX;
    y = e.layerY;    
}

function moverMouse(e) {
    if (stage == 1) {        
        dibujarLinea(color.value, x, y, e.layerX, e.layerY, paper);
    } 
    x = e.layerX;
    y = e.layerY;
}

function levantarMouse(e) {
    stage = 0;    
}

function dibujarLinea(color, xinicial, yinicial, xfinal, yfinal, lienzo) {
    lienzo.beginPath();
    lienzo.strokeStyle = color;
    lienzo.lineWidth = 3;
    lienzo.moveTo(xinicial, yinicial);
    lienzo.lineTo(xfinal, yfinal);
    lienzo.stroke();
    lienzo.closePath();
}
