import React from "react";
import * as constants from './constants.js';
import './css/inputbox.css';

/* InputBox is a basic text input field. */
class InputBox extends React.Component
{
  constructor(props) {
    super(props); 
    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    this.props.onEdit(event.target.value);
  }

  render() {
    var inputBox;

    // create input field along with corresponding label
    if (this.props.layout == constants.THIN_LAYOUT) {
      // character limit
      inputBox = (
        <div className="input-box">
          <p>{this.props.label}</p>
          <input
            type="text"
            value={this.props.text}
            maxLength="50"
            onChange={this.onChange}
          />
        </div>
      );
    } else {
      inputBox = (
        <div className="input-box">
          <p>{this.props.label}</p>
          <input
            type="text"
            value={this.props.text}
            onChange={this.onChange}
          />
        </div>
      );
    }

    return inputBox;
  }
}

export default InputBox;