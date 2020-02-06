import { Dimensions } from "./Dimensions";

export class Board {
  dimensions: Dimensions;
  data: number[][];

  constructor(dimensions: Dimensions, data: number[][]) {
    this.dimensions = dimensions;
    this.data = data;
  }

  toString(): String {
    return this.data.map(row => row.join(" ")).join("\n");
  }

  toArrayString(): String {
    return this.data.map(row => "[" + row.join(",") + "]").join(",");
  }

  clone(): Board {
    return new Board(
      { ...this.dimensions },
      this.data.map(row => [...row])
    );
  }

  isInBounds(rowIndex: number, columnIndex: number): boolean {
    return (
      0 <= columnIndex &&
      columnIndex < this.dimensions.width &&
      0 <= rowIndex &&
      rowIndex < this.dimensions.height
    );
  }

  getCell(rowIndex: number, columnIndex: number): number {
    if (!this.isInBounds(rowIndex, columnIndex)) {
      throw new Error(
        `Invalid index (${columnIndex}, ${rowIndex}) in board with ` +
          `dimensions ${JSON.stringify(this.dimensions)}`
      );
    }

    return this.data[rowIndex][columnIndex];
  }

  setCell(rowIndex: number, columnIndex: number, value: number) {
    if (!this.isInBounds(rowIndex, columnIndex)) {
      throw new Error(
        `Invalid index (${columnIndex}, ${rowIndex}) in board with ` +
          `dimensions ${JSON.stringify(this.dimensions)}`
      );
    }

    this.data[rowIndex][columnIndex] = value;
  }

  forEachCell(
    callback: (rowIndex: number, columnIndex: number, value: number) => void
  ) {
    for (let rowIndex = 0; rowIndex < this.dimensions.height; rowIndex++) {
      for (
        let columnIndex = 0;
        columnIndex < this.dimensions.width;
        columnIndex++
      ) {
        callback(rowIndex, columnIndex, this.getCell(rowIndex, columnIndex));
      }
    }
  }

  async asyncForEachCell(
    callback: (rowIndex: number, columnIndex: number, value: number) => void
  ) {
    for (let rowIndex = 0; rowIndex < this.dimensions.height; rowIndex++) {
      for (
        let columnIndex = 0;
        columnIndex < this.dimensions.width;
        columnIndex++
      ) {
        await callback(
          rowIndex,
          columnIndex,
          this.getCell(rowIndex, columnIndex)
        );
      }
    }
  }
}
