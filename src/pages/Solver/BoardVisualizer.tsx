import React from "react";
import { Board } from "../../types/Board";
import _ from "lodash";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import lightBlue from "@material-ui/core/colors/lightBlue";
import orange from "@material-ui/core/colors/orange";
import { Box, Typography } from "@material-ui/core";

type BoardVisualizerProps = {
  board: Board;
};

export const useStyles = makeStyles(_ => ({
  grid: {
    display: "flex",
    flexDirection: "column"
  },
  row: {
    display: "flex",
    flexDirection: "row",
    margin: ".2em 0",
    justifyContent: "center"
  },
  islandPaper: {
    height: "1.8em",
    width: "1.8em",
    lineHeight: "1em",
    padding: ".4em",
    fontSize: ".8em",
    margin: "0 .2em"
  }
}));

const BoardVisualizer = ({ board }: BoardVisualizerProps) => {
  const classes = useStyles();

  return (
    <Box className={classes.grid} mb={2}>
      {_.range(0, board.dimensions.height).map(rowIndex => (
        <div className={classes.row} key={rowIndex}>
          {_.range(0, board.dimensions.width).map(columnIndex => {
            const value = board.getCell(rowIndex, columnIndex);
            return (
              <Paper
                key={`${columnIndex},${rowIndex}`}
                className={classes.islandPaper}
                style={{
                  backgroundColor: value === 0 ? lightBlue[200] : orange[200]
                }}
                elevation={2}
              >
                <Typography>{value}</Typography>
              </Paper>
            );
          })}
        </div>
      ))}
    </Box>
  );
};

export default BoardVisualizer;
