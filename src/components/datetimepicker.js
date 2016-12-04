import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import Datetime from 'react-datetime';
import './scheduler.css';

// Provides a date or time picker depending on props
class DateTimePicker extends React.Component
{
	constructor(props) {

		super(props);

		this.state = {
			showPicker: false,
			datetime: null
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

	// Close the picker on click elsewhere
	handleClick = e => {
		if (!ReactDOM.findDOMNode(this).contains(e.target)) {
			this.hidePicker();
		}
	}

	onChange(event) {
		this.hidePicker();
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

		if (this.state.showPicker) {
			pickerStyle = {
	            'display':'block',
	            'position':'absolute',
	            'zIndex': '1000',
        	};
		} else {
			pickerStyle = {
				'display':'none',
			}
		}

		var buttonStyle = {
			'background-color:': '#434445',
		}

		var buttonText;

		if (this.state.datetime != null) {

			if (this.props.viewMode == 'days') {
				buttonText = this.state.datetime.format("MMM, Do");
			} else {
				buttonText = this.state.datetime.format("h:mm, A");
			}
		} else {
			if (this.state.viewMode == 'days') {
				buttonText = "Select Date";
			} else {
				buttonText = "Select Time";
			}
		}

		var dateTimePicker = (
			<span> 
		        <button type="button" onClick={this.showPicker}>{buttonText}</button>
	            <div style={pickerStyle}>
	                <Datetime 
	                    viewMode={this.props.viewMode} 
	                    onChange={this.onChange} 
	                    value={this.props.datetime} 
	                    timeFormat={this.props.timeFormat}
	                    dateFormat={this.props.dateFormat} 
	                    isValidDate={this.props.isValidDate}
	                    input={false}
	                />
	            </div>
	        </span>

		);

		return dateTimePicker;
	}
}

export default DateTimePicker;