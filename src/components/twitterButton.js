import React from "react";
import './css/socialMediaButton.css';
import localStrings from './localStrings.json';

class TwitterButton extends React.Component {
	constructor(props) {
		super(props);

		// toggled off by default
		this.state = {
			logoOff: true
		};

		this.handleToggle = this.handleToggle.bind(this);
	}

	handleToggle() {
		this.setState(prevState => ({
			logoOff: !prevState.logoOff
		}));
	}

	render () {
		return (
			<div className="social-media-button">
				<TwitterLogo logoOff={this.state.logoOff}/>
				<TwitterLabel logoOff={this.state.logoOff}/>
				<label className="toggle">
					<input type="checkbox" onClick={this.handleToggle}/>
					<div className="slider"></div>
				</label>
			</div>
		)
	}
}

class TwitterLogo extends React.Component {
	render () {
		var logo;

		// render different colored logos depending on toggle state
		if (this.props.logoOff) {
			logo = <img src={require('./images/twitterLogoOff.svg')} height="25px" width="25px"/>
		} else {
			logo = <img src={require('./images/twitterLogo.svg')} height="25px" width="25px"/>
		}

		return logo;
	}
}

class TwitterLabel extends React.Component {
	render () {
		var label;
		var labelStyle = {
			'color': '#00a63f'
		};

		// render different colored labels depending on toggle state
		if (this.props.logoOff) {
			label = <div className="toggle-label">{localStrings.twitter}</div>
		} else {
			label = <div className="toggle-label" style={labelStyle}>{localStrings.twitter}</div>
		}

		return label;
	}
}

export default TwitterButton;