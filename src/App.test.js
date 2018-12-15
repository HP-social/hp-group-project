import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import BottomNav from './components/Navigation/BottomNav';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import LandingPage from './components/LandingPage/LandingPage';
import { checkPropTypes } from 'prop-types';
import configureStore from 'redux-mock-store';
import HouseHeader from './components/Tools/HouseHeader/HouseHeader';
import Forum from './components/Forum/Forum';

Enzyme.configure({ adapter: new Adapter() });

const initialState = { user: { house: 'gryffindor' } };
const mockStore = configureStore();
// let wrapper;
// let store;
// beforeEach(()=>{
//   store=mockStore(initialState)
// })

describe('App renders', () => {
	it('renders without crashing', () => {
		const div = document.createElement('div');
		ReactDOM.render(<App />, div);
		ReactDOM.unmountComponentAtNode(div);
	});
});

describe('Landing Page Test', () => {
	test('Landing Page renders', () => {
		const store = mockStore(initialState);
		const wrapper = shallow(<LandingPage store={store} />);
		expect(wrapper.exists()).toBe(true);
	});

	test('props house is gryffindor', () => {
		const store = mockStore(initialState);
		const wrapper = shallow(<LandingPage store={store} />);
		expect(wrapper.props().user.house).toBe('gryffindor');
	});
});

describe('BottomNav state', () => {
	test('state should be string', () => {
		const store = mockStore(initialState);
		const wrapper = shallow(<BottomNav store={store} />);
		expect(wrapper.state()).toBe(undefined);
	});
});

test('house header props should be ravenclaw', () => {
	const store = mockStore(initialState);
	const wrapper = shallow(<HouseHeader store={store} house='ravenclaw' />);
	expect(wrapper.props().house).toEqual('ravenclaw');
});
