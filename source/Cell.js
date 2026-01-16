export default class Cell {
  #x;
  #y;
  #size;
  #iconType;
  #iconElement;
  #cell;
  #onClick;

  
  constructor(x, y, size, iconType, onClick = () => {}) {
    this.#x = x;
    this.#y = y;
    this.#size = size;
    this.#iconType = iconType;
    this.#onClick = onClick;

    this.#initializeCell(iconType);
  }


  #createIcon(iconType){
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", "100%");
    svg.setAttribute("height", "100%");
    svg.setAttribute("viewBox", "0 0 800 800");

    const icon = document.createElementNS("http://www.w3.org/2000/svg", "use");
    icon.setAttributeNS("http://www.w3.org/1999/xlink", "href", iconType.source);

    this.#iconElement = icon;
    svg.appendChild(icon);

    return svg;
  }


  #initializeCell(iconType) {
    this.#cell = document.createElement("div");
    this.#cell.classList.add("cell");

    const icon = this.#createIcon(iconType);
    this.#cell.appendChild(icon);

    this.#cell.addEventListener("click", () => {
      this.#onClick(this.#x, this.#y);
    });
  }
  

  #updateTransform() {
    this.#cell.style.transform =
      `translate(${this.#x * this.#size}px, ${this.#y * this.#size}px)`;
  }


  moveTo(newX, newY, instant = false) {
    this.#x = newX;
    this.#y = newY;

    if (instant) {
      this.#cell.style.transition = "none";
    } else {
      this.#cell.style.transition = "";
    }

    this.#updateTransform();

    if (instant) {
      requestAnimationFrame(() => {
        this.#cell.style.transition = "";
      });
    }
  }


  reset(x, y, iconType, onClick) {
    this.#y = y;
    this.#x = x;
    this.#iconElement.setAttributeNS("http://www.w3.org/1999/xlink", "href", iconType.source);
    this.#onClick = onClick;
    this.#cell.style.display = "";
    this.moveTo(x, y, true);
  }


  getElement() {
    return this.#cell;
  }


  getPosition() {
    return { x: this.#x, y: this.#y };
  }


  destroy() {
    this.#cell.remove();
  }
}
