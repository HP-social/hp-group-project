import { createMuiTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';

const gryffindor = {
  500: '#740001'
};

export default createMuiTheme({
  palette: {
    primary: gryffindor,
    secondary: red,
    error: red
  }
});