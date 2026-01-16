import Grid from "./Grid.js";

const ROWS = 5;
const COLS = 5;
const CELL_SIZE = 60;

export default class App {
  #app;

  constructor() {
    this.#app = document.getElementById("app");
  }

  #initialize() {
    const grid = new Grid(ROWS, COLS, CELL_SIZE).getElement();
    grid.style.setProperty("--cell-size", `${CELL_SIZE}px`);
    grid.style.setProperty("--cols", `${COLS}`);
    grid.style.setProperty("--rows", `${ROWS}`);
    
    this.#app.appendChild(grid);
  }

  run(){
    this.#initialize();
  }
}
