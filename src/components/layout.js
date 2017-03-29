import React from "react";
import * as constants from './constants.js';
import localStrings from './localStrings.json';
import './css/layout.css';

class Layout extends React.Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}

	// change announcement preview according to layout choice
	handleClick () {
		var choice = this.props.layout;
		this.props.changeLayout(choice);
	}

	render () {
		var choice = this.props.layout;
		var label;

		// generate appropriate label
		switch(choice) {
			case constants.BANNER_LAYOUT:
				label = localStrings.bannerLayout;
				break;
			case constants.BLOCK_TITLE_LAYOUT:
				label = localStrings.blockTitleLayout;
				break;
			default:
				label = localStrings.bannerLayout;
		}

		var layout = <button className="layout-button" onClick={this.handleClick}>{label}</button>;
		
		return layout;
	}
}

export default Layout;