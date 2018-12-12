import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './ducks/store';
import { BrowserRouter } from 'react-router-dom';
import routes from './routes';
import Navigation from './components/Navigation/Navigation';
import './App.scss';

class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<BrowserRouter>
					<div className='App'>
						{window.location.pathname === '/' ||
						window.location.pathname === '/sortinghat' ? null : (
							<Navigation />
						)}
						<div className='routes'>{routes}</div>
					</div>
				</BrowserRouter>
			</Provider>
		);
	}
}

export default App;
