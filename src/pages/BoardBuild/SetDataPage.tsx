import React, { useState } from "react";
import { Dimensions } from "../../types/Dimensions";
import _ from "lodash";
import { Button, Box, IconButton, makeStyles } from "@material-ui/core";
import BoardEditor, { BOARD_GUTTER_SIZE } from "./BoardEditor";
import { Fullscreen, FullscreenExit, Home } from "@material-ui/icons";
import useWindowSize from "../../utils/windowSizeHook";

type SetDataPageProps = {
  boardDim: Dimensions;
  setBoardData: (data: number[][]) => void;
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

const SetDataPage = ({
  boardDim,
  setBoardData,
  goHome,
  fullScreenMode,
  setFullScreenMode
}: SetDataPageProps) => {
  const classes = useStyles();

  const [data, setData] = useState(
    _.range(boardDim.height).map(__ => _.range(boardDim.width).map(__ => 0))
  );

  const windowSize = useWindowSize();

  const toggleCell = (row: number, column: number) => {
    setData([
      ...data.slice(0, row),
      [
        ...data[row].slice(0, column),
        data[row][column] === 1 ? 0 : 1,
        ...data[row].slice(column + 1)
      ],
      ...data.slice(row + 1)
    ]);
  };

  const submit = () => {
    setBoardData(data);
  };

  const randomize = () => {
    setData(
      _.range(boardDim.height).map(__ =>
        _.range(boardDim.width).map(__ =>
          // make the probabilty for sea higher
          Math.floor(Math.random() * 3) >= 1 ? 0 : 1
        )
      )
    );
  };

  return (
    <div>
      <Box mb={2}>
        <BoardEditor
          boardDim={boardDim}
          data={data}
          toggleCell={toggleCell}
          width={
            fullScreenMode
              ? windowSize.width
              : Math.min(
                  boardDim.width * (32 + BOARD_GUTTER_SIZE * 2) + 20,
                  400
                )
          }
          height={
            fullScreenMode
              ? windowSize.height
              : Math.min(
                  boardDim.height * (32 + BOARD_GUTTER_SIZE * 2) + 20,
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

        {(boardDim.width > 8 || boardDim.height > 8) && (
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
          <Button variant="contained" onClick={_ => randomize()}>
            Randomize
          </Button>
        </Box>

        <Box component="span" ml={2}>
          <Button variant="contained" color="primary" onClick={_ => submit()}>
            Set
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default SetDataPage;
