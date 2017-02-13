import React from 'react';
import moment from 'moment';
import Datetime from 'react-datetime';
import './css/scheduler.css';
import DateTimePicker from './datetimepicker.js';
import localStrings from './localStrings.json';


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
            checkBox: this.props.isPermanent
        };

        this.props.thisDate.setMinutes(0, 0, 0);
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
                var now = new moment();
                var d = new Date();
                d.setDate(d.getDate());
                this.props.onEdit(d);
                this.props.onChangePermanent(true);
            }
        }

        else {
            if (!this.props.isStart) {
                this.props.onChangePermanent(false);
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
        var infotext;
        var checkboxText; // Text to display 

        var minuteInterval = {minutes : { step: 30 }};

        var dateDisplayOptions = { weekday: 'long', year: 'numeric', 
                                month: 'long', day: 'numeric', 
                                hour:'numeric', minute:'numeric'};

        // This is the end-date picker
        if (this.props.isStart) {
            infotext = localStrings.announcementStartInfo;
            checkboxText = localStrings.startnowtext;
        } else { // this is the start-date picker
            infotext = localStrings.announcementEndInfo;
            checkboxText = localStrings.makepermanenttext;
        }

        if (this.props.isPermanent) {
            dateTimePicker = (
                <div className="row"> 

                    <p className="schedule-info-text">
                        {localStrings.announcementNoEndDate}
                    </p>

                    <div className="scheduleBox">
                        <label>
                            <input type="checkbox" id="datecheckbox" checked = {true} onChange = {this.onCheckbox} />
                        </label>
                        {checkboxText}
                    </div>
                    
                </div>
                );
        }
        else
        {
            dateTimePicker = (
                <div className="row"> 

                    <p className="schedule-info-text">
                        {infotext} {this.props.thisDate.toLocaleDateString('en-US', dateDisplayOptions)}.
                    </p>

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
                            timeConstraints={minuteInterval}
                        />
                    </div>

                    <div className="scheduleBox">
                        <label>
                            <input type="checkbox" id="datecheckbox" checked = {this.state.checkbox} onChange = {this.onCheckbox} />
                        </label>
                        {checkboxText}
                    </div>

                </div> 
            );
        }

        return dateTimePicker;
    }
}

export default Scheduler;