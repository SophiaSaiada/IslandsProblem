import React, { useState } from "react";
import { Dimensions } from "../../types/Dimensions";
import _ from "lodash";
import { makeStyles, ButtonBase, Paper } from "@material-ui/core";
import lightBlue from "@material-ui/core/colors/lightBlue";
import orange from "@material-ui/core/colors/orange";

type SetDataPageProps = {
  boardDim: Dimensions;
  setBoardData: (data: number[][]) => void;
};

const useStyles = makeStyles(_ => ({
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

const SetDataPage = ({ boardDim, setBoardData }: SetDataPageProps) => {
  const classes = useStyles();

  const [data, setData] = useState(
    _.range(boardDim.height).map(__ => _.range(boardDim.width).map(__ => 0))
  );

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
        _.range(boardDim.width).map(__ => Math.round(Math.random()))
      )
    );
  };

  return (
    <div>
      <div className={classes.grid}>
        {_.range(boardDim.height).map(rowIndex => (
          <div className={classes.row} key={rowIndex}>
            {_.range(boardDim.width).map(columnIndex => {
              const value = data[rowIndex][columnIndex];
              return (
                <ButtonBase
                  focusRipple
                  key={`${columnIndex},${rowIndex}`}
                  onClick={_ => toggleCell(rowIndex, columnIndex)}
                  style={{ font: "unset" }}
                >
                  <Paper
                    className={classes.islandPaper}
                    style={{
                      backgroundColor: value == 0 ? lightBlue[200] : orange[200],
                      transition: "background-color .2s ease"
                    }}
                    elevation={2}
                  >
                    {value}
                  </Paper>
                </ButtonBase>
              );
            })}
          </div>
        ))}
      </div>
      <br />
      <button onClick={_ => randomize()}>Rnadomize</button>
      <button onClick={_ => submit()}>Set Data</button>
    </div>
  );
};

export default SetDataPage;
