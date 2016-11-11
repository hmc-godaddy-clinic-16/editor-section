import React from 'react';
import moment from 'moment';
import Datetime from 'react-datetime';
import './scheduler.css';

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

	render() {
		var dateTimePicker;

        var divStyle = {
            'paddingBottom': '30px',
            'color': 'black',
            
        }

		if (this.props.same) {
			dateTimePicker = (
				<div style={divStyle}> 
					<Datetime viewMode='days' onChange={this.onChange} value={this.state.datetime} isValidDate={this.isValidDate}/>
				</div> 
			);
		} else {
			dateTimePicker = (
				<div style={divStyle}> 
					<Datetime viewMode='days' onChange={this.onChange} value={this.state.datetime} timeFormat ="" isValidDate={this.isValidDate}/>
					<Datetime viewMode='time' onChange={this.onChange} value={this.state.datetime} dateFormat ="" isValidDate={this.isValidDate}/>
				</div> 
			);
		}

	    return dateTimePicker;
    }
}

export default Scheduler;
