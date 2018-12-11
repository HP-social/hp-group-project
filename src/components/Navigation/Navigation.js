import React from 'react';
import { connect } from 'react-redux';
import { setUser } from '../../ducks/reducer';
import { Link } from 'react-router-dom';

//******  MATERIAL UI *******
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MessagesIcon from '@material-ui/icons/Mail';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Badge from '@material-ui/core/Badge';
import MentionsIcon from '@material-ui/icons/Notifications';
import AccountCircle from '@material-ui/icons/AccountCircle';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import MoreIcon from '@material-ui/icons/MoreVert';
import { fade } from '@material-ui/core/styles/colorManipulator';
import MapIcon from '@material-ui/icons/Map';
import BookmarksIcon from '@material-ui/icons/Bookmarks';
import GroupIcon from '@material-ui/icons/Group';
import HomeIcon from '@material-ui/icons/Home';
import FollowIcon from '@material-ui/icons/GroupAdd';
import SubscribeIcon from '@material-ui/icons/AddToPhotos';
import DailyProphetIcon from '@material-ui/icons/LibraryBooks';
import LogoutIcon from '@material-ui/icons/RemoveCircle';

const drawerWidth = 400;

const styles = (theme) => ({
	root: {
		width: 'auto',
		display: 'flex'
	},
	grow: {
		flexGrow: 1
	},
	search: {
		position: 'relative',
		borderRadius: theme.shape.borderRadius,
		backgroundColor: fade(theme.palette.common.white, 0.15),
		'&:hover': {
			backgroundColor: fade(theme.palette.common.white, 0.25)
		},
		marginRight: theme.spacing.unit * 1,
		marginLeft: 0,
		width: '100%',
		[theme.breakpoints.up('xs')]: {
			marginLeft: theme.spacing.unit * 1,
			width: '20%'
		}
	},
	searchIcon: {
		width: theme.spacing.unit * 8,
		height: '100%',
		position: 'absolute',
		pointerEvents: 'none',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center'
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		})
	},
	appBarShift: {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen
		})
	},
	menuButton: {
		marginLeft: 12,
		marginRight: 36
	},
	hide: {
		display: 'none'
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
		whiteSpace: 'nowrap'
	},
	drawerOpen: {
		width: drawerWidth,
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen
		})
	},
	drawerClose: {
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		}),
		overflowX: 'hidden',
		width: theme.spacing.unit * 7 + 1,
		[theme.breakpoints.up('sm')]: {
			width: theme.spacing.unit * 9 + 1
		}
	},
	toolbar: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end',
		padding: '0 8px',
		palette: {
			primary1Color: 'black',
			accent1Color: 'gray'
		},
		...theme.mixins.toolbar
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing.unit * 5
	},
	title: {
		display: 'none',
		[theme.breakpoints.up('sm')]: {
			display: 'block'
		}
	},
	sectionDesktop: {
		display: 'none',
		[theme.breakpoints.up('sm')]: {
			display: 'flex'
		}
	},
	sectionMobile: {
		display: 'flex',
		[theme.breakpoints.up('sm')]: {
			display: 'none'
		}
	},
	inputRoot: {
		color: 'inherit',
		width: '100%'
	},
	inputInput: {
		paddingTop: theme.spacing.unit,
		paddingRight: theme.spacing.unit,
		paddingBottom: theme.spacing.unit,
		paddingLeft: theme.spacing.unit * 10,
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('md')]: {
			width: 200
		}
	}
});

class Navigation extends React.Component {
	state = {
		open: false,
		anchorEl: null,
		mobileMoreAnchorEl: null,
		value: 0
	};

	componentDidMount() {
		this.props.setUser();
	}

	handleDrawerOpen = () => {
		this.setState({ open: true });
	};

	handleDrawerClose = () => {
		this.setState({ open: false });
	};
	handleProfileMenuOpen = (event) => {
		alert('Send To Profile Page');
	};

