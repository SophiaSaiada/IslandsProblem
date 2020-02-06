import React, { useState } from "react";
import { Board } from "../../types/Board";
import findNumOfIslands from "../../logic/IslandsProblemSolver";
type SolverPageProps = {
  originalBoard: Board;
};

const SolverPage = ({ originalBoard }: SolverPageProps) => {
  const [ongoingBoard, setOgnoingBoard] = useState(originalBoard.clone());
  const [answer, setAnswer] = useState<number | null>(null);
  const solve = () => {
    setOgnoingBoard(findNumOfIslands(originalBoard));
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
