import React, { useState } from "react";
import { Board } from "../../types/Board";
import findNumOfIslands from "../../logic/IslandsProblemSolver";
import { sleep } from "../../logic/utils";
import BoardVisualizer from "./BoardVisualizer";
import { Box, Button, Snackbar } from "@material-ui/core";
type SolverPageProps = {
  originalBoard: Board;
  goHome: () => void;
};

const SolverPage = ({ originalBoard, goHome }: SolverPageProps) => {
  const [[ongoingBoard, ongoingBoardId], setOgnoingBoardAndId] = useState<
    [Board, number]
  >([originalBoard.clone(), 0]);
  const [answer, setAnswer] = useState<number | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const solve = () => {
    findNumOfIslands(
      originalBoard,
      (board: Board) => {
        setOgnoingBoardAndId([board, (ongoingBoardId + 1) % 4]);
      },
      () => sleep(100)
    ).then(answer => {
      setAnswer(answer);
      setSnackbarOpen(true);
    });
  };

  const snackbarMessage =
    answer === 0
      ? "There are'nt islands."
      : answer === 1
      ? "There is a single island."
      : `There are ${answer} islands.`;

  return (
    <Box>
      <BoardVisualizer board={ongoingBoard} />
      <Box component="span" mt={2}>
        <Button variant="contained" onClick={goHome}>
          Go Home
        </Button>
      </Box>
      <Box component="span" mt={2} ml={2}>
        <Button variant="contained" color="primary" onClick={solve}>
          Solve
        </Button>
      </Box>

      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center"
        }}
        open={snackbarOpen}
        onClose={_ => setSnackbarOpen(false)}
        message={snackbarMessage}
        action={
          <React.Fragment>
            <Button
              color="secondary"
              size="small"
              onClick={_ => setSnackbarOpen(false)}
            >
              Ok
            </Button>
          </React.Fragment>
        }
      />
    </Box>
  );
};

export default SolverPage;
