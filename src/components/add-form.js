import React from 'react';
// import InputField from './input-field';

class AddForm extends React.Component {
  constructor () {
    super();
    this.state = {
      text: ""
    };
    this.onClick = this.onClick.bind(this);
  }

  onClick () {
    // if (this.state.text.length > 0) {
    //   this.props.onAdd(this.state.text);
    //   this.setState({text: ""});
    // }
  }

  render () {
    return (
      <div>
        <p>Title</p>
        // <InputField id="title" />
        <p>Text</p>
          <input type="text" value={this.state.text} onChange={this.onTextChange}/>
        <p/>
        <input type="submit" value="submit" onClick={this.onClick}/>
      </div>
    )
  }
}

AddForm.propTypes = {
  onAdd: React.PropTypes.func.isRequired
};

export default AddForm;
