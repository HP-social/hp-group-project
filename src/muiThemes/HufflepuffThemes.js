import { createMuiTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';

const hufflepuff = {
	500: '#ecb939'
};

export default createMuiTheme({
	palette: {
		primary: hufflepuff,
		secondary: red,
		error: red
	}
});
