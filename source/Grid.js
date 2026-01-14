import Cell from "./Cell.js";

export default class Grid {
  #rows;
  #cols;
  #cellSize;
  #grid;

  constructor(rows, cols, cellSize) {
    this.#rows = rows;
    this.#cols = cols;
    this.#cellSize = cellSize;
    
    this.#initializeGrid();
    this.#fillGrid();
  }


  #initializeGrid() {  
    this.#grid = document.createElement("div");

    this.#grid.classList.add("grid");
    this.#grid.style.gridTemplateRows = `repeat(${this.#rows}, ${this.#cellSize}px)`;
    this.#grid.style.gridTemplateColumns = `repeat(${this.#cols}, ${this.#cellSize}px)`;
  }


  #fillGrid() {
    for (let row = 0; row < this.#rows; row++) {
      for (let col = 0; col < this.#cols; col++) {
        const cell = new Cell(row, col);
        this.#grid.appendChild(cell.getElement());
      }
    }
  }


  getElement() {
    return this.#grid;
  }
}