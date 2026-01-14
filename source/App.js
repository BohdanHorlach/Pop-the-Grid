import Grid from "./Grid.js";

const ROWS = 5;
const COLS = 5;
const CELL_SIZE = 60;

export default class App {
  #app;

  constructor() {
    this.#app = document.getElementById("app");
  }

  run(){
    const grid = new Grid(ROWS, COLS, CELL_SIZE);
    this.#app.appendChild(grid.getElement());
  }
}
