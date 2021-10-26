import * as test from './test.js';
import * as test2 from './test2.js';

// crear canvas 2d
let canvas = document.getElementById("area");
let ctx = canvas.getContext("2d");

// crear variables de posición de pincel y estado de dibujo
let stage;
let x;
let y;
let colorX;

// inicializar tamaño de canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// añadir eventos de mouse / touch
canvas.addEventListener("pointerdown", mouseOn);
canvas.addEventListener("pointermove", mouseMove);
canvas.addEventListener("pointerup", mouseUp);

// redimensionar canvas según viewport
window.addEventListener("resize", function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})

// cambiar color de fondo al canvas
let bgrPckr  = document.getElementById('bgr_color');
bgrPckr .addEventListener("input", bgrChange);

function bgrChange() {
        canvas.style.backgroundColor = bgrPckr.value;
        console.log("cambiar color de fondo")
}

// mostrar u ocultar colorpicker fondo
let bgrButton = document.getElementById("bgr_hide");
bgrButton.addEventListener("click", showPckr);
bgrPckr.style.display = "none";

function showPckr() {    
        bgrPckr.style.display = "inline-block";
}

//cambiar color a pincel 
let brushPckr = document.getElementById('brush_color');
brushPckr.addEventListener("input", brushChange);

function brushChange() {
	colorX = brushPckr.value;
    console.log("cambia color pincel, funciona!!")
}

// mostrar u ocultar colorpicker pincel
let bshButton = document.getElementById("bsh_hide");
bshButton.addEventListener("click", showBsh);
brushPckr.style.display = "none";

function showBsh() {
    console.log("show");
    let hidden = true;
    if (hidden = true) {
        brushPckr.style.display = "inline-block";
        hidden = false;
        console.log(hidden);
    }
}


// seleccionar pincel mágico
let brushMagic = document.getElementById("brush_magic");
brushMagic.addEventListener("click", brushMc);

function brushMc() {
    colorX = test2.randColorHsl();    
    console.log("funciona pincel mágico");
}

// seleccionar goma de borrar
let brushErase = document.getElementById("brush_erase");
brushErase.addEventListener("click", eraseDraw);

function eraseDraw() {
    colorX = "black";
    console.log("Goma de borrar seleccionada!");    
}



// funciones para dibujar según se mueve el puntero
function mouseOn(e) {
    stage = 1;
    x = e.layerX;
    y = e.layerY;
}

// function mouseMove(e) {
//     if (stage == 1) {        
//         drawLine(test2.randColorHsl(), x, y, e.layerX, e.layerY, ctx);
//     } 
//     x = e.layerX;
//     y = e.layerY;
// }

function mouseMove(e) {
    // colorX = brushPckr.value;
    if (stage == 1) {      
        drawLine(colorX, x, y, e.layerX, e.layerY, ctx);
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
