import React, { useState } from "react";
import { Board } from "../../types/Board";
import findNumOfIslands from "../../logic/IslandsProblemSolver";
import { sleep } from "../../utils/sleep";
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
    const quickRun =
      originalBoard.dimensions.height * originalBoard.dimensions.width > 20;
      
    const sleepLength =
      originalBoard.dimensions.height * originalBoard.dimensions.width > 400
        ? 10
        : originalBoard.dimensions.height * originalBoard.dimensions.width > 200
        ? 20
        : originalBoard.dimensions.height * originalBoard.dimensions.width > 100
        ? 40
        : 100;

    findNumOfIslands(
      originalBoard,
      (board: Board) => {
        setOgnoingBoardAndId([board, (ongoingBoardId + 1) % 4]);
      },
      quickRun,
      () => sleep(sleepLength)
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
    <div>
      <Box mb={2}>
        <BoardVisualizer board={ongoingBoard} />
      </Box>

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
    </div>
  );
};

export default SolverPage;
