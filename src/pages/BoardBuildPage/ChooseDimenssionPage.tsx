import React, { useState } from "react";
import { Dimensions } from "../../types/Dimensions";

type ChooseDimenssionPageProps = {
  setBoardDim: (dimensions: Dimensions) => void;
};

const ChooseDimenssionPage = ({ setBoardDim }: ChooseDimenssionPageProps) => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const chooseDimenssion = () => {
    setBoardDim({ width, height });
  };
  return (
    <div>
      <input type="number" onChange={e => setWidth(parseInt(e.target.value))} />
      <input
        type="number"
        onChange={e => setHeight(parseInt(e.target.value))}
      />
      <button onClick={_ => chooseDimenssion()}>Choose</button>
    </div>
  );
};

export default ChooseDimenssionPage;
