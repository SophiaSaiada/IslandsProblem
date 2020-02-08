import { Board } from "../types/Board";
import _ from "lodash";

async function findNumOfIslands(
  originalBoard: Board,
  sideEffect: (board: Board) => void,
  quickRun: boolean,
  sleep: () => Promise<any>
): Promise<number> {
  const board = originalBoard.clone();
  let nextIslandId = 2;

  await board.asyncForEachCell(async (rowIndex, columnIndex, currentValue) => {
    if (currentValue === 0) {
      return;
    }

    if (!quickRun) await sleep();

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
        await nonZeroNeighbors.forEach(
          async ([neighborColumnIndex, neighborRowIndex]) => {
            board.setCell(neighborRowIndex, neighborColumnIndex, nextIslandId);
            if (!quickRun) {
              sideEffect(board);
              await sleep();
            }
          }
        );
        nextIslandId++;
      }
    }

    if (currentValue > 1) {
      await getNonZeroNeighbors(board, rowIndex, columnIndex).forEach(
        async ([neighborColumnIndex, neighborRowIndex]) => {
          board.setCell(neighborRowIndex, neighborColumnIndex, currentValue);
          if (!quickRun) {
            sideEffect(board);
            await sleep();
          }
        }
      );
    }
  });

  await mergeIdenticalIslands(
    board,
    nextIslandId - 1,
    quickRun,
    sideEffect,
    sleep
  );

  if (quickRun) {
    sideEffect(board);
  }

  return Promise.resolve(numOfIslands(board));
}

const numOfIslands = (board: Board) => {
  const islands = new Set<number>();
  board.forEachCell((_, __, currentValue) => {
    if (currentValue > 1) islands.add(currentValue);
  });

  return islands.size;
};

async function mergeIdenticalIslands(
  board: Board,
  lastIslandId: number,
  quickRun: boolean,
  sideEffect: (board: Board) => void,
  sleep: () => Promise<any>
) {
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

  await board.asyncForEachCell(async (rowIndex, columnIndex, currentValue) => {
    if (currentValue === 0) {
      return;
    }
    // currentValue can't be 1, as we replaced each 1 with an island ID, that start in 2.
    const nonZeroNeighbors = getNonZeroNeighbors(board, rowIndex, columnIndex);
    const identicalIslands = nonZeroNeighbors.map(
      ([neighborColumnIndex, neighborRowIndex]) =>
        board.getCell(neighborRowIndex, neighborColumnIndex)
    );
    await identicalIslands
      .filter(islandId => islandId !== currentValue)
      .forEach(async islandId => {
        await islandIdToIndices[islandId].forEach(
          async ([rowIndex, columnIndex]) => {
            islandIdToIndices[currentValue].push([rowIndex, columnIndex]);
            board.setCell(rowIndex, columnIndex, currentValue);
            if (!quickRun) {
              sideEffect(board);
              await sleep();
            }
          }
        );
      });
  });
}

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
