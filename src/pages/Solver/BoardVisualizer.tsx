import React from "react";
import { Board } from "../../types/Board";
import _ from "lodash";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

type BoardVisualizerProps = {
  board: Board;
};

const useStyles = makeStyles(theme => ({
  grid: {
    display: "inline-flex",
    flexDirection: "column"
  },
  row: {
    display: "flex",
    flexDirection: "row",
    margin: ".15em 0"
  },
  islandPaper: {
    height: "1em",
    width: "1em",
    lineHeight: "1em",
    padding: ".4em",
    fontSize: ".8em",
    margin: "0 .15em"
  }
}));

const BoardVisualizer = ({ board }: BoardVisualizerProps) => {
  const classes = useStyles();

  return (
    <div className={classes.grid}>
      {_.range(0, board.dimensions.height).map(rowIndex => (
        <div className={classes.row}>
          {_.range(0, board.dimensions.width).map(columnIndex => (
            <Paper
              key={`${columnIndex},${rowIndex}`}
              className={classes.islandPaper}
              elevation={2}
            >
              {board.getCell(rowIndex, columnIndex)}
            </Paper>
          ))}
        </div>
      ))}
    </div>
  );
};

export default BoardVisualizer;
