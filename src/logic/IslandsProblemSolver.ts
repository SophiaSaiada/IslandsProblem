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

    const nonZeroNeighbors = getNonZeroNeighbors(board, rowIndex, columnIndex);
    if (currentValue === 1) {
      const visitedNonZeroNeighbors = nonZeroNeighbors.filter(
        ([neighborRowIndex, neighborColumnIndex]) =>
          board.getCell(neighborRowIndex, neighborColumnIndex) > 1
      );

      const currentIslandId =
        visitedNonZeroNeighbors.length === 0
          ? nextIslandId++
          : Math.min(
              ...visitedNonZeroNeighbors.map(
                ([neighborRowIndex, neighborColumnIndex]) =>
                  board.getCell(neighborRowIndex, neighborColumnIndex)
              )
            );

      board.setCell(rowIndex, columnIndex, currentIslandId);
      for await (const [
        neighborRowIndex,
        neighborColumnIndex
      ] of nonZeroNeighbors) {
        board.setCell(neighborRowIndex, neighborColumnIndex, currentIslandId);
        if (!quickRun) {
          sideEffect(board);
          await sleep();
        }
      }
    }

    if (currentValue > 1) {
      for await (const [
        neighborRowIndex,
        neighborColumnIndex
      ] of nonZeroNeighbors) {
        board.setCell(neighborRowIndex, neighborColumnIndex, currentValue);
        if (!quickRun) {
          sideEffect(board);
          await sleep();
        }
      }
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
  let islandIdToIndices = [
    new Array<[number, number]>(),
    new Array<[number, number]>()
  ].concat(
    _.range(2, lastIslandId + 1).map(_ => new Array<[number, number]>())
  );

  board.forEachCell((rowIndex, columnIndex, currentValue) => {
    if (currentValue > 1) {
      islandIdToIndices[currentValue].push([rowIndex, columnIndex]);
    }
  });

  await board.asyncForEachCell(async (rowIndex, columnIndex, currentValue) => {
    if (currentValue === 0) {
      return;
    }
    // currentValue can't be 1, as we replaced each 1 with an island ID, that start in 2.
    const nonZeroNeighbors = getNonZeroNeighbors(board, rowIndex, columnIndex);
    const identicalIslands = nonZeroNeighbors.map(
      ([neighborRowIndex, neighborColumnIndex]) =>
        board.getCell(neighborRowIndex, neighborColumnIndex)
    );
    for await (const islandId of identicalIslands.filter(
      islandId => islandId !== currentValue
    )) {
      for await (const [rowIndex, columnIndex] of islandIdToIndices[islandId]) {
        islandIdToIndices[currentValue].push([rowIndex, columnIndex]);
        board.setCell(rowIndex, columnIndex, currentValue);
        if (!quickRun) {
          sideEffect(board);
          await sleep();
        }
      }
    }
  });
}

const getNeighborIndices = (
  board: Board,
  rowIndex: number,
  columnIndex: number
) => {
  const neighborIndices = _.range(-1, 2)
    .flatMap(rowOffset =>
      _.range(-1, 2).map(columnOffset => [rowOffset, columnOffset])
    )
    .filter(
      ([rowOffset, columnOffset]) => columnOffset !== 0 || rowOffset !== 0
    )
    .map(([rowOffset, columnOffset]) => [
      rowIndex + rowOffset,
      columnIndex + columnOffset
    ])
    .filter(
      ([rowOffset, columnOffset]) =>
        0 <= columnOffset &&
        columnOffset < board.dimensions.width &&
        0 <= rowOffset &&
        rowOffset < board.dimensions.height
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
    ([neighborRowIndex, neighborColumnIndex]) =>
      board.getCell(neighborRowIndex, neighborColumnIndex) > 0
  );
};

export default findNumOfIslands;
