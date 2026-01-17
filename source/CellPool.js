import Cell from "./Cell.js";
import CellDataEnum from "./enums/CellDataEnum.js";

export default class CellPool {
  #cellSize;
  #onCreate;
  #onDestroy;
  #pool;

  constructor(cellSize, onCreate, onDestroy) {
    this.#cellSize = cellSize;
    this.#onCreate = onCreate;
    this.#onDestroy = onDestroy;
    this.#pool = [];
  }


  #getRandomCellType() {
    const types = Object.values(CellDataEnum);
    const randomIndex = Math.floor(Math.random() * types.length);
    return types[randomIndex];
  }


  #getFreeCell(x, y) {
    const randomType = this.#getRandomCellType();
    let cell;

    if (this.#pool.length > 0) {
      cell = this.#pool.pop();
      cell.reset(x, y, randomType, this.#onDestroy);
    } else {
      cell = new Cell(x, y, this.#cellSize, randomType, this.#onDestroy);
    }

    return cell;
  }


  getCell(x, startY, targetY) {
    const cell = this.#getFreeCell(x, startY);

    this.#onCreate(cell);
    cell.moveTo(x, startY, true);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        cell.moveTo(x, targetY);
      });
    });

    return cell;
  }


  releaseCell(cell) {
    const currentX = cell.getPosition().x;
    const cellType = cell.getType();

    cell.getElement().style.display = "none";
    cell.reset(currentX, -1, cellType, this.#onDestroy);

    this.#pool.push(cell);
  }
}
