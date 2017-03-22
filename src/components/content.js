import React from "react";
import * as constants from './constants.js';
import './css/content.css';

/* Content renders the title and body. 
   Thin layout only renders the title. */
class Content extends React.Component {
	render () {
		// get theme typefaces
		var first = this.props.theme.firstFont;
		var second = this.props.theme.secondFont;
		var generic = this.props.theme.genericFont;

		// set font family according to theme typefaces
		var contentStyle = {
			'fontFamily': first + ',' + second + ',' + generic,
		};

		var bodyStyle = {
			'fontFamily': second + ',' + generic
		}

		var content;

		// content changes based on layout
		if (this.props.layout == constants.THIN_LAYOUT) {
			// only display title
			content = (
				<div id="content-container" style={contentStyle}>
					<p id="title">{this.props.data.title}</p>
				</div>
			)
		} else if (this.props.layout == constants.BLOCK_TITLE_LAYOUT) {
			var blockTitle;

			// do not render background for empty title
			if (this.props.data.title == '') {
				var blockTitle = "title";
			} else {
				var blockTitle = "block-title"
			}

			// display title (with background) and body
			content = (
				<div id="block-content-container">
					<div id={blockTitle}>{this.props.data.title}</div>
					<div style={bodyStyle} id="content" span dangerouslySetInnerHTML={{ __html: this.props.data.bodyText}} />
				</div>
			)
		} else {
			// display title and body
			content = (
				<div id="content-container" style={contentStyle}>
					<p id="title">{this.props.data.title}</p>
					<div style={bodyStyle} id="content" span dangerouslySetInnerHTML={{ __html: this.props.data.bodyText}} />
				</div>
			)
		}

		return content;
	}
}

export default Content;