import React from "react";
import FacebookButton from "./facebookButton.js";
import TwitterButton from "./twitterButton.js";
import './css/socialMediaButton.css';

class ShareButton extends React.Component {
	constructor(props) {
		super(props);

		// toggled off by default
		this.state = {
			facebookSelected: false,
			twitterSelected: false
		};
	}

	render () {
		var shareButton;

		// enable button when at least one platform is selected
		if (this.state.facebookSelected || this.state.twitterSelected) {
			shareButton = (
				<div>
				<FacebookButton setParentState={this.setState.bind(this)}/>
				<TwitterButton setParentState={this.setState.bind(this)}/>
				<button type="button" className="share-button enabled">
					Post to Social Media
				</button>
				</div>
			);
		} else {
			shareButton = (
				<div>
				<FacebookButton setParentState={this.setState.bind(this)}/>
				<TwitterButton setParentState={this.setState.bind(this)}/>
				<button type="button" className="share-button disabled">
					Post to Social Media
				</button>
				</div>
			);
		}

		return shareButton;
	}
}

export default ShareButton;