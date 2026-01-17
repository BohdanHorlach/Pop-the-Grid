import DirectionEnum from "./enums/DirectionEnum.js";

export default class ClusterRemover extends EventTarget {
  #grid;

  constructor(grid) {
    super();
    this.#grid = grid;

    this.#grid.addEventListener("cellClick", (event) => {
      const { x, y } = event.detail;
      this.#removeCluster(x, y);
    });
  }


  #getNeighbors(position) {
    const neighbors = [];
    const { x, y } = position;

    for (const dir of Object.values(DirectionEnum)) {
      const nextX = x + dir.x;
      const nextY = y + dir.y;

      const cell = this.#grid.getCellAt(nextX, nextY);
      if (cell) {
        neighbors.push(cell);
      }
    }

    return neighbors;
  }


  #getCluster(cell) {
    const cluster = [cell];
    const visited = new Set();
    const targetType = cell.getType();
    visited.add(cell);

    while (cluster.length > 0) {
      const currentCell = cluster.pop();
      const neighbors = this.#getNeighbors(currentCell.getPosition());

      for (const neighbor of neighbors) {
        const cellType = neighbor.getType();

        if (visited.has(neighbor))
          continue;

        if(cellType === targetType) {
          cluster.push(neighbor);
          visited.add(neighbor);
        }
      }
    }

    return Array.from(visited);
  }

  
  #removeCluster(x, y) {
    const cell = this.#grid.getCellAt(x, y);
    if (!cell) return;

    const cells = this.#getCluster(cell);
    
    this.dispatchEvent(
      new CustomEvent("clusterRemoved", { detail: { cells } })
    );

    this.#grid.removeCells(cells);
  }
}