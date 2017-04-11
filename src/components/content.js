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
				var blockTitleArrow = "no-arrow"
			} else {
				var blockTitle = "block-title"
				var blockTitleArrow = "block-title-arrow"
			}

			// display title (with background) and body
			content = (
				<div id="block-content-container" style={contentStyle}>
					<div id={blockTitle}>{this.props.data.title}</div>
					<div id={blockTitleArrow}>&nbsp;</div>
					<div style={bodyStyle} id="block-content" span dangerouslySetInnerHTML={{ __html: this.props.data.bodyText}} />
				</div>
			)
		}
		// Display title and body in arrow layout
		else if (this.props.layout == constants.ARROW_LAYOUT) {
			content = (
				<div className="flexbox" style={contentStyle}>
					<div className="flexbox-col" id="arrow-title">{this.props.data.title}</div>
					<div className="flexbox-col" style={bodyStyle}>
						<div id="triangle"></div>
						<div id="arrow-content" span dangerouslySetInnerHTML={{ __html: this.props.data.bodyText}} />
					</div>
				</div>
			)

		} 
		// Display title, body, and image in half and half layout
		else if (this.props.layout == constants.HALF_LAYOUT) {
			var image = this.props.image;
			var backgroundStyle = {
				'backgroundImage': 'url(' + image + ')'
			}

			content = (
				<div className="flexbox" style={contentStyle}>
					<div className="flexbox-col">
						<div id="title"> {this.props.data.title}</div>
						<hr/>
						<div style={bodyStyle} id="content" span dangerouslySetInnerHTML={{ __html: this.props.data.bodyText}} />
					</div>
					<div className="flexbox-col" style={backgroundStyle}>
						&nbsp;
					</div>
				</div>
			)

		}

		else {
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