import React from "react";
import './css/socialMediaButton.css';
import localStrings from './localStrings.json';

class FacebookButton extends React.Component {
	render () {
		return (
			<div className="social-media-button">
				<img src={require('./images/facebookLogo.svg')} height="25px" width="25px"/>
				<div className="toggle-label">{localStrings.fb}</div>
				<label className="toggle">
					<input type="checkbox"/>
					<div className="slider"></div>
				</label>
			</div>
		)}
}

export default FacebookButton;