	handleMenuClose = () => {
		this.setState({ anchorEl: null });
		this.handleMobileMenuClose();
	};
	handleMobileMenuOpen = (event) => {
		this.setState({ mobileMoreAnchorEl: event.currentTarget });
	};

	handleMobileMenuClose = () => {
		this.setState({ mobileMoreAnchorEl: null });
	};

	render() {
		const { classes, theme } = this.props;
		const { anchorEl, mobileMoreAnchorEl } = this.state;
		const isMenuOpen = Boolean(anchorEl);
		const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

		const renderMenu = (
			<Menu
				anchorEl={anchorEl}
				anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
				transformOrigin={{ vertical: 'top', horizontal: 'right' }}
				open={isMenuOpen}
				onClose={this.handleMenuClose}
			>
				<MenuItem onClick={this.handleMenuClose}>Profile</MenuItem>
				<MenuItem onClick={this.handleMenuClose}>My account</MenuItem>
			</Menu>
		);

		const renderMobileMenu = (
			<Menu
				anchorEl={mobileMoreAnchorEl}
				anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
				transformOrigin={{ vertical: 'top', horizontal: 'right' }}
				open={isMobileMenuOpen}
				onClose={this.handleMobileMenuClose}
			>
				<Link to={'/dailyprophet'}>
					<MenuItem>
						<IconButton color='inherit'>
							<Badge
								badgeContent={`${this.props.dailyProphetCount}` && 5}
								color='secondary'
							>
								<DailyProphetIcon />
							</Badge>
						</IconButton>
						<p>Daily Prophet</p>
					</MenuItem>
				</Link>
				<Link to={'/messages'}>
					<MenuItem>
						<IconButton color='inherit'>
							<Badge
								badgeContent={`${this.props.messagesCount}` && 2}
								color='secondary'
							>
								<MessagesIcon />
							</Badge>
						</IconButton>
						<p>Messages</p>
					</MenuItem>
				</Link>
				<Link to={'/thequibbler'}>
					<MenuItem>
						<IconButton color='inherit'>
							<Badge
								badgeContent={`${this.props.mentionsCount}` && 14}
								color='secondary'
							>
								<MentionsIcon />
							</Badge>
						</IconButton>
						<p>Mentions</p>
					</MenuItem>
				</Link>
				<div
					onClick={() =>
						window.open(`${process.env.REACT_APP_SERVER}/api/logout`, '_self')
					}
				>
					<MenuItem>
						<IconButton color='inherit'>
							<LogoutIcon />
						</IconButton>
						<p>Logout</p>
					</MenuItem>
				</div>
			</Menu>
		);

		const sideIconTop = [<AccountCircle />, <SubscribeIcon />, <FollowIcon />];
		const sideIconBottom = [
			<HomeIcon />,
			<MapIcon />,
			<BookmarksIcon />,
			<GroupIcon />
		];

		const dynamicLinkTop = [
			`/profile/${this.props.user.wizard_id}`,
			'/subscriptions',
			'/follows'
		];
		const dynamicLinkBottom = [
			'/forum/:id',
			'/maps',
			'/bookmarks',
			'/lasfkjaf'
		];

		return (
			<div className={classes.root}>
				<CssBaseline />
				<AppBar
					position='fixed'
					className={classNames(classes.appBar, {
						[classes.appBarShift]: this.state.open
					})}
				>
					<Toolbar disableGutters={!this.state.open}>
						<IconButton
							color='inherit'
							aria-label='Open drawer'
							onClick={this.handleDrawerOpen}
							className={classNames(classes.menuButton, {
								[classes.hide]: this.state.open
							})}
						>
							<MenuIcon />
						</IconButton>
						<IconButton
							aria-owns={isMenuOpen ? 'material-appbar' : undefined}
							aria-haspopup='true'
							// onClick={this.handleProfileMenuOpen}
							color='inherit'
						/>
						<div className={classes.search}>
							<div className={classes.searchIcon}>
								<SearchIcon />
							</div>
							<InputBase
								// placeholder="Search…"
								classes={{ root: classes.inputRoot, input: classes.inputInput }}
							/>
						</div>
						<div className={classes.grow} />
						<div className={classes.sectionDesktop}>
							<IconButton color='inherit'>
								<Badge
									badgeContent={`${this.props.dailyProphetCount}` && 5}
									color='secondary'
								>
									<Link to={'/dailyprophet'}>
										<DailyProphetIcon />{' '}
									</Link>
								</Badge>
							</IconButton>
							<IconButton color='inherit'>
								<Badge
									badgeContent={`${this.props.messagesCount}` && 2}
									color='secondary'
								>
									<Link to={'/messages'}>
										<MessagesIcon />
									</Link>
								</Badge>
							</IconButton>
							<IconButton color='inherit'>
								<Badge
									badgeContent={`${this.props.mentionsCount}` && 14}
									color='secondary'
								>
									<Link to={'/thequibbler'}>
										<MentionsIcon />
									</Link>
								</Badge>
							</IconButton>
							<div
								onClick={() =>
									window.open(
										`${process.env.REACT_APP_SERVER}/api/logout`,
										'_self'
									)
								}
							>
								<IconButton color='inherit'>
									<LogoutIcon />
								</IconButton>
							</div>
						</div>
						<div className={classes.sectionMobile}>
							<IconButton
								aria-haspopup='true'
								onClick={this.handleMobileMenuOpen}
								color='inherit'
							>
								<MoreIcon />
							</IconButton>
						</div>
					</Toolbar>
				</AppBar>
				{renderMenu}
				{renderMobileMenu}
				<Drawer
					variant='permanent'
					className={classNames(classes.drawer, {
						[classes.drawerOpen]: this.state.open,
						[classes.drawerClose]: !this.state.open
					})}
					classes={{
						paper: classNames({
							[classes.drawerOpen]: this.state.open,
							[classes.drawerClose]: !this.state.open
						})
					}}
					open={this.state.open}
				>
					<div className={classes.toolbar}>
						<IconButton onClick={this.handleDrawerClose}>
							{theme.direction === 'rtl' ? (
								<ChevronRightIcon />
							) : (
								<ChevronLeftIcon />
							)}
						</IconButton>
					</div>
					<Divider />
					<List>
						{[
							`${this.props.username}` && 'Username',
							'Subscriptions',
							'Follow'
						].map((text, index) => (
							<Link to={dynamicLinkTop[index]}>
								<ListItem button key={text}>
									<ListItemIcon
										aria-owns={isMenuOpen ? 'material-appbar' : undefined}
										aria-haspopup='true'
										// onClick={this.handleProfileMenuOpen}
										color='inherit'
									>
										{sideIconTop[index]}
									</ListItemIcon>
									<ListItemText primary={text} />
								</ListItem>
							</Link>
						))}
					</List>
					<Divider />
					<List>
						{['Commons', 'Map', 'Bookmarks', 'Stairwell'].map((text, index) => (
							<Link to={dynamicLinkBottom[index]}>
								<ListItem button key={text}>
									<ListItemIcon>{sideIconBottom[index]}</ListItemIcon>
									<ListItemText primary={text} />
								</ListItem>
							</Link>
						))}
					</List>
				</Drawer>
				<main className={classes.content}>
					<div className={classes.toolbar} />
				</main>
			</div>
		);
	}
}

function mapStateToProps(state) {
	const { user } = state;
	return {
		user
	};
}
Navigation.propTypes = {
	classes: PropTypes.object.isRequired,
	theme: PropTypes.object.isRequired
};

export default connect(
	mapStateToProps,
	{ setUser }
)(withStyles(styles, { withTheme: true })(Navigation));
