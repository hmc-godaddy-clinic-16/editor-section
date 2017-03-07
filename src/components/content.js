import React from "react";
import * as constants from './constants.js';
import './css/content.css';

/* Content renders the title and body. 
   Thin layout only renders the title. */
class Content extends React.Component {
	render () {
		var contentStyle = {
			'color': 'white',
			'textAlign': 'center',
		};

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
					<div id="content" span dangerouslySetInnerHTML={{ __html: this.props.data.bodyText}} />
				</div>
			)
		}

		return content;
	}
}

export default Content;