import CellPool from "./CellPool.js";

export default class Grid {
  #rows;
  #cols;
  #cellSize;
  #grid;
  #cells;
  #cellPool;

  constructor(rows, cols, cellSize) {
    this.#rows = rows;
    this.#cols = cols;
    this.#cellSize = cellSize;
    this.#cells = [];
    
    this.#initializeGrid();

    this.#cellPool = new CellPool(
      cellSize,
      this.#onCreateCell.bind(this),
      this.#removeCell.bind(this),
    );

    this.#fillGrid();
  }


  #initializeGrid() {  
    this.#grid = document.createElement("div");

    this.#grid.classList.add("grid");
    this.#grid.style.gridTemplateRows = `repeat(${this.#rows}, ${this.#cellSize}px)`;
    this.#grid.style.gridTemplateColumns = `repeat(${this.#cols}, ${this.#cellSize}px)`;
  }


  #fillGrid() {
    for (let x = 0; x < this.#cols; x++) {
      this.#cells[x] = [];
    
      for (let y = 0; y < this.#rows; y++) {
        const cell = this.#cellPool.getCell(x, -this.#rows - y, y);
        this.#cells[x][y] = cell;
      }
    }
  }


  #onCreateCell(cell) {
    this.#grid.appendChild(cell.getElement());
  }


  #spawnNewCells(x) {
    for (let y = 0; y < this.#rows; y++) {
      if (this.#cells[x][y] === null) {
        const cell = this.#cellPool.getCell(x, -1, y);
        this.#cells[x][y] = cell;
      }
    }
  }

  
  #collapseColumn(x) {
    for (let y = this.#rows - 1; y >= 0; y--) {
      if (this.#cells[x][y] === null) {
        for (let above = y - 1; above >= 0; above--) {
          const cell = this.#cells[x][above];

          if (cell) {
            this.#cells[x][y] = cell;
            this.#cells[x][above] = null;
            cell.moveTo(x, y);
            break;
          }
        }
      }
    }

    this.#spawnNewCells(x);
  }


  #removeCell(x, y) {
    if (!this.#cells[x][y]) return;

    this.#cellPool.releaseCell(this.#cells[x][y]);
    this.#cells[x][y] = null;

    this.#collapseColumn(x);
  }


  getElement() {
    return this.#grid;
  }
}