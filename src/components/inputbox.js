import React from "react";
import './inputbox.css';

class InputBox extends React.Component {
  constructor() {
    super();    
    this.state = {
      text: ""
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    this.setState({text: event.target.value});
    this.props.onEdit(event.target.value);
  }

  render() {
    var divStyle = {
      'paddingBottom': '30px'
    };

    return (
      <div style={divStyle}>
        <p>{this.props.label}</p>
        <input
          type="text"
          value={this.state.text}
          onChange={this.onChange}
        />
      </div>
    );
  }
}


export default InputBox;