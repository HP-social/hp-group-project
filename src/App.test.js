import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { checkPropTypes, string, array } from 'prop-types';
import configureStore from 'redux-mock-store';

//**** COMPONENTS TO BE TESTED ****
import LandingPage from './components/LandingPage/LandingPage';
import HouseHeader from './components/Tools/HouseHeader/HouseHeader';
import Forum from './components/Forum/Forum';
import Navigation from './components/Navigation/Navigation';
import BottomNav from './components/Navigation/BottomNav';
import Profile from './components/Profile/Profile';
import SortingHat from './components/Login/SortingHat/SortingHat';
import Subscriptions from './components/Favorites/Subscriptions/Subscriptions';
import Card from './components/Forum/Cards/Card';
import Snitch from './components/Snitch/Snitch';
import Tweet from './components/Tweet/Tweet';

Enzyme.configure({ adapter: new Adapter() });

const initialState = {
  user: { house: 'gryffindor', username: 'patronuskiller', wizard_id: 2 },
  followingYou: { count: 0 }
};
const mockStore = configureStore();
let wrapper;
let store;
beforeEach(() => {
  store = mockStore(initialState);
});

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
    expect(wrapper.state('path')).toBe(undefined);
  });
});

test('house header props should be ravenclaw', () => {
  const store = mockStore(initialState);
  const wrapper = shallow(<HouseHeader store={store} house='ravenclaw' />);
  expect(wrapper.props().house).toEqual('ravenclaw');
});

test('Navigation component renders after user login', () => {
  const store = mockStore(initialState);
  const wrapper = shallow(<Navigation store={store} />);
  expect(wrapper.exists()).toBe(true);
});
test('username should be a dynamic string', () => {
  const store = mockStore(initialState);
  const wrapper = shallow(
    <Navigation store={store} username='patronuskiller' />
  );
  expect(wrapper.props().username).toEqual('patronuskiller');
});
test('Profile Comonent renders', () => {
  const store = mockStore(initialState);
  const wrapper = shallow(<Profile store={store} />);
  expect(wrapper.exists()).toBe(true);
});
test('Profile Comonent wizard ID should be 2', () => {
  const store = mockStore(initialState);
  const wrapper = shallow(<Profile store={store} />);
  expect(wrapper.props().user.wizard_id).toBe(2);
});

test('Profile Comonent followYou count should be 0', () => {
  const store = mockStore(initialState);
  const wrapper = shallow(<Profile store={store} />);
  expect(wrapper.props().followingYou.count).toBe(0);
});

//1
test('the position object inside SortingHat has a property - position - equal to 0', () => {
  const store = mockStore(initialState);
  const wrapper = shallow(
    <SortingHat position={{ position: 0 }} store={store} />
  );
  expect(wrapper.props().position.position).toEqual(0);
});

//2
test('if the SortingHat component renders', () => {
  const store = mockStore(initialState);
  const wrapper = shallow(<SortingHat store={store} />);
  expect(wrapper.exists()).toBe(true);
});

//3
describe('SortingHat', () => {
  describe('when makeATweet is false', () => {
    it('should render children', () => {
      const wrapper = mount(<SortingHat makeATweet={false} store={store} />);
      expect(wrapper.html()).toEqual(
        '<div class="theQuiz"><div class="sortingHatQuestionBox"><div id="quiz_name">Sorting Hat Quiz</div><img class="sortingHatPicture" src="https://www.hp-lexicon.org/wp-content/uploads/2016/09/the_sorting_hat_by_sahinduezguen-d47mwt5.png" alt="text"><div class="sortingHatQuestion"></div><div class="sortingHatAnswers"></div></div></div>'
      );
      wrapper.unmount();
    });
  });
});

//4
describe('SortingHat', () => {
  it('should render correctly in "debug" mode', () => {
    const component = shallow(<SortingHat store={store} debug />);
    expect(component).toMatchSnapshot();
  });
});

//5
describe('Tweet', () => {
  it('should render initial layout', () => {
    // when
    const component = shallow(<Tweet store={store} />);
    // then
    expect(component.getElements()).toMatchSnapshot();
  });
});
