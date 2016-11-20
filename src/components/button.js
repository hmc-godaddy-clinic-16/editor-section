import React from "react";

// Provides a simple button component - not currently used 
class Button extends React.Component {
  constructor() {
    super();    
    this.state = {value: false};
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({value: true});
  }

  render() {
    return (
      <button onClick={this.handleChange} value={this.state.value}>
        Submit
      </button>
    );
  }
}

export default Button;