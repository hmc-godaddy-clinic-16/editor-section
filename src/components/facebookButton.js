import React from "react";
import './css/socialMediaButton.css';
import localStrings from './localStrings.json';
import request from "request";


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
		// if (this.state.logoOff) {
		// 	request.get(
		// 	    'http://localhost:4000/login/facebook',
		// 	    { json: { key: 'value' } },
		// 	    function (error, response, body) {
		// 	        if (!error && response.statusCode == 200) {
		// 	            console.log(body)
		// 	        }
		// 	    }
		// 	);

		// 	console.log("post successful");
		// }

		window.location='http://0.0.0.0:4000/login/facebook';

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
					<a href="/fbLogin"/>
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