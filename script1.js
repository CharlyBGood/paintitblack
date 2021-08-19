let canvas = document.getElementById("area");
let lienzo = canvas.getContext("2d");

canvas.addEventListener("mousedown", pulsarMouse);
canvas.addEventListener("mouseup", levantarMouse);
canvas.addEventListener("mousemove", moverMouse);
let color = document.getElementById("color_select");
let estado;
let x;
let y;

function pulsarMouse(e) {
    console.log("clickeaste el mouse dentro del canvas");
    estado = 1;
    x = e.layerX;
    y = e.layerY;    
}

function moverMouse(e) {
    if (estado == 1) {        
        dibujarLinea(color.value, x, y, e.layerX, e.layerY, lienzo);
    } 
    x = e.layerX;
    y = e.layerY;
}

function levantarMouse(e) {
    estado = 0;    
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
