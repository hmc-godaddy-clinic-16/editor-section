import React from "react";
import './css/socialMediaButton.css';
import localStrings from './localStrings.json';

class FacebookButton extends React.Component {
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

		// enable/disable share button depending on toggle button
		this.props.setParentState(prevState => ({
			facebookSelected: !prevState.facebookSelected,
			twitterSelected: prevState.twitterSelected
		}));
	}

	render () {
		return (
			<div className="social-media-button">
				<FacebookLogo logoOff={this.state.logoOff}/>
				<FacebookLabel logoOff={this.state.logoOff}/>
				<label className="toggle">
					<input type="checkbox" onClick={this.handleToggle}/>
					<div className="slider"></div>
				</label>
			</div>
		)
	}
}

class FacebookLogo extends React.Component {
	render () {
		var logo;

		// render different colored logos depending on toggle state
		if (this.props.logoOff) {
			logo = <img src={require('./images/facebookLogoOff.svg')} height="25px" width="25px"/>
		} else {
			logo = <img src={require('./images/facebookLogo.svg')} height="25px" width="25px"/>
		}

		return logo;
	}
}

class FacebookLabel extends React.Component {
	render () {
		var label;
		var labelStyle = {
			'color': '#00a63f'
		};

		// render different colored labels depending on toggle state
		if (this.props.logoOff) {
			label = <div className="toggle-label">{localStrings.fb}</div>
		} else {
			label = <div className="toggle-label" style={labelStyle}>{localStrings.fb}</div>
		}

		return label;
	}
}

export default FacebookButton;