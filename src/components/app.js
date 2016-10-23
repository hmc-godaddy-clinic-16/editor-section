import React from 'react';
import {connect} from 'react-redux';
import InputBox from "./inputbox";
import {updateTitle} from "../actions/title";

export class App extends React.Component {
  constructor () {
    super();
    this.state = {
    	title:"a different test title"
    };
  }

  changeTitle (text) {
  	this.props.changeTitle(text);
  }

  render () {
    return (
      <div>
     	<p>Title</p>
    	<InputBox text={this.props.title} onEdit={this.props.changeTitle}/>
    	<p>Text</p>
    	<InputBox text=""/>
      </div>
    )
  }
}

App.propTypes = {
  changeTitle: React.PropTypes.func.isRequired,
  title: React.PropTypes.string.isRequired
};


// mapStateToProps and mapDispatchToProps handle 
// the communication between the Redux store and React
function mapStateToProps (state) {
  return {
    title: state.title
  }
}

function mapDispatchToProps (dispatch) {
  return {
    changeTitle: (text) => {
      return dispatch(updateTitle(text))
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
