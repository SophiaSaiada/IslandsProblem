import React, { useState } from "react";
import "./App.css";
import { Board } from "./types/Board";
import BoardBuildPage from "./pages/BoardBuild";
import SolverPage from "./pages/Solver";

const App = () => {
  const [board, setBoard] = useState<Board | null>(null);
  return (
    <div className="App">
      {board == null && <BoardBuildPage setBoard={setBoard} />}
      {board != null && <SolverPage originalBoard={board} />}
    </div>
  );
};

export default App;
