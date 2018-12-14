import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setUser } from '../../ducks/reducer';
import { Map, GoogleApiWrapper } from 'google-maps-react';
import './Maps.scss';
import HouseHeader from '../Tools/HouseHeader/HouseHeader';

const mapStyles = {
	width: '98.76%',
	height: '84%'
};
const styles = [
	{
		featureType: 'all',
		elementType: 'all',
		stylers: [
			{
				color: '#4b0202'
			},
			{
				gamma: '2.38'
			},
			{
				saturation: '0'
			},
			{
				visibility: 'simplified'
			}
		]
	},
	{
		featureType: 'all',
		elementType: 'geometry',
		stylers: [
			{
				color: '#ebc876'
			}
		]
	},
	{
		featureType: 'all',
		elementType: 'labels.text.fill',
		stylers: [
			{
				gamma: 0.01
			},
			{
				lightness: 20
			}
		]
	},
	{
		featureType: 'all',
		elementType: 'labels.text.stroke',
		stylers: [
			{
				saturation: -31
			},
			{
				lightness: -33
			},
			{
				weight: 2
			},
			{
				gamma: 0.8
			}
		]
	},
	{
		featureType: 'all',
		elementType: 'labels.icon',
		stylers: [
			{
				visibility: 'off'
			}
		]
	},
	{
		featureType: 'administrative',
		elementType: 'all',
		stylers: [
			{
				color: '#a00404'
			},
			{
				weight: '0.18'
			}
		]
	},
	{
		featureType: 'administrative',
		elementType: 'labels',
		stylers: [
			{
				color: '#980000'
			}
		]
	},
	{
		featureType: 'administrative.country',
		elementType: 'all',
		stylers: [
			{
				color: '#690000'
			}
		]
	},
	{
		featureType: 'administrative.province',
		elementType: 'all',
		stylers: [
			{
				color: '#950000'
			}
		]
	},
	{
		featureType: 'administrative.locality',
		elementType: 'all',
		stylers: [
			{
				color: '#4b0202'
			}
		]
	},
	{
		featureType: 'landscape',
		elementType: 'geometry',
		stylers: [
			{
				lightness: 30
			},
			{
				saturation: 30
			}
		]
	},
	{
		featureType: 'poi',
		elementType: 'geometry',
		stylers: [
			{
				saturation: 20
			}
		]
	},
	{
		featureType: 'poi.park',
		elementType: 'geometry',
		stylers: [
			{
				lightness: 20
			},
			{
				saturation: -20
			}
		]
	},
	{
		featureType: 'road',
		elementType: 'all',
		stylers: [
			{
				color: '#fff0bc'
			}
		]
	},
	{
		featureType: 'road',
		elementType: 'geometry',
		stylers: [
			{
				lightness: 10
			},
			{
				saturation: -30
			}
		]
	},
	{
		featureType: 'road',
		elementType: 'geometry.stroke',
		stylers: [
			{
				saturation: 25
			},
			{
				lightness: 25
			}
		]
	},
	{
		featureType: 'transit.line',
		elementType: 'all',
		stylers: [
			{
				color: '#4b0202'
			},
			{
				weight: '0.50'
			}
		]
	},
	{
		featureType: 'water',
		elementType: 'all',
		stylers: [
			{
				lightness: -20
			}
		]
	},
	{
		featureType: 'water',
		elementType: 'geometry',
		stylers: [
			{
				color: '#d6a95d'
			}
		]
	}
];

export class Maps extends Component {
	render() {
		return (
			<div className='fav'>
				<div className='mapground'>
					<HouseHeader house=''>Maurader's Map</HouseHeader>
					<h1 className='font'>I Solemnly Swear that I am up to No Good.</h1>
				</div>
				<Map
					google={this.props.google}
					zoom={14}
					style={mapStyles}
					styles={styles}
					initialCenter={{
						lat: 32.9914,
						lng: -96.6645
					}}
				/>
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

export default connect(
	mapStateToProps,
	{ setUser }
)(
	GoogleApiWrapper({
		apiKey: process.env.REACT_APP_GOOGLEAPI
	})(Maps)
);

// export default GoogleApiWrapper({
// 	apiKey: process.env.REACT_APP_GOOGLEAPI
// })(MapContainer);
