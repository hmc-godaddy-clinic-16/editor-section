import React from 'react';
import {connect} from 'react-redux';
import InputBox from "./inputbox";
import {updateTitle, updateStartDate, updateEndDate, updateImageUrl, updateBodyText, updateLink, fetchAnnouncement} from "../actions/editor";
import Scheduler from "./scheduler";
import RichTextEditor from "./richtexteditor.js";
import Announcement from "./announcement.js";
import * as constants from './constants.js';

class Mode extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div>
				{this.props.currentMode === 1 ?
				 <div>
				  <h4> Announcement </h4>
		          <InputBox label="Title" text={title} onEdit={this.props.changeTitle}/>
		          Body <RichTextEditor text={bodyText} onEdit={this.props.changeBodyText}/>
		          <p> Your announcement is scheduled to begin displaying on {startDateDate.toLocaleDateString('en-US', dateDisplayOptions)}. </p>
		          Start <Scheduler thisDate = {startDate} isStart = {true} startDate={null} onEdit={this.props.changeStartDate}/>
		          <p> Your announcement is scheduled to stop displaying on {endDateDate.toLocaleDateString('en-US', dateDisplayOptions)}. </p>
		          End <Scheduler thisDate = {endDate} isStart = {false} startDate={this.props.editor.startDate} onEdit={this.props.changeEndDate}/>
		          <InputBox label="Image URL" text={imgUrl} onEdit={this.props.changeImageUrl}/>
		          <InputBox label="Link" text={link} onEdit={this.props.changeLink}/>
		         </div>
				:null}

				{this.props.currentMode === 2 ?
				<div>
				<h4> "Layout Mode" </h4>
				<p> Coming soon </p>
				</div>
				:null}

				{this.props.currentMode === 3 ?
				<div>
				<h4> "Styles Mode" </h4>
				<p> Coming soon </p>
				</div>
				:null}
			</div>
	);}
}

export default Mode;