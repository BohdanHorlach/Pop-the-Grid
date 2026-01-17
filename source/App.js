import ClusterRemover from "./ClusterRemover.js";
import Grid from "./Grid.js";
import ScoreRegistry from "./ScoreRegistry.js";

const ROWS = 8;
const COLS = 5;
const CELL_SIZE = 60;

export default class App {
  #app;

  constructor() {
    this.#app = document.getElementById("app");
  }


  #createGrid(){
    const grid = new Grid(ROWS, COLS, CELL_SIZE);
    const gridElement = grid.getElement();
    gridElement.style.setProperty("--cell-size", `${CELL_SIZE}px`);
    gridElement.style.setProperty("--cols", `${COLS}`);
    gridElement.style.setProperty("--rows", `${ROWS}`);

    this.#app.appendChild(gridElement);

    return grid;
  }


  #initializeScores(clusterRemover){
    const scoreRegistry = new ScoreRegistry();

    clusterRemover.addEventListener("clusterRemoved", (event) => {
      const { cells } = event.detail;

      const type = cells[0].getType();
      const score = scoreRegistry.getScoreByType(type);
      score.add(cells.length);
    });
  }


  #initialize() {
    const grid = this.#createGrid();
    const clusterRemover = new ClusterRemover(grid);
    this.#initializeScores(clusterRemover);
  }

  run(){
    this.#initialize();
  }
}
