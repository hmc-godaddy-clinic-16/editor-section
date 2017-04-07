import React from "react";
import Announcement from "./announcement.js";
import * as constants from './constants.js';
import localStrings from './localStrings.json';
import './css/layout.css';

class Layout extends React.Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}

	// toggle layout choice
	handleClick () {
		var choice = this.props.layout;
		this.props.changeLayout(choice);
	}

	render () {
		var choice = this.props.layout;

		// generate preview of announcement with appropriate layout
		var layout = (
			<button className="layout-button" onClick={this.handleClick}>
				<Announcement data={this.props.data} mode={this.props.mode} layout={choice} theme={this.props.theme}/>
			</button>
		);
		
		return layout;
	}
}

export default Layout;