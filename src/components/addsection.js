import React from 'react';
import './css/addsection.css';
import {EDIT, NO_ANNOUNCEMENT} from './constants.js';

class AddSection extends React.Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick () {
		this.props.changeMode(EDIT);
	}

	render() {
		var addButton;

		// need to handle button changes

		if (this.props.announcementMode == NO_ANNOUNCEMENT) {
			addButton = (
				<div className="add-section-button-image-container" onClick={this.handleClick}>
					<div className="add-section-button-image-circle"> 
						<span className="button-text"> + </span>
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