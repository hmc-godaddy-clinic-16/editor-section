import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import Dropdown from 'react-dropdown';
import './scheduler.css';

// Provides a dropdown menu depending on props
class DropdownScheduler extends React.Component
{
	constructor(props) {

		super(props);

		this.state = {
			showPicker: false,
			datetime: null
		};

		this.options = this.props.options;
		this.placeholder = this.props.placeholder;
	}

	render() {
		var dropdownStyle;

		if (this.state.showDropdown) {
			dropdownStyle = {
	            'display':'block',
	            'position':'absolute',
	            'zIndex': '1000',
        	};
		} else {
			pickerStyle = {
				'display':'none',
			}
		}

		var dropDown1 = (
			<span> 
				<div style={dropdownStyle}>
	                <Dropdown 
	                    options={this.options}
	                    placeholder={this.placeholder}
	                />
                </div>
	        </span>

		);

		return dropDown1;
	}
}

export default DropdownScheduler;