import React from "react";
import * as constants from './constants.js';
import './css/content.css';

/* Content renders the title and body. 
   Thin layout only renders the title. */
class Content extends React.Component {
	render () {
		var first = this.props.theme.firstFont;
		var second = this.props.theme.secondFont;
		var generic = this.props.theme.genericFont;

		var contentStyle = {
			'color': 'white',
			'fontFamily': first + ',' + second + ',' + generic,
			'textAlign': 'center',
		};

		var bodyStyle = {
			'fontFamily': second + ',' + generic
		}

		var content;

		if (this.props.layout == constants.THIN_LAYOUT) {
			// only display title
			content = (
				<div style={contentStyle}>
					<p id="title">{this.props.data.title}</p>
				</div>
			)
		} else {
			// display title and body
			content = (
				<div style={contentStyle}>
					<p id="title">{this.props.data.title}</p>
					<div style={bodyStyle} id="content" span dangerouslySetInnerHTML={{ __html: this.props.data.bodyText}} />
				</div>
			)
		}

		return content;
	}
}

export default Content;