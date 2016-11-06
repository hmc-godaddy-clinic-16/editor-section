import React from 'react';
import {connect} from 'react-redux';
import InputBox from "./inputbox";
import {updateTitle, updateStartDate, updateEndDate, updateImageUrl} from "../actions/editor";
import Scheduler from "./scheduler";
import RichTextEditor from "./richtexteditor.js";

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
    var previewStyle = {
      'width': '60%',
      'height': '100vh',
      'padding': '20px',
      'float': 'left',
      'borderStyle': 'solid',
      'borderColor': 'black',
      'backgroundColor': '#202121'
    };

    // TO DO: Dynamically place editor underneath
    // preview section when window becomes smaller

    var editorStyle = {
      'width': '40%',
      'height': '100vh',
      'padding': '20px',
      'overflow': 'hidden',
      'borderStyle': 'solid',
      'borderColor': 'black',
      'backgroundColor': '#2e2f2e',
      'fontFamily': 'Arial, sans-serif',
      'fontSize': '14px',
      'color': 'white'
    };

    return (
      <div>
        <div style={previewStyle}>
        </div>

        <div style={editorStyle}>
          <InputBox label="Title" text={this.props.editor.title} onEdit={this.props.changeTitle}/>
          Body <RichTextEditor/>
          Start <Scheduler startDate={null} onEdit={this.props.changeStartDate} same = {this.state.dateTimeSameField}/>
          End <Scheduler startDate={this.props.editor.startDate} onEdit={this.props.changeEndDate} same = {this.state.dateTimeSameField}/>
          <InputBox label="Image URL" text={this.props.editor.imgUrl} onEdit={this.props.changeImageUrl}/>
        </div>
      </div>
    )
  }
}

App.propTypes = {
  changeTitle: React.PropTypes.func.isRequired,
  changeStartDate: React.PropTypes.func.isRequired,
  changeEndDate: React.PropTypes.func.isRequired,
  changeImageUrl: React.PropTypes.func.isRequired,
  changeBodyText: React.PropTypes.func.isRequired,
  
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
    },
    changeBodyText: (text) => {
      return dispath(updateBodyText(text))
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);