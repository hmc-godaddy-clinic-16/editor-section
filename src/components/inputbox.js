import React from "react";
import './inputbox.css';

/* InputBox is a basic text input field. */
class InputBox extends React.Component
{
  constructor(props) {
    super(props); 
    // this.state = {
    //   text: this.props.text
    // };
    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    // this.setState({text: event.target.value});
    this.props.onEdit(event.target.value);
  }

  render() {
    // insert space between fields
    var divStyle = {
      'paddingBottom': '15px'
    };

    // create input field along with corresponding label
    return (
      <div style={divStyle}>
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