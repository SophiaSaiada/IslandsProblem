import React, { forwardRef } from "react";
import { Board } from "../../types/Board";
import _ from "lodash";
import lightBlue from "@material-ui/core/colors/lightBlue";
import orange from "@material-ui/core/colors/orange";
import { makeStyles, ButtonBase, Paper } from "@material-ui/core";
import { FixedSizeGrid as Grid } from "react-window";
import { Dimensions } from "../../types/Dimensions";

type BoardEditorProps = {
  boardDim: Dimensions;
  data: number[][];
  toggleCell: (rowIndex: number, clomunIndex: number) => void;
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
const BoardEditor = ({ boardDim, data, toggleCell }: BoardEditorProps) => {
  const classes = useStyles();

  const Cell = ({ columnIndex, rowIndex, style }: CellProps) => {
    const value = data[rowIndex][columnIndex];
    return (
      <ButtonBase
        focusRipple
        className={classes.islandPaperContainer}
        key={`${columnIndex},${rowIndex}`}
        onClick={_ => toggleCell(rowIndex, columnIndex)}
        style={{
          ...style,
          left: style.left + GUTTER_SIZE,
          top: style.top + GUTTER_SIZE,
          width: style.width - GUTTER_SIZE,
          height: style.height - GUTTER_SIZE
        }}
      >
        <Paper
          className={classes.islandPaper}
          style={{
            backgroundColor: value === 0 ? lightBlue[200] : orange[200],
            transition: "background-color .2s ease"
          }}
          elevation={2}
        >
          {value}
        </Paper>
      </ButtonBase>
    );
  };

  return (
    <div className={classes.gridContainer}>
      <Grid
        columnCount={boardDim.width}
        rowCount={boardDim.height}
        columnWidth={32 + GUTTER_SIZE * 2}
        rowHeight={32 + GUTTER_SIZE * 2}
        height={Math.min(boardDim.height * (32 + GUTTER_SIZE * 2) + 20, 400)}
        width={Math.min(boardDim.width * (32 + GUTTER_SIZE * 2) + 20, 400)}
        innerElementType={innerElementType}
      >
        {Cell}
      </Grid>
    </div>
  );
};

export default BoardEditor;
