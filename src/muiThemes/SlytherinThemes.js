import { createMuiTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';

const slytherin = {
  500: '#1a4629'
};

export default createMuiTheme({
  palette: {
    primary: slytherin,
    secondary: red,
    error: red
  }
});
