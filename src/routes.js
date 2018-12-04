import React from 'react';
import { Switch, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import SortingHat from './components/Login/SortingHat/SortingHat';
import Login from './components/Login/Login/Login';
import Tutorial from './components/Login/Tutorial/Tutorial';
import Home from './components/Home/Home';
import Profile from './components/Profile/Profile';
import Messages from './components/Messages/Messages';
import Maps from './components/Maps/Maps';
import Subscriptions from './components/Favorites/Subscriptions/Subscriptions';
import Mentions from './components/Favorites/Mentions/Mentions';
import Follows from './components/Favorites/Follows/Follows';
import Bookmarks from './components/Favorites/Bookmarks/Bookmarks';
import Forum from './components/Forum/Forum';

export default (
	<Switch>
		<Route exact path='/' component={LandingPage} />
		<Route path='/login' component={Login} />
		<Route path='/sortinghat' component={SortingHat} />
		<Route path='/tutorial' component={Tutorial} />
		<Route path='/thequibbler' component={Home} />
		<Route path='/profile/:id' component={Profile} />
		<Route path='/forum/:id' component={Forum} />
		<Route path='/messages' component={Messages} />
		<Route path='/maps' component={Maps} />
		<Route path='/subscriptions' component={Subscriptions} />
		<Route path='/mentions' component={Mentions} />
		<Route path='/follows' component={Follows} />
		<Route path='/bookmarks' component={Bookmarks} />
		<Route
			path='*'
			render={() => (
				<img
					src='https://cdn-images-1.medium.com/max/1600/1*qdFdhbR00beEaIKDI_WDCw.gif'
					alt='whooopies'
				/>
			)}
		/>
	</Switch>
);