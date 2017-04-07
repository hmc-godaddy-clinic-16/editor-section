/*
stylesmode.js

This class renders the content for the Styles tab of the Navbar.
It uses react-dropdown to create a dropdown menu that
can be used to select which style option they would like for their
announcement.
*/

import React from 'react';
import * as constants from './constants.js';
import localStrings from './localStrings.json';
import Dropdown from 'react-dropdown';
import './css/stylesmode.css';

class StylesMode extends React.Component {
	constructor(props) {
		super(props);
		this._onSelect = this._onSelect.bind(this);

	}

	_onSelect(event) {
		const newvalue = event.value;
		this.props.onEdit(newvalue);
	}


	render() {
	
		const options = ['Trade', 'Luxe', 'Urban', 'Retro', 'Craft', 'Modern'];
		const defaultOption = options[0];
		var content = (<div>
						<Dropdown options={options} onChange={this._onSelect} value={this.props.theme} placeholder="Select an option"/>
						</div>);
		return content;
	}
}


export default StylesMode;