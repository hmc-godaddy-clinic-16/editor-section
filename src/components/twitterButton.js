import React from "react";
import './css/socialMediaButton.css';
import localStrings from './localStrings.json';
import fetch from 'isomorphic-fetch';
import * as constants from './constants.js';
require('es6-promise').polyfill();

class TwitterButton extends React.Component {
	constructor(props) {
		super(props);

		// toggled off by default
		this.state = {
			logoOff: true
		};

		this.handleToggle = this.handleToggle.bind(this);
		this.checkLoggedIn = this.checkLoggedIn.bind(this);
	}

	checkLoggedIn() {
		console.log("CHECKING LOGGED IN STATUS");

		return fetch( `${constants.SOCIAL_SERVER_URL}/twitter/user`, {
			method: "GET"
		})
			.then(function(response) {
		  		if (response.status >= 400) {
		            throw new Error("Bad response from server");
		        }
		        return response.json();

	   		})
	   		.then(function(user) {
	   			if (user.error) {
	   				window.location='http://127.0.0.1:4000/login/twitter'; // Redirect the user to login to twitter
	   			} else {
	   				return user;
	   			}
	   			console.log(user);
	   		});
	   		
	}

	handleToggle() {
		this.setState(prevState => ({
			logoOff: !prevState.logoOff
		}));

		this.checkLoggedIn();

		// enable/disable share button depending on toggle button
		this.props.setParentState(prevState => ({
			facebookSelected: prevState.facebookSelected,
			twitterSelected: !prevState.twitterSelected
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