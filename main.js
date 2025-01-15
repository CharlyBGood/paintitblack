let website = document.getElementById("website")

const animationBeat = {
  keyframe: [
    { transform: "scale(1)" },
    { transform: "scale(1.1)" },
    { transform: "scale(1)" },
  ],
  options: {
    duration: 3000,
    iterations: Infinity,
  },
};

let undoStack = [];
let redoStack = [];

function saveState() {
  undoStack.push(canvas.toDataURL());
  redoStack = [];
}

function restoreState(state) {
  let img = new Image();
  img.src = state;
  img.onload = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // clear the canvas
    ctx.drawImage(img, 0, 0); // draw the saved state
  };
}

// start to work on canvas
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d", { willReadFrequently: true });

// sixe of the brush
let size;

// create variable for events on brush size / range input
let increaseBrush = document.getElementById("range");
increaseBrush.addEventListener("input", brushSize);

function brushSize() {
  size = increaseBrush.value;
}

// define canvas width and height according window object
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
saveState();

window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  saveState();
});


// color and background-color buttons behaviour
let bgColorBtn = document.getElementById("bgr_color_btn");
let bgColorInput = document.getElementById("bgr_color_input");

bgColorBtn.addEventListener("click", () => {
  bgColorInput.click();
});

bgColorInput.addEventListener("input", () => {
  bgColorBtn.style.backgroundColor = bgColorInput.value;
  canvas.style.backgroundColor = bgColorInput.value;
});

// brush color handler
let paintColor = "#fb2359"; //default color on start
let brushColBtn = document.getElementById("brush_color_btn");
let brushColor = document.getElementById("brush_color_input");

// brush handler for magikPaintingcolor
let magikBtn = document.getElementById("magic_button");
let magikPainting = false;

magikBtn.animate(animationBeat.keyframe, animationBeat.options);

website.animate(animationBeat.keyframe, animationBeat.options);

// eraser button
let eraserBtn = document.getElementById("eraser_btn");

// generate random numbers to create random hsl color
function randomValue(min, max) {
  let randomNumbs = min + Math.floor(Math.random() * (max - min));
  return randomNumbs;
}
// generate random color for magik brush!!
const magikColor = () => {
  let h = randomValue(0, 360);
  let s = randomValue(25, 100);
  let l = randomValue(15, 75);
  return `hsl(${h},${s}%,${l}%)`;
};

// select "magik random color" for the brush!
magikBtn.addEventListener("click", () => {
  magikPainting = !magikPainting;
  ctx.globalCompositeOperation = "source-over";
});

// select different color for brush with color picker
brushColBtn.addEventListener("click", () => {
  brushColor.click();
});

brushColor.addEventListener("input", () => {
  brushColBtn.style.backgroundColor = brushColor.value;
  paintColor = brushColor.value;
  magikPainting = false;
  ctx.globalCompositeOperation = "source-over";
});

// use de eraser to erase selected parts of the drawing !!
eraserBtn.addEventListener("click", eraseSelection);

function eraseSelection() {
  ctx.globalCompositeOperation = "destination-out";
  magikPainting = false;
}

// clear the canvas to start over again
let clearBtn = document.getElementById("clear_canvas");
clearBtn.addEventListener("click", clearCanvas);

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  saveState();
}

// undo button to get a step back on the drow !!
let undoBtn = document.getElementById("undo_trace");

undoBtn.addEventListener("click", () => {
  if (undoStack.length > 1) {
    let currentState = undoStack.pop(); // get the last state
    redoStack.push(currentState); // save the current state
    restoreState(undoStack[undoStack.length - 1]); // restore the state
  }
});

// redo button to recover the undo trace
let redoBtn = document.getElementById("redo_trace");

redoBtn.addEventListener("click", () => {
  if (redoStack.length > 0) {
    let currentState = redoStack.pop();
    undoStack.push(currentState);
    restoreState(currentState);
  }
});

// save draw when done
let saveBtn = document.getElementById("save_draw");
saveBtn.addEventListener("click", saveDraw);

function saveDraw(a) {
  let img = canvas.toDataURL("img/png", 1.0);
  downloadImage(img, "my_draw.png");
}

function downloadImage(data, filename = "untitled.png") {
  let a = document.createElement("a");
  a.href = data;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
}

// add mouse and touch events on canvas to draw
canvas.addEventListener("pointerdown", pointerDown, false);
canvas.addEventListener("pointermove", pointerMove, false);
canvas.addEventListener("pointerup", () => {
  saveState();
  stage = 0;
}, false);


let stage;
let x;
let y;

function pointerDown(e) {
  stage = 1;
  x = e.offsetX;
  y = e.offsetY;
  e.preventDefault();
}

function pointerMove(e) {
  if (stage == 1) {
    if (magikPainting) {
      paintColor = magikColor();
    }
    drawLine(paintColor, x, y, e.offsetX, e.offsetY, ctx);
    x = e.offsetX;
    y = e.offsetY;
  }
}

// function to draw on canvas
function drawLine(color, xstart, ystart, xend, yend, ctx) {
  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.lineWidth = size;
  ctx.moveTo(xstart, ystart);
  ctx.lineTo(xend, yend);
  ctx.lineCap = "round";
  ctx.stroke();
  ctx.closePath();
}
