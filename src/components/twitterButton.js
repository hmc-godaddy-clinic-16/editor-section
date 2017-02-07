import React from "react";
import './css/socialMediaButton.css';
import localStrings from './localStrings.json';

class TwitterButton extends React.Component {
	render () {
		var button;
		var loggedIn = true;	// assume unauthenticated upon first visit

		var loginButton = (
			<button type="submit" className="loginButton">
				<img src={require('./images/twitterButton.svg')}/>
			</button>
		);

		var toggleButton = (
			<div>
				<label className="toggle">
					<input type="checkbox"/>
					<div className="slider">
						<div className="sliderText">{localStrings.twitter}</div>
					</div>
				</label>
			</div>
		);

		// show toggle option to post if user has already logged in
		if (loggedIn) {
			button = toggleButton;
		// show login buttons if user has not already logged in
		} else {
			button = loginButton;
		}

		return button;
	}
}

export default TwitterButton;