import { createMuiTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';

const ravenclaw = {
  500: '#0e1a40'
};

export default createMuiTheme({
  palette: {
    primary: ravenclaw,
    secondary: red,
    error: red
  }
});