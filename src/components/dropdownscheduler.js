import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import Dropdown from 'react-dropdown';
import './scheduler.css';

// Provides a date or time picker depending on props
class DropdownScheduler extends React.Component
{
	constructor(props) {

		super(props);

		this.state = {
			showPicker: false,
			datetime: null
		};

		// this.showPicker = this.showPicker.bind(this);
		// this.hidePicker = this.hidePicker.bind(this);
		this.options = this.props.options;
		this.onChange = this.onChange.bind(this);
		this.render = this.render.bind(this);
		this.placeholder = this.props.placeholder;
	}

	// componentWillMount() {
	// 	document.addEventListener('click', this.handleClick, false);
	// }

	// componentWillUnmount() {
	// 	document.removeEventListener('click', this.handleClick, false);
	// }

	// componentWillReceiveProps(nextProps) {
	// 	this.setState({datetime: nextProps.datetime});
	// }

	// Close the picker on click elsewhere
	// handleClick = e => {
	// 	if (!ReactDOM.findDOMNode(this).contains(e.target)) {
	// 		this.hidePicker();
	// 	}
	// }

	onChange(event) {
		// this.hidePicker();
		this.props.onChange(event);
	}

	// hidePicker() {
	// 	this.setState({showPicker: false});
	// }

	// showPicker() {
	// 	this.setState({showPicker: !this.state.showPicker});
	// }

	render() {
		var dropDown1 = (
			<span> 
                <Dropdown 
                    options={this.options}
                    onChange={this._onSelect}
                    value={defaultOption}
                    placeholder={this.placeholder}
                />
	        </span>

		);

		return dropDown1;
	}
}

export default DropdownScheduler;