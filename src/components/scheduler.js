import React from 'react';
import moment from 'moment';
import Datetime from 'react-datetime';
import './scheduler.css';
import DateTimePicker from './datetimepicker.js';

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
	    	datetime: null,
            prev: null,
            checkBox: false
	    };
	    this.onDateChange = this.onDateChange.bind(this);
        this.onCheckbox = this.onCheckbox.bind(this);
	    this.isValidDate = this.isValidDate.bind(this);
	    this.render = this.render.bind(this);
    }

    onDateChange(moment) {
        console.log(moment);
    	if (this.isValidDate(moment)) {
    		this.setState ({datetime: moment});
            this.setState ({prev: this.state.datetime});
            if (this.state.datetime != null) {
    		    this.props.onEdit(this.state.datetime.toDate());
            } else {
                this.props.onEdit(null);
            }
    	} else {
            this.setState({datetime: this.state.prev});
        }

        this.setState({checkBox: false});
    }

    onCheckbox(event) {

        // Start now 
        if (this.props.isStart == true) {
            var now = new moment();
            if (event == false) {
                this.setState({datetime: now});
                this.props.onEdit(now.toDate());
            } else {
                this.setState({datetime: this.state.prev});

                if (this.state.prev != null) {
                    this.props.onEdit(this.state.prev.toDate());
                } else {
                    this.props.onEdit(this.state.prev);
                }
            }   

        } else { // End never
            if (event == false) {
                this.setState({datetime: null});
                this.props.onEdit(null);
            } else {
                this.setState({datetime: this.state.prev});

                if (this.state.prev != null) {
                    this.props.onEdit(this.state.prev.toDate());
                } else {
                    this.props.onEdit(this.state.prev);
                }
            }
        }
    }

    isValidDate(selectedDate) {	
        // Ensure that the end date is after the start date
    	if (this.props.startDate == null ) {
            return true;
    	} else {
    		if ( selectedDate.isSameOrAfter(this.props.startDate)) {
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
            'paddingBottom': '15px',
        }

        var buttonStyle = {
            'zIndex': '-1',
        };

        var checkboxText; // Text to display 

        // This is the end-date picker
        if (this.props.isStart == true ) {
            checkboxText = "Start Now";
        } else { // this is the start-date picker
            checkboxText = "End Never";
        }

		dateTimePicker = (
			<div className="row" style={divStyle}> 

				<div className="col-sm-6">
                    <DateTimePicker
                        viewMode='days' 
                        onChange={this.onDateChange} 
                        datetime={this.state.datetime} 
                        timeFormat =""
                        dateFormat = "MM DD YYYY" 
                        isValidDate={this.isValidDate}
                    />
                </div>

				<div className="col-sm-6">
                    <DateTimePicker 
                        viewMode='time' 
                        onChange={this.onDateChange} 
                        datetime={this.state.datetime} 
                        dateFormat ="" 
                        timeFormat = "h:mm A"
                        isValidDate={this.isValidDate}
                    />
                </div>

                <div>
                    <label htmlFor="datecheckbox">
                        <input type="checkBox" id="datecheckbox" value={this.state.checkBox} onChange={this.onCheckbox}/>
                        {checkboxText}
                    </label>
                </div>

			</div> 
		);

	    return dateTimePicker;
    }
}

export default Scheduler;
