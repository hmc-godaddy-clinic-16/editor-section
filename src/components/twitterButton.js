import React from "react";
import './css/socialMediaButton.css';
import localStrings from './localStrings.json';

class TwitterButton extends React.Component {
	render () {
		var button;
		var loggedIn = false;	// assume unauthenticated upon first visit

		// show toggle option to post if user has already logged in
		if (loggedIn) {
			button = (
				<div>
					<div className="toggleLabel">{localStrings.twitter}</div> 
					<label className="toggle">
						<input type="checkbox"/>
						<div className="slider"></div>
					</label>
				</div>
			);
		// show login buttons if user has not already logged in
		} else {
			button = (
				<button type="submit" className="loginButton">
					<img src={require('./images/twitterButton.svg')}/>
				</button>
			);
		}

		return button;
	}
}

export default TwitterButton;