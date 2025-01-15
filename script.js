const drawBtn = document.querySelector("#draw-btn");
const clearBtn = document.querySelector("#clear-btn");
const eraseBtn = document.querySelector("#erase-btn");
const gridSizeText = document.querySelector(".grid-size-text");
const gridSize = document.querySelector(".grid-size");
const mainCanvas = document.querySelector("#main-grid");
let isDrawing = true;
let isErasing = false;

defaultCanvas(20, 1, 64);

//set default canvas size
function defaultCanvas(size, min, max) {
  changeGridSize(size);
  gridSize.setAttribute("value", size);
  gridSize.setAttribute("min", min);
  gridSize.setAttribute("max", max);
  gridSizeText.textContent = `${size} × ${size * 2}`;
}

//change canvas size on input
gridSize.addEventListener("input", () => {
  const size = Number(gridSize.value);
  gridSizeText.textContent = `${size} × ${size * 2}`;
  changeGridSize(size);
});

//when draw button is clicked
drawBtn.addEventListener("click", () => {
  drawBtn.style.backgroundColor = "rgba(0, 0, 0, 0.354)";
  drawBtn.style.color = "rgb(255, 255, 255)";
  eraseBtn.style.backgroundColor = "rgb(255, 255, 255)";
  eraseBtn.style.color = "rgb(0, 0, 0)";
  isDrawing = true;
  isErasing = false;
});

//when erase button is clicked
eraseBtn.addEventListener("click", () => {
  eraseBtn.style.backgroundColor = "rgba(0, 0, 0, 0.354)";
  eraseBtn.style.color = "rgb(255, 255, 255)";
  drawBtn.style.backgroundColor = "rgb(255, 255, 255)";
  drawBtn.style.color = "rgb(0, 0, 0)";
  isDrawing = false;
  isErasing = true;
});

//when clear button is clicked
clearBtn.addEventListener("click", () => {
  isDrawing = true;
  isErasing = false;
  changeGridSize(Number(gridSize.value));
});

//change canvas size
function changeGridSize(size) {
  setupNewCanvas(size);
  addSquares(size);
}

//make fresh canvas
function setupNewCanvas(gridSize) {
  mainCanvas.innerHTML = "";
  mainCanvas.style.gridTemplateColumns = `repeat(${gridSize * 2}, 1fr)`;
  mainCanvas.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;
}

//create children grids (divs)
function addSquares(gridSize) {
  const totalSquares = gridSize * gridSize * 2; // Rows * Columns
  for (let i = 1; i <= totalSquares; i++) {
    const gridSquare = document.createElement("div");
    gridSquare.classList.add("grid-square");
    gridSquare.id = `Sq${i}`;
    gridSquare.addEventListener("mousedown", setBg);
    gridSquare.addEventListener("mouseover", mousetrail);
    mainCanvas.appendChild(gridSquare);
  }
}

function setBg(event) {
  const curColor = document.querySelector("#color-picker").value;
  event.target.style.backgroundColor = curColor;
}

function mousetrail(event) {
  if (isDrawing) {
    const curColor = document.querySelector("#color-picker").value;
    event.target.style.backgroundColor = curColor;
  }
  if (isErasing) {
    event.target.style.backgroundColor = "";
  }
}
