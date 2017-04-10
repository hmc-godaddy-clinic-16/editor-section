/* datetimepicker.js

This provides a certain style of datetime picker, either for
choosing a date or for choosing a time. What gets displayed
depends on the props that are passed in. These datetimepicker
components are used within the wrapper "scheduler.js", that 
wraps the entire datetime picking section on the editor.

Relies on the third-party module react-datetime to select dates.

*/

import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import Datetime from 'react-datetime';
import './css/scheduler.css';

// Provides a date or time picker depending on props
class DateTimePicker extends React.Component
{
	constructor(props) {

		super(props);

		this.state = {
			showPicker: false,
			datetime: this.props.datetime
		};

		this.showPicker = this.showPicker.bind(this);
		this.hidePicker = this.hidePicker.bind(this);
		this.onChange = this.onChange.bind(this);
		this.render = this.render.bind(this);
	}

	componentWillMount() {
		document.addEventListener('click', this.handleClick, false);
	}

	componentWillUnmount() {
		document.removeEventListener('click', this.handleClick, false);
	}

	componentWillReceiveProps(nextProps) {
		this.setState({datetime: nextProps.datetime});
	}


	onChange(event) {
		
		var today = new moment();
		var dayDiff;
		
		// If the day has changed, we want to close the picker since
		// the user has selected a date
		if (this.state.datetime == null) {
			dayDiff = Math.abs(today.diff(event, 'days'));
		} else {
			dayDiff = Math.abs(this.state.datetime.diff(event, 'days'));
		}

		if (dayDiff > 0 && dayDiff < this.state.datetime.daysInMonth()) {
			this.hidePicker();
		}

		this.props.onChange(event);
	}

	hidePicker() {
		this.setState({showPicker: false});
	}

	showPicker() {
		this.setState({showPicker: !this.state.showPicker});
	}

	render() {

		var pickerStyle;
		if (!this.state.showPicker) {
			pickerStyle = {
				'display':'none',
			}
		}

		var buttonText;

		if (this.state.datetime != null && this.state.datetime.isValid()) {

			if (this.props.viewMode == 'days') {
				buttonText = this.state.datetime.format("MMM Do, YYYY");
			} else {
				buttonText = this.state.datetime.format("h:mm A");
			}
		} else {
			if (this.props.viewMode == 'days') {
				buttonText = "Select Date";
			} else {
				buttonText = "Select Time";
			}
		}

		var dateTimePicker = (
			<span> 
		        <button type="button" onClick={this.showPicker}>{buttonText}</button>
	            <div style={pickerStyle} className="picker">
	                <Datetime
	                    viewMode={this.props.viewMode} 
	                    onChange={this.onChange} 
	                    value={this.props.datetime} 
	                    timeFormat={this.props.timeFormat}
	                    dateFormat={this.props.dateFormat} 
	                    isValidDate={this.props.isValidDate}
	                    input={false}
	                    timeConstraints={this.props.timeConstraints}
	                />
	            </div>
	        </span>

		);

		return dateTimePicker;
	}
}

export default DateTimePicker;