const curColor = document.querySelector("#color-picker").value;
const drawBtn = document.querySelector("#draw-btn");
const clearBtn = document.querySelector("#clear-btn");
const eraseBtn = document.querySelector("#erase-btn");
const gridSizeText = document.querySelector(".grid-size-text");
const gridSize = document.querySelector(".grid-size");
const mainCanvas = document.querySelector("#main-grid");
const isDrawing = true;
const isErasing = false;
gridSize.addEventListener("input", () => {
  gridSizeText.textContent = gridSize.value + " × " + gridSize.value * 2;
  createGrid(gridSize.value);
});

drawBtn.addEventListener("click", () => {
  drawBtn.style.backgroundColor = "rgba(0, 0, 0, 0.354)";
  drawBtn.style.color = "rgb(255, 255, 255)";
  eraseBtn.style.backgroundColor = "rgb(255, 255, 255)";
  eraseBtn.style.color = "rgb(0, 0, 0)";
  isDrawing = true;
  isErasing = false;
});
eraseBtn.addEventListener("click", () => {
  eraseBtn.style.backgroundColor = "rgba(0, 0, 0, 0.354)";
  eraseBtn.style.color = "rgb(255, 255, 255)";
  drawBtn.style.backgroundColor = "rgb(255, 255, 255)";
  drawBtn.style.color = "rgb(0, 0, 0)";
  isDrawing = false;
  isErasing = true;
});
clearBtn.addEventListener("click", () => {
  isDrawing = true;
  isErasing = false;
  createGrid(gridSize.value);
});

function createGrid(size) {
  // Clear existing grid
  mainCanvas.innerHTML = "";

  // Set grid dimensions
  mainCanvas.style.gridTemplateRows = `repeat(${size}, 1fr)`;
  mainCanvas.style.gridTemplateColumns = `repeat(${size * 2}, 1fr)`;
  const cellSize = Math.min(500 / size, 20); // Adjust cell size if needed (max 20px)

  // Generate grid cells
  for (let i = 0; i < size * size; i++) {
    const cell = document.createElement("div");
    cell.classList.add("grid-cell");
    cell.style.width = `${cellSize}px`;
    cell.style.height = `${cellSize}px`;

    // Add drawing functionality
    cell.addEventListener("mouseover", () => {
      cell.style.backgroundColor = "black";
    });

    gridContainer.appendChild(cell);
  }

  // Set grid container size
  gridContainer.style.width = `${cellSize * size}px`;
  gridContainer.style.height = `${cellSize * size}px`;
}
