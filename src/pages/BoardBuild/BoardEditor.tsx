import React, { forwardRef } from "react";
import { makeStyles, ButtonBase, Paper } from "@material-ui/core";
import { FixedSizeGrid as Grid } from "react-window";
import { Dimensions } from "../../types/Dimensions";

type BoardEditorProps = {
  boardDim: Dimensions;
  data: number[][];
  toggleCell: (rowIndex: number, clomunIndex: number) => void;
  width: number;
  height: number;
  paddingBottom: number;
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

export const BOARD_GUTTER_SIZE = 8;

const innerElementType = (paddingBottom: number) =>
  forwardRef((props: any, ref: any) => {
    const { style, ...rest } = props;

    return (
      <div
        ref={ref}
        style={{
          ...style,
          paddingLeft: BOARD_GUTTER_SIZE,
          paddingTop: BOARD_GUTTER_SIZE,
          height: `${parseFloat(style.height) + paddingBottom}px`
        }}
        {...rest}
      />
    );
  });

const BoardEditor = ({
  boardDim,
  data,
  toggleCell,
  width,
  height,
  paddingBottom
}: BoardEditorProps) => {
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
          left: style.left + BOARD_GUTTER_SIZE,
          top: style.top + BOARD_GUTTER_SIZE,
          width: style.width - BOARD_GUTTER_SIZE,
          height: style.height - BOARD_GUTTER_SIZE
        }}
      >
        <Paper
          className={classes.islandPaper}
          style={{
            backgroundColor: value === 0 ? "#b3e5fc" : "#9a472d",
            color: value === 0 ? "#000" : "#fff",
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
        columnWidth={32 + BOARD_GUTTER_SIZE * 2}
        rowHeight={32 + BOARD_GUTTER_SIZE * 2}
        height={height}
        width={width}
        innerElementType={innerElementType(paddingBottom)}
      >
        {Cell}
      </Grid>
    </div>
  );
};

export default BoardEditor;
