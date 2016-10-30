import React from 'react';
import moment from 'moment';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';

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

    onChange(event) {

    	this.setState ({datetime: event.target.value});
    	this.props.onEdit(event.target.value);

    }

    isValidDate(selectedDate) {	

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

    sameDay(date) {
    	
    }

	render() {
		var dateTimePicker;

		if (this.props.same) {
			dateTimePicker = (
				<div> 
					<Datetime viewMode='days' defaultValue={this.state.datetime} onChange={this.onChange} isValidDate={this.isValidDate}/>
				</div> 
			);
		} else {
			dateTimePicker = (

				<div> 
					<Datetime viewMode='days' defaultValue={this.state.datetime} timeFormat ="" onChange={this.onChange} isValidDate={this.isValidDate}/>
					<Datetime viewMode='time' defaultValue={this.state.datetime} dateFormat ="" onChange={this.onChange} isValidDate={this.isValidDate}/>
				</div> 
			);
		}

	    return dateTimePicker;
    }
}

export default Scheduler;
