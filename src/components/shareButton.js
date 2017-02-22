import React from "react";
import striptags from "striptags";
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
		// data for cross-posting
		var publishDate = Math.floor(this.props.publishDate / 1000);
		var bodyText = striptags(this.props.body);

		var shareButton;

		// enable button when at least one platform is selected
		if (this.state.facebookSelected || this.state.twitterSelected) {
			shareButton = (
				<div>
				<FacebookButton setParentState={this.setState.bind(this)} 
					title={this.props.title} 
					body={bodyText} 
					date={publishDate}/>
				<TwitterButton setParentState={this.setState.bind(this)} 
					title={this.props.title} 
					body={bodyText} 
					date={publishDate}/>
				<button type="button" className="share-button enabled">
					Post to Social Media
				</button>
				</div>
			);
		} else {
			shareButton = (
				<div>
				<FacebookButton setParentState={this.setState.bind(this)} 
					title={this.props.title} 
					body={bodyText} 
					date={publishDate}/>
				<TwitterButton setParentState={this.setState.bind(this)} 
					title={this.props.title} 
					body={bodyText} 
					date={publishDate}/>
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