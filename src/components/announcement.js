import React from "react";
import Content from "./content.js";
import * as constants from './constants.js';
import './css/link.css';
import './css/announcement.css';


/* Announcement displays a preview of the announcements. */
class Announcement extends React.Component {
	constructor () {
		super();
		this.onMouseHover = this.onMouseHover.bind(this);
	    this.onMouseOut = this.onMouseOut.bind(this);
	    this.state = {hover: false};
	}
    
    onMouseHover() {
    	this.setState({ hover:true });
 	}

  	onMouseOut() {
    	this.setState({ hover:false });
  	}

	render () {
		var image = this.props.data.imgUrl;

		// Set background image
		var announcementStyle = {
			'backgroundImage': 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(' + image + ')'
		}

		// scheduling data
		var start = new Date(this.props.data.startDate);
		var end = new Date(this.props.data.endDate);
		var current = new Date();
		var isPermanent = this.props.data.isPermanent;
		var displayAnnouncement = false;

		// display announcement on edit mode, when no dates specified,
		// and when the current date falls within the scheduled date
		if ( this.props.mode == constants.EDIT ||
			(isPermanent)                      || 
			(start < current && current < end) || 
			(start == constants.INVALID_DATE && end == constants.INVALID_DATE) ||
			(start == constants.INVALID_DATE && end != constants.INVALID_DATE && current < end) ||
			(start != constants.INVALID_DATE && end == constants.INVALID_DATE && start < current) ) {
			displayAnnouncement = true;
		} 

		// show announcement depending on scheduled date and mode
		// and when no start and no end is given
		if (displayAnnouncement && this.props.data.link != '') {
			var announcement = (
				<div>
					<a>
						<div style={announcementStyle} className="announcement" onMouseEnter={this.onMouseHover} onMouseLeave={this.onMouseOut}>
								<Content data={this.props.data} />
						</div>
					</a>
					<div className="announcementBorder"></div>
				</div>
			);
		} else if (displayAnnouncement && this.props.data.link == '') {
				var announcement = (
					<div style={announcementStyle} className="announcement" onMouseEnter={this.onMouseHover} onMouseLeave={this.onMouseOut}>
						<Content data={this.props.data} />
						<div className="announcementBorder"></div>
					</div>
				);
		} else {
			var announcement = <noscript/>;
		}

		/* FOR DEBUGGING THE DISPLAY BASED ON SCHEDULED DATES */
		// console.log("Start: " + start);
		// console.log("End: " + end);
		// console.log("Current: " + current);
		// console.log("Display: " + displayAnnouncement);
		// console.log("\n");

		return announcement;
	}
}

export default Announcement;