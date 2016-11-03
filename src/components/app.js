import React from 'react';
import {connect} from 'react-redux';
import InputBox from "./inputbox";
import {updateTitle, updateStartDate, updateEndDate, updateImageUrl} from "../actions/editor";
import Scheduler from "./scheduler";

export class App extends React.Component {
  constructor () {
    super();
    this.state = {
      editor: {
        title:"a different test title",
        startDate: "some date",
        endDate: "some date",
        imgUrl: "some image url",
      }, 
      dateTimeSameField: true
    };
  }

  changeTitle (text) {
  	this.props.changeTitle(text);
  }

  changeStartDate(date) {
    this.props.changeStartDate(date);
  }

  changeEndDate(date) {
    this.props.changeEndDate(date);
  }

  changeImageUrl(imgUrl) {
    this.props.changeImageUrl(imgUrl);
  }

  render () {
    return (
      <div>
       	<p>Title</p>
      	<InputBox text={this.props.editor.title} onEdit={this.props.changeTitle}/>
      	<p>Text</p>
      	<InputBox text=""/>
        Start: <Scheduler startDate={null} onEdit={this.props.changeStartDate} same = {this.state.dateTimeSameField}/>
        End: <Scheduler startDate={this.props.editor.startDate} onEdit={this.props.changeEndDate} same = {this.state.dateTimeSameField}/>
        <p>Image Url</p>
        <InputBox text={this.props.editor.imgUrl} onEdit={this.props.changeImageUrl}/>
      </div>
    )
  }
}

App.propTypes = {
  changeTitle: React.PropTypes.func.isRequired,
  changeStartDate: React.PropTypes.func.isRequired,
  changeEndDate: React.PropTypes.func.isRequired,
  changeImageUrl: React.PropTypes.func.isRequired,
  
  editor: React.PropTypes.shape({
    title: React.PropTypes.string.isRequired,
    startDate: React.PropTypes.instanceOf(Date),
    endDate: React.PropTypes.instanceOf(Date),
    imgUrl: React.PropTypes.string.isRequired,
  }).isRequired 

};


// mapStateToProps and mapDispatchToProps handle 
// the communication between the Redux store and React
function mapStateToProps (state) {
  return {
    editor: state.editor
  }
}

function mapDispatchToProps (dispatch) {
  return {
    changeTitle: (text) => {
      return dispatch(updateTitle(text))
    }, 
    changeStartDate: (date) => {
      return dispatch(updateStartDate(date))
    },
    changeEndDate: (date) => {
      return dispatch(updateEndDate(date))
    },
    changeImageUrl: (imgUrl) => {
      return dispatch(updateImageUrl(imgUrl))
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);