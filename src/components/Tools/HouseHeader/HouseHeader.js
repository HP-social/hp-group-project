import React from 'react';
import './HouseHeader.scss';

function HouseHeader(props) {
	if (props.house.indcludes('gryffindor')) {
		return (
			<nav className='topper griff'>
				<sigil className='gryffindor img-responsive' />
			</nav>
		);
	} else if (props.house.includes('ravenclaw')) {
		return (
			<nav className='topper rave'>
				<sigil className='ravenclaw img-responsive' />
			</nav>
		);
	} else if (props.house.includes('hufflepuff')) {
		return (
			<nav className='topper huff'>
				<sigil className='hufflepuff img-responsive' />
			</nav>
		);
	} else if (props.house.includes('slytherin')) {
		return (
			<nav className='topper slyth'>
				<sigil className='slytherin img-responsive' />
			</nav>
		);
	} else {
		return (
			<nav className='topper'>
				<img
					className='hogwarts img-responsive'
					alt='sigil'
					src='http://vignette4.wikia.nocookie.net/harrypotter/images/a/ae/Hogwartscrest.png/revision/latest?cb=20110806202805'
				/>
			</nav>
		);
	}
}

export default HouseHeader;
