import React, { useState } from "react";
import { Board } from "../../types/Board";
import findNumOfIslands from "../../logic/IslandsProblemSolver";
import { sleep } from "../../logic/utils";
type SolverPageProps = {
  originalBoard: Board;
};

const SolverPage = ({ originalBoard }: SolverPageProps) => {
  const [[ongoingBoard, ongoingBoardId], setOgnoingBoardAndId] = useState<
    [Board, number]
  >([originalBoard.clone(), 0]);
  const [answer, setAnswer] = useState<number | null>(null);
  const solve = () => {
    findNumOfIslands(
      originalBoard,
      (board: Board) => {
        setOgnoingBoardAndId([board, (ongoingBoardId + 1) % 4]);
      },
      () => sleep(200)
    ).then(setAnswer);
  };
  return (
    <div>
      <pre>{ongoingBoard.toString()}</pre>
      <br />
      <button onClick={solve}>Solve</button>
      <br />
      {answer && `There are ${answer} islands.`}
    </div>
  );
};

export default SolverPage;
