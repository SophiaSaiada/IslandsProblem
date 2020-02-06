import React, { useState } from "react";
import "./App.css";
import { Board } from "./types/Board";
import BoardBuildPage from "./pages/BoardBuildPage";

const App = () => {
  const [board, setBoard] = useState<Board | null>(null);
  return (
    <div className="App">
      {board == null && <BoardBuildPage setBoard={setBoard} />}
      {board != null && <pre>{board.toString()}</pre>}
    </div>
  );
};

export default App;
