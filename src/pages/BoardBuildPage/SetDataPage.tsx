import React, { useState } from "react";
import { Dimensions } from "../../types/Dimensions";
import _ from "lodash";

type SetDataPageProps = {
  boardDim: Dimensions;
  setBoardData: (data: number[][]) => void;
};

const SetDataPage = ({ boardDim, setBoardData }: SetDataPageProps) => {
  const [data, setData] = useState(
    _.range(boardDim.height).map(__ => _.range(boardDim.width).map(__ => 0))
  );

  const setCell = (row: number, column: number, checked: boolean) => {
    setData([
      ...data.slice(0, row),
      [
        ...data[row].slice(0, column),
        checked ? 1 : 0,
        ...data[row].slice(column + 1)
      ],
      ...data.slice(row + 1)
    ]);
  };

  const submit = () => {
    setBoardData(data);
  };

  return (
    <div>
      {_.range(boardDim.height).map(rowIndex => (
        <div>
          {_.range(boardDim.width).map(columnIndex => (
            <input
              type="checkbox"
              onChange={e => setCell(rowIndex, columnIndex, e.target.checked)}
            />
          ))}
        </div>
      ))}
      <button onClick={_ => submit()}>Set Data</button>
    </div>
  );
};

export default SetDataPage;
