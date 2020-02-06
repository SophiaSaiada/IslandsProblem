import { Board } from "../types/Board";
import _ from "lodash";

const findNumOfIslands = (originalBoard: Board) => {
  const board = originalBoard.clone();
  let nextIslandId = 2;

  board.forEachCell((rowIndex, columnIndex, currentValue) => {
    if (currentValue === 0) {
      return;
    }

    if (currentValue === 1) {
      const nonZeroNeighbors = getNonZeroNeighbors(
        board,
        rowIndex,
        columnIndex
      );

      const visitedNonZeroNeighbors = nonZeroNeighbors.filter(
        ([neighborColumnIndex, neighborRowIndex]) =>
          board.getCell(neighborRowIndex, neighborColumnIndex) > 1
      );
      if (visitedNonZeroNeighbors.length === 0) {
        board.setCell(rowIndex, columnIndex, nextIslandId);
        nonZeroNeighbors.forEach(([neighborColumnIndex, neighborRowIndex]) => {
          board.setCell(neighborRowIndex, neighborColumnIndex, nextIslandId);
        });
        nextIslandId++;
      }
    }

    if (currentValue > 1) {
      getNonZeroNeighbors(board, rowIndex, columnIndex).forEach(
        ([neighborColumnIndex, neighborRowIndex]) => {
          board.setCell(neighborRowIndex, neighborColumnIndex, currentValue);
        }
      );
    }
  });

  mergeIdenticalIslands(board, nextIslandId - 1);

  return board;
};

const mergeIdenticalIslands = (board: Board, lastIslandId: number) => {
  let islandIdToIndices = Object.fromEntries(
    _.range(2, lastIslandId + 1).map(islandId => [
      islandId,
      new Array<[number, number]>()
    ])
  );
  board.forEachCell((rowIndex, columnIndex, currentValue) => {
    if (currentValue > 1)
      islandIdToIndices[currentValue].push([rowIndex, columnIndex]);
  });

  board.forEachCell((rowIndex, columnIndex, currentValue) => {
    if (currentValue === 0) {
      return;
    }
    // currentValue can't be 1, as we replaced each 1 with an island ID, that start in 2.
    const nonZeroNeighbors = getNonZeroNeighbors(board, rowIndex, columnIndex);
    const identicalIslands = nonZeroNeighbors.map(
      ([neighborColumnIndex, neighborRowIndex]) =>
        board.getCell(neighborRowIndex, neighborColumnIndex)
    );
    identicalIslands
      .filter(islandId => islandId != currentValue)
      .forEach(islandId => {
        islandIdToIndices[islandId].forEach(([rowIndex, columnIndex]) => {
          islandIdToIndices[currentValue].push([rowIndex, columnIndex]);
          board.setCell(rowIndex, columnIndex, currentValue);
        });
      });
  });
};

const getNeighborIndices = (
  board: Board,
  rowIndex: number,
  columnIndex: number
) => {
  const neighborIndices = _.range(-1, 2)
    .flatMap(yOffset => _.range(-1, 2).map(xOffset => [xOffset, yOffset]))
    .filter(([x, y]) => x !== 0 || y !== 0)
    .map(([x, y]) => [columnIndex + x, rowIndex + y])
    .filter(
      ([x, y]) =>
        0 <= x &&
        x < board.dimensions.width &&
        0 <= y &&
        y < board.dimensions.height
    );

  return neighborIndices;
};

const getNonZeroNeighbors = (
  board: Board,
  rowIndex: number,
  columnIndex: number
) => {
  const neighborIndices = getNeighborIndices(board, rowIndex, columnIndex);
  return neighborIndices.filter(
    ([neighborColumnIndex, neighborRowIndex]) =>
      board.getCell(neighborRowIndex, neighborColumnIndex) > 0
  );
};

export default findNumOfIslands;
