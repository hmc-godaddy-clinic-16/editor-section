import React from "react";
import './inputbox.css';

// InputBox is a basic text input field. 
// onEdit updates the store
class InputBox extends React.Component
{
  constructor(props) {
    super(props); 
    this.state = {
      text: this.props.text
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    this.setState({text: event.target.value});
    this.props.onEdit(event.target.value);
  }

  render() {
    var divStyle = {
      'paddingBottom': '15px'
    };

    var boxStyle = {
      'width': '99%',
      'padding': '10px',
      'backgroundColor': '#434445', 
      'border': 'solid 1px #787878',
      'borderRadius': '3px'
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