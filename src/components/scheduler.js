import React from 'react';
import moment from 'moment';
import Datetime from 'react-datetime';
import './scheduler.css';

// Scheduler provides a UI for picking a date and time 
// Relies on the third party node module react-datetitme to provide the date
// and time picking
// The "same" parameter passed in via props determines which version of 
// the date time picker is displayed.
// If the date should be after a certain date, a startDate is passed in
class Scheduler extends React.Component 
{
	  constructor(props) {
	    super(props);    
	    this.state = {
	    	datetime: ""
	    };
	    this.onChange = this.onChange.bind(this);
	    this.isValidDate = this.isValidDate.bind(this);
	    this.render = this.render.bind(this);
    }

    onChange(moment) {
    	if (this.isValidDate(moment)) {
    		this.setState ({datetime: moment});
    		this.props.onEdit(moment.toDate());
    	}
    }

    isValidDate(selectedDate) {	
    	// Date validation
  		var d = moment(selectedDate, "DD MMM YYYY HH:mm");
       	if (d == null || !d.isValid()) {
    		return false;
    	}

    	if (this.props.startDate == null ) {
    		if (selectedDate.isAfter(moment())) {
    			return true;
    		} else {
    			return false;
    		}
    	} else {
    		if ( selectedDate.isAfter(moment()) && selectedDate.isAfter(this.props.startDate)) {
    			return true;
    		} else {
    			return false;
    		}
    	}
    }

    // renders a different date/time picker UI dependending on the value of props.same
	render() {
		var dateTimePicker;

        var divStyle = {
            'paddingTop': '6px',
            'paddingBottom': '15px'
        }

		if (this.props.same) {
			dateTimePicker = (
				<div style={divStyle} > 
					<Datetime viewMode='days' onChange={this.onChange} value={this.state.datetime} isValidDate={this.isValidDate}/>
				</div> 
			);
		} else {
			dateTimePicker = (
				<div className="row" style={divStyle}> 
					<div className="col-sm-6"><Datetime viewMode='days' onChange={this.onChange} value={this.state.datetime} timeFormat ="" isValidDate={this.isValidDate}/></div>
					<div className="col-sm-6"><Datetime viewMode='time' onChange={this.onChange} value={this.state.datetime} dateFormat ="" isValidDate={this.isValidDate}/></div>
				</div> 
			);
		}

	    return dateTimePicker;
    }
}

export default Scheduler;
