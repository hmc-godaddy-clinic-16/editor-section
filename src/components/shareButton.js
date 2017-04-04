import React from "react";
import striptags from "striptags";
import FacebookButton from "./facebookButton.js";
import TwitterButton from "./twitterButton.js";
import './css/socialMediaButton.css';
import * as constants from "./constants.js";

class ShareButton extends React.Component {
	constructor(props) {
		super(props);

		// toggled off by default
		this.state = {
			facebookSelected: false,
			twitterSelected: false
		};

		this.postFB = this.postFB.bind(this);
		this.postTwitter = this.postTwitter.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}

	// if faceboookSelected
	postFB() {
		console.log("posting to facebook");
		var post = {
			title: this.props.title,
			body: striptags(this.props.body),
			date: Math.floor(this.props.publishDate / 1000)
		};

		return fetch( `${constants.SOCIAL_SERVER_URL}/facebook/post`, {  	
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

	// if twitterSelected
	postTwitter() {
		console.log("posting to twitter");

		var post = {
			title: this.props.title,
			body: striptags(this.props.body),
			date: Math.floor(this.props.publishDate / 1000)
		};

		return fetch( `${constants.SOCIAL_SERVER_URL}/twitter/post`, {  	
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

	handleClick() {
		if (this.state.facebookSelected) {
			this.postFB();
		}

		if (this.state.twitterSelected) {
			this.postTwitter();
		}
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
				<button type="button" className="share-button enabled" onClick={this.handleClick}>
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