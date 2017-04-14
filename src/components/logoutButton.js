/* logoutButton.js

LogoutButton is a component representing a button allowing
the user to log out of their social media account.

*/

import React from 'react';
import './css/removesection.css';
import * as constants from './constants.js';

class LogoutButton extends React.Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick () {
		return fetch( 'http://127.0.0.1:4000/login/logout', {
			method: "GET"
		}).then(()=>{});
	}

	render() {
		var logoutButton;

		// need to handle button changes

		logoutButton = (
			<button className="btn btn-danger btn-dark remove-announcement" onClick={this.handleClick}>Log Out</button>
		);

		return logoutButton;
	}
}

export default LogoutButton;