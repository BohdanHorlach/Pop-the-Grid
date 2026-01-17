import Score from "./Score.js";
import CellDataEnum from "./enums/CellDataEnum.js";


class ScoreRegistry {
  #scores = new Map();

  constructor(speed = 8) {
    this.#initialize(speed);
  }


  #initialize(speed) {
    Object.values(CellDataEnum).forEach(({ type, scoreId }) => {
      const element = document.getElementById(scoreId);

      if (!element) {
        throw new Error(`Score element not found: ${scoreId}`);
      }

      this.#scores.set(
        type,
        new Score(element, speed)
      );
    });
  }

  getScoreByType(type) {
    const score = this.#scores.get(type);

    if (!score) {
      throw new Error(`Score not registered for type: ${type}`);
    }

    return score;
  }
}

export default ScoreRegistry;
