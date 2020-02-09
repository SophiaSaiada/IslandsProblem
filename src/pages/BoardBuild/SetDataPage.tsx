import React, { useState } from "react";
import { Dimensions } from "../../types/Dimensions";
import _ from "lodash";
import { Button, Box } from "@material-ui/core";
import BoardEditor from "./BoardEditor";

type SetDataPageProps = {
  boardDim: Dimensions;
  setBoardData: (data: number[][]) => void;
};

const SetDataPage = ({ boardDim, setBoardData }: SetDataPageProps) => {
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
        <BoardEditor boardDim={boardDim} data={data} toggleCell={toggleCell} />
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
