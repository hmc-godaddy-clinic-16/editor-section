import React from 'react';
import moment from 'moment';
import 'bootstrap/dist/css/bootstrap.css'
import {connect} from 'react-redux';
import InputBox from "./inputbox";
import {updateTitle, updateStartDate, updateEndDate, updateImageUrl,
        updateBodyText, updateLink, fetchAnnouncement} 
        from "../actions/editor";
import Scheduler from "./scheduler";
import RichTextEditor from "./richtexteditor.js";
import Announcement from "./announcement.js";
import NavigationBar from "./navbar.js";
import * as constants from './constants.js';
import './css/app.css';
import localStrings from './localStrings.json';
import {NAV_EDIT, NAV_PUBLISH, NAV_STYLES} from './constants.js';

export class App extends React.Component {
  constructor (props) {
    super(props);
    this.changeMode = this.changeMode.bind(this);
    this.state = {
      currentMode: NAV_EDIT
    };
  }

  changeMode(mode){
    this.setState({currentMode: mode.id});
  }

  renderNavBar() {
    return (
      <div className="row announcement-navbar">

        <div className="col-4 col-offset-4">
          <NavigationBar 
            currentMode={this.state.currentMode}
            changeMode={this.changeMode}/>

        </div>
       
      </div>
    );
  }

  renderPreview() {
    // mock mode
    var mode = constants.EDIT;
    const editor = this.props.editor;

    return (
      <div className="col-sm-8 col-height preview">
        <Announcement data={editor} mode={mode}/>
      </div>
    );
  }

  renderEditor() {
    const editor = this.props.editor;
    const { isFetching, title, startDate, endDate, imgUrl, bodyText, link} = editor;

    var startDateDate = new Date(startDate);
    var endDateDate = new Date(endDate);
    var dateDisplayOptions = { weekday: 'long', year: 'numeric', 
                               month: 'long', day: 'numeric', 
                               hour:'numeric', minute:'numeric'};

    return (
      <div className="col-sm-4 editor" currentMode={this.state.currentMode}>
        {this.state.currentMode === NAV_EDIT ?
        <div>
          <h4> {localStrings.announcement} </h4>
          <InputBox 
            label={localStrings.title} 
            text={title} 
            onEdit={this.props.changeTitle}
          />
          {localStrings.body}
          <RichTextEditor 
            text={bodyText} 
            onEdit={this.props.changeBodyText}
          />
          <p className="schedule-text"> 
            {localStrings.announcementStartInfo} {startDateDate.toLocaleDateString('en-US', dateDisplayOptions)}. 
          </p>
          
          {localStrings.start} 

          <Scheduler 
            thisDate = {startDate} 
            isStart = {true} 
            startDate={null} 
            onEdit={this.props.changeStartDate}
          />
          
          {moment(startDateDate).isSameOrAfter(moment(endDateDate)) 
            && this.props.editor.endDate != null ?
            <p> {localStrings.endDateAfterStartWarn} </p>:null}

          {this.props.editor.endDate === null ?
            <p className="schedule-text"> {localStrings.announcementNoEndDate}</p>:null}

          {this.props.editor.endDate != null ?
            <p className="schedule-text"> {localStrings.announcementEndInfo} {endDateDate.toLocaleDateString('en-US', dateDisplayOptions)}. </p>:null}
          
          {localStrings.end} 

          <Scheduler 
            thisDate = {endDate} 
            isStart = {false} 
            startDate={this.props.editor.startDate} 
            onEdit={this.props.changeEndDate}/>
          <InputBox 
            label={localStrings.imageURL} 
            text={imgUrl} 
            onEdit={this.props.changeImageUrl}/>
          <InputBox 
            label={localStrings.link} 
            text={link} 
            onEdit={this.props.changeLink}/>

        </div>
        :null}


        {this.state.currentMode === NAV_PUBLISH ?
        <h4> "Layout Mode" </h4>
        :null}

        {this.state.currentMode === NAV_STYLES ?
        <h4> "Styles Mode" </h4>
        :null}
      </div>
    );
  }


  render () {
    return (
      <div className="container-fluid">
        <div className="row">
          {this.renderNavBar()}  
        </div>
        <div className="row announcement-container">
          {this.renderPreview()}
          {this.renderEditor()}

        </div>
      </div>
    )
  }
}

App.propTypes = { 
  editor: React.PropTypes.shape({
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