import React from "react";
import Content from "./content.js";
import * as constants from './constants.js';
import './link.css';


// The Announcement component handles displaying a preview of the announcement
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

		// in-line styling to display background image
		// two cases for hover and non-hover state
		var announcementStyle;

		if (this.state.hover && this.props.data.link) {
			announcementStyle = {
				'padding': '10px',
				'backgroundImage': 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(' + image + ')',		
				'backgroundRepeat': 'no-repeat',
				'backgroundSize': 'cover',
				'WebkitBoxShadow': '0px 0px 69px -9px rgba(0,0,0,1)',
				'MozBoxShadow': '0px 0px 69px -9px rgba(0,0,0,1)',
				'boxShadow': '0px 0px 69px -9px rgba(0,0,0,1)'
			}
		}
		else {
			announcementStyle = {
				'padding': '10px',
				'backgroundImage': 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(' + image + ')',		
				'backgroundRepeat': 'no-repeat',
				'backgroundSize': 'cover'
			}
		}

		// scheduling data
		var start = new Date(this.props.data.startDate);
		var end = new Date(this.props.data.endDate);
		var current = new Date();
		var displayAnnouncement = false;

		// display announcement on edit mode, when no dates specified,
		// and when the current date falls within the scheduled date
		if ( this.props.mode == constants.EDIT || 
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
				<a href={this.props.data.link}>
					<div style={announcementStyle} onMouseEnter={this.onMouseHover} onMouseLeave={this.onMouseOut}>
							<Content data={this.props.data} />
					</div>
				</a>
			);
		} else if (displayAnnouncement && this.props.data.link == '') {
				var announcement = (
					<div style={announcementStyle} onMouseEnter={this.onMouseHover} onMouseLeave={this.onMouseOut}>
						<Content data={this.props.data} />
					</div>
				);
		} else {
			var announcement = <noscript/>;
		}

		// debugging
		// console.log("Start: " + start);
		// console.log("End: " + end);
		// console.log("Current: " + current);
		// console.log("Display: " + displayAnnouncement);
		// console.log("\n");

		return announcement;
	}
}

export default Announcement;