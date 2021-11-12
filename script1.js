import * as test2 from './test2.js';

// crear canvas 2d
let canvas = document.getElementById("area");
let ctx = canvas.getContext("2d");

// crear variables de posición de pincel y estado de dibujo
let stage;
let x;
let y;
let colorX = '#f3ebdc';
let size;
let magicButton = false;

// definir tamaño de canvas segun window
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


// añadir eventos de mouse / touch
canvas.addEventListener("pointerdown", pointerDown);
canvas.addEventListener("pointermove", pointerMove);
canvas.addEventListener("pointerup", pointerUp);

// redimensionar canvas según viewport
window.addEventListener("resize", function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})

// cambiar color de fondo al canvas
let bgrPckr  = document.getElementById('bgr_color');
bgrPckr.addEventListener("input", bgrChange);

function bgrChange() {
        canvas.style.backgroundColor = bgrPckr.value;
        console.log("cambiar color de fondo")
}


// cambiar color a pincel 
let brushPckr = document.getElementById('brush_color');
brushPckr.addEventListener("input", brushColor);

function brushColor() {
    colorX = brushPckr.value;
    ctx.globalCompositeOperation = "source-over";
    magicButton = false;
    console.log(magicButton);
    console.log("cambia color pincel, funciona!!")
}

// seleccionar pincel mágico
let brushMagic = document.getElementById("magic_button");
brushMagic.addEventListener("click", brushMc);

function brushMc() {
    magicButton = !magicButton;
    console.log(magicButton);
    console.log("funciona pincel mágico");
}

// seleccionar goma de borrar
let brushErase = document.getElementById("brush_erase");
brushErase.addEventListener("click", eraseDraw);

function eraseDraw() {
    ctx.globalCompositeOperation = "destination-out";
    console.log("Goma de borrar seleccionada!");
    magicButton = false;     
}

// cambiar tamaño a pincel
let sizeB = document.getElementById('range');
sizeB.addEventListener('input', brushSize);

function brushSize() {
    size = sizeB.value;
}

// recargar página 
let reload = document.getElementById('reload');
reload.addEventListener('click', reloadCanvas);

function reloadCanvas() {
    ctx.clearRect(0,0,canvas.width, canvas.height);
}

// funciones para dibujar según se mueve el puntero
function pointerDown(ev) {
    stage = 1;
    x = ev.layerX;
    y = ev.layerY;
}

function pointerMove(ev) {
    if (stage == 1) {
        if (magicButton) {
            colorX = test2.colorZ();
            ctx.globalCompositeOperation = "source-over";
            console.log(magicButton);
        } 
        drawLine(colorX, x, y, ev.layerX, ev.layerY, ctx);
    }
    x = ev.layerX;
    y = ev.layerY;
}



function pointerUp() {
    stage = 0;
}

function drawLine(color, xini, yini, xfin, yfin, ctx) {
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = size;
    ctx.moveTo(xini, yini);
    ctx.lineTo(xfin, yfin);
    ctx.stroke();
    ctx.closePath();        
}
