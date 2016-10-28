import React from 'react';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';

class Scheduler extends React.Component 
{
	  constructor() {
	    super();    
	    this.state = {
	      date: moment(),
	      time: moment(),
	      datetime: moment(),
	      startdatetime: moment(),
	      enddatetime: moment()
	    };
	    this.onChange = this.onChange.bind(this);
    }

     onTimeChange(event) {
	    this.setState({date: event});
	    //this.props.onEdit(this.state.date);
    }

    onDateChange(event) {
    	this.setState({time: event});
    }

    onChange(event) {

    }

	render() {
	    return (
			<div>
				<h3>Version A</h3> 
				Start Date: <DatePicker selected={this.state.date} onChange={this.onChange}/>
				Time: <TimePicker defaultValue={this.state.time} onChange={this.onChange} />
				End Date: <DatePicker selected={this.state.date} onChange={this.onChange}/>
				Time: <TimePicker defaultValue={this.state.time} onChange={this.onChange} />
		
				<h3>Version B</h3>
				Start Date: <Datetime viewMode='days' defaultValue={this.state.startdatetime}/>
				End Date: <Datetime viewMode='days' defaultValue={this.state.enddatetime}/>

				<h3>Version C</h3>
				Would require modfication to a 3rd party module 
				Start Date: <Datetime viewMode='days' className="datepicker" defaultValue={this.state.startdatetime}/>
				Time: <Datetime viewMode='time' className="timepicker" defaultValue={this.state.startdatetime}/>
				End Date: <Datetime viewMode='days' className="datepicker" defaultValue={this.state.enddatetime}/>
				Time: <Datetime viewMode='time' className="timepicker" defaultValue={this.state.enddatetime}/>
			</div>
	    );
    }
}

export default Scheduler;
