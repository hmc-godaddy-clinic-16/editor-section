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

    onChange(moment) {
    	console.log("in onChange");
    	console.log(moment);
    	this.setState ({datetime: moment});
    	console.log("todate", moment.toDate());
    	this.props.onEdit(moment.toDate());

    }

    isValidDate(selectedDate) {	

    	// add isValidDate={this.isValidDate}/>

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

        var divStyle = {
            'paddingBottom': '30px',
            'color': 'black'
        }

		if (this.props.same) {
			dateTimePicker = (
				<div style={divStyle}> 
					<Datetime viewMode='days' onChange={this.onChange} value={this.state.datetime}/>
				</div> 
			);
		} else {
			dateTimePicker = (
				<div style={divStyle}> 
					<Datetime viewMode='days' onChange={this.onChange} value={this.state.datetime} timeFormat =""/>
					<Datetime viewMode='time' onChange={this.onChange} value={this.state.datetime} dateFormat =""/>
				</div> 
			);
		}

	    return dateTimePicker;
    }
}

export default Scheduler;
