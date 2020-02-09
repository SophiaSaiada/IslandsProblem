import React, { useState } from "react";
import ChooseDimenssionPage from "./ChooseDimenssionPage";
import SetDataPage from "./SetDataPage";
import { Dimensions } from "../../types/Dimensions";
import { Board } from "../../types/Board";

type BoardBuildPageProps = {
  setBoard: (board: Board | null) => void;
  fullScreenMode: boolean;
  setFullScreenMode: (fullScreenMode: boolean) => void;
};

const BoardBuildPage = ({
  setBoard,
  fullScreenMode,
  setFullScreenMode
}: BoardBuildPageProps) => {
  const [dimensions, setDimensions] = useState<Dimensions | null>(null);

  const setBoardDataAndSubmit = (newData: number[][]) => {
    if (dimensions == null) return;
    const board = new Board(dimensions, newData);
    setBoard(board);
  };

  return (
    <div className="App">
      {dimensions == null && (
        <ChooseDimenssionPage setBoardDim={setDimensions} />
      )}
      {dimensions != null && (
        <SetDataPage
          boardDim={dimensions}
          setBoardData={setBoardDataAndSubmit}
          goHome={() => {
            setDimensions(null);
            setFullScreenMode(false);
          }}
          fullScreenMode={fullScreenMode}
          setFullScreenMode={setFullScreenMode}
        />
      )}
    </div>
  );
};

export default BoardBuildPage;
