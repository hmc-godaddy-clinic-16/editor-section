import React from 'react';
import {connect} from 'react-redux';
import InputBox from "./inputbox";
import {updateTitle, updateStartDate, updateEndDate, updateImageUrl, updateBodyText, updateLink, fetchAnnouncement} from "../actions/editor";
import Scheduler from "./scheduler";
import RichTextEditor from "./richtexteditor.js";
import Announcement from "./announcement.js";
import * as constants from './constants.js';

export class App extends React.Component {
  constructor (props) {
    super(props);
    // this.state = {
    //   editor: {
    //     title:"a different test title",
    //     startDate: null,
    //     endDate: null,
    //     imgUrl: "some image url",
    //     bodyText: "some body text",
    //     link: "some link"
    //   }
    // };
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


    var containerStyle = {
      'backgroundColor': '#202121',
      'height': '100%',
      'borderStyle': 'solid',
      'borderColor': 'black'
    };

    var previewStyle = {
      'padding': '20px'
    };

    var editorStyle = {
      'height': '100%',
      'padding': '20px',
      'backgroundColor': '#2e2f2e',
      'fontFamily': 'Arial, sans-serif',
      'fontSize': '14px',
      'color': 'white'
    };

    var textStyle = {
      'fontSize': '12px',
      'color': '#787878'
    };

    const editor = this.props.editor
    const {  gotAnnouncement, isFetching, title, startDate, endDate, imgUrl, bodyText, link} = editor

    var startDateDate = new Date(startDate);
    var endDateDate = new Date(endDate);
    var dateDisplayOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour:'numeric', minute:'numeric'};

    // mock mode
    var mode = constants.EDIT;

    return (
      <div className="row" style={containerStyle}>
        {/* preview section */}
        <div className="col-sm-6" style={previewStyle}>
          <Announcement data={editor} mode={mode}/>
        </div>

        {/* editor section */}
        <div className="col-sm-6" style={editorStyle}>
          <h4> Announcement </h4>

          <InputBox label="Title" text={title} onEdit={this.props.changeTitle}/>
          Body <RichTextEditor text={bodyText} onEdit={this.props.changeBodyText}/>
          Start <Scheduler thisDate = {startDate} isStart = {true} startDate={null} onEdit={this.props.changeStartDate}/>
          <p style={textStyle}> Your announcement is scheduled to begin displaying on {startDateDate.toLocaleDateString('en-US', dateDisplayOptions)}. </p>
          End <Scheduler thisDate = {endDate} isStart = {false} startDate={this.props.editor.startDate} onEdit={this.props.changeEndDate}/>
          <p style={textStyle}> Your announcement is scheduled to stop displaying on {endDateDate.toLocaleDateString('en-US', dateDisplayOptions)}. </p>
          <InputBox label="Image URL" text={imgUrl} onEdit={this.props.changeImageUrl}/>
          <InputBox label="Link" text={link} onEdit={this.props.changeLink}/>
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
    gotAnnouncement: React.PropTypes.bool.isRequired,
    isFetching: React.PropTypes.bool.isRequired,
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