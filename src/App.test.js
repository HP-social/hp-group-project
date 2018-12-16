import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { checkPropTypes, string } from 'prop-types';
import configureStore from 'redux-mock-store';

//**** COMPONENTS TO BE TESTED **** 
import LandingPage from './components/LandingPage/LandingPage';
import HouseHeader from './components/Tools/HouseHeader/HouseHeader';
import Navigation from './components/Navigation/Navigation';
import BottomNav from './components/Navigation/BottomNav';

Enzyme.configure({ adapter: new Adapter() });

const initialState = { user: { house: 'gryffindor', username: 'patronuskiller'} };
const mockStore = configureStore();
// let wrapper;
// let store;
// beforeEach(()=>{
//   store=mockStore(initialState)
// })

const setup = props => {};

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

test('state should be string', () => {
  const store = mockStore(initialState);
  const wrapper = shallow(<BottomNav store={store} />);
  expect(wrapper.state('path')).toBe(undefined);
});

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

test('house header props should be ravenclaw', () => {
  const store = mockStore(initialState);
  const wrapper = shallow(<HouseHeader store={store} house='ravenclaw' />);
  expect(wrapper.props().house).toEqual('ravenclaw');
});
test('username should be a dynamic string', () => {
  const store = mockStore(initialState);
  const wrapper = shallow(<Navigation store={store} username='patronuskiller'/>);
  expect(wrapper.props().username).toEqual('patronuskiller');
});
