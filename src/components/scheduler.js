/* scheduler.js

This file contains the code for a scheduler, which is the component
that goes into the editor section that allows the user to pick a 
date and time for their announcement. This class is a wrapper that
contains the individual datetime pickers as well as checkboxes and other
features that are included within the datetime section on the website.

A start date can be passed in to prevent the user from selecting an
end date before the state date.
*/

import React from 'react';
import moment from 'moment';
import Datetime from 'react-datetime';
import DateTimePicker from './datetimepicker.js';
import localStrings from './localStrings.json';
import './css/scheduler.css';


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
                var minutes = now.format('mm');
                minutes = minutes % 5;
                var starttime = now.subtract(minutes, 'minutes');
                this.props.onEdit(now.toDate());


            } else { // End never
                var now = new moment();
                var minutes = now.format('mm');
                minutes = (minutes % 5)-5;
                var starttime = now.subtract(minutes, 'minutes');
                this.props.onEdit(now.toDate());
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

        // Text to display
        var headerText;
        var infotext;
        var checkboxText; 

        var minuteInterval = {minutes : { step: 5 }};

        var dateDisplayOptions = { weekday: 'long', year: 'numeric', 
                                month: 'long', day: 'numeric', 
                                hour:'numeric', minute:'numeric'};

        // This is the end-date picker
        if (this.props.isStart) {
            infotext = localStrings.announcementStartInfo;
            headerText = localStrings.start;
            checkboxText = localStrings.startnowtext;
        } else { // this is the start-date picker
            infotext = localStrings.announcementEndInfo;
            headerText = localStrings.end;
            checkboxText = localStrings.makepermanenttext;
        }

        if (this.props.isPermanent) {
            dateTimePicker = (
                <div> 
                    {headerText}
                    <div className="scheduleBox">
                        <label>
                            <input type="checkbox" id="datecheckbox" checked = {true} onChange = {this.onCheckbox} />
                        </label>
                        {checkboxText}
                    </div>

                    <p className="schedule-info-text">{localStrings.announcementNoEndDate}</p>
                </div>
            );
        } else {
            dateTimePicker = (
                <div>
                    {headerText}
                    <div className="scheduleBox">
                        <label>
                            <input type="checkbox" id="datecheckbox" checked={this.state.checkbox} onChange={this.onCheckbox} />
                        </label>
                        {checkboxText}
                    </div>

                    <div className="scheduler row"> 

                        <div className="col-md-6">
                            <DateTimePicker
                                viewMode='days' 
                                onChange={this.onDateChange} 
                                datetime={moment(this.props.thisDate)} 
                                timeFormat =""
                                dateFormat = "MM DD YYYY" 
                                isValidDate={this.isValidDate}/>
                        </div>

                        <div className="col-md-6">
                            <DateTimePicker 
                                viewMode='time' 
                                onChange={this.onDateChange} 
                                datetime={moment(this.props.thisDate)} 
                                dateFormat ="" 
                                timeFormat = "h:mm A"
                                isValidDate={this.isValidDate}
                                timeConstraints={minuteInterval}/>
                        </div>
                    </div>
                </div>
            );
        }

        return dateTimePicker;
    }
}

export default Scheduler;