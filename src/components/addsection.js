/* addsection.js

This file allows for an interface so that the user can choose to add
an announcement when viewing just the mock site. Mostly used for demo purposes.

*/

import React from 'react';
import './css/addsection.css';
import * as constants from './constants.js';

class AddSection extends React.Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick () {
		this.props.changeMode(constants.EDIT);
	}

	render() {
		var addButton;

		// need to handle button changes

		if (this.props.mode == constants.NO_ANNOUNCEMENT && this.props.appearance == constants.ADD_ICON) {
			addButton = (
				<div className="add-section-button-image-container" onClick={this.handleClick}>
					<div className="add-section-button-image-circle"> 
						<span className="button-text"> + </span>
					</div>
				</div>
			);
		} else if (this.props.mode == constants.NO_ANNOUNCEMENT && this.props.appearance == constants.ADD_BUTTON){
			addButton = (
				<div className="announcement-section"> 
					<h4> Sections </h4>
					<a>
						<div className="section-wrapper" onClick={this.handleClick}>
							<h5> Announcement </h5>
							<div className="section-arrow">></div>
						</div>
					</a>

					<div className="section-wrapper">
						<h5> Header </h5>
						<div className="section-arrow">></div>
					</div>

					<div className="section-wrapper">
						<h5> About </h5>
						<div className="section-arrow">></div>
					</div>

					<div className="section-wrapper">
						<h5> Contact Us </h5>
						<div className="section-arrow">></div>
					</div>

					<div className="section-wrapper">
						<h5> Footer </h5>
						<div className="section-arrow">></div>
					</div>

				</div>
			);
		} else {
			addButton = (<div></div>);
		}

		return addButton;
	}
}

export default AddSection;