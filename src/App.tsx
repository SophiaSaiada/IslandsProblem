import React, { useState } from "react";
import "./App.css";
import { Board } from "./types/Board";
import BoardBuildPage from "./pages/BoardBuild";
import SolverPage from "./pages/Solver";
import "./fonts/stylesheet.css";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(_ => ({
  root: { fontFamily: "Jetbrains Mono", fontSize: "16px" }
}));

const App = () => {
  const classes = useStyles();
  const [board, setBoard] = useState<Board | null>(null);
  return (
    <div className={`App ${classes.root}`}>
      {board == null && <BoardBuildPage setBoard={setBoard} />}
      {board != null && <SolverPage originalBoard={board} />}
    </div>
  );
};

export default App;
