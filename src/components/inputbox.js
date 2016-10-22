import React from "react";

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
    this.props.onEdit(this.state.text);
  }

  render() {
    return (
      <div>
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