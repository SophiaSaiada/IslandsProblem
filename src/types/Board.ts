import { Dimensions } from "./Dimensions";

export class Board {
  dimensions: Dimensions;
  data: number[][];

  constructor(dimensions: Dimensions, data: number[][]) {
    this.dimensions = dimensions;
    this.data = data;
  }

  toString(): String {
    return this.data.map(row => row.join("\t")).join("\n");
  }

  clone(): Board {
    return new Board(
      { ...this.dimensions },
      this.data.map(row => [...row])
    );
  }
}
