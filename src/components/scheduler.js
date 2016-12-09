import React from 'react';
import moment from 'moment';
import Datetime from 'react-datetime';
import './scheduler.css';
import DateTimePicker from './datetimepicker.js';
import DropdownScheduler from './dropdownscheduler.js';
import Dropdown from 'react-dropdown';

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
        var thisDate = new Date(this.props.thisDate);
        var thisMoment = moment(thisDate);

        this.state = {
            checkBox: false
        };

        this.showDropdown = this.props.showDropdown;
        this.onDateChange = this.onDateChange.bind(this);
        this.onCheckbox = this.onCheckbox.bind(this);
        this.isValidDate = this.isValidDate.bind(this);
        this.render = this.render.bind(this);
    }

    onDateChange(moment) {

        if (this.isValidDate(moment)) {

            if (moment != null) {

                this.props.onEdit(moment.toDate());
            } else {
                this.props.onEdit(null);
            }
        }

        // Uncheck the checkbox
        if (this.state.checkbox) {
            this.setState({checkbox: !this.state.checkbox});
        }
    }

    onCheckbox() {

        if (!this.state.checkbox) {
            if (this.props.isStart) { // start now
                var now = new moment();
                this.props.onEdit(now.toDate());

            } else { // End never
                this.props.onEdit(null);
            }
        }

        this.setState({checkbox: !this.state.checkbox});
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
            'paddingBottom': '6px'
        }

        var checkboxText; // Text to display 

        var optionsNum = [
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12
        ]

        var optionsSpan = [
            "minutes", "hours", "days", "weeks", "months", "years"
        ]

        var dropdownStyle;

        console.log("############" + this.showDropdown);
        if (!this.showDropdown) {
            dropdownStyle = {
                'display':'none',
                'position':'absolute',
                'zIndex': '1000',
            };
        }

        // This is the end-date picker
        if (this.props.isStart) {
            checkboxText = "Start Now";
        } else { // this is the start-date picker
            checkboxText = "End Never";
        }

        dateTimePicker = (
            <div>
                <div className="row" style={divStyle}> 
                        <div className="col-sm-6" style={dropdownStyle}>
                            <Dropdown
                                options={optionsNum}
                                placeholder="Select number"
                            />
                        </div>

                        <div className="col-sm-6" style={dropdownStyle}>
                            <Dropdown
                                options={optionsSpan}
                                placeholder="Select span"
                            />
                        </div>

                </div> 

            <div className="row" style={divStyle}> 
                <div className="col-sm-6">
                    <DateTimePicker
                        viewMode='days' 
                        onChange={this.onDateChange} 
                        datetime={moment(this.props.thisDate)} 
                        timeFormat =""
                        dateFormat = "MM DD YYYY" 
                        isValidDate={this.isValidDate}
                    />
                </div>

                <div className="col-sm-6">
                    <DateTimePicker 
                        viewMode='time' 
                        onChange={this.onDateChange} 
                        datetime={moment(this.props.thisDate)} 
                        dateFormat ="" 
                        timeFormat = "h:mm A"
                        isValidDate={this.isValidDate}
                    />
                </div>

                <div className="scheduleBox">
                    <label>
                        <input type="checkbox" id="datecheckbox" checked = {this.state.checkbox} onChange = {this.onCheckbox} />
                    </label>
                    {checkboxText}
                </div>

            </div> 
            </div>
        );

        return dateTimePicker;
    }
}

export default Scheduler;