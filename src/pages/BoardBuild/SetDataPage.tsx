import React, { useState } from "react";
import { Dimensions } from "../../types/Dimensions";
import _ from "lodash";
import {
  makeStyles,
  ButtonBase,
  Button,
  Paper,
  Box,
  Typography
} from "@material-ui/core";
import lightBlue from "@material-ui/core/colors/lightBlue";
import orange from "@material-ui/core/colors/orange";
import { useStyles } from "../Solver/BoardVisualizer";

type SetDataPageProps = {
  boardDim: Dimensions;
  setBoardData: (data: number[][]) => void;
};

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
      <Box className={classes.grid} mb={2}>
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
                      backgroundColor:
                        value === 0 ? lightBlue[200] : orange[200],
                      transition: "background-color .2s ease"
                    }}
                    elevation={2}
                  >
                    <Typography>{value}</Typography>
                  </Paper>
                </ButtonBase>
              );
            })}
          </div>
        ))}
      </Box>

      <Box component="span" mt={2}>
        <Button variant="contained" onClick={_ => randomize()}>
          Randomize
        </Button>
      </Box>

      <Box component="span" mt={2} ml={2}>
        <Button variant="contained" color="primary" onClick={_ => submit()}>
          Set
        </Button>
      </Box>
    </div>
  );
};

export default SetDataPage;
