export default class Score {
  static #SNAP_THRESHOLD = 0.5;
  static #ANIMATION_FPS = 60;
  #value = 0;
  #displayValue = 0;
  #targetValue = 0;
  #element;
  #animationId = null;
  #speed;

  constructor(element, speed = 8) {
    this.#element = element;
    this.#speed = speed;
    this.#updateText();
  }

  
  #updateText() {
    this.#element.textContent = Math.floor(this.#displayValue);
  }


  #animate() {
    this.#animationId = requestAnimationFrame(() => {
      const diff = this.#targetValue - this.#displayValue;

      if (Math.abs(diff) < Score.#SNAP_THRESHOLD) {
        this.#displayValue = this.#targetValue;
        this.#updateText();
        this.#animationId = null;
        return;
      }

      this.#displayValue += diff * (this.#speed / Score.#ANIMATION_FPS);
      this.#updateText();
      this.#animate();
    });
  }


  add(amount) {
    this.#value += amount;
    this.#targetValue = this.#value;

    if (!this.#animationId) {
      this.#animate();
    }
  }


  reset() {
    this.#value = 0;
    this.#displayValue = 0;
    this.#targetValue = 0;
    this.#updateText();
  }


  getValue() {
    return this.#value;
  }
}
