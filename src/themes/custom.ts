import { createMuiTheme } from "@material-ui/core/styles";
import pink from "@material-ui/core/colors/pink";

export default createMuiTheme({
  palette: {
    primary: pink
  },
  typography: {
    fontFamily: "Jetbrains Mono",
    fontSize: 14
  },
  overrides: {
    MuiButton: {
      root: {
        textTransform: "capitalize"
      }
    }
  }
});
