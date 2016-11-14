import React from 'react';
import {connect} from 'react-redux';
import InputBox from "./inputbox";
import {updateTitle, updateStartDate, updateEndDate, updateImageUrl, updateBodyText, updateLink} from "../actions/editor";
import Scheduler from "./scheduler";
import RichTextEditor from "./richtexteditor.js";
import Announcement from "./announcement.js";
import * as constants from './constants.js';

export class App extends React.Component {
  constructor () {
    super();
    this.state = {
      editor: {
        title:"a different test title",
        startDate: "some date",
        endDate: "some date",
        imgUrl: "some image url",
        bodyText: "some body text",
        link: "some link"
      }, 
      dateTimeSameField: false,
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

  changeBodyText(text) {
    this.props.changeBodyText(text);
  }

  changeLink(link) {
    this.props.changeLink(link);
  }

  render () {
    console.log("rendered!");

    var containerStyle = {
      'backgroundColor': '#202121',
      'height': '100vh',
      'borderStyle': 'solid',
      'borderColor': 'black'
    }

    var previewStyle = {
      'padding': '20px'
    };

    var editorStyle = {
      'height': '100vh',
      'padding': '20px',
      'backgroundColor': '#2e2f2e',
      'fontFamily': 'Arial, sans-serif',
      'fontSize': '14px',
      'color': 'white'
    };

    // mock mode
    var mode = constants.EDIT;

    return (
      <div className="row" style={containerStyle}>
        <div className="col-sm-6" style={previewStyle}>
          <Announcement data={this.props.editor} mode={mode}/>
        </div>

        <div className="col-sm-6" style={editorStyle}>
          <h4> Announcement </h4>

          <InputBox label="Title" text={this.props.editor.title} onEdit={this.props.changeTitle}/>
          Body <RichTextEditor text={this.props.editor.bodyText} onEdit={this.props.changeBodyText}/>
          Start <Scheduler startDate={null} onEdit={this.props.changeStartDate} same = {this.state.dateTimeSameField}/>
          End <Scheduler startDate={this.props.editor.startDate} onEdit={this.props.changeEndDate} same = {this.state.dateTimeSameField}/>
          <InputBox label="Image URL" text={this.props.editor.imgUrl} onEdit={this.props.changeImageUrl}/>
          <InputBox label="Link" text={this.props.editor.link} onEdit={this.props.changeLink}/>
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
  changeLink: React.PropTypes.func.isRequired,
  
  editor: React.PropTypes.shape({
    title: React.PropTypes.string.isRequired,
    startDate: React.PropTypes.instanceOf(Date),
    endDate: React.PropTypes.instanceOf(Date),
    imgUrl: React.PropTypes.string.isRequired,
    bodyText: React.PropTypes.string.isRequired,
    link: React.PropTypes.string.isRequired,
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
    changeTitle: (title) => {
      return dispatch(updateTitle(title))
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
    changeBodyText: (bodyText) => {
      return dispatch(updateBodyText(bodyText))
    },
    changeLink: (link) => {
      return dispatch(updateLink(link))
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);