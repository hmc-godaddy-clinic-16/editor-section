import React from "react";
import './inputbox.css';

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
    // create input field along with corresponding label
    return (
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
}

export default InputBox;