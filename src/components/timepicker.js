import React from 'react';
import moment from 'moment';

class TimePicker extends React.Component 
{
	  constructor() {
	    super();    
	    this.state = {
	      time: ""
	    };
	    this.onChange = this.onChange.bind(this);
    }

     onChange(event) {
	    this.setState({text: event.target.value});
    }

	render() {
	    return (
			<div>
				Time: <input type="text" onChange={this.onChange} value={this.state.time}/> 
			</div>
	    );
    }
}

export default TimePicker;