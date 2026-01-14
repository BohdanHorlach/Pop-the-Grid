export default class Cell {
  #col;
  #row;
  #cell;

  constructor(row, col) {
    this.#row = row;
    this.#col = col;

    this.#initializeCell();
  }


  #initializeCell() {
    this.#cell = document.createElement("div");
    this.#cell.classList.add("cell");

    this.#cell.addEventListener("click", () => {
      this.#onClick();
    });
  }


  #onClick() {
    console.log(`row: ${this.#row}, col: ${this.#col}`);
  }


  getElement() {
    return this.#cell;
  }
}
