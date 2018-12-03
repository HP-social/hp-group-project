import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import { BrowserRouter } from 'react-router-dom';
import routes from './routes';
import Navigation from './components/Navigation/Navigation';
import './App.css';

class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<BrowserRouter>
					<Navigation />
					<div className='App'>{routes}</div>
				</BrowserRouter>
			</Provider>
		);
	}
}

export default App;
