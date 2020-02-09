import React, { forwardRef, useState } from "react";
import { Board } from "../../types/Board";
import { makeStyles, Paper } from "@material-ui/core";
import { FixedSizeGrid as Grid } from "react-window";
import _ from "lodash";

type BoardVisualizerProps = {
  board: Board;
};

export const useStyles = makeStyles(_ => ({
  gridContainer: {
    display: "flex",
    justifyContent: "center"
  },
  islandPaperContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  islandPaper: {
    display: "inline-block",
    fontFamily: "Jetbrains Mono",
    height: "32px",
    width: "32px",
    lineHeight: "32px",
    textAlign: "center",
    fontSize: "16px",
    background: "red"
  }
}));

type CellProps = {
  columnIndex: number;
  rowIndex: number;
  style: any;
};

const GUTTER_SIZE = 8;

const innerElementType = forwardRef((props: any, ref: any) => {
  const { style, ...rest } = props;

  return (
    <div
      ref={ref}
      style={{
        ...style,
        paddingLeft: GUTTER_SIZE,
        paddingTop: GUTTER_SIZE
      }}
      {...rest}
    />
  );
});

const BoardVisualizer = ({ board }: BoardVisualizerProps) => {
  const classes = useStyles();

  const [colors, setColors] = useState(["#b3e5fc", "#9a472d"]);

  const generateColors = (endIndex: number) => {
    const generatedColors = new Set<String>(colors);

    const generateNewColor = () => {
      const randomColor = () => {
        const letters = "0123456789ABCDEF";
        return _.range(0, 3).reduce(
          (acc, _) =>
            acc +
            letters[Math.floor(Math.random() * 8)] +
            letters[Math.floor(Math.random() * 16)],
          "#"
        );
      };
      let newColor = randomColor();
      while (generatedColors.has(newColor)) newColor = randomColor();
      generatedColors.add(newColor);
      return newColor;
    };

    return colors.concat(
      _.range(colors.length, endIndex + 1).map(_ => generateNewColor())
    );
  };

  const Cell = ({ columnIndex, rowIndex, style }: CellProps) => {
    const value = board.data[rowIndex][columnIndex];
    if (value >= colors.length) {
      setColors(generateColors(value));
    }
    return (
      <div
        key={`${columnIndex},${rowIndex}`}
        className={classes.islandPaperContainer}
        style={{
          ...style,
          left: style.left + GUTTER_SIZE,
          top: style.top + GUTTER_SIZE,
          width: style.width - GUTTER_SIZE,
          height: style.height - GUTTER_SIZE,
          padding: 0,
          margin: 0
        }}
      >
        <Paper
          className={classes.islandPaper}
          style={{
            backgroundColor: colors[value],
            color: value === 0 ? "#000" : "#fff",
            transition: "background-color .2s ease"
          }}
          elevation={2}
        >
          {value}
        </Paper>
      </div>
    );
  };

  return (
    <div className={classes.gridContainer}>
      <Grid
        columnCount={board.dimensions.width}
        rowCount={board.dimensions.height}
        columnWidth={32 + GUTTER_SIZE * 2}
        rowHeight={32 + GUTTER_SIZE * 2}
        height={Math.min(
          board.dimensions.height * (32 + GUTTER_SIZE * 2) + 20,
          400
        )}
        width={Math.min(
          board.dimensions.width * (32 + GUTTER_SIZE * 2) + 20,
          400
        )}
        innerElementType={innerElementType}
      >
        {Cell}
      </Grid>
    </div>
  );
};

export default BoardVisualizer;
