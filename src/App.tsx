import React, { useState } from "react";
import "./App.css";
import { Board } from "./types/Board";
import BoardBuildPage from "./pages/BoardBuild";
import SolverPage from "./pages/Solver";
import "./fonts/stylesheet.css";
import { ThemeProvider } from "@material-ui/core";
import customTheme from "./themes/custom";

const App = () => {
  const [board, setBoard] = useState<Board | null>(null);
  const [fullScreenMode, setFullScreenMode] = useState(false);
  return (
    <ThemeProvider theme={customTheme}>
      <div className={`App`}>
        {board == null && (
          <BoardBuildPage
            setBoard={setBoard}
            fullScreenMode={fullScreenMode}
            setFullScreenMode={setFullScreenMode}
          />
        )}
        {board != null && (
          <SolverPage
            originalBoard={board}
            goHome={() => {
              setBoard(null);
              setFullScreenMode(false);
            }}
            fullScreenMode={fullScreenMode}
            setFullScreenMode={setFullScreenMode}
          />
        )}
      </div>
    </ThemeProvider>
  );
};

export default App;
