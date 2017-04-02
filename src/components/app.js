import React from 'react';
import moment from 'moment';
import 'bootstrap/dist/css/bootstrap.css'
import {connect} from 'react-redux';
import InputBox from "./inputbox";
import {updateTitle, updateStartDate, updateEndDate, updateImageUrl,
        updateBodyText, updateLink, fetchAnnouncement, updateIsPermanent, updateTheme} 
        from "../actions/editor";
import Scheduler from "./scheduler";
import RichTextEditor from "./richtexteditor.js";
import Announcement from "./announcement.js";
import NavigationBar from "./navbar.js";
import FacebookButton from "./facebookButton.js";
import TwitterButton from "./twitterButton.js";
import ShareButton from "./shareButton.js";
import Layout from "./layout.js";
import * as constants from './constants.js';
import './css/app.css';
import localStrings from './localStrings.json';
import {NAV_EDIT, NAV_LAYOUT, NAV_STYLES} from './constants.js';
import MockSite from "./mocksite.js";
import AddSection from "./addsection.js";
import RemoveSection from "./removesection.js";
import LogoutButton from "./logoutButton.js";
import StylesMode from "./stylesmode.js";

export class App extends React.Component {
  constructor (props) {
    super(props);

    this.changeMode = this.changeMode.bind(this);
    this.changeAnnouncementMode = this.changeAnnouncementMode.bind(this);
    this.changeLayout = this.changeLayout.bind(this);

    this.state = {
      currentMode: constants.NAV_EDIT,
      announcementMode: constants.EDIT,
      announcementLayout: constants.BANNER_LAYOUT,
      theme: constants.MODERN
    };
  }

  // Navbar mode
  changeMode(mode){
    this.setState({currentMode: mode.id});
  }

  // Announcement display mode
  changeAnnouncementMode(mode){
    this.setState({announcementMode: mode});
  }

  // Layout toggle
  changeLayout(layout) {
    this.setState({announcementLayout: layout});
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

  renderPreview(theme) {
    // mock mode
    const editor = this.props.editor;


    switch(this.props.editor.theme) {
      case "Modern":
          var theme = constants.MODERN;
          break;
      case "Trade":
          var theme = constants.TRADE;
          break;
      case "Luxe":
          var theme = constants.LUXE;
          break;
      case "Urban":
          var theme = constants.URBAN;
          break;
      case "Retro":
          var theme = constants.RETRO;
          break;
      case "Craft":
          var theme = constants.CRAFT;
          break;
      // Something went wrong; let's default to MODERN
      default:
          var theme = constants.MODERN;
    }

    return (
      <div className="col-sm-8 col-height preview">
        <Announcement data={editor} mode={this.state.announcementMode} layout={this.state.announcementLayout} theme={theme}/>
        <AddSection mode={this.state.announcementMode} changeMode={this.changeAnnouncementMode} appearance={constants.ADD_ICON}/>
        <MockSite></MockSite>
      </div>
    );
  }

 
  renderEditor() {
    const editor = this.props.editor;
    const { isFetching, title, startDate, endDate, imgUrl, bodyText, link, theme} = editor;

    var startDateDate = new Date(startDate);
    var endDateDate = new Date(endDate);
    var dateDisplayOptions = { weekday: 'long', year: 'numeric', 
                               month: 'long', day: 'numeric', 
                               hour:'numeric', minute:'numeric'};

    return (
      <div className="col-sm-4 editor" currentMode={this.state.currentMode}>
        {this.state.currentMode === NAV_EDIT && this.state.announcementMode != constants.NO_ANNOUNCEMENT ?
        <div>
          <div className="section-header">{localStrings.announcement}</div>
          <p className="announcement-desc-text">{localStrings.announcementdesc}</p>

          <div className="section-container">
            <InputBox 
              label={localStrings.title} 
              text={title} 
              onEdit={this.props.changeTitle}
              layout={this.state.announcementLayout}/>

            {localStrings.body}
            <RichTextEditor 
              text={bodyText} 
              onEdit={this.props.changeBodyText}/>
          </div>

          <div className="section-container">
            <Scheduler 
              thisDate = {startDate} 
              isStart = {true} 
              startDate={null} 
              onEdit={this.props.changeStartDate}
              isPermanent={false}/>

            <Scheduler 
              thisDate = {endDate} 
              isStart = {false} 
              startDate={this.props.editor.startDate} 
              onEdit={this.props.changeEndDate}
              onChangePermanent={this.props.changeIsPermanent}
              isPermanent={this.props.editor.isPermanent}/>
          </div>

          <div className="section-container">
            <InputBox 
              label={localStrings.imageURL} 
              text={imgUrl} 
              onEdit={this.props.changeImageUrl}/>
            <InputBox 
              label={localStrings.link} 
              text={link} 
              onEdit={this.props.changeLink}/>
          </div>

          <div className="feature-header">{localStrings.social}</div>
          <p className="schedule-text">{localStrings.socialTip}</p>
          <ShareButton
             title={this.props.editor.title} 
             body={this.props.editor.bodyText}
             publishDate={this.props.editor.startDate}/>
          <RemoveSection changeMode={this.changeAnnouncementMode}/>
          {/* <LogoutButton/> */}

        </div>
        :null}

        {this.state.currentMode === NAV_LAYOUT ?
        <div>
          <Layout data={editor} mode={this.state.announcementMode} changeLayout={this.changeLayout} layout={constants.BANNER_LAYOUT} theme={this.state.theme}/>
          <Layout data={editor} mode={this.state.announcementMode} changeLayout={this.changeLayout} layout={constants.BLOCK_TITLE_LAYOUT} theme={this.state.theme}/>
          <Layout data={editor} mode={this.state.announcementMode} changeLayout={this.changeLayout} layout={constants.HALF_LAYOUT} theme={this.state.theme}/>
          <Layout data={editor} mode={this.state.announcementMode} changeLayout={this.changeLayout} layout={constants.ARROW_LAYOUT} theme={this.state.theme}/>

        </div>
        :null}

        {this.state.currentMode === NAV_STYLES ?
        <div>
          <div className="section-header">{localStrings.styles}</div>
          <p className="announcement-desc-text">{localStrings.stylestext}</p>
          <StylesMode
             theme={theme}
             onEdit={this.props.changeTheme}>
          </StylesMode>
        </div>
        :null}

        {this.state.announcementMode === constants.NO_ANNOUNCEMENT ? 
        <AddSection mode={this.state.announcementMode} changeMode={this.changeAnnouncementMode} appearance={constants.ADD_BUTTON}/>
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
          {this.renderPreview(this.state.theme)}
          {this.renderEditor(this.state.layout)}
        </div>
      </div>
    )
  }
}

App.propTypes = { 
  editor: React.PropTypes.shape({
    isPermanent: React.PropTypes.bool.isRequired,
    isFetching: React.PropTypes.bool.isRequired,
    title: React.PropTypes.string.isRequired,
    startDate: React.PropTypes.instanceOf(Date),
    endDate: React.PropTypes.instanceOf(Date),
    imgUrl: React.PropTypes.string.isRequired,
    bodyText: React.PropTypes.string.isRequired,
    link: React.PropTypes.string.isRequired,
    theme: React.PropTypes.string.isRequired,
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
    },
    changeIsPermanent: (isPermanent) => {
      return dispatch(updateIsPermanent(isPermanent))
    },
    changeTheme: (theme) => {
      return dispatch(updateTheme(theme))
    }
  };
}



export default connect(mapStateToProps, mapDispatchToProps)(App);