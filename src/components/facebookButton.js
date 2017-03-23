import React from "react";
import './css/socialMediaButton.css';
import localStrings from './localStrings.json';
import fetch from 'isomorphic-fetch';
import * as constants from './constants.js';
require('es6-promise').polyfill();

class FacebookButton extends React.Component {
	constructor(props) {
		super(props);

		// toggled off by default
		this.state = {
			logoOff: true
		};

		this.handleToggle = this.handleToggle.bind(this);
		this.checkLoggedIn = this.checkLoggedIn.bind(this);
		this.componentDidMount = this.componentDidMount.bind(this);
		this.getSocialState = this.getSocialState.bind(this);
		this.setSocialState = this.setSocialState.bind(this);
	}

	// On page load, send a request to the server to check whether
	// the social media is updated or not
	componentDidMount() {
		this.getSocialState();
		return;
	}

	// Handle case where social media is toggled off
	checkLoggedIn() {

		return fetch( `${constants.SOCIAL_SERVER_URL}/facebook/user`, {
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
	   				window.location='http://127.0.0.1:4000/login/facebook'; // Redirect the user to login to facebook
	   			} else {
	   				return user;
	   			}
	   		});
	   		
	}

	// On page load, check what state the social media toggle is in
	// and set our state to that state
	getSocialState() {
		return fetch( `${constants.SOCIAL_SERVER_URL}/facebook/gettogglestate`, {
			method: "GET"
		})
			.then(function(response) {
		  		if (response.status >= 400) {
		            throw new Error("Bad response from server");
		        }
		        return response.json();

	   		})
	   		.then(function(toggle) {
	   			if (toggle.error) {
	   				return null;
	   			} else {

	   				if (toggle.toggleState == 'true') {
	   					//updateToggle(false);
	   					this.setState({logoOff: false});
	   					this.props.setParentState(prevState => ({
	   						facebookSelected: true,
	   						twitterSelected: prevState.twitterSelected
	   					}));
	   				} else {
	   					this.setState({logoOff: true});
	   					this.props.setParentState(prevState => ({
	   						facebookSelected: false,
	   						twitterSelected: prevState.twitterSelected
	   					}));
	   					//updateToggle(true);
	   				}
	   				return toggle;
	   			}
	   		}.bind(this));

	}

	// Tell the server that the state of the social media toggle is "off" or "on"
	setSocialState() {
		var post = {
			toggle: !this.state.logoOff
		}
		return fetch( `${constants.SOCIAL_SERVER_URL}/facebook/settogglestate`, {  	
			headers: {
    				'Accept': 'application/json',
    				'Content-Type': 'application/json'

    			},
    			method: "PUT",
    			body: JSON.stringify(post),
    		})
			.then(function(response) {
		  		if (response.status >= 400) {
		            throw new Error("Bad response from server");
		        }
		        return response.json();

	   		})
	   		.then(function(response) {

	   			console.log(response);
	   		});
	}

	handleToggle() {
		// enable/disable share button depending on toggle button
		this.props.setParentState(prevState => ({
			facebookSelected: this.state.logoOff,
			twitterSelected: prevState.twitterSelected
		}));

		this.setState(prevState => ({
			logoOff: !prevState.logoOff
		}),

		function() {
			this.setSocialState();
		}
		);

		this.checkLoggedIn();
	}

	render () {
		console.log("Title: " + this.props.title);
 		console.log("Body text: " + this.props.body);
 		console.log("Publish Date: " + this.props.date);

		return (
			<div className="social-media-button">
				<FacebookLogo logoOff={this.state.logoOff}/>
				<FacebookLabel logoOff={this.state.logoOff}/>
				<label className="toggle">
					<input type="checkbox" checked={!this.state.logoOff} onClick={this.handleToggle}/>
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