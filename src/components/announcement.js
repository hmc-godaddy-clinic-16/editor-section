/* announcement.js

This file contains the code for the announcement that will be displayed in the
preview area of the screen and eventually be displayed on the published website.

Currently four different website layouts are available - the THIN_LAYOUT,
BLOCK_TITLE_LAYOUT, HALF_LAYOUT, and ARROW_LAYOUT.

This file also handles the logic for determining whether the announcement should
be displayed based on the start and end date that were specified. Though it will
always be displayed 

*/


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
		var color = this.props.theme.color;

		var announcementStyle;

		// render different layouts
		if (this.props.layout == constants.THIN_LAYOUT) {
			// low height
			announcementStyle = {
				'height': '50px',
				'backgroundImage': 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(' + image + ')',
				'backgroundColor': color
			};
		} else if (this.props.layout == constants.BLOCK_TITLE_LAYOUT) {
			// medium height
			announcementStyle = {
				'height': '60px',
				'backgroundImage': 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(' + image + ')',
				'backgroundColor': color
			};
		} else if (this.props.layout == constants.HALF_LAYOUT ) {
			announcementStyle = {
				'backgroundColor': color,
				'padding': '0px'
			};
		} else if (this.props.layout == constants.ARROW_LAYOUT) {
			announcementStyle = {
				'backgroundColor': color,
				'padding': '0px',
				'height': '80px',
				'overflow': 'hidden'
			};
		}
		else {
			// extendible height
			announcementStyle = {
				'backgroundImage': 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(' + image + ')',
				'backgroundColor': color
			};
		}

		// Get the scheduling data
		var start = new Date(this.props.data.startDate);
		var end = new Date(this.props.data.endDate);
		var current = new Date();
		var isPermanent = this.props.data.isPermanent;
		var displayAnnouncement = false;

		// Display the announcement if it is in edit mode, if the announement has been displayed
		// as permanent, or if it is within the date range specified by the user.
		if ( 
			this.props.mode != constants.NO_ANNOUNCEMENT && (
			this.props.mode == constants.EDIT  || 
			(isPermanent)                      || 
			(start < current && current < end) || 
			(start == constants.INVALID_DATE && end == constants.INVALID_DATE) ||
			(start == constants.INVALID_DATE && end != constants.INVALID_DATE && current < end) ||
			(start != constants.INVALID_DATE && end == constants.INVALID_DATE && start < current)) ) {
			displayAnnouncement = true;
		} 

		// If a link has been specified, change the behavior of the announcement
		// so that it creates a shadow on hover.
		if (displayAnnouncement && this.props.data.link != '') {
			var announcement = (
				<div>
					<a>
						<div style={announcementStyle} className="announcement" onMouseEnter={this.onMouseHover} onMouseLeave={this.onMouseOut}>
								<Content data={this.props.data} layout={this.props.layout} theme={this.props.theme} image={image}/>
						</div>
					</a>
					<div className="announcementBorder"></div>
				</div>
			);
		} else if (displayAnnouncement && this.props.data.link == '') {
				var announcement = (
					<div>
						<div style={announcementStyle} className="announcement" onMouseEnter={this.onMouseHover} onMouseLeave={this.onMouseOut}>
							<Content data={this.props.data} layout={this.props.layout} theme={this.props.theme} image={image}/>
						</div>
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