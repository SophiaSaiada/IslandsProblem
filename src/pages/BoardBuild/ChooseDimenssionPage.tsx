import React, { useState } from "react";
import { Dimensions } from "../../types/Dimensions";
import { TextField, Button, makeStyles, Box, Typography } from "@material-ui/core";

type ChooseDimenssionPageProps = {
  setBoardDim: (dimensions: Dimensions) => void;
};

const useStyles = makeStyles(_ => ({
  dimensionsConatiner: {
    display: "inline-flex",
    flexDirection: "row",
    alignItems: "center"
  },
  crossSign: {
    fontSize: "1.5em",
    margin: "0 .5em"
  }
}));

const ChooseDimenssionPage = ({ setBoardDim }: ChooseDimenssionPageProps) => {
  const classes = useStyles();

  const [width, setWidth] = useState(8);
  const [height, setHeight] = useState(8);
  const chooseDimenssion = () => {
    setBoardDim({ width, height });
  };
  return (
    <form>
      <Box mb={2}>
        <Typography>
          Please enter bitmap size:
        </Typography>
      </Box>
      <div className={classes.dimensionsConatiner}>
        <TextField
          id="filled-basic"
          label="Width"
          variant="filled"
          type="number"
          defaultValue={8}
          onChange={e => setWidth(parseInt(e.target.value))}
        />
        <div className={classes.crossSign}>×</div>
        <TextField
          id="filled-basic"
          label="Height"
          variant="filled"
          type="number"
          defaultValue={8}
          onChange={e => setHeight(parseInt(e.target.value))}
        />
      </div>
      <Box m={3}>
        <Button
          variant="contained"
          color="primary"
          onClick={_ => chooseDimenssion()}
        >
          Choose
        </Button>
      </Box>
    </form>
  );
};

export default ChooseDimenssionPage;
