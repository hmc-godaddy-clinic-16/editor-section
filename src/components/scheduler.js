import React from 'react';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
//import 'react-datetime';
//import 'react-datetime/css/react-datetime.css';

class Scheduler extends React.Component 
{
	  constructor() {
	    super();    
	    this.state = {
	      date: moment(),
	      time: moment(),
	      datetime: moment()
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
		
	

			</div>
	    );
    }
}

export default Scheduler;
