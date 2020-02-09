import React, { useState, useEffect, useRef } from "react";
import { Board } from "../../types/Board";
import findNumOfIslands from "../../logic/IslandsProblemSolver";
import { sleep } from "../../utils/sleep";
import BoardVisualizer, { BOARD_GUTTER_SIZE } from "./BoardVisualizer";
import {
  Box,
  Button,
  Snackbar,
  makeStyles,
  IconButton
} from "@material-ui/core";
import useWindowSize from "../../utils/windowSizeHook";
import { FullscreenExit, Fullscreen, Home } from "@material-ui/icons";

type SolverPageProps = {
  originalBoard: Board;
  goHome: () => void;
  fullScreenMode: boolean;
  setFullScreenMode: (fullScreenMode: boolean) => void;
};

const useStyles = makeStyles(_ => ({
  controllersConatiner: {
    position: "fixed",
    bottom: 0,
    left: 0,
    width: "100%",
    backdropFilter: "blur(7px)",
    backgroundColor: "rgba(255, 255, 255, .5)",
    padding: "10px 0"
  }
}));

const SolverPage = ({
  originalBoard,
  goHome,
  fullScreenMode,
  setFullScreenMode
}: SolverPageProps) => {
  const classes = useStyles();

  const [[ongoingBoard, ongoingBoardId], setOgnoingBoardAndId] = useState<
    [Board, number]
  >([originalBoard.clone(), 0]);
  const [answer, setAnswer] = useState<number | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const windowSize = useWindowSize();

  const isMounted = useRef(true);
  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const solve = () => {
    const quickRun =
      originalBoard.dimensions.height * originalBoard.dimensions.width > 1000;

    const sleepLength =
      originalBoard.dimensions.height * originalBoard.dimensions.width > 400
        ? 1
        : originalBoard.dimensions.height * originalBoard.dimensions.width > 200
        ? 5
        : originalBoard.dimensions.height * originalBoard.dimensions.width > 100
        ? 10
        : 100;

    findNumOfIslands(
      originalBoard,
      (board: Board) => {
        if (!isMounted.current) return;
        setOgnoingBoardAndId([board, (ongoingBoardId + 1) % 4]);
      },
      quickRun,
      () => sleep(sleepLength)
    ).then(answer => {
      if (!isMounted.current) return;
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
        <BoardVisualizer
          board={ongoingBoard}
          width={
            fullScreenMode
              ? windowSize.width
              : Math.min(
                  originalBoard.dimensions.width *
                    (32 + BOARD_GUTTER_SIZE * 2) +
                    20,
                  400
                )
          }
          height={
            fullScreenMode
              ? windowSize.height
              : Math.min(
                  originalBoard.dimensions.height *
                    (32 + BOARD_GUTTER_SIZE * 2) +
                    20,
                  400
                )
          }
          paddingBottom={fullScreenMode ? 80 : 0}
        />
      </Box>

      <Box
        mt={2}
        className={fullScreenMode ? classes.controllersConatiner : ""}
      >
        <Box component="span">
          <IconButton
            color={fullScreenMode ? "inherit" : "primary"}
            onClick={goHome}
          >
            <Home />
          </IconButton>
        </Box>

        {(originalBoard.dimensions.width > 8 ||
          originalBoard.dimensions.height > 8) && (
          <Box component="span">
            <IconButton
              color={fullScreenMode ? "inherit" : "primary"}
              onClick={_ => setFullScreenMode(!fullScreenMode)}
            >
              {fullScreenMode ? <FullscreenExit /> : <Fullscreen />}
            </IconButton>
          </Box>
        )}

        <Box component="span" ml={2}>
          <Button variant="contained" color="primary" onClick={solve}>
            Solve
          </Button>
        </Box>
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